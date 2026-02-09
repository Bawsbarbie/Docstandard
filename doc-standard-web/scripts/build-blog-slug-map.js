#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const root = path.resolve(__dirname, "..");
  const blogDir = path.join(root, "content", "blog");
  const outDir = path.join(root, "generated");
  const outPath = path.join(outDir, "blog-slugs.ts");

  const slugs = fs.existsSync(blogDir)
    ? fs
        .readdirSync(blogDir)
        .filter((name) => name.endsWith(".md"))
        .map((name) => name.replace(/\.md$/, ""))
        .sort()
    : [];

  ensureDir(outDir);

  const lines = [];
  lines.push("export const blogSlugs = [");
  for (const slug of slugs) {
    lines.push(`  \"${slug}\",`);
  }
  lines.push("] as const;");
  lines.push("");
  lines.push("export const blogSlugSet = new Set(blogSlugs);");
  lines.push("");

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${slugs.length} blog slugs to ${outPath}`);
}

main();
