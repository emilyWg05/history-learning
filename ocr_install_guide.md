# 本地安装 Tesseract OCR 指南

## Windows 安装步骤

### 1. 下载 Tesseract
访问：https://github.com/UB-Mannheim/tesseract/wiki
下载最新版本的 Windows 安装包（64位）

### 2. 安装
- 运行安装程序
- 安装路径建议：`C:\Program Files\Tesseract-OCR`
- **重要：勾选 "Additional language data" → 选择 "Chinese Simplified (chi_sim)"**

### 3. 配置环境变量
添加到系统PATH：
```
C:\Program Files\Tesseract-OCR
```

### 4. 验证安装
打开 PowerShell 运行：
```bash
tesseract --version
```

### 5. 安装 Python 依赖
```bash
pip install pytesseract pillow
```

### 6. 测试OCR
```python
from PIL import Image
import pytesseract

# 设置 tesseract 路径（Windows需要）
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# 读取图片
img = Image.open('微信图片_20260504102531_19_6.jpg')
text = pytesseract.image_to_string(img, lang='chi_sim')
print(text)
```
