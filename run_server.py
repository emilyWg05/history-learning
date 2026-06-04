"""启动 RAG 后端服务"""

import sys
import asyncio

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import os

os.environ.setdefault("SILICONFLOW_API_KEY", os.environ.get("SILICONFLOW_API_KEY", ""))
os.environ.setdefault("DEEPSEEK_API_KEY", os.environ.get("DEEPSEEK_API_KEY", ""))

if __name__ == "__main__":
    print("[run] 导入模块...", flush=True)
    from rag import init_collection, build_index

    print("[run] 初始化向量数据库...", flush=True)
    collection = init_collection()
    build_index(collection)
    print("[run] 初始化完成", flush=True)

    import server
    server.collection = collection

    import uvicorn
    print("[run] uvicorn 启动中...", flush=True)
    uvicorn.run(server.app, host="127.0.0.1", port=8000)
