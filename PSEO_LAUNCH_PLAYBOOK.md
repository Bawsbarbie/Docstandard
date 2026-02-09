# pSEO Launch Playbook: Lessons from DocStandard

*A battle-tested guide for launching programmatic SEO without the painful mistakes.*

---

## Phase 0: Pre-Launch Checklist (Critical)

### 1. Domain & Infrastructure Setup

**Domain Configuration:**
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in production environment
- [ ] Verify sitemap generates with correct domain (NOT localhost)
- [ ] Test sitemap URL returns 200: `curl -s https://yourdomain.com/sitemap-index.xml`
- [ ] Submit sitemap to GSC BEFORE launching pages

**Common Mistake:** Sitemap generates with localhost URLs → GSC can't fetch → no indexing.

**Script Safety:**
```javascript
// In sitemap generator - exit if env var missing
if (baseUrl.includes("localhost")) {
  console.warn("SKIP: NEXT_PUBLIC_SITE_URL not set");
  process.exit(0); // Don't overwrite good sitemap
}
```

---

## Phase 1: URL Architecture (Before Writing Code)

### 2. Route Planning

**DO:**
- `/[vertical]/[intent-slug]` → Hub intent pages (built first)
- `/[country]/[state]/[city]/[intent]` → Geo pages (Phase 2)
- `/blog/[slug]` → Content pages

**DON'T:**
- `/[vertical]/[city]` → City-vertical pages (creates 404s if not built)
- Short slug redirects that conflict with real pages
- Multiple URL patterns for same content

**DocStandard Mistake:** We had `/compliance/antwerp` in sitemap but routes weren't built → 73 pages 404ing.

**Rule:** If it's in the sitemap, the route MUST exist and return 200.

---

### 3. Slug Generation Strategy

**For Generated Pages:**
```
{city}-{systemA}-{systemB}-{painAbbr}-{benefitAbbr}
```

**Requirements:**
- [ ] Max 75 characters (Google limit)
- [ ] Unique across all batches
- [ ] No duplicate slugs (we had 310 duplicates across batch3/4/5)

**Validation:**
```javascript
const seenSlugs = new Set();
const slug = generateSlug(data);
if (seenSlugs.has(slug)) {
  throw new Error(`Duplicate slug: ${slug}`);
}
seenSlugs.add(slug);
```

---

## Phase 2: Content Standards

### 4. Minimum Content Requirements

| Page Type | Min Words | Why |
|-----------|-----------|-----|
| Blog Posts | 600+ | Google flags <400 as "thin content" |
| pSEO Landing Pages | 1,500-2,500 | E-E-A-T requirements |
| Hub Pages | 800+ | Navigation + value prop |

**DocStandard Mistake:** 54 blog posts at 309-416 words → Google won't index them.

**Solution:** Consolidate similar topics into fewer, longer guides.

---

### 5. Content Differentiation

**Indexed (Good):**
- "Commercial Invoice Processing" (specific document type)
- "Bill of Lading Processing" (specific workflow)
- "Batch Document Ingestion Architecture" (technical depth)

**Not Indexed (Too Generic):**
- "Data Cleaning Services"
- "Data Standardization"
- "Data Enrichment Services"

**Rule:** Specific operational workflows > Generic service descriptions

---

## Phase 3: Technical Implementation

### 6. Sitemap Strategy

**Batching:**
- Max 2,000 URLs per sitemap file
- Submit ONE batch initially (not 11 batches of 50)
- Wait for 40+ indexed before adding more

**DocStandard Mistake:** 11 batches × 50 URLs = confusion and partial indexing.

**Current Working Setup:**
- 1 sitemap file: 287 URLs
- Generated pages: 200 (batch2)
- Blog: 54 posts
- Integrations: 19 pages
- Hub pages: 6 verticals
- Main pages: 8

---

### 7. Page Generation Workflow

**Template → Generated Pages:**
1. Update template with ALL changes first
2. Test template renders correctly
3. Delete old generated files
4. Run generator script
5. Verify no duplicate slugs
6. Build and deploy
7. Submit updated sitemap

**DocStandard Mistake:** Template had `vertical` prop, but generated pages didn't include it → images not showing.

**Always regenerate all batches after template changes.**

---

## Phase 4: Google Search Console Management

### 8. GSC Launch Sequence

**Week 1:**
1. Submit sitemap (validate it works)
2. Wait 48 hours for initial crawl
3. Check "Discovered - not indexed" count
4. Fix any 404s immediately

**Week 2-4:**
5. Monitor Coverage report daily
6. If pages 404 → remove from sitemap OR build routes
7. Wait for 40+ indexed before expanding

---

### 9. Handling "Discovered - Not Indexed"

**First, check if URLs actually work:**
```bash
for url in $(cat urls.txt); do
  curl -s -o /dev/null -w "%{http_code} $url\n" "$url"
done
```

**If 404:** Remove from sitemap immediately (temp removal in GSC)
**If 200:** Content quality issue - expand or consolidate

**DocStandard Mistake:** 73 URLs in sitemap that 404ed (city-vertical routes not built).

---

## Phase 5: Expansion Rules

### 10. Gatekeeper Protocol

**DO NOT expand until:**
- [ ] 40+ pages indexed
- [ ] No 404 errors in Coverage report
- [ ] Previous batch shows healthy indexing

**Expansion Sequence:**
1. Hub pages (6 verticals)
2. Intent pages (per vertical)
3. Geo pages (city-intent combinations)
4. Scale to 100k+

**DocStandard Mistake:** Added geo pages to sitemap before building routes → GSC confusion.

---

## Quick Reference: Common Mistakes & Fixes

| Mistake | Impact | Fix |
|---------|--------|-----|
| Sitemap has localhost URLs | GSC can't fetch | Hardcode production domain fallback |
| Duplicate slugs across batches | Content cannibalization | Use Set() to track seen slugs |
| City-vertical URLs not built | 73 pages 404 | Remove from sitemap until Phase 2 |
| Blog posts <400 words | Thin content penalty | Merge into 800+ word guides |
| Multiple small sitemaps | Crawl confusion | One sitemap, max 2000 URLs |
| Template changes without regen | Props missing | Always regenerate all batches |

---

## ctomarketplace.com Launch Checklist

**Pre-Launch:**
- [ ] Domain configured in env vars
- [ ] Sitemap generates with correct URLs
- [ ] Routes exist for ALL sitemap URLs
- [ ] Content meets minimum word counts
- [ ] Slug validation in place

**Launch Week:**
- [ ] Submit sitemap to GSC
- [ ] Monitor Coverage report daily
- [ ] Fix 404s within 24 hours
- [ ] Remove broken URLs from sitemap

**Post-Launch:**
- [ ] Wait for 40+ indexed
- [ ] Analyze which content types index
- [ ] Expand winning content types
- [ ] Consolidate underperformers

---

## Domain Age Advantage (ctomarketplace.com)

**2-year-old domain = Faster indexing:**
- Higher crawl budget
- More domain authority
- Google trusts established sites

**Expected vs DocStandard:**
- DocStandard: ~40 indexed after 2 weeks (new domain)
- CtoMarketplace: Likely 100+ indexed in first week

**Still follow the same process** - domain age helps but doesn't fix broken URLs or thin content.

---

## Files to Create for New Project

```
ctomarketplace/
├── .env.production          # Production env vars
├── scripts/
│   ├── sitemap-generator.js  # With safety checks
│   ├── page-generator.js     # With duplicate detection
│   └── validate-routes.js    # Check all URLs return 200
├── content/
│   └── blog/                 # 600+ word posts only
└── docs/
    └── PSEO_LAUNCH.md        # This playbook
```

---

## Success Metrics

| Metric | Week 1 | Week 4 | Month 3 |
|--------|--------|--------|---------|
| Indexed Pages | 20+ | 100+ | 500+ |
| 404 Errors | 0 | 0 | 0 |
| Avg Content Length | 800+ | 1000+ | 1200+ |
| Sitemap Status | Success | Success | Success |

---

*Last Updated: 2026-02-09*
*Based on DocStandard pSEO launch learnings*
