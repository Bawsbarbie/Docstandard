#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const crypto = require("crypto");
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

function buildPageMap(root) {
  const slugs = listGeneratedSlugs(root).sort((a, b) => a.slug.localeCompare(b.slug));
  const unique = new Map();
  for (const { slug, batch } of slugs) {
    if (!unique.has(slug)) {
      unique.set(slug, batch);
    }
  }
  const lines = [];
  lines.push("export const generatedPageImports = {");
  for (const [slug, batch] of unique.entries()) {
    lines.push(`  "${slug}": () => import("./${batch}/${slug}"),`);
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export const generatedSlugs = Object.keys(generatedPageImports);");
  lines.push("");
  const outPath = path.join(root, "generated", "page-map.ts");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${unique.size} entries to ${outPath}`);
}

const COMPONENT_MARKERS = [
  "Hero",
  "RiskSection",
  "PainSection",
  "TechnicalGuide",
  "TechnicalProcess",
  "ROISection",
  "BenefitsGrid",
  "FAQSection",
  "TestimonialsSection",
];

const DEFAULT_CARRIERS = [
  "Maersk",
  "MSC",
  "CMA CGM",
  "Hapag-Lloyd",
  "ONE",
  "Evergreen",
  "COSCO",
];

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [k, v] = arg.slice(2).split("=");
    out[k] = v === undefined ? true : v;
  }
  return out;
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

function hashToInt(seed, min, max) {
  const h = crypto.createHash("sha256").update(seed).digest();
  const num = h.readUInt32BE(0);
  const span = max - min + 1;
  return min + (num % span);
}

function normalizeLocations(raw) {
  if (!Array.isArray(raw)) throw new Error("locations.json must be an array");
  return raw.map((item) => {
    if (typeof item === "string") return { city: item };
    if (!item || typeof item !== "object") return { city: String(item) };
    return {
      city: item.city || item.name || item.location || String(item.city || item.name || item.location || ""),
      hub: item.hub || item.hub_name || item.logisticsHub || item.hubName,
      port: item.port || item.port_name || item.portName,
      carrier: item.carrier_1 || item.carrier || item.majorCarrier || item.carrier1,
      roiManual: item.roi_manual || item.manualEffort || item.manual_hours || item.roiManual,
      roiSavings: item.roi_savings || item.annualSavings || item.roiSavings,
    };
  });
}

function parseSystemEntry(entry) {
  if (typeof entry === "string") {
    const parts = entry.split(/\s*(?:->|to|\/|&|vs|:|\|)\s*/i).filter(Boolean);
    if (parts.length >= 2) return { systemA: parts[0], systemB: parts[1] };
    return { systemA: entry, systemB: entry };
  }
  if (!entry || typeof entry !== "object") return { systemA: String(entry), systemB: String(entry) };
  if (entry.systemA || entry.systemB) return { systemA: entry.systemA || entry.systemB, systemB: entry.systemB || entry.systemA };
  if (entry.source || entry.target) return { systemA: entry.source || entry.target, systemB: entry.target || entry.source };
  if (entry.name) return { systemA: entry.name, systemB: entry.name };
  if (entry.integration) return parseSystemEntry(entry.integration);
  return { systemA: String(entry), systemB: String(entry) };
}

function normalizeSystems(raw) {
  if (!Array.isArray(raw)) throw new Error("systems.json must be an array");
  return raw.map(parseSystemEntry);
}

function normalizeStringPool(raw, label) {
  if (!Array.isArray(raw)) throw new Error(`${label} must be an array`);
  return raw.map((item) => {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return String(item);
    return item.value || item.name || item.label || String(item.value || item.name || item.label || "");
  });
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function buildShingleSet(tokens, size = 5) {
  const set = new Set();
  if (tokens.length < size) return set;
  for (let i = 0; i <= tokens.length - size; i++) {
    const shingle = tokens.slice(i, i + size).join(" ");
    const h = crypto.createHash("sha1").update(shingle).digest("hex");
    set.add(h);
  }
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const v of a) if (b.has(v)) intersection++;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function countWordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function validateComponents(content) {
  const missing = [];
  for (const marker of COMPONENT_MARKERS) {
    const re = new RegExp(`(<${marker}\\b|\\b${marker}\\b)`);
    if (!re.test(content)) missing.push(marker);
  }
  return missing;
}

function countFaqs(content) {
  const questionMatches = content.match(/question\s*:/gi);
  const faqMatches = content.match(/faq/gi);
  const count = Math.max(questionMatches ? questionMatches.length : 0, 0);
  if (count >= 4) return count;
  return faqMatches ? faqMatches.length : 0;
}

function countTestimonials(content) {
  const quoteMatches = content.match(/quote\s*:/gi);
  const testimonialMatches = content.match(/testimonial/gi);
  const count = Math.max(quoteMatches ? quoteMatches.length : 0, 0);
  if (count >= 3) return count;
  return testimonialMatches ? testimonialMatches.length : 0;
}

function replaceAll(template, replacements) {
  let out = template;
  for (const [key, value] of Object.entries(replacements)) {
    const re = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    out = out.replace(re, value);
  }
  return out;
}

function generateRoi(seed) {
  const hours = hashToInt(seed + "|hours", 6, 28);
  const savings = hashToInt(seed + "|savings", 25000, 180000);
  return {
    roiManual: `${hours} hours/week`,
    roiSavings: `$${savings.toLocaleString("en-US")}/year`,
  };
}

function pickDeterministic(list, seed, fallback) {
  if (list.length === 0) return fallback;
  const idx = hashToInt(seed, 0, list.length - 1);
  return list[idx];
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const batch = Number(args.batch || args.b);
  const count = Number(args.count || args.c || 0);
  if (!batch || !count) {
    console.error("Usage: node scripts/bulk-page-generator.js --batch=2 --count=155");
    process.exit(1);
  }

  const root = path.resolve(__dirname, "..");
  const templatePath = path.join(root, "templates", "v2-page-template.tsx");
  const dataDir = path.join(root, "data", "pools");

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  const template = fs.readFileSync(templatePath, "utf8");

  const locations = normalizeLocations(readJson(path.join(dataDir, "locations.json")));
  const systems = normalizeSystems(readJson(path.join(dataDir, "systems.json")));
  const pains = normalizeStringPool(readJson(path.join(dataDir, "pain-points.json")), "pain-points.json");
  const benefits = normalizeStringPool(readJson(path.join(dataDir, "benefits.json")), "benefits.json");

  if (!locations.length || !systems.length || !pains.length || !benefits.length) {
    throw new Error("Data pools must not be empty");
  }

  const outDir = path.join(root, "generated", `batch${batch}`);
  ensureDir(outDir);

  const seenHashes = new Set();
  const seenSlugs = new Set();
  const shingleSets = [];
  const similarityThreshold = Number(args.similarity || 1.0);

  let created = 0;
  let attempts = 0;
  const maxAttempts = count * 20;

  while (created < count && attempts < maxAttempts) {
    const index = attempts + batch * 100000;
    const location = locations[index % locations.length];
    const system = systems[Math.floor(index / locations.length) % systems.length];
    const pain = pains[Math.floor(index / (locations.length * systems.length)) % pains.length];
    const benefit = benefits[Math.floor(index / (locations.length * systems.length * pains.length)) % benefits.length];

    const city = location.city;
    const systemA = system.systemA;
    const systemB = system.systemB;

    const seed = `${city}|${systemA}|${systemB}|${pain}|${benefit}|${batch}|${attempts}`;

    const hub = location.hub || `${city} Logistics Hub`;
    const port = location.port || `${city} Port`;
    const carrier = location.carrier || pickDeterministic(DEFAULT_CARRIERS, seed, "Maersk");
    const roi = generateRoi(seed);

    const roiManual = location.roiManual || roi.roiManual;
    const roiSavings = location.roiSavings || roi.roiSavings;

    const replacements = {
      CITY: city,
      SYSTEM_A: systemA,
      SYSTEM_B: systemB,
      HUB: hub,
      PORT: port,
      CARRIER_1: carrier,
      PAIN_POINT: pain,
      BENEFIT: benefit,
      ROI_MANUAL: roiManual,
      ROI_SAVINGS: roiSavings,
      NOINDEX: '<meta name="robots" content="noindex, nofollow" />',
    };

    const content = replaceAll(template, replacements);

    // Check for unreplaced placeholders ({{KEY}} pattern), not JSX syntax
    const unreplacedPlaceholders = content.match(/\{\{[A-Z_]+\}\}/g);
    if (unreplacedPlaceholders && unreplacedPlaceholders.length > 0) {
      attempts++;
      continue;
    }

    const wordCount = countWordCount(content);
    if (wordCount < 1500) {
      console.error(`[FAILED] Page ${attempts + 1}: Word count ${wordCount} < 1500. Skipping.`);
      attempts++;
      continue;
    }

    const missingComponents = validateComponents(content);
    if (missingComponents.length) {
      attempts++;
      continue;
    }

    const faqCount = countFaqs(content);
    const testimonialCount = countTestimonials(content);
    if (faqCount < 4 || testimonialCount < 3) {
      attempts++;
      continue;
    }

    const hash = crypto.createHash("sha1").update(content).digest("hex");
    if (seenHashes.has(hash)) {
      attempts++;
      continue;
    }

    const shingles = buildShingleSet(tokenize(content), 5);
    let tooSimilar = false;
    for (const prev of shingleSets) {
      if (jaccard(shingles, prev) > similarityThreshold) {
        tooSimilar = true;
        break;
      }
    }
    if (tooSimilar) {
      attempts++;
      continue;
    }

    // Create unique slug including pain/benefit identifiers (Google limit: 75 chars max)
    // Abbreviate pain point and benefit to keep under limit while ensuring uniqueness
    const painAbbr = slugify(pain).split('-').map(w => w[0]).join('').slice(0, 4);
    const benefitAbbr = slugify(benefit).split('-').map(w => w[0]).join('').slice(0, 4);
    const cityAbbr = slugify(city).slice(0, 15);
    const sysAAbbr = slugify(systemA).slice(0, 10);
    const sysBAbbr = slugify(systemB).slice(0, 10);
    
    const slugBase = `${cityAbbr}-${sysAAbbr}-${sysBAbbr}-${painAbbr}-${benefitAbbr}`;
    let slug = slugify(slugBase).slice(0, 72) || `page-${created + 1}`;
    
    if (seenSlugs.has(slug)) {
      const suffix = hashToInt(`${slugBase}|${attempts}`, 1000, 9999);
      const maxBase = Math.max(1, 72 - 5);
      slug = `${slug.slice(0, maxBase)}-${suffix}`;
    }

    const filePath = path.join(outDir, `${slug}.tsx`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, "utf8");
      created++;
    } else {
      // If file exists, we consider it "created" for progress purposes
      // but we don't increment created if we want exactly N *new* pages.
      // For resume logic, we'll increment created to reach the target count.
      created++;
    }
    
    if (created % 100 === 0) {
      console.log(`[PROGRESS] Generated ${created}/${count} pages...`);
    }

    seenHashes.add(hash);
    seenSlugs.add(slug);
    shingleSets.push(shingles);

    attempts++;
  }

  if (created < count) {
    console.error(`Only generated ${created}/${count} pages after ${attempts} attempts.`);
    console.error("Consider expanding pools or adjusting template length/anchors.");
    process.exit(1);
  }

  // Refresh generated page map for routing
  try {
    buildPageMap(root);
  } catch (error) {
    console.warn("Warning: failed to update generated page map:", error?.message || error);
  }

  console.log(`Generated ${created} pages in ${outDir}`);
}

if (require.main === module) {
  main();
}
