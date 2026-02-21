#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function listBatchDirs(root) {
  const generatedDir = path.join(root, "generated");
  if (!fs.existsSync(generatedDir)) return [];
  return fs
    .readdirSync(generatedDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^batch\d+$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => {
      const aNum = Number(a.replace(/^batch/i, ""));
      const bNum = Number(b.replace(/^batch/i, ""));
      return aNum - bNum;
    });
}

function listGeneratedSlugs(root) {
  const batches = listBatchDirs(root);
  const slugs = [];
  for (const batch of batches) {
    const dir = path.join(root, "generated", batch);
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
  const batchOrder = new Map();
  for (const { batch } of slugs) {
    if (!batchOrder.has(batch)) batchOrder.set(batch, batchOrder.size);
  }

  const sorted = [...slugs].sort((a, b) => {
    const bySlug = a.slug.localeCompare(b.slug);
    if (bySlug !== 0) return bySlug;
    return (batchOrder.get(a.batch) ?? 0) - (batchOrder.get(b.batch) ?? 0);
  });

  const importEntries = sorted.map(({ slug, batch }) => ({
    slug,
    batch,
    importKey: `${batch}:${slug}`,
  }));

  const routeToImportKey = new Map();
  for (const entry of importEntries) {
    if (!routeToImportKey.has(entry.slug)) {
      routeToImportKey.set(entry.slug, entry.importKey);
    }
  }

  const lines = [];
  lines.push("export const generatedPageImports = {");
  for (const { importKey, slug, batch } of importEntries) {
    lines.push(`  "${importKey}": () => import("./${batch}/${slug}"),`);
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export const generatedRouteImporters: Record<string, () => Promise<any>> = {");
  for (const [slug, importKey] of routeToImportKey.entries()) {
    lines.push(`  "${slug}": generatedPageImports["${importKey}"],`);
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export const generatedSlugs = Object.keys(generatedRouteImporters);");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const root = path.resolve(__dirname, "..");
  const slugs = listGeneratedSlugs(root);
  const outPath = path.join(root, "generated", "page-map.ts");
  fs.writeFileSync(outPath, buildMap(slugs), "utf8");
  const uniqueRoutes = new Set(slugs.map((entry) => entry.slug));
  console.log(`Wrote ${slugs.length} import entries and ${uniqueRoutes.size} route entries to ${outPath}`);
}

if (require.main === module) {
  main();
}
