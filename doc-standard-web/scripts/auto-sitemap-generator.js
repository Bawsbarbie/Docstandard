#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const MAX_URLS_PER_BATCH = 2000;

// Regex for old flat geo-city slug pages (now 404 — excluded from sitemap)
const OLD_GEO_SLUG_REGEX = /^\/[a-z0-9-]+-(cargowise|magaya|sap|oracle|motive|descartes|mercurygate|flexport|freightos|kuebix|roserocket|manhattan|blueyonder|3pl-central|shipstation)-([a-z0-9-]+)-[a-z0-9-]+$/i;

// New canonical verticals
const CANONICAL_VERTICALS = ["logistics", "accountants", "real-estate", "warehousing"];

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

function mirrorToStandalone(root, sitemapsDir, indexPath) {
  const standalonePublic = path.join(root, ".next", "standalone", "public");
  if (!fs.existsSync(standalonePublic)) return;

  const standaloneSitemaps = path.join(standalonePublic, "sitemaps");
  ensureDir(standaloneSitemaps);

  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(standalonePublic, "sitemap-index.xml"));
  }

  const files = fs.existsSync(sitemapsDir)
    ? fs
        .readdirSync(sitemapsDir)
        .filter(
          (name) =>
            name.startsWith("sitemap-batch-") ||
            name === "sitemap-near-me.xml" ||
            name === "sitemap-comparisons-only.xml"
        )
    : [];
  for (const name of files) {
    fs.copyFileSync(path.join(sitemapsDir, name), path.join(standaloneSitemaps, name));
  }

  console.log(`Mirrored sitemaps to ${standalonePublic}`);
}

function listGeneratedSlugs(root) {
  const batches = listBatchDirs(root);
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

/**
 * Logistics integrations — Phase 1 cap of 200 pages.
 * Source: integration-factory-content.json (existing logistics slugs).
 * New canonical path: /logistics/integration/{slug}
 */
function listLogisticsIntegrationRoutes(root) {
  try {
    const filePath = path.join(root, "data", "pseo", "integration-factory-content.json");
    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      // Limit to top 200 as defined in generateStaticParams
      return Object.keys(parsed)
        .filter(Boolean)
        .slice(0, 200)
        .map((slug) => `/logistics/integration/${slug}`);
    }
  } catch (e) {
    console.warn("Warning: Could not load integration-factory-content.json");
  }
  return [];
}

/**
 * New vertical integrations (accountants, real-estate, warehousing).
 * Source: data/software-systems.json — cross-product of source × destination.
 * Path pattern: /{vertical}/integration/{source-slug}-to-{dest-slug}
 */
function listNewVerticalIntegrationRoutes(root) {
  const routes = [];
  try {
    const filePath = path.join(root, "data", "software-systems.json");
    const systems = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    for (const vertical of ["accountants", "real-estate", "warehousing"]) {
      const verticalData = systems[vertical];
      if (!verticalData) continue;
      const sources = verticalData.source || [];
      const destinations = verticalData.destination || [];
      for (const src of sources) {
        for (const dst of destinations) {
          if (!src.slug || !dst.slug) continue;
          routes.push(`/${vertical}/integration/${src.slug}-to-${dst.slug}`);
        }
      }
    }
  } catch (e) {
    console.warn("Warning: Could not load software-systems.json:", e.message);
  }
  return routes;
}

// Keep legacy name for backwards compat but redirect to new canonical
function listIntegrationSlugs(root) {
  return listLogisticsIntegrationRoutes(root);
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
  // ONLY indexable public pages — noindex pages (login, dashboard, upload,
  // success, contact) and redirect-only routes (old sub-verticals) are omitted.
  return [
    // Marketing
    "/",
    "/about",
    "/services",
    "/blog",
    // Canonical vertical hubs
    "/logistics",
    "/accountants",
    "/real-estate",
    "/warehousing",
    // Tool hubs
    "/comparison",
  ];
}

function getBlockedRoutes() {
  // Old sub-vertical paths that now 308 redirect to /logistics
  return new Set([
    "/shipping",
    "/finance",
    "/customs",
    "/compliance",
    "/invoice",
    // Specific broken city pages from old architecture
    "/invoice/antwerp",
    "/invoice/chicago",
    "/finance/rotterdam",
    "/customs/hamburg",
    "/compliance/new-york",
    // Noindex app routes
    "/upload",
    "/login",
    "/dashboard",
    "/success",
    "/contact",
  ]);
}

function isPseoRoute(route) {
  // New canonical patterns
  if (CANONICAL_VERTICALS.some((v) => route.startsWith(`/${v}/integration/`))) return true;
  if (route.startsWith("/comparison/")) return true;
  if (route.startsWith("/blog/")) return true;
  if (CANONICAL_VERTICALS.includes(route.slice(1))) return true;
  // Old flat geo slug — these are now 404, excluded elsewhere
  if (OLD_GEO_SLUG_REGEX.test(route)) return true;
  return false;
}

function checkPageHasNoindex(route, root) {
  // Generated city-system pages are served via app/(pseo)/[vertical],
  // where noindex is enforced in head.tsx and metadata generation.
  if (CITY_SYSTEM_SLUG_REGEX.test(route)) {
    const verticalHeadPath = path.join(root, "app", "(pseo)", "[vertical]", "head.tsx");
    const verticalPagePath = path.join(root, "app", "(pseo)", "[vertical]", "page.tsx");
    const headContent = fs.existsSync(verticalHeadPath)
      ? fs.readFileSync(verticalHeadPath, "utf8")
      : "";
    const pageContent = fs.existsSync(verticalPagePath)
      ? fs.readFileSync(verticalPagePath, "utf8")
      : "";

    const hasMetaNoindex =
      headContent.includes('name="robots"') &&
      (headContent.includes("noindex, nofollow") || headContent.includes("noindex,nofollow"));
    const hasMetadataNoindex =
      pageContent.includes("robots") &&
      pageContent.includes("index: false") &&
      pageContent.includes("follow: false");

    return hasMetaNoindex || hasMetadataNoindex;
  }

  // For other pSEO routes, require explicit noindex declaration in source
  // before allowing sitemap inclusion under this guard.
  return false;
}

// Gate: only include routes that are actually indexable.
function shouldIncludeInSitemap(route, _root) {
  // Old flat geo-slug pages — route now returns 404 after architecture change.
  if (OLD_GEO_SLUG_REGEX.test(route)) return false;

  // Old /integration/* paths — redirected to /logistics/integration/*
  if (route.startsWith("/integration/")) return false;

  // /near-me/* — these are handled by the supplemental sitemap-near-me.xml
  // They are city-level pages gated by DA; don't include in main batches.
  if (route.startsWith("/near-me/")) return false;

  return true;
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

  // 1. Logistics integration pages (new canonical /logistics/integration/{slug})
  const logisticsRoutes = listLogisticsIntegrationRoutes(root);
  logisticsRoutes.forEach((route) => allRoutes.push(route));
  console.log(`Logistics integrations: ${logisticsRoutes.length}`);

  // 2. New vertical integration pages (accountants / real-estate / warehousing)
  const newVerticalRoutes = listNewVerticalIntegrationRoutes(root);
  newVerticalRoutes.forEach((route) => allRoutes.push(route));
  console.log(`New vertical integrations: ${newVerticalRoutes.length}`);

  // 3. Blog posts
  const blogSlugs = listBlogSlugs(root);
  blogSlugs.forEach((slug) => allRoutes.push(`/blog/${slug}`));
  console.log(`Blog posts: ${blogSlugs.length}`);

  // 4. Static routes (only indexable canonical pages)
  const staticRoutes = getStaticRoutes();
  staticRoutes.forEach((route) => allRoutes.push(route));
  console.log(`Static routes: ${staticRoutes.length}`);

  // NOTE: Old generated geo-city slugs are intentionally NOT added here.
  // Those pages now return 404 after the architecture change (Step 1).
  // Old /near-me/* pages are handled by the supplemental sitemap-near-me.xml.

  // Deduplicate, remove explicitly blocked URLs, apply noindex guard, and sort
  const blocked = getBlockedRoutes();
  const uniqueRoutes = [...new Set(allRoutes)]
    .filter((route) => !blocked.has(route))
    .filter((route) => shouldIncludeInSitemap(route, root))
    .sort();

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

  // Keep full route inventory discoverable through dedicated sitemap files.
  const supplementalSitemaps = ["sitemap-near-me.xml", "sitemap-comparisons-only.xml"];
  for (const filename of supplementalSitemaps) {
    const filePath = path.join(sitemapsDir, filename);
    if (fs.existsSync(filePath)) {
      indexEntries.push(`${baseUrl}/sitemaps/${filename}`);
    } else {
      console.warn(`Warning: supplemental sitemap missing: ${filePath}`);
    }
  }

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
