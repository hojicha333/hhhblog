import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const workspace = fileURLToPath(new URL("../", import.meta.url));
const submissionsDir = join(root, "submissions");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function chinaTimestamp() {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
}

function markdownValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.map((item, index) => `${index + 1}. ${item}`).join("\n") : "（未作答）";
  }
  if (value && typeof value === "object") {
    const rows = Object.entries(value);
    return rows.length ? rows.map(([key, item]) => `- ${key}：${item}`).join("\n") : "（未作答）";
  }
  if (value === null || value === undefined || value === "") return "（未作答）";
  return String(value);
}

function toMarkdown(payload, submittedAt) {
  const lines = [
    "# 个人网站方向问卷回答",
    "",
    `- 提交时间：${submittedAt}（Asia/Shanghai）`,
    `- 问卷版本：${payload.version || "未知"}`,
    `- 作答深度：${payload.depthLabel || payload.depth || "未知"}`,
    `- 已答题数：${payload.stats?.answered ?? "未知"} / ${payload.stats?.visible ?? "未知"}`,
    "",
  ];

  for (const section of payload.sections || []) {
    lines.push(`## ${section.index}. ${section.title}`, "");
    for (const answer of section.answers || []) {
      lines.push(`### ${answer.number}. ${answer.question}`, "", markdownValue(answer.value), "");
    }
  }

  return `${lines.join("\n").trim()}\n`;
}

async function readBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 2_000_000) throw new Error("提交内容过大");
  }
  return body;
}

function send(response, status, body, type = "application/json; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      send(response, 200, JSON.stringify({ ok: true }));
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/submit") {
      const payload = JSON.parse(await readBody(request));
      const submittedAt = chinaTimestamp();
      const fileStamp = submittedAt.replaceAll(":", "-").replace(" ", "_");
      const completePayload = { ...payload, submittedAt, timezone: "Asia/Shanghai" };
      const json = `${JSON.stringify(completePayload, null, 2)}\n`;
      const markdown = toMarkdown(completePayload, submittedAt);

      await mkdir(submissionsDir, { recursive: true });
      await Promise.all([
        writeFile(join(submissionsDir, `${fileStamp}.json`), json, "utf8"),
        writeFile(join(submissionsDir, `${fileStamp}.md`), markdown, "utf8"),
        writeFile(join(workspace, "问卷回答.json"), json, "utf8"),
        writeFile(join(workspace, "问卷回答.md"), markdown, "utf8"),
      ]);

      send(
        response,
        200,
        JSON.stringify({
          ok: true,
          submittedAt,
          files: ["问卷回答.md", "问卷回答.json"],
        }),
      );
      return;
    }

    if (request.method !== "GET") {
      send(response, 405, JSON.stringify({ ok: false, error: "Method not allowed" }));
      return;
    }

    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
    const filePath = join(root, safePath);
    if (!filePath.startsWith(root)) {
      send(response, 403, "Forbidden", "text/plain; charset=utf-8");
      return;
    }

    const file = await readFile(filePath);
    send(response, 200, file, mimeTypes[extname(filePath)] || "application/octet-stream");
  } catch (error) {
    const status = error?.code === "ENOENT" ? 404 : 500;
    send(response, status, JSON.stringify({ ok: false, error: status === 404 ? "Not found" : error.message }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Blog questionnaire running at http://127.0.0.1:${port}`);
});
