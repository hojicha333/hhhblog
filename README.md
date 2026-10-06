# hhh电台

一份关于研究、制作与漫游的个人刊物。当前版本采用：

- “夜刊电台”的首页与视觉叙事
- “生长的房子”的内容结构
- “信号工作台”的项目与研究详情页

网站由 Astro 静态生成。正文保存在普通 Markdown 文件中，不需要数据库、CMS、账号系统或常驻服务器。

## 本地启动

环境要求：Node.js 22 或更新版本，npm 10 或更新版本。

```bash
npm install
npm run dev
```

终端会显示本地地址，默认通常是 `http://localhost:4321`。

生产检查：

```bash
npm run check
npm run build
npm run preview
```

`npm run build` 会依次完成内容归一化、Astro 静态构建和 Pagefind 全文索引，最终文件位于 `dist/`。

## 目录

```text
content/                 日常写作的唯一真源
  essays/                放映室 / 随笔与长文
  projects/              工坊 / 项目与工具
  research/              读片室 / 研究与方法
  signals/               天线间 / 兴趣与漫游
src/                     主题、组件和页面
scripts/prepare-content  元数据推断与素材复制
.generated/              构建时生成，禁止手工编辑
docs/                    发布、维护和路线说明
dist/                    生产构建结果
```

普通文章只需一个一级标题和正文：

```markdown
# 新文章标题

第一段会被用作摘要。后面直接继续写正文。
```

文件名推荐使用 `YYYY-MM-DD-slug.md`。栏目由所在文件夹决定，其余元数据会在构建时推断。完整规则见 [发布工作流](docs/PUBLISHING.md)。

## 当前页面

- 编辑型混合首页
- 放映室、工坊、读片室、天线间
- 普通长文详情和项目/研究工作台详情
- 时间归档、全文搜索、随机漫游、About、RSS、sitemap、404
- 深浅主题、响应式布局、键盘导航、减少动态偏好

当前 8 篇内容均为明确标注的示例稿，用于验证信息结构和排版，不代表真实经历或成果。

## 部署

首选 Cloudflare Pages：

| 设置 | 值 |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output | `dist` |
| Node version | `22` 或更新 |
| Environment variable | `SITE_URL=https://你的域名` |

在确定域名之前不必配置 `SITE_URL`；本地构建会使用占位地址。正式发布前必须设置它，以便 canonical、RSS 和 sitemap 指向正确域名。

维护、备份与迁移步骤见 [运行手册](docs/OPERATIONS.md)，后续功能取舍见 [路线图](docs/ROADMAP.md)。
