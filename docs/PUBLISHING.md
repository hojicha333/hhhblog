# 发布工作流

## 最轻的方式

1. 在 `content/` 的对应栏目中新建 `.md` 文件。
2. 写一个一级标题和正文。
3. 运行 `npm run dev` 预览。
4. 确认后提交 Git；连接托管平台后，推送会自动触发构建。

四个栏目与文件夹一一对应：

| 文件夹 | 页面名称 | 适合内容 |
| --- | --- | --- |
| `content/essays/` | 放映室 / Essays | 长文、随笔、阶段判断、生活实验 |
| `content/projects/` | 工坊 / Projects | 项目复盘、工具、制作日志、教程 |
| `content/research/` | 读片室 / Research | 研究方法、影像与数据、论文阅读 |
| `content/signals/` | 天线间 / Signals | 音乐、语言、无线电、解谜、图寻与新兴趣 |

## 最小文章

```markdown
# 标题

这一段写摘要所需的完整上下文，建议至少二十个字。

## 第一个小节

正文从这里继续。
```

构建会自动推断：

- 标题：第一个一级标题
- 摘要：第一个足够长的正文段落
- 栏目：所在文件夹
- 日期：文件名前缀，其次 Git 首次提交时间，最后文件创建时间
- slug：去除日期后的文件名
- 语言：根据正文字符推断
- 阅读时间：中文字符和英文单词估算

推荐文件名 `2026-10-06-my-post.md`。日期前缀能让跨设备与托管平台上的结果最稳定。

## 可选元数据

需要更精确控制时，在文件顶部加入 YAML：

```yaml
---
description: 一句人工撰写的摘要
tags:
  - 医学影像
  - 可复现性
featured: true
cover: console
coverAlt: 对图片内容的准确描述
status: published
stage: 已完成
role: 设计 / 开发 / 写作
outputs:
  - 项目报告
  - 可运行工具
---
```

常用字段：

| 字段 | 可选值或用途 |
| --- | --- |
| `featured` | 首页或栏目页代表内容，`true` / `false` |
| `cover` | 当前内置 `editorial`、`console`、`rooms` |
| `status` | `published`、`sample`、`archived` |
| `tags` | 字符串列表，可完全省略 |
| `stage` / `role` / `outputs` | 项目与研究页的工作台摘要 |
| `lang` | 需要覆盖自动判断时使用，如 `en` |
| `slug` | 需要固定不同于文件名的网址时使用 |

`archived` 内容仍可生成固定网址，但不会出现在首页、栏目、搜索和归档列表中。

## 图片与附件

把图片放在文章附近，并使用普通 Markdown 路径：

```text
content/projects/2026-10-06-demo.md
content/projects/demo/process.webp
```

```markdown
![流程中的质控界面](./demo/process.webp)
```

构建时附件会复制到 `public/content-media/`，正文链接自动改写。推荐：

- 照片和截图使用 WebP 或 AVIF；确需透明时使用 PNG。
- 每张公开图片都写准确的替代文字。
- 不上传原始医学数据、未脱敏界面、实时位置和含他人隐私的素材。
- 单张图片尽量控制在 1 MB 内；大量科研图像先选取真正支持叙述的部分。

## 从 Obsidian 写作

可以把项目根目录或 `content/` 作为 Obsidian vault 的一部分。发布内容请使用标准 Markdown 图片语法；当前构建不依赖 Obsidian 专有的双链或嵌入语法，因此文件离开 Obsidian 后仍可阅读。

推荐工作习惯：私人笔记继续在原 vault 中自由生长，准备公开时把整理后的成稿移入本项目对应目录。这样发布目录始终只包含愿意长期公开的版本。

## 发布前检查

```bash
npm run check
npm run build
npm run preview
```

浏览文章正文、移动端长标题、图片替代文字和外链，再提交：

```bash
git add content/
git commit -m "content: add article title"
git push
```
