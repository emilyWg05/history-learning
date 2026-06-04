"""
史鉴数据提取脚本
把 TypeScript 数据文件转换成 Python 可以读取的 JSON 格式
运行前先安装依赖：pip install json5
"""

import re
import json
import json5  # 处理单引号和尾随逗号
import os
from pathlib import Path


def extract_array_from_ts(file_path: Path) -> list:
    """
    从 TypeScript 文件中提取数据数组
    处理这种格式：
        export const mingCulture: Article[] = [ ... ]
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 第一步：删除 import 语句
    content = re.sub(r'^import[^\n]*\n', '', content, flags=re.MULTILINE)

    # 第二步：删除 TypeScript 类型声明
    # 匹配 "export const varName: SomeType[] = " 这种模式
    content = re.sub(r'export const \w+\s*:[^=]+=\s*', '', content)

    # 第三步：清理首尾空白和末尾分号
    content = content.strip().rstrip(';').strip()

    # 第四步：如果文件内容是空的或者只有注释，跳过
    if not content or content.startswith('//'):
        return []

    # 第五步：用 json5 解析（支持单引号和尾随逗号）
    try:
        data = json5.loads(content)
        return data if isinstance(data, list) else []
    except Exception as e:
        print(f"  ⚠️  解析失败 {file_path.name}: {e}")
        return []


def extract_all_data(src_data_path: str) -> dict:
    """
    遍历所有朝代文件夹，提取全部数据
    
    参数:
        src_data_path: 你的 src/data 目录路径
    
    返回:
        按朝代和模块组织的字典
    """
    data_path = Path(src_data_path)
    all_data = {}

    # 需要跳过的文件（桶导出文件，没有实际数据）
    skip_files = {'index.ts'}

    # 朝代目录列表
    era_dirs = [d for d in data_path.iterdir() if d.is_dir()]

    print(f"找到 {len(era_dirs)} 个朝代目录：{[d.name for d in era_dirs]}\n")

    for era_dir in sorted(era_dirs):
        era_name = era_dir.name
        all_data[era_name] = {}

        print(f"📂 正在处理：{era_name}")

        ts_files = [f for f in era_dir.glob('*.ts') if f.name not in skip_files]

        for ts_file in sorted(ts_files):
            module_name = ts_file.stem  # 文件名去掉 .ts
            records = extract_array_from_ts(ts_file)

            if records:
                all_data[era_name][module_name] = records
                print(f"  ✅ {module_name}.ts → {len(records)} 条记录")
            else:
                print(f"  ⏭️  {module_name}.ts → 跳过（无数据）")

        print()

    return all_data


def flatten_for_rag(all_data: dict) -> list:
    """
    把嵌套的数据结构拍平，变成适合 RAG 检索的文本块列表
    
    每个文本块包含：
    - content: 实际文本内容
    - metadata: 朝代、模块、标题等信息
    """
    chunks = []

    for era_name, modules in all_data.items():
        for module_name, records in modules.items():
            for record in records:

                # ── 处理 Article 类型（有 sections 的文章）──
                if 'sections' in record:
                    # 用 summary 单独作为一个检索块
                    if record.get('summary'):
                        chunks.append({
                            'content': f"{record['title']}\n\n{record['summary']}",
                            'metadata': {
                                'era': era_name,
                                'module': module_name,
                                'type': 'summary',
                                'id': record.get('id', ''),
                                'title': record.get('title', ''),
                                'tags': record.get('tags', []),
                            }
                        })

                    # 每个 section 单独作为一个检索块
                    for section in record.get('sections', []):
                        section_text = section.get('heading', '') + '\n\n'
                        section_text += '\n\n'.join(section.get('paragraphs', []))

                        chunks.append({
                            'content': f"【{record['title']}】{section['heading']}\n\n{section_text}",
                            'metadata': {
                                'era': era_name,
                                'module': module_name,
                                'type': 'section',
                                'id': record.get('id', ''),
                                'title': record.get('title', ''),
                                'heading': section.get('heading', ''),
                                'tags': record.get('tags', []),
                            }
                        })

                # ── 处理其他类型（皇帝、人物、时间线等）──
                else:
                    # 把整个记录的文本字段拼接成一段
                    text_parts = []

                    # 常见的文本字段
                    for field in ['name', 'title', 'summary', 'biography',
                                  'description', 'content', 'achievement']:
                        value = record.get(field)
                        if value and isinstance(value, str):
                            text_parts.append(value)

                    if text_parts:
                        chunks.append({
                            'content': '\n\n'.join(text_parts),
                            'metadata': {
                                'era': era_name,
                                'module': module_name,
                                'type': module_name,
                                'id': record.get('id', ''),
                                'title': record.get('name') or record.get('title', ''),
                                'tags': record.get('tags', []),
                            }
                        })

    return chunks


def main():
    # ── 配置：把这里改成你的实际路径 ──
    # 示例：'/Users/yourname/projects/history-learning/src/data'
    SRC_DATA_PATH = './src/data'  # 在你的项目根目录运行时用这个

    print("=" * 50)
    print("史鉴数据提取工具")
    print("=" * 50 + "\n")

    # 检查路径是否存在
    if not Path(SRC_DATA_PATH).exists():
        print(f"❌ 找不到路径：{SRC_DATA_PATH}")
        print("请把 SRC_DATA_PATH 改成你项目里 src/data 的实际路径")
        return

    # 第一步：提取所有原始数据
    print("【第一步】提取 TypeScript 数据...\n")
    all_data = extract_all_data(SRC_DATA_PATH)

    # 统计
    total_records = sum(
        len(records)
        for modules in all_data.values()
        for records in modules.values()
    )
    print(f"提取完成，共 {total_records} 条原始记录\n")

    # 保存原始数据
    with open('history_raw.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    print("✅ 原始数据已保存到 history_raw.json\n")

    # 第二步：拍平为 RAG 文本块
    print("【第二步】生成 RAG 检索文本块...\n")
    chunks = flatten_for_rag(all_data)
    print(f"生成了 {len(chunks)} 个文本块\n")

    # 保存 RAG 数据
    with open('history_chunks.json', 'w', encoding='utf-8') as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
    print("✅ RAG 文本块已保存到 history_chunks.json\n")

    # 预览前3个文本块
    print("【预览】前 3 个文本块：\n")
    for i, chunk in enumerate(chunks[:3]):
        print(f"── 文本块 {i+1} ──")
        print(f"来源：{chunk['metadata']['era']} / {chunk['metadata']['module']}")
        print(f"内容：{chunk['content'][:100]}...")
        print()

    print("=" * 50)
    print("下一步：用这些文本块构建向量索引，开始做 RAG 问答")
    print("=" * 50)


if __name__ == '__main__':
    main()
