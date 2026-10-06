# 运行、费用与恢复手册

## 服务与费用

首版只需要两个外部资源：Git 托管和静态网站托管。二者均可使用免费档。

| 资源 | 推荐 | 固定费用 | 是否可替换 |
| --- | --- | ---: | --- |
| 源码与内容仓库 | GitHub 公开仓库 | 0 元 | 可迁移到任意 Git 服务 |
| 静态托管 | GitHub Pages | 0 元 | 可迁移到 Vercel、Cloudflare Pages、Netlify 或对象存储 |
| 域名 | 确定站点后购买 | 按年支付 | 可更换，不影响文章源文件 |
| 数据库 / CMS / 分析 | 首版不使用 | 0 元 | 有明确需求后再评估 |

站点访问时不调用第三方 API，没有常驻进程，也不依赖现有 VPS。托管平台失效时，`dist/` 可以直接放到任何静态文件服务器。

## 配置与密钥

当前没有应用密钥。

- 本地环境模板：`.env.example`
- 正式部署唯一必需变量：`SITE_URL`
- 域名 DNS、GitHub、GitHub Pages 与其他托管平台的登录凭据只保存在各自账号和密码管理器中，不写入仓库
- 以后若增加服务，为每项服务在本节登记用途、负责人、续费日、恢复方式和密钥位置

## GitHub Pages 部署

1. 保持仓库公开，或使用 GitHub Pro、Team 或 Enterprise 以支持私有仓库 Pages。
2. 在仓库 **Settings → Pages** 中将 **Source** 设为 **GitHub Actions**。
3. `.github/workflows/deploy-pages.yml` 会安装 Node 22，运行 `npm run build`，并发布 `dist`。
4. 当前项目使用 `SITE_URL=https://hojicha333.github.io` 与 `BASE_PATH=/hhhblog`，因此站点地址为 `https://hojicha333.github.io/hhhblog/`。
5. 首次部署后检查首页、`/rss.xml`、`/sitemap-index.xml` 和 `/search/`。
6. 若以后绑定自定义域名，将 `SITE_URL` 改为新域名，并把 `BASE_PATH` 改为 `/`。

GitHub Pages 只提供静态文件托管。数据库、登录、评论、后台管理、文件上传、服务器端接口和实时状态等需求需要额外服务。当前站点只使用静态页面、构建时搜索和 RSS，因此不受此限制。

如果以后需要保持仓库私有或增加运行时功能，可以把同一仓库接到 Vercel 或 Cloudflare Pages。两者都支持免费静态部署，不需要改变内容真源。

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

1. 远程 GitHub 仓库保存完整提交历史。
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
