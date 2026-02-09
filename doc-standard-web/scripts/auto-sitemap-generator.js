#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const MAX_URLS_PER_BATCH = 2000;

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [k, v] = arg.slice(2).split("=");
    out[k] = v === undefined ? true : v;
  }
  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function mirrorToStandalone(root, sitemapsDir, indexPath) {
  const standalonePublic = path.join(root, ".next", "standalone", "public");
  if (!fs.existsSync(standalonePublic)) return;

  const standaloneSitemaps = path.join(standalonePublic, "sitemaps");
  ensureDir(standaloneSitemaps);

  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(standalonePublic, "sitemap-index.xml"));
  }

  const files = fs.existsSync(sitemapsDir)
    ? fs.readdirSync(sitemapsDir).filter((name) => name.startsWith("sitemap-batch-"))
    : [];
  for (const name of files) {
    fs.copyFileSync(path.join(sitemapsDir, name), path.join(standaloneSitemaps, name));
  }

  console.log(`Mirrored sitemaps to ${standalonePublic}`);
}

function listGeneratedSlugs(root, batches) {
  const seen = new Set();
  const slugs = [];
  for (const batch of batches) {
    const dir = path.join(root, "generated", batch);
    if (!fs.existsSync(dir)) continue;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!/\.tsx?$/.test(entry.name)) continue;
      const slug = entry.name.replace(/\.(t|j)sx?$/, "");
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        slugs.push(slug);
      }
    }
  }
  return slugs;
}

function listIntegrationSlugs(root) {
  try {
    const filePath = path.join(root, "data", "content", "integration-details.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.map((entry) => entry.slug).filter(Boolean);
    }
  } catch (e) {
    console.warn("Warning: Could not load integration-details.json");
  }
  return [];
}

function listBlogSlugs(root) {
  const allSlugs = [];
  const blogDirs = ['blog'];
  
  for (const dirName of blogDirs) {
    try {
      const blogDir = path.join(root, "content", dirName);
      if (!fs.existsSync(blogDir)) continue;
      const files = fs.readdirSync(blogDir);
      const slugs = files
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(".md", ""));
      allSlugs.push(...slugs);
    } catch (e) {
      console.warn(`Warning: Could not load ${dirName} posts`);
    }
  }
  return allSlugs;
}

function getStaticRoutes() {
  return [
    "/",
    "/about",
    "/contact",
    "/services",
    "/upload",
    "/login",
    "/dashboard",
    "/success",
    "/logistics",
    "/finance",
    "/customs",
    "/compliance",
    "/invoice",
    "/shipping",
  ];
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlset(urls, lastmod) {
  const items = urls
    .map((loc) => {
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");
  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${items}\n</urlset>`;
}

function buildIndex(entries, lastmod) {
  const items = entries
    .map((loc) => {
      return `  <sitemap>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
    })
    .join("\n");
  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${items}\n</sitemapindex>`;
}

function readEnvBaseUrl() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (base) return base.replace(/\/$/, "");
  // Default to production domain (never localhost)
  return "https://docstandard.co";
}

function parseBatchName(input) {
  if (!input) return null;
  const match = String(input).match(/batch(\d+)/i);
  if (!match) return null;
  const num = Number(match[1]);
  if (!Number.isFinite(num) || num < 1) return null;
  return num;
}

function parseBatchUrls(xmlContent) {
  const matches = xmlContent.match(/<loc>[^<]+<\/loc>/g) || [];
  return matches.length;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(__dirname, "..");
  dotenv.config({ path: path.join(root, ".env.local") });
  const publicDir = path.join(root, "public");
  const sitemapsDir = path.join(publicDir, "sitemaps");

  const baseUrl = readEnvBaseUrl();
  if (baseUrl.includes("localhost")) {
    console.warn("Warning: NEXT_PUBLIC_SITE_URL not set; skipping sitemap regeneration to preserve existing URLs");
    console.log("Sitemap URLs remain unchanged.");
    process.exit(0);
  }

  // Collect all URLs
  const allRoutes = [];

  // 1. Generated pages
  const generatedSlugs = listGeneratedSlugs(root, ["batch2", "batch3", "batch4", "batch5"]);
  generatedSlugs.forEach((slug) => allRoutes.push(`/${slug}`));

  // 2. Integration pages
  const integrationSlugs = listIntegrationSlugs(root);
  integrationSlugs.forEach((slug) => allRoutes.push(`/integration/${slug}`));

  // 3. Blog posts
  const blogSlugs = listBlogSlugs(root);
  blogSlugs.forEach((slug) => allRoutes.push(`/blog/${slug}`));

  // 4. Static routes (including verticals)
  const staticRoutes = getStaticRoutes();
  staticRoutes.forEach((route) => allRoutes.push(route));

  // Deduplicate and sort
  const uniqueRoutes = [...new Set(allRoutes)].sort();

  if (uniqueRoutes.length === 0) {
    console.error("No routes found. Skipping sitemap generation.");
    process.exit(1);
  }

  const urls = uniqueRoutes.map((route) => `${baseUrl}${route}`);
  const batches = chunk(urls, MAX_URLS_PER_BATCH);

  ensureDir(sitemapsDir);
  const lastmod = new Date().toISOString().split("T")[0];

  // Clean up old sitemap batch files
  const existingFiles = fs.existsSync(sitemapsDir) 
    ? fs.readdirSync(sitemapsDir).filter((name) => name.startsWith("sitemap-batch-"))
    : [];
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(sitemapsDir, file));
    console.log(`Removed old sitemap: ${file}`);
  }

  const indexEntries = [];
  batches.forEach((batch, idx) => {
    const batchId = String(idx + 1).padStart(2, "0");
    const filename = `sitemap-batch-${batchId}.xml`;
    const filePath = path.join(sitemapsDir, filename);
    fs.writeFileSync(filePath, buildUrlset(batch, lastmod), "utf8");
    indexEntries.push(`${baseUrl}/sitemaps/${filename}`);
  });

  const indexPath = path.join(publicDir, "sitemap-index.xml");
  fs.writeFileSync(indexPath, buildIndex(indexEntries, lastmod), "utf8");

  console.log(`Generated ${batches.length} sitemap batches (${urls.length} unique URLs).`);
  console.log(`Index written to ${indexPath}`);
  mirrorToStandalone(root, sitemapsDir, indexPath);

  if (args.submit) {
    const batchNum = parseBatchName(args.submit);
    if (!batchNum) {
      console.error("Invalid --submit value. Use --submit=batch01");
      process.exit(1);
    }
    const target = `${baseUrl}/sitemaps/sitemap-batch-${String(batchNum).padStart(2, "0")}.xml`;
    const delayHours = Math.max(0, batchNum - 1);
    console.log(`Submit: ${target}`);
    console.log(`Stagger: wait ${delayHours} hour(s) after Batch 1.`);
  }

  if (args.status) {
    const files = fs.existsSync(sitemapsDir)
      ? fs.readdirSync(sitemapsDir).filter((name) => name.startsWith("sitemap-batch-"))
      : [];
    console.log(`Sitemaps found: ${files.length}`);
    files.forEach((name) => {
      const content = fs.readFileSync(path.join(sitemapsDir, name), "utf8");
      console.log(`${name}: ${parseBatchUrls(content)} URLs`);
    });
    if (fs.existsSync(indexPath)) {
      console.log("Index file present: public/sitemap-index.xml");
    } else {
      console.log("Index file missing: public/sitemap-index.xml");
    }
  }
}

if (require.main === module) {
  main();
}
