# Deployment Checklist

## Pre-Deploy
1. Confirm `npm run build` passes locally.
2. Verify `prebuild` generates 465 pages:
   - `generated/page-map.ts` updated
   - batches 2–5 present
3. Verify `postbuild` runs:
   - `scripts/auto-sitemap-generator.js`
   - `scripts/postbuild-copy-static.js`

## Build Output (Standalone)
1. Ensure `.next/standalone` exists.
2. Ensure these folders exist inside `.next/standalone`:
   - `.next/static`
   - `public`
   - `data`
   - `content`
3. If missing, fix `postbuild-copy-static.js`.

## Coolify Config
1. Environment: `NEXT_PUBLIC_SITE_URL=https://docstandard.co`
2. Start command: `node .next/standalone/server.js`

## Post-Deploy Smoke Tests
1. pSEO redirect:
   - `/finance/new-york` → canonical city/intent
2. Blog redirect:
   - `/data-quality-assurance` → `/blog/data-quality-assurance`
3. Static assets:
   - `/_next/static/*` loads (no 404)
   - `/images/banners/logistics.jpg` loads
4. Sitemaps:
   - `/sitemap-index.xml`
   - `/sitemaps/sitemap-batch-01.xml`
