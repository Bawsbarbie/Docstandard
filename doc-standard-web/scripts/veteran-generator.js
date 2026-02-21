#!/usr/bin/env node
"use strict";

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

function hashToInt(seed, min, max) {
  const h = crypto.createHash("sha256").update(seed).digest();
  const num = h.readUInt32BE(0);
  const span = max - min + 1;
  return min + (num % span);
}

function pickRandomN(list, n, seed) {
  const result = [];
  const pool = [...list];
  for(let i=0; i<n; i++) {
    const idx = hashToInt(seed + "-" + i, 0, pool.length - 1);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

const DEFAULT_CARRIERS = ["Maersk", "MSC", "CMA CGM", "Hapag-Lloyd", "ONE", "Evergreen", "COSCO"];

// Keywords for human-readable slugs based on technical pain points
const ACTION_KEYWORDS = [
  "vat-compliance",
  "gl-mapping",
  "audit-readiness",
  "data-normalization",
  "legacy-migration",
  "invoice-sync",
  "error-resolution",
  "api-bridging",
  "customs-alignment",
  "landed-cost-fix",
  "ap-automation",
  "document-digitization",
  "scac-normalization",
  "freight-audit",
  "record-hashing"
];

function main() {
  const args = parseArgs(process.argv.slice(2));
  const batch = args.batch;
  const count = Number(args.count);

  if (!batch || !count) process.exit(1);

  const root = path.resolve(__dirname, "..");
  const templatePath = path.join(root, "templates", "v2-page-template.tsx");
  const dataDir = path.join(root, "data", "pools");
  const outDir = path.join(root, "generated", batch);

  const template = fs.readFileSync(templatePath, "utf8");
  const locations = readJson(path.join(dataDir, "locations.json"));
  const systems = readJson(path.join(dataDir, "systems.json"));
  const geoDataLayer = readJson(path.join(dataDir, "geo-data-layer.json"));
  
  const pains = readJson(path.join(dataDir, "pain-points.json"));
  const benefits = readJson(path.join(dataDir, "benefits.json"));
  const mappingPool = readJson(path.join(dataDir, "mapping-variations.json"));
  const roiPool = readJson(path.join(dataDir, "roi-variations.json"));
  const introPool = readJson(path.join(dataDir, "intro-variations.json"));
  const faqPool = readJson(path.join(dataDir, "service-first-faqs.json"));
  const testimonialPool = readJson(path.join(dataDir, "testimonial-variations.json"));
  const imagePool = readJson(path.join(dataDir, "images.json"));

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let created = 0;
  const seenSlugs = new Set();
  const layouts = ["A", "B", "C"];

  console.log(`🚀 Veteran Build V6.0 (Semantic Slugs): ${batch}...`);

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

          const comboId = `${city}-${sysA}-${sysB}-${p}-${b}`;
          
          // SEMANTIC SLUG: Using action keywords instead of random numbers
          const actionKey = ACTION_KEYWORDS[p % ACTION_KEYWORDS.length];
          let slug = slugify(`${city}-${sysA}-${sysB}-${actionKey}`);

          // Enforce 72 char limit (Google's best practice is < 75)
          if (slug.length > 72) {
             slug = slugify(`${city.slice(0,10)}-${sysA.slice(0,10)}-${sysB.slice(0,10)}-${actionKey}`).slice(0, 72);
          }

          if (seenSlugs.has(slug)) {
            // Fallback for extreme duplicates only
            const hash = crypto.createHash("md5").update(comboId).digest("hex").slice(0, 4);
            slug = `${slug.slice(0, 67)}-${hash}`;
          }

          const geo = geoDataLayer.find(g => g.city.toLowerCase() === city.toLowerCase()) || geoDataLayer[hashToInt(city, 0, geoDataLayer.length - 1)];
          const layout = layouts[hashToInt(comboId + "-layout", 0, 2)];
          const mappingBlock = mappingPool[hashToInt(comboId + "-map", 0, mappingPool.length - 1)].text;
          const roiBlock = roiPool[hashToInt(comboId + "-roi", 0, roiPool.length - 1)].text;
          const introBlock = introPool[hashToInt(comboId + "-intro", 0, introPool.length - 1)].text;
          const selectedImage = imagePool[hashToInt(comboId + "-img", 0, imagePool.length - 1)].path;

          const selectedFaqs = pickRandomN(faqPool, 5, comboId + "-faqs"); 
          const selectedTestimonials = pickRandomN(testimonialPool, 3, comboId + "-test");

          const replacements = {
            CITY: city,
            SYSTEM_A: sysA,
            SYSTEM_B: sysB,
            HUB: location.hub || `${city} Logistics Hub`,
            PORT: location.port || `${city} Port`,
            UNLOCODE: geo.unlocode,
            VAT: geo.vat,
            CUSTOMS: geo.customs,
            TERMINAL: geo.terminal,
            DISTANCE: geo.distance,
            CARRIER_1: location.carrier || DEFAULT_CARRIERS[l % DEFAULT_CARRIERS.length],
            PAIN_POINT: pain,
            BENEFIT: benefit,
            ROI_MANUAL: `${8 + hashToInt(comboId, 0, 15)} hours/week`,
            ROI_SAVINGS: `$${(40 + hashToInt(comboId, 0, 150)) * 1000}/year`,
            MAPPING_TEXT: replaceAll(mappingBlock, { CITY: city, SYSTEM_A: sysA, SYSTEM_B: sysB, UNLOCODE: geo.unlocode, HUB: location.hub || `${city} Logistics Hub` }),
            ROI_CALCULATION_TEXT: replaceAll(roiBlock, { CITY: city, SYSTEM_A: sysA, SYSTEM_B: sysB, VAT: geo.vat, HUB: location.hub || `${city} Logistics Hub` }),
            INTRO_TEXT: replaceAll(introBlock, { CITY: city, SYSTEM_A: sysA, SYSTEM_B: sysB, HUB: location.hub || `${city} Logistics Hub`, PORT: location.port || `${city} Port` }),
            HERO_IMAGE: selectedImage,
            LAYOUT: layout,
            NOINDEX: '<meta name="robots" content="noindex, nofollow" />',
          };

          let content = replaceAll(template, replacements);

          const finalFaqs = selectedFaqs.map(f => ({
            question: replaceAll(f.question, replacements),
            answer: replaceAll(f.answer, replacements)
          }));
          const finalTestimonials = selectedTestimonials.map(t => ({
            quote: replaceAll(t.quote, replacements),
            author: t.author,
            role: t.role,
            company: t.company
          }));

          content = content.replace("faqs = []", `faqs = ${JSON.stringify(finalFaqs, null, 2)}`);
          content = content.replace("testimonials = []", `testimonials = ${JSON.stringify(finalTestimonials, null, 2)}`);

          fs.writeFileSync(path.join(outDir, `${slug}.tsx`), content, "utf8");
          seenSlugs.add(slug);
          created++;
        }
        if (created >= count) break;
      }
      if (created >= count) break;
    }
    if (created >= count) break;
  }
  console.log(`✅ Success: Generated ${created} Semantic pages in ${batch}.`);
}

main();
