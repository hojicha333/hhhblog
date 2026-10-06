import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import YAML from "yaml";

const execFileAsync = promisify(execFile);
const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "content");
const generatedRoot = path.join(projectRoot, ".generated", "content");
const mediaRoot = path.join(projectRoot, "public", "content-media");
const collections = ["essays", "projects", "research", "signals"];

const posix = (value) => value.split(path.sep).join("/");

function parseMarkdown(raw) {
  if (!raw.startsWith("---")) return { data: {}, content: raw };
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return { data: YAML.parse(match[1]) || {}, content: match[2] };
}

function stringifyMarkdown(content, data) {
  return `---\n${YAML.stringify(data, { lineWidth: 0 })}---\n\n${content}`;
}

async function walk(directory) {
  const output = [];
  let entries = [];
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return output;
    throw error;
  }

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walk(fullPath)));
    else output.push(fullPath);
  }
  return output;
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDescription(body) {
  const paragraphs = body.split(/\r?\n\s*\r?\n/);
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed || /^(#{1,6}|[-*+] |\d+\. |>|```|:::)/.test(trimmed)) continue;
    const candidate = plainText(trimmed);
    if (candidate.length >= 20) {
      return candidate.length > 150 ? `${candidate.slice(0, 147)}...` : candidate;
    }
  }
  return "一则收录于 hhh电台 的内容。";
}

function inferLanguage(body) {
  const text = plainText(body);
  const han = (text.match(/[\u3400-\u9fff]/g) || []).length;
  return han > Math.max(8, text.length * 0.08) ? "zh-CN" : "en";
}

function inferReadingMinutes(body) {
  const text = plainText(body);
  const han = (text.match(/[\u3400-\u9fff]/g) || []).length;
  const latinWords = (text.replace(/[\u3400-\u9fff]/g, " ").match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.ceil(han / 350 + latinWords / 200));
}

async function inferDate(filePath, filename) {
  const filenameMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (filenameMatch) return `${filenameMatch[1]}T00:00:00.000Z`;

  try {
    const { stdout } = await execFileAsync(
      "git",
      ["log", "--follow", "--format=%aI", "--", filePath],
      { cwd: projectRoot }
    );
    const dates = stdout.trim().split(/\r?\n/).filter(Boolean);
    if (dates.length) return new Date(dates.at(-1)).toISOString();
  } catch {
    // A new local site may not have Git history yet.
  }

  const stats = await fs.stat(filePath);
  return stats.birthtime.toISOString();
}

function inferSlug(filename) {
  return filename
    .replace(/\.(md|mdx)$/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}[-_]?/, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function rewriteAssetLinks(body, collection, relativeFile) {
  const sourceDirectory = posix(path.dirname(relativeFile));
  const rewrite = (rawUrl) => {
    const clean = rawUrl.trim();
    if (
      !clean ||
      /^(?:[a-z]+:|\/|#|data:)/i.test(clean) ||
      clean.endsWith(".md") ||
      clean.endsWith(".mdx")
    ) {
      return rawUrl;
    }

    const match = clean.match(/^([^?#]+)([?#].*)?$/);
    if (!match) return rawUrl;
    const resolved = path.posix.normalize(path.posix.join(sourceDirectory, match[1]));
    return `/content-media/${collection}/${resolved}${match[2] || ""}`;
  };

  return body
    .replace(/(!?\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (_, before, url, after) => {
      return `${before}${rewrite(url)}${after}`;
    })
    .replace(/((?:src|href)=["'])([^"']+)(["'])/g, (_, before, url, after) => {
      return `${before}${rewrite(url)}${after}`;
    });
}

async function prepareCollection(collection) {
  const sourceDirectory = path.join(sourceRoot, collection);
  const outputDirectory = path.join(generatedRoot, collection);
  const collectionMediaRoot = path.join(mediaRoot, collection);
  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.mkdir(collectionMediaRoot, { recursive: true });

  const files = await walk(sourceDirectory);
  const sourceDocuments = files.filter((file) => /\.(md|mdx)$/i.test(file));
  const assets = files.filter((file) => !/\.(md|mdx)$/i.test(file));

  for (const assetPath of assets) {
    const relative = path.relative(sourceDirectory, assetPath);
    const target = path.join(collectionMediaRoot, relative);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(assetPath, target);
  }

  for (const filePath of sourceDocuments) {
    const relative = path.relative(sourceDirectory, filePath);
    const filename = path.basename(filePath);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = parseMarkdown(raw);
    const h1Match = parsed.content.match(/^\s*#\s+(.+?)\s*$/m);
    const title = String(parsed.data.title || h1Match?.[1] || inferSlug(filename));
    const body = h1Match
      ? parsed.content.replace(h1Match[0], "").replace(/^\s+/, "")
      : parsed.content;
    const date = parsed.data.date
      ? new Date(parsed.data.date).toISOString()
      : await inferDate(filePath, filename);
    const slug = String(parsed.data.slug || inferSlug(filename));
    const normalized = {
      ...parsed.data,
      title,
      description: String(parsed.data.description || inferDescription(body)),
      date,
      updated: parsed.data.updated ? new Date(parsed.data.updated).toISOString() : undefined,
      slug,
      kind: collection,
      lang: String(parsed.data.lang || inferLanguage(body)),
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
      featured: Boolean(parsed.data.featured),
      status: String(parsed.data.status || "published"),
      readingMinutes: inferReadingMinutes(body),
      sourcePath: posix(path.join("content", collection, relative))
    };

    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === undefined) delete normalized[key];
    });

    const rewrittenBody = rewriteAssetLinks(body, collection, posix(relative));
    const output = stringifyMarkdown(rewrittenBody, normalized);
    const targetPath = path.join(outputDirectory, relative);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, output, "utf8");
  }

  return { collection, documents: sourceDocuments.length, assets: assets.length };
}

await fs.rm(generatedRoot, { recursive: true, force: true });
await fs.rm(mediaRoot, { recursive: true, force: true });
await fs.mkdir(generatedRoot, { recursive: true });
await fs.mkdir(mediaRoot, { recursive: true });

const summary = [];
for (const collection of collections) {
  summary.push(await prepareCollection(collection));
}

const count = summary.reduce((total, item) => total + item.documents, 0);
console.log(`Prepared ${count} content entries from content/.`);
