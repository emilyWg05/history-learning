"""
史鉴 RAG API 服务 — 为前端提供问答接口
启动: granian --interface asgi server:app --port 8000 --host 127.0.0.1 --workers 1
"""

import os

os.environ.setdefault("SILICONFLOW_API_KEY", os.environ.get("SILICONFLOW_API_KEY", ""))
os.environ.setdefault("DEEPSEEK_API_KEY", os.environ.get("DEEPSEEK_API_KEY", ""))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ── 延迟导入，防止 worker spawn 时重复初始化 ──────────
rag_instance = None


def _get_rag():
    global rag_instance
    if rag_instance is None:
        from rag import init_collection, build_index
        print("[server] 初始化向量数据库...", flush=True)
        rag_instance = init_collection()
        build_index(rag_instance)
        print("[server] 已就绪", flush=True)
    return rag_instance

ask = None
retrieve = None


# ── 数据模型 ────────────────────────────────────────
class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str
    sources: list[dict]


# ── 应用 ────────────────────────────────────────────
app = FastAPI(title="史鉴 RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    global ask, retrieve
    _get_rag()
    from rag import ask as _ask, retrieve as _retrieve
    ask = _ask
    retrieve = _retrieve
    print("[server] startup 完成", flush=True)


# ── API ────────────────────────────────────────────
@app.post("/api/ask", response_model=AskResponse)
def api_ask(req: AskRequest):
    result = ask(rag_instance, req.question)
    return AskResponse(
        answer=result['answer'],
        sources=result['sources']
    )


@app.post("/api/debug")
def api_debug(req: AskRequest):
    results = retrieve(rag_instance, req.question, top_k=10)
    return {
        "question": req.question,
        "retrieved": results
    }
