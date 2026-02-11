# PSEO Launch Playbook: The Unified System

*A battle-tested guide that enforces validation BEFORE generation. Based on Kalash Protocol + lisbeth718 framework + DocStandard hard lessons.*

**Version:** 2.0 (Unified)  
**Last Updated:** 2026-02-10  
**Applies to:** All pSEO projects (DocStandard, ctomarketplace.com, future projects)

---

## Quick Reference: Where Things Live

| What | Where | Use When |
|------|-------|----------|
| **Memory** | `memory/MEMORY.md` | Remembering what worked/failed |
| **Skills** | `skills/pseo-unified/SKILL.md` | Understanding protocols |
| **This Playbook** | `PSEO_LAUNCH_PLAYBOOK.md` | Executing step-by-step |
| **Validation Code** | `skills/pseo-unified/scripts/` | Running checks |

---

## Phase 0: Pre-Launch Foundation (Days -7 to 0)

### 0.1 Domain & Infrastructure

**CRITICAL: Do this FIRST. No exceptions.**

```bash
# Checklist
[ ] Set NEXT_PUBLIC_SITE_URL=https://yourdomain.com
[ ] Verify sitemap generates with correct domain (NOT localhost)
[ ] Test sitemap URL: curl -s https://yourdomain.com/sitemap-index.xml
[ ] Confirm robots.txt allows crawling
[ ] Set up Google Search Console property
```

**Safety Check (Add to sitemap generator):**
```javascript
if (baseUrl.includes("localhost") || !baseUrl) {
  console.warn("SKIP: NEXT_PUBLIC_SITE_URL not set to production");
  process.exit(0); // Don't overwrite good sitemap
}
```

### 0.2 Data Audit (lisbeth718 Phase 0-2)

**Before writing ANY code, audit your data:**

```bash
# Run discovery
node skills/pseo-unified/scripts/discovery.js

# Check data sufficiency
node skills/pseo-unified/scripts/data-audit.js --source=./data/
```

**Data Requirements by Scale:**

| Pages | Architecture | Data Needed |
|-------|-------------|-------------|
| < 1K | JSON files | 50+ entities with 5+ attributes each |
| 1K-10K | JSON + caching | 200+ entities, filtered combinations |
| 10K+ | Database layer | Structured tables, cursor-based iteration |
| 100K+ | DB + CDN + incremental | Full data pipeline with validation gates |

**DocStandard Mistake:** We had data for 500 pages but tried to generate 5,000. Result: thin content.

### 0.3 Select Playbooks

**Choose 3-5 playbooks for Phase 1.** Don't do all 12 at once.

Recommended starter set:
1. **Glossary** (easy wins, educational intent)
2. **Comparisons** (high commercial intent)
3. **Integrations** (product-focused)
4. **Locations** (if local SEO applies)
5. **Examples** (inspiration intent)

**Rule:** Each batch must contain **mixed playbook types** (min 3).

---

## Phase 1: Validation Gates (Day 0)

### 1.1 Pre-Generation Gate (CRITICAL)

**This is where DocStandard failed. We generated first, validated later.**

**Create this file: `scripts/pre-generation-gate.js`**

```javascript
#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');

// Gate 1: Data Sufficiency
function checkDataSufficiency(data, minFields = 5) {
  const fields = Object.keys(data).filter(k => data[k] !== null && data[k] !== undefined);
  return {
    passed: fields.length >= minFields,
    fields: fields.length,
    required: minFields
  };
}

// Gate 2: Word Count Minimum
const MIN_WORDS = {
  informational: 900,
  utility: 600,
  pillar: 2500,
  supporting: 1500,
  glossary: 800,
  comparison: 1200,
  integration: 1500
};

function checkWordCount(pageType, estimatedWords) {
  const min = MIN_WORDS[pageType] || 600;
  return {
    passed: estimatedWords >= min,
    actual: estimatedWords,
    required: min
  };
}

// Gate 3: Title Similarity (< 30%)
function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().split(' ');
  const s2 = str2.toLowerCase().split(' ');
  const intersection = s1.filter(word => s2.includes(word));
  return intersection.length / Math.max(s1.length, s2.length);
}

function checkTitleSimilarity(newTitle, existingTitles) {
  for (const existing of existingTitles) {
    const similarity = calculateSimilarity(newTitle, existing);
    if (similarity > 0.30) {
      return { passed: false, similarity: similarity, existing: existing };
    }
  }
  return { passed: true };
}

// Gate 4: Slug Uniqueness
const seenSlugs = new Set();
function checkSlugUnique(slug) {
  if (seenSlugs.has(slug)) {
    return { passed: false, reason: 'Duplicate slug' };
  }
  seenSlugs.add(slug);
  return { passed: true };
}

// Main validation function
function validatePage(pageData, existingTitles) {
  const results = {
    slug: checkSlugUnique(pageData.slug),
    data: checkDataSufficiency(pageData.data),
    words: checkWordCount(pageData.type, pageData.estimatedWords),
    title: checkTitleSimilarity(pageData.title, existingTitles)
  };
  
  const allPassed = Object.values(results).every(r => r.passed);
  
  return {
    status: allPassed ? 'APPROVED' : 'REJECTED',
    page: pageData.slug,
    results: results
  };
}

module.exports = { validatePage, checkDataSufficiency, checkWordCount };
```

### 1.2 Run Pre-Generation Check

```bash
# Test your data before generating
node scripts/pre-generation-gate.js --data=./data/integrations.json --type=integration

# If ANY page fails, fix data before generating
```

---

## Phase 2: Content Generation (Days 1-3)

### 2.1 Batch Configuration

**Rules:**
- Max 100 pages per batch
- Min 3 different playbook types per batch
- No repeated slugs
- No repeated primary keywords

**Example Batch Structure:**
```json
{
  "batch_id": "batch-01",
  "pages": [
    { "type": "glossary", "slug": "what-is-isf-10", "count": 10 },
    { "type": "comparison", "slug": "cargowise-vs-flexport", "count": 5 },
    { "type": "integration", "slug": "cargowise-netsuite-bridge", "count": 15 },
    { "type": "examples", "slug": "commercial-invoice-examples", "count": 10 }
  ]
}
```

### 2.2 Generation Script

```bash
# Generate with validation
node scripts/generate-batch.js \
  --batch=batch-01.json \
  --template=./templates/v2-standard.tsx \
  --validate \
  --output=./generated/batch-01/
```

### 2.3 Post-Generation Validation

```bash
# Check word counts
wc -w ./generated/batch-01/*.md

# Check for duplicates
node scripts/content-hash-validator.js --folder=./generated/batch-01/

# Validate internal links
node scripts/link-validator.js --folder=./generated/batch-01/
```

---

## Phase 3: Technical Implementation (Days 4-5)

### 3.1 Route Building

**Rule: Build routes BEFORE adding to sitemap.**

```bash
# Check all routes exist
for url in $(cat sitemap-urls.txt); do
  curl -s -o /dev/null -w "%{http_code} $url\n" "$url"
done

# Fix 404s BEFORE submitting to GSC
```

### 3.2 Sitemap Generation

```javascript
// scripts/sitemap-generator.js
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!BASE_URL || BASE_URL.includes('localhost')) {
  console.error('ERROR: Set NEXT_PUBLIC_SITE_URL to production domain');
  process.exit(1);
}

// Generate sitemap with validation
// - Max 2,000 URLs per file
// - Only include 200 OK URLs
// - Lastmod dates
// - Priority based on page type
```

### 3.3 Schema Markup

**Every page gets:**
- Article schema (min)
- FAQ schema (if FAQs present)
- Breadcrumb schema
- Additional: Product, Comparison, SoftwareApplication (as applicable)

---

## Phase 4: Google Search Console (Day 6-7)

### 4.1 Launch Sequence

**Week 1:**
```
Day 1: Submit sitemap
Day 2-3: Wait for initial crawl
Day 4: Check Coverage report
Day 5-7: Fix any 404s immediately
```

**Week 2-4:**
```
Daily: Monitor Coverage report
Daily: Check "Discovered - not indexed" count
Weekly: Analyze which content types index
```

### 4.2 Gatekeeper Protocol

**DO NOT expand until:**
- [ ] 40+ pages indexed
- [ ] No 404 errors in Coverage report
- [ ] Previous batch shows healthy indexing rate (>30%)

**DocStandard Mistake:** Added 73 city-vertical URLs to sitemap before building routes. Result: 404s.

---

## Phase 5: Expansion (Month 2+)

### 5.1 Scaling Pattern

```
Phase 1: 100 pages (3 playbook types) → Wait for 40+ indexed
Phase 2: 500 pages (5 playbook types) → Wait for 200+ indexed
Phase 3: 2,000 pages (8 playbook types) → Wait for 800+ indexed
Phase 4: 10,000+ pages (all 12 playbooks)
```

### 5.2 Quality Maintenance

```bash
# Weekly quality audit
node scripts/quality-guard.js --all-batches

# Monthly content refresh
node scripts/content-refresh.js --older-than=90days

# Duplicate detection (SimHash)
node scripts/simhash-check.js --threshold=0.85
```

---

## Quick Reference: Decision Trees (Now Executable!)

**All decision trees are now programmatic. Run them:**

```bash
# List all decision trees
node skills/pseo-unified/scripts/decision-trees.js --list

# Visualize a tree
node skills/pseo-unified/scripts/decision-trees.js --show shouldGeneratePage

# Run a decision
node skills/pseo-unified/scripts/decision-trees.js shouldGeneratePage --data=./page.json
```

### Decision Tree 1: Should I Generate This Page?

**Run:** `node skills/pseo-unified/scripts/decision-trees.js shouldGeneratePage --data=./page.json`

```
Data sufficient (5+ fields)?
  ├─ NO → SKIP (insufficient data)
  └─ YES → Word count >= minimum?
      ├─ NO → REJECT (thin content)
      └─ YES → Title < 30% similar?
          ├─ NO → REJECT (duplicate)
          └─ YES → Slug unique?
              ├─ NO → REJECT (duplicate slug)
              └─ YES → GENERATE ✓
```

**Example:**
```bash
$ node decision-trees.js shouldGeneratePage --data=page.json
{
  "outcome": "APPROVED",
  "action": "GENERATE_PAGE",
  "reason": "All validation gates passed",
  "path": [
    {"question": "Data sufficient (5+ fields)?", "condition": "data_check"},
    {"question": "Estimated word count >= minimum?", "condition": "word_count_check"},
    {"question": "Title similarity < 30%?", "condition": "title_similarity"},
    {"question": "Slug is unique?", "condition": "slug_check"}
  ],
  "approved": true
}
```

### Decision Tree 2: Should I Submit to GSC?

**Run:** `node skills/pseo-unified/scripts/decision-trees.js shouldSubmitToGSC --data=./status.json`

```
All routes return 200?
  ├─ NO → Fix 404s first
  └─ YES → Sitemap valid?
      ├─ NO → Fix sitemap
      └─ YES → Previous batch 40+ indexed?
          ├─ NO → Wait
          └─ YES → SUBMIT ✓
```

### Decision Tree 3: Validate Batch

**Run:** `node skills/pseo-unified/scripts/decision-trees.js validateBatch --data=./batch.json`

```
Batch size <= 100?
  ├─ NO → SPLIT_BATCH
  └─ YES ->= 3 playbook types?
      ├─ NO → ADD_PLAYBOOK_DIVERSITY
      └─ YES → No duplicate slugs?
          ├─ NO → FIX_SLUG_DUPLICATES
          └─ YES → No duplicate keywords?
              ├─ NO → FIX_KEYWORD_DUPLICATES
              └─ YES → PROCEED ✓
```

---

## DocStandard Error Log (Learn From Our Mistakes)

| Error | Impact | How This Playbook Prevents It |
|-------|--------|------------------------------|
| 309-416 word blog posts | Thin content penalty | Pre-generation word count gate |
| 465 integration pages only | No playbook diversity | Batch diversity check (min 3 types) |
| 73 URLs 404 | GSC confusion | Route validation BEFORE sitemap |
| Duplicate slugs | Content cannibalization | Slug uniqueness gate |
| No LLM visibility | Missing AI citations | llms.txt + answer capsules (Phase 6) |

---

## ctomarketplace.com Specifics

**Domain Advantage:** 2 years old = faster indexing, higher trust

**Still Required:**
- All validation gates
- Mixed playbook batches
- Pre-generation data sufficiency checks
- Route validation before sitemap submission

**Expected Results (vs DocStandard):**
- DocStandard: 40 indexed after 2 weeks (new domain)
- ctomarketplace: Likely 100+ indexed in first week (aged domain)

**But:** Domain age doesn't fix broken URLs or thin content. Follow the playbook.

---

## Tools Checklist

Create these scripts in `scripts/`:

- [ ] `pre-generation-gate.js` - 4-gate validation
- [ ] `data-audit.js` - Data sufficiency check
- [ ] `generate-batch.js` - Batch generation with validation
- [ ] `content-hash-validator.js` - Duplicate detection
- [ ] `link-validator.js` - Internal link check
- [ ] `quality-guard.js` - Weekly audit
- [ ] `sitemap-generator.js` - Validated sitemap
- [ ] `simhash-check.js` - Near-duplicate detection

---

## Success Metrics

| Metric | Week 1 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| Indexed Pages | 20+ | 100+ | 500+ |
| Avg Word Count | 800+ | 1000+ | 1200+ |
| 404 Errors | 0 | 0 | 0 |
| Duplicate Content | 0% | < 1% | < 1% |
| GSC Status | Success | Success | Success |

---

**Final Rule:** If you haven't run the pre-generation gate, you don't have permission to generate.

*This playbook is law. Violation = rollback required.*
