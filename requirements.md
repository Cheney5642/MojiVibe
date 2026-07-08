产品需求文档 (PRD)：MojiVibe - AI 驱动的日语学习助手
1. 产品愿景
通过 AI 生成的趣味联想（Mnemonics）和自适应复习算法，帮助零基础用户在 7 天内掌握五十音图，并平滑过渡到核心单词记忆。

2. 核心功能模块 (MVP 阶段)
2.1 五十音图互动板 (The Kana Matrix)
展示：平假名/片假名对照表。

AI 助记：点击任何假名，AI 自动生成一条“谐音+图像联想”的助记词（例如：あ -> "Ah! A person is surprised"）。

发音：集成系统 TTS（文字转语音）播放标准读音。

2.2 AI 智能测验 (Smart Quiz)
模式：看假名选读音、看读音识假名、听音识字。

算法：简单的启发式算法（错误率高的题目出现频率增加）。

2.3 单词卡片库 (Vibe Vocab)
内容：内置 N5 核心单词。

动态扩展：用户输入一个中文词，AI 自动返回对应的日语、罗马音、假名及例句。

3. 技术栈 (针对 Vibe Coding 优化)
Frontend: Next.js + Tailwind CSS (易于通过自然语言描述样式)。

AI Engine: OpenAI GPT-4o API (负责生成助记词和单词解析)。

Storage: 浏览器 LocalStorage (MVP 阶段无需后端数据库)。

第二阶段：开发计划 (The Execution Roadmap)
作为你的 AI PM，我建议我们分三个“Sprint（冲刺）”来走：

Sprint 1: 核心骨架构建 (今天我们要做的)
任务：利用 Cursor 生成五十音图的基础展示网格，实现点击发音。

你的动作：在对话框输入我为你准备的“启动 Prompt”。

Sprint 2: AI 注入 (逻辑开发)
任务：接入 API，实现“AI 助记词”生成功能。

任务：开发测验逻辑。

Sprint 3: 体验优化与抛光 (Vibe Polishing)
任务：让 UI 变得极其漂亮（Cyberpunk 风格或日系极简风）。

任务：修复 Bad Cases。

第三阶段：开始行动 (Sprint 1 Start)
现在，请打开你的 Cursor 或 Windsurf，新建一个项目文件夹，然后在 Composer (Ctrl+I) 中输入以下 “AI PM 第一号指令”：

Prompt:
"你好 AI。我们要开发一款名为 'MojiVibe' 的日语学习 App。
第一步：请使用 Next.js 和 Tailwind CSS 创建一个简洁、美观的五十音图（平假名）网格界面。
要求：

每个假名都是一个卡片，包含假名本身、罗马音。

点击卡片时，使用浏览器标准的 Speech Synthesis API 播放该假名的日语发音。

页面顶部有一个切换按钮，可以在‘平假名’和‘片假名’之间切换。

设计风格要像 Web3 应用一样清新，有呼吸感。"