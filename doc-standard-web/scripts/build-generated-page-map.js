#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const BATCHES = ["batch2", "batch3", "batch4", "batch5"];

function listGeneratedSlugs(root) {
  const slugs = [];
  for (const batch of BATCHES) {
    const dir = path.join(root, "generated", batch);
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!/\.tsx?$/.test(entry.name)) continue;
      const slug = entry.name.replace(/\.(t|j)sx?$/, "");
      if (slug) slugs.push({ slug, batch });
    }
  }
  return slugs;
}

function buildMap(slugs) {
  const lines = [];
  lines.push("export const generatedPageImports = {");
  for (const { slug, batch } of slugs) {
    lines.push(`  "${slug}": () => import("./${batch}/${slug}"),`);
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export const generatedSlugs = Object.keys(generatedPageImports);");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const root = path.resolve(__dirname, "..");
  const slugs = listGeneratedSlugs(root).sort((a, b) => a.slug.localeCompare(b.slug));
  const outPath = path.join(root, "generated", "page-map.ts");
  fs.writeFileSync(outPath, buildMap(slugs), "utf8");
  console.log(`Wrote ${slugs.length} entries to ${outPath}`);
}

if (require.main === module) {
  main();
}
