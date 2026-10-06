# 运行、费用与恢复手册

## 服务与费用

首版只需要两个外部资源：Git 托管和静态网站托管。二者均可使用免费档。

| 资源 | 推荐 | 固定费用 | 是否可替换 |
| --- | --- | ---: | --- |
| 源码与内容仓库 | GitHub 私有仓库 | 0 元 | 可迁移到任意 Git 服务 |
| 静态托管 | Cloudflare Pages | 0 元 | 可迁移到 Netlify、Vercel、GitHub Pages 或对象存储 |
| 域名 | 确定站点后购买 | 按年支付 | 可更换，不影响文章源文件 |
| 数据库 / CMS / 分析 | 首版不使用 | 0 元 | 有明确需求后再评估 |

站点访问时不调用第三方 API，没有常驻进程，也不依赖现有 VPS。托管平台失效时，`dist/` 可以直接放到任何静态文件服务器。

## 配置与密钥

当前没有应用密钥。

- 本地环境模板：`.env.example`
- 正式部署唯一必需变量：`SITE_URL`
- 域名 DNS、GitHub 与 Cloudflare 登录凭据只保存在各自账号和密码管理器中，不写入仓库
- 以后若增加服务，为每项服务在本节登记用途、负责人、续费日、恢复方式和密钥位置

## Cloudflare Pages 部署

1. 将项目推送到私有 GitHub 仓库。
2. 在 Cloudflare Pages 中连接该仓库。
3. 构建命令设置为 `npm run build`，输出目录设置为 `dist`。
4. 添加 `SITE_URL=https://最终域名`。
5. 首次部署后检查 `/rss.xml`、`/sitemap-index.xml` 和 `/search/`。
6. 再绑定自定义域名；确认无误后才分享正式地址。

Cloudflare Pages 默认会在每次推送后重新构建。无需 GitHub Actions；少一层配置意味着更少的维护面。如果将来迁移平台，再按目标平台补 CI。

## 日常维护

内容更新不需要维护应用。每两到三个月，或准备发布重要内容前，执行：

```bash
npm outdated
npm audit
npm run check
npm run build
```

依赖升级使用独立提交。升级 Astro 主版本前阅读迁移说明，构建与页面检查全部通过后再合并。不要为了“保持最新”自动合并无法解释的主版本更新。

## 备份

目标状态是 Git 历史加本机副本：

1. 私有远程仓库保存完整提交历史。
2. 本机保留正常工作副本。
3. 每季度把仓库镜像或压缩包备份到另一块磁盘或可信云盘。
4. 域名、DNS 和托管配置截图或导出后与账号恢复码一并保存。

不必备份 `node_modules/`、`.astro/`、`.generated/`、`public/content-media/` 或 `dist/`，它们都能从源码重新生成。

## 从空电脑恢复

```bash
git clone <private-repository-url>
cd hhhblog
npm ci
npm run check
npm run build
```

如果远程托管不可用，将 `dist/` 上传到任意静态主机即可临时恢复。若只有内容备份，先恢复 `content/`，再从仓库的稳定版本恢复程序文件并构建。

## 常见故障

### 新文章没有出现

- 确认文件在四个支持的栏目目录中，并以 `.md` 或 `.mdx` 结尾。
- 检查 YAML 是否用两个独立的 `---` 包围。
- 运行 `npm run content:prepare`，查看是否统计到新内容。
- 若 `status: archived`，固定网址仍生成，但列表不会显示。

### 图片不显示

- 使用相对文章文件的标准 Markdown 路径。
- 检查大小写；Linux 托管区分 `Photo.webp` 与 `photo.webp`。
- 不要手工编辑 `public/content-media/`，它会在每次构建时重建。

### 搜索页在开发模式没有索引

Pagefind 在生产构建后生成。运行 `npm run build` 再运行 `npm run preview`。

### canonical 或 RSS 指向占位域名

在托管平台设置正确的 `SITE_URL`，然后重新部署。

### 构建失败

先运行 `npm ci` 和 `npm run check`。若刚升级依赖，回看最近的依赖提交；正文文件始终保留在 `content/`，可以独立恢复。
