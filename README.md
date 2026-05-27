# 老梁（梁宏达）技能体系

> 老梁，本名梁宏达，著名电视评论人、脱口秀主持人，以其独特的语言风格、深厚的历史积累和犀利的社会洞察力享誉中国媒体界。

---

## 安装

### 方式一：GitHub 直接安装（推荐，无需认证）

```bash
npm install -g github:0x01111/LaoLiangSkills
```

### 方式二：GitHub Packages 安装

先配置 `.npmrc`（项目根目录或 `~/.npmrc`）：

```ini
@0x01111:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=你的GitHub_Token
```

然后安装：

```bash
npm install -g @0x01111/laoliang-skills
```

> GitHub Token 创建：GitHub Settings → Developer settings → Personal access tokens → 勾选 `read:packages`

### 方式三：本地开发

```bash
git clone https://github.com/0x01111/LaoLiangSkills.git
cd LaoLiangSkills
npm link
laoliang-skills install
```

---

安装后需执行一次注册：

```bash
laoliang-skills install     # 注册技能到 ~/.claude/skills/laoliang/
```

其他管理命令：

```bash
laoliang-skills uninstall   # 从 Claude Code 移除
laoliang-skills list        # 查看所有技能模块
laoliang-skills path        # 查看技能包路径
```

---

## 发布（维护者）

```bash
# 1. 设置 GitHub Token（需要有 write:packages 权限）
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# 2. 登录 GitHub Packages
npm login --registry=https://npm.pkg.github.com
# Username: 你的 GitHub 用户名
# Password: 你的 GITHUB_TOKEN
# Email: 你的邮箱

# 3. 发布
npm publish
```

---

## 技能模块

| 编号 | 技能模块 | 核心能力 | 熟练度 |
|------|----------|----------|--------|
| 01 | 语言表达 | 口才、幽默、金句输出 | ⭐⭐⭐⭐⭐ |
| 02 | 历史解读 | 史料运用、古今对比、历史逻辑 | ⭐⭐⭐⭐⭐ |
| 03 | 社会评论 | 时事分析、现象解读、民生洞察 | ⭐⭐⭐⭐⭐ |
| 04 | 体育评论 | 赛事解说、运动员分析、战术点评 | ⭐⭐⭐⭐⭐ |
| 05 | 故事叙述 | 起承转合、情节把控、代入感营造 | ⭐⭐⭐⭐⭐ |
| 06 | 逻辑思维 | 辩证分析、因果推导、反驳技巧 | ⭐⭐⭐⭐⭐ |
| 07 | 娱乐评论 | 影视点评、明星解读、流行文化 | ⭐⭐⭐⭐ |

---

## 老梁标志性风格

- **"话说……"** ：开场白，引入话题的经典句式
- **古今贯通**：用历史典故映照现实问题
- **接地气**：语言通俗易懂，市井与学识兼备
- **反常识**：善于挑战大众固有认知，提供新视角
- **数据驱动**：论证时常引用具体数字和案例

---

## 目录结构

```
laoliang-skills/
├── package.json
├── README.md
├── postinstall.js              # 自动注册到 Claude Code
├── bin/
│   └── cli.js                  # CLI 管理工具
├── skills/
│   ├── 01_语言表达/
│   │   ├── 口才技巧.md
│   │   ├── 幽默风格.md
│   │   └── 金句模板.md
│   ├── 02_历史解读/
│   │   ├── 历史分析框架.md
│   │   ├── 朝代知识库.md
│   │   └── 历史人物解读.md
│   ├── 03_社会评论/
│   │   ├── 时事分析方法.md
│   │   ├── 社会现象解读.md
│   │   └── 民生话题切入.md
│   ├── 04_体育评论/
│   │   ├── 赛事解说技巧.md
│   │   ├── 运动员分析.md
│   │   └── 体育精神解读.md
│   ├── 05_故事叙述/
│   │   ├── 叙事结构.md
│   │   ├── 情节设计.md
│   │   └── 代入感技巧.md
│   ├── 06_逻辑思维/
│   │   ├── 辩证分析法.md
│   │   ├── 反驳技巧.md
│   │   └── 论证结构.md
│   └── 07_娱乐评论/
│       ├── 影视点评方法.md
│       ├── 明星解读角度.md
│       └── 流行文化分析.md
└── examples/                   # 示例文章
    ├── AI编程时代来了.md
    ├── DeepSeek与梁文峰.md
    ├── 存储价格暴涨.md
    ├── 结婚率为什么越来越低.md
    └── 韩国股市飙升.md
```

---

## 在 Claude Code 中使用

安装后,在 Claude Code 中引用对应技能文件即可获得老梁风格的写作指导:

```
/lm l 你是一位资深评论人，请参考 ~/.claude/skills/laoliang/03_社会评论/时事分析方法.md
中的框架，分析当前的[话题]，用老梁的风格写一篇评论
```

也可以直接让 Claude Code 加载技能目录作为上下文，随时调用对应模块的技巧模板。
