# MojiVibe 🎌

> AI 驱动的日语学习助手 —— 从零开始，7 天掌握五十音图，轻松过渡到核心单词记忆。

MojiVibe 是一款面向零基础学习者的日语学习 Web 应用。它通过 **谐音 + 汉字演变** 的趣味联想助记、标准发音和智能测验，让五十音图不再枯燥。当前版本为 MVP，聚焦「五十音图互动学习 + AI 智能测验」的核心闭环。

## ✨ 功能特性

### 🎯 五十音图互动板（The Kana Matrix）
- 平假名 / 片假名对照展示，一键切换
- 点击任意假名即可播放标准日语发音
- 每个平假名内置一条 **谐音 + 图像联想** 助记词，点击卡片弹出抽屉查看详解

### 🔊 标准发音
- 内置 46 个假名的标准发音（由 Edge TTS 声优 `ja-JP-NanamiNeural` 生成）
- 答题正确 / 错误 / 完成均有音效反馈

### 📝 AI 智能测验（Smart Quiz）
- 支持「看平假名选片假名」与「听音选片假名」两种题型
- 可按「行」（あ行 / か行 / さ行 …）自由配置测验范围
- 实时计分、进度条、正确率统计
- 测验结束后自动生成 **错题回顾**，帮助巩固薄弱点

### 📈 学习进度
- 使用浏览器 LocalStorage 持久化「已学习假名」，无需后端
- 顶部进度条直观展示学习完成度

### 🖼️ 助记图（即将上线）
- 点击假名的抽屉预留了助记插画展示位，配合 `gen_prompts.py` 生成的绘图提示词，可批量产出日系矢量助记图

## 🛠️ 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端框架 | [Next.js 14](https://nextjs.org/)（App Router） |
| 语言 | TypeScript |
| 样式 | [Tailwind CSS 3](https://tailwindcss.com/) |
| 动效 | [Framer Motion](https://www.framer.com/motion/) |
| 发音 | Edge TTS（`edge-tts`）+ 浏览器 Audio API |
| 存储 | 浏览器 LocalStorage（MVP 无需后端） |

## 📁 项目结构

```
MojiVibe-App-main/
├── src/app/
│   ├── page.tsx          # 主页面：五十音图、助记词抽屉、智能测验
│   ├── layout.tsx        # 布局与页面元信息
│   ├── globals.css       # 全局样式（Tailwind + 自定义变量）
│   ├── mnemonics.json    # 五十音图助记词数据（结构化）
│   └── mnemonics.md      # 五十音图助记词文档
├── public/
│   ├── audio/            # 46 个假名标准发音 mp3
│   ├── sfx/              # 答题反馈音效
│   └── images/           # 助记图（预留，即将上线）
├── generate_all_audio.py # 批量生成假名发音（edge-tts）
├── fix_audio.py          # 修复 / 补全缺失音频
├── gen_prompts.py        # 生成助记图绘图提示词
├── refined_prompts.json  # 助记图绘图提示词输出
├── requirements.md       # 产品需求文档（PRD）
└── package.json
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.17
- npm / yarn / pnpm

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
# 打开 http://localhost:3000

# 3. 生产构建
npm run build
npm run start
```

## 🎨 助记词 & 资源生成脚本

项目内置了三个辅助脚本，用于批量生成音频与绘图提示词：

```bash
# 生成全部 46 个假名的发音音频（依赖 edge-tts）
pip install edge-tts
python generate_all_audio.py

# 修复缺失的音频文件
python fix_audio.py

# 根据 mnemonics.json 生成助记图绘图提示词
python gen_prompts.py
```

## 🗺️ 路线图（Roadmap）

基于 [requirements.md](./requirements.md) 的三阶段规划：

- **Sprint 1 · 核心骨架** ✅ 五十音图网格展示、点击发音、平 / 片假名切换
- **Sprint 2 · AI 注入** 🚧 智能测验逻辑、AI 助记词生成（OpenAI GPT-4o）、单词卡片库（N5 核心词）
- **Sprint 3 · 体验优化** ⏳ UI 打磨、助记插画上线、Bad Cases 修复

## 📄 相关文档

- [requirements.md](./requirements.md) —— 产品需求文档（PRD）

## 🙌 致谢

- 助记词内容参考五十音图联想记忆法
- 发音由微软 Edge TTS 声优 `ja-JP-NanamiNeural` 生成
