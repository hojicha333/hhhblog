import fs from "node:fs/promises";

await Promise.all([
  fs.rm("dist", { recursive: true, force: true }),
  fs.rm(".astro", { recursive: true, force: true }),
  fs.rm(".generated", { recursive: true, force: true }),
  fs.rm("public/content-media", { recursive: true, force: true })
]);

console.log("Removed generated build files.");
