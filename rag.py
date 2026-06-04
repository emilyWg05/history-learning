"""
史鉴 RAG 模块 — 混合检索（向量 + BM25）+ DeepSeek API 问答
可被 CLI (history_rag.py) 和 Web 服务 (server.py) 共用
"""

import json
import os
import requests
import chromadb
from chromadb import Documents, EmbeddingFunction, Embeddings
from openai import OpenAI

# ── 配置 ──────────────────────────────────────────
CHUNKS_FILE    = "history_chunks.json"
DB_PATH        = "./history_vectordb"
COLLECTION     = "shijian_history"
TOP_K          = 5

# 硅基流动嵌入 API 配置
SILICONFLOW_API_KEY = os.environ.get("SILICONFLOW_API_KEY", "")
SILICONFLOW_MODEL = "BAAI/bge-large-zh-v1.5"
EMBED_BATCH_SIZE = 32
RELEVANCE_THRESHOLD = 0.5  # cosine distance 阈值，超过此值视为不相关

# DeepSeek API 配置（LLM 生成用）
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DEEPSEEK_BASE_URL = "https://api.deepseek.com"
DEEPSEEK_MODEL = "deepseek-chat"


# ── 硅基流动嵌入 ───────────────────────────────────
class SiliconFlowEmbedding(EmbeddingFunction):
    def __call__(self, input: Documents) -> Embeddings:
        if not SILICONFLOW_API_KEY:
            raise RuntimeError("未设置 SILICONFLOW_API_KEY 环境变量")

        all_embeddings = []
        for i in range(0, len(input), EMBED_BATCH_SIZE):
            batch = input[i:i + EMBED_BATCH_SIZE]
            resp = requests.post(
                "https://api.siliconflow.cn/v1/embeddings",
                headers={"Authorization": f"Bearer {SILICONFLOW_API_KEY}"},
                json={"model": SILICONFLOW_MODEL, "input": batch},
                timeout=30
            )
            resp.raise_for_status()
            data = resp.json()["data"]
            data.sort(key=lambda x: x["index"])
            all_embeddings.extend(item["embedding"] for item in data)
        return all_embeddings


# ── BM25 检索器 ────────────────────────────────────
class BM25Retriever:
    def __init__(self, chunks):
        from rank_bm25 import BM25Okapi
        import jieba
        self.jieba = jieba
        self.chunks = chunks
        self.corpus = []
        for c in chunks:
            text = c["content"]
            if isinstance(text, str):
                self.corpus.append(list(jieba.cut(text)))
            else:
                self.corpus.append([])
        self.bm25 = BM25Okapi(self.corpus)

    def search(self, query, top_k=5):
        tokens = list(self.jieba.cut(query))
        scores = self.bm25.get_scores(tokens)
        indexed = [(i, scores[i]) for i in range(len(scores))]
        indexed.sort(key=lambda x: x[1], reverse=True)
        results = []
        for idx, score in indexed[:top_k]:
            results.append({
                "chunk": self.chunks[idx],
                "score": float(score),
                "index": idx
            })
        return results


def _rrf_fusion(vector_results, bm25_results, k=60):
    """RRF (Reciprocal Rank Fusion) 融合向量和 BM25 结果"""
    scores = {}
    for rank, item in enumerate(vector_results, 1):
        key = item["index"] if "index" in item else id(item)
        scores[key] = scores.get(key, 0) + 1 / (k + rank)

    for rank, item in enumerate(bm25_results, 1):
        key = item["index"]
        scores[key] = scores.get(key, 0) + 1 / (k + rank)

    sorted_keys = sorted(scores, key=scores.get, reverse=True)
    return sorted_keys


# ── 全局状态 ───────────────────────────────────────
_bm25_retriever = None
_chunks_cache = None


def _load_chunks(chunks_file: str = CHUNKS_FILE):
    global _chunks_cache
    if _chunks_cache is None:
        with open(chunks_file, "r", encoding="utf-8") as f:
            _chunks_cache = json.load(f)
    return _chunks_cache


def init_collection(force_rebuild: bool = False):
    """初始化 ChromaDB 集合，返回 collection 对象"""
    global _bm25_retriever

    print("[rag] 使用硅基流动嵌入 API (BAAI/bge-large-zh-v1.5)...")
    embedding_fn = SiliconFlowEmbedding()

    db = chromadb.PersistentClient(path=DB_PATH)

    if force_rebuild:
        try:
            db.delete_collection(name=COLLECTION)
            print("[rag] 已清除旧索引")
        except Exception:
            pass

    collection = db.get_or_create_collection(
        name=COLLECTION,
        embedding_function=embedding_fn,
        metadata={"hnsw:space": "cosine"}
    )

    return collection


def build_index(collection, chunks_file: str = CHUNKS_FILE):
    """建向量索引（只新增，不覆盖已有数据）"""
    global _bm25_retriever

    chunks = _load_chunks(chunks_file)

    existing = collection.count()
    if existing > 0:
        print(f"[rag] 索引已存在（{existing} 个向量），跳过。用 --rebuild 重建")
        print("[rag] 初始化 BM25 检索器...")
        _bm25_retriever = BM25Retriever(chunks)
        return

    print(f"[rag] 共 {len(chunks)} 个文本块，开始生成嵌入向量...")

    documents = [c["content"] for c in chunks]
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    metadatas = []
    for c in chunks:
        meta = c["metadata"].copy()
        if isinstance(meta.get("tags"), list):
            meta["tags"] = ", ".join(meta["tags"])
        metadatas.append(meta)

    batch_size = 8
    total = len(chunks)
    for i in range(0, total, batch_size):
        end = min(i + batch_size, total)
        collection.add(
            documents=documents[i:end],
            metadatas=metadatas[i:end],
            ids=ids[i:end]
        )
        if (end % 50 == 0) or (end == total):
            print(f"[rag] 嵌入进度: {end}/{total}")

    print(f"[rag] 索引建立完成，共 {collection.count()} 个向量")

    print("[rag] 初始化 BM25 检索器...")
    _bm25_retriever = BM25Retriever(chunks)


def retrieve(collection, question: str, top_k: int = TOP_K):
    """混合检索：向量 + BM25 → RRF 融合"""
    global _bm25_retriever

    # 向量检索（多召回一些给 RRF 融合用）
    vec_n = min(top_k * 2, 20)
    vec_results = collection.query(query_texts=[question], n_results=vec_n)

    vec_items = []
    for j, (doc, meta, distance) in enumerate(zip(
        vec_results["documents"][0],
        vec_results["metadatas"][0],
        vec_results["distances"][0]
    )):
        vec_items.append({
            "content": doc,
            "era": meta.get("era", ""),
            "module": meta.get("module", ""),
            "title": meta.get("title", ""),
            "distance": distance,
            "relevance": round(1 - distance, 3),
            "source": "vector",
            "index": f"v_{j}"
        })

    # BM25 检索
    bm25_items = []
    if _bm25_retriever is not None:
        bm25_raw = _bm25_retriever.search(question, top_k=top_k * 2)
        for item in bm25_raw:
            c = item["chunk"]
            bm25_items.append({
                "content": c["content"],
                "era": c["metadata"].get("era", ""),
                "module": c["metadata"].get("module", ""),
                "title": c["metadata"].get("title", ""),
                "bm25_score": item["score"],
                "source": "bm25",
                "index": f"b_{item['index']}"
            })

    # RRF 融合
    merged_keys = _rrf_fusion(vec_items, bm25_items)

    # 按 RRF 排序取 top_k
    key_to_item = {}
    for item in vec_items:
        key_to_item[item["index"]] = item
    for item in bm25_items:
        key_to_item[item["index"]] = item

    results = []
    for key in merged_keys[:top_k]:
        if key in key_to_item:
            results.append(key_to_item[key])

    return results


def build_prompt(question: str, retrieved_chunks: list) -> str:
    """构建发给 LLM 的提示词"""
    context_parts = []
    for i, chunk in enumerate(retrieved_chunks, 1):
        source = f"{chunk['era']} · {chunk['title'] or chunk['module']}"
        context_parts.append(f"【参考资料 {i}｜{source}】\n{chunk['content']}")

    context = "\n\n" + "─" * 40 + "\n\n".join(context_parts)

    return f"""你是一位专注于中国历史的学者，当前数据库覆盖唐、宋、元、明、五代十国。

请严格根据下方参考资料回答用户的问题：
- 只使用参考资料中的信息，不要凭空补充
- 如果资料中没有足够信息，请如实说明，并提示用户可以询问哪些相关内容
- 回答要清晰、有条理，适合历史入门者理解

参考资料：
{context}

用户问题：{question}"""


def ask(collection, question: str):
    """完整 RAG 问答：混合检索 + 相关性过滤 + LLM 生成"""
    retrieved = retrieve(collection, question)

    if not retrieved:
        return {
            "answer": "抱歉，没有找到相关的历史资料。",
            "sources": [],
            "retrieved": []
        }

    # 相关性阈值过滤：最相关 chunk 的 cosine distance > 阈值 → 无结果
    min_distance = min(
        r.get("distance", 1.0) for r in retrieved if "distance" in r
    )
    if min_distance > RELEVANCE_THRESHOLD:
        return {
            "answer": "知识库中暂无相关史料，建议换个问法。",
            "sources": [],
            "retrieved": retrieved
        }

    if not DEEPSEEK_API_KEY:
        return {
            "answer": "未配置 DEEPSEEK_API_KEY 环境变量，请设置后再试。",
            "sources": _dedup_sources(retrieved),
            "retrieved": retrieved
        }

    client = OpenAI(
        api_key=DEEPSEEK_API_KEY,
        base_url=DEEPSEEK_BASE_URL
    )

    prompt = build_prompt(question, retrieved)

    try:
        response = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}]
        )
        answer = response.choices[0].message.content
    except Exception as e:
        answer = f"API 调用失败：{e}"

    return {
        "answer": answer,
        "sources": _dedup_sources(retrieved),
        "retrieved": retrieved
    }


def _dedup_sources(retrieved):
    """去重来源列表"""
    seen = set()
    sources = []
    for chunk in retrieved:
        key = f"{chunk['era']}-{chunk['title']}"
        if key not in seen:
            seen.add(key)
            sources.append({
                "era": chunk["era"],
                "title": chunk["title"] or chunk["module"],
                "relevance": chunk.get("relevance", 0)
            })
    return sources
