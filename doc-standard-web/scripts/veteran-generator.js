#!/usr/bin/env node
"use strict";

/**
 * VETERAN BULK GENERATOR V2
 * Optimized for high-volume, unique permutation management.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function replaceAll(template, replacements) {
  let out = template;
  for (const [key, value] of Object.entries(replacements)) {
    const re = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    out = out.replace(re, value);
  }
  return out;
}

const DEFAULT_CARRIERS = ["Maersk", "MSC", "CMA CGM", "Hapag-Lloyd", "ONE", "Evergreen", "COSCO"];

function main() {
  const args = parseArgs(process.argv.slice(2));
  const batch = args.batch;
  const count = Number(args.count);

  if (!batch || !count) {
    console.error("Usage: node scripts/veteran-generator.js --batch=batch2 --count=5000");
    process.exit(1);
  }

  const root = path.resolve(__dirname, "..");
  const templatePath = path.join(root, "templates", "v2-page-template.tsx");
  const dataDir = path.join(root, "data", "pools");
  const outDir = path.join(root, "generated", batch);

  if (!fs.existsSync(templatePath)) throw new Error("Template missing");
  const template = fs.readFileSync(templatePath, "utf8");

  const locations = readJson(path.join(dataDir, "locations.json"));
  const systems = readJson(path.join(dataDir, "systems.json"));
  const pains = readJson(path.join(dataDir, "pain-points.json"));
  const benefits = readJson(path.join(dataDir, "benefits.json"));

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  let attempts = 0;
  const maxAttempts = count * 5;
  const seenSlugs = new Set();

  console.log(`Starting Veteran Build: ${batch} target ${count} pages...`);

  // We use a deterministic but varied approach to ensure uniqueness
  for (let l = 0; l < locations.length; l++) {
    for (let s = 0; s < systems.length; s++) {
      for (let p = 0; p < pains.length; p++) {
        for (let b = 0; b < benefits.length; b++) {
          if (created >= count) break;

          const location = locations[l];
          const system = systems[s];
          const pain = pains[p];
          const benefit = benefits[b];

          const city = location.city || location.name;
          const sysA = system.systemA || system.source;
          const sysB = system.systemB || system.target;

          // Generate a unique identifier for this specific combination
          const comboId = `${city}-${sysA}-${sysB}-${p}-${b}`;
          const slugSuffix = crypto.createHash("md5").update(comboId).digest("hex").slice(0, 6);
          const slug = slugify(`${city}-${sysA}-${sysB}-${slugSuffix}`);

          if (seenSlugs.has(slug)) continue;

          const replacements = {
            CITY: city,
            SYSTEM_A: sysA,
            SYSTEM_B: sysB,
            HUB: location.hub || `${city} Logistics Hub`,
            PORT: location.port || `${city} Port`,
            CARRIER_1: location.carrier || DEFAULT_CARRIERS[attempts % DEFAULT_CARRIERS.length],
            PAIN_POINT: pain,
            BENEFIT: benefit,
            ROI_MANUAL: location.roiManual || `${8 + (attempts % 12)} hours/week`,
            ROI_SAVINGS: location.roiSavings || `$${(40 + (attempts % 60)) * 1000}/year`,
            NOINDEX: '<meta name="robots" content="noindex, nofollow" />',
          };

          const content = replaceAll(template, replacements);
          fs.writeFileSync(path.join(outDir, `${slug}.tsx`), content, "utf8");

          seenSlugs.add(slug);
          created++;
          attempts++;
        }
        if (created >= count) break;
      }
      if (created >= count) break;
    }
    if (created >= count) break;
  }

  console.log(`Success: Generated ${created} unique pages in ${batch}.`);
}

main();
