"""
史鉴 RAG 问答系统 — CLI 交互模式
运行: python history_rag.py [--rebuild] [--eval]
"""

import os
import sys
import argparse
from rag import init_collection, build_index, retrieve, build_prompt, ask

CHUNKS_FILE = "history_chunks.json"


def evaluate_retrieval(collection):
    """评估检索质量"""
    test_questions = [
        "苏轼是哪个朝代的人",
        "唐朝有哪些著名诗人",
        "明朝是怎么灭亡的",
        "宋朝的经济为什么发达",
        "王阳明的心学是什么",
    ]

    print("\n" + "=" * 50)
    print("检索质量评估报告")
    print("=" * 50)

    for question in test_questions:
        print(f"\n问题：{question}")
        results = retrieve(collection, question, top_k=3)
        print(f"  检索到 {len(results)} 个文本块：")
        for i, chunk in enumerate(results, 1):
            print(f"  {i}. [{chunk['relevance']:.3f}] "
                  f"{chunk['era']} - {chunk['title'] or chunk['module']}")
            preview = chunk['content'][:50].replace('\n', ' ')
            print(f'     "{preview}..."')

    print("\n" + "=" * 50)
    print("评估说明：")
    print("  相似度 > 0.7：高度相关")
    print("  相似度 0.5-0.7：中等相关，可以接受")
    print("  相似度 < 0.5：相关性弱")
    print("=" * 50 + "\n")


def interactive_mode(collection):
    """交互式命令行问答"""
    print("\n" + "=" * 50)
    print("史鉴 AI 问答系统")
    print("=" * 50)
    print("覆盖朝代：唐 · 宋 · 元 · 明 · 五代十国")
    print("输入 'quit' 退出，输入 'eval' 运行评估\n")

    while True:
        try:
            question = input("你想了解什么？> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n再见！")
            break

        if not question:
            continue
        if question.lower() in ('quit', 'exit', 'q'):
            print("再见！")
            break
        if question.lower() == 'eval':
            evaluate_retrieval(collection)
            continue

        print("\n检索中...", end=" ", flush=True)
        result = ask(collection, question)

        print("\n" + "─" * 40)
        print(result['answer'])
        print("\n参考来源：")
        for source in result['sources']:
            print(f"  - {source['era']} · {source['title']}  "
                  f"(相似度 {source['relevance']})")
        print("─" * 40 + "\n")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='史鉴 RAG 问答系统')
    parser.add_argument('--rebuild', action='store_true', help='强制重建索引')
    parser.add_argument('--eval', action='store_true', help='只运行评估')
    args = parser.parse_args()

    if not os.path.exists(CHUNKS_FILE):
        print(f"找不到 {CHUNKS_FILE}，请先运行 extract_history_data.py")
        sys.exit(1)

    collection = init_collection(force_rebuild=args.rebuild)
    build_index(collection, CHUNKS_FILE)

    if args.eval:
        evaluate_retrieval(collection)
    else:
        interactive_mode(collection)
