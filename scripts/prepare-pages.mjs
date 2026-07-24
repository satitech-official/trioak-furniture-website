import { cp, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");
const basePath = "/trioak-furniture-website";
const assetExtensions = new Set([".avif", ".gif", ".ico", ".jpeg", ".jpg", ".json", ".mp4", ".pdf", ".png", ".svg", ".webm", ".webmanifest", ".webp", ".woff", ".woff2"]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".webmanifest", ".xml"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }))).flat();
}

const files = await walk(outDir);
const assetPaths = files
  .map((file) => path.relative(outDir, file).split(path.sep).join("/"))
  .filter((relativePath) => !relativePath.startsWith("_next/") && assetExtensions.has(path.extname(relativePath).toLowerCase()))
  .map((relativePath) => `/${relativePath}`)
  .sort((a, b) => b.length - a.length);

for (const file of files) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
  let content = await readFile(file, "utf8");
  for (const assetPath of assetPaths) {
    content = content.split(assetPath).join(`${basePath}${assetPath}`);
  }
  while (content.includes(`${basePath}${basePath}`)) {
    content = content.split(`${basePath}${basePath}`).join(basePath);
  }
  await writeFile(file, content);
}

await writeFile(path.join(outDir, ".nojekyll"), "");
await cp(path.join(outDir, "index.html"), path.join(outDir, "404.html"));
