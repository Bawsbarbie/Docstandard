# Cursor Prompt: Add Interlinking to Batch Page Generator Template

## File to Modify
`templates/v2-page-template.tsx`

## Current State
Batch-generated pages end with:
```tsx
{/* 9. TESTIMONIALS - TRUST ANCHOR #2 */}
<section className="pt-4 pb-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4">
    <TestimonialsSection testimonials={resolvedTestimonials} kind="general" />
  </div>
</section>
</main>
```

No internal links — these pages are orphans.

## Required Changes

### 1. Add Related Services Section

Insert this BEFORE the closing `</main>` tag:

```tsx
      {/* 10. RELATED SERVICES - Internal Linking */}
      <section className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Explore More Integrations
          </h2>
          <p className="text-slate-600 mb-8">
            Related system connections for {{CITY}} logistics operations
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Related Integration 1 */}
            <Link
              href="/integration/cargowise-to-netsuite-data-bridge"
              className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-900">CargoWise → NetSuite</h3>
              <p className="text-sm text-slate-600 mt-2">Freight data sync to ERP for {{CITY}} operations</p>
            </Link>
            
            {/* Related Integration 2 */}
            <Link
              href="/integration/magaya-to-quickbooks-bridge"
              className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-900">Magaya → QuickBooks</h3>
              <p className="text-sm text-slate-600 mt-2">SMB-friendly accounting automation for forwarders</p>
            </Link>
            
            {/* Related Integration 3 */}
            <Link
              href="/integration/sap-tm-to-oracle-otm-bridge"
              className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-900">SAP TM → Oracle</h3>
              <p className="text-sm text-slate-600 mt-2">Enterprise TMS interoperability and data sync</p>
            </Link>
          </div>
          
          {/* Vertical Hub Links */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">Browse by Service</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shipping"
                className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm hover:bg-slate-100 transition border border-slate-200"
              >
                Shipping →
              </Link>
              <Link
                href="/customs"
                className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm hover:bg-slate-100 transition border border-slate-200"
              >
                Customs →
              </Link>
              <Link
                href="/logistics"
                className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm hover:bg-slate-100 transition border border-slate-200"
              >
                Logistics →
              </Link>
            </div>
          </div>
        </div>
      </section>
```

### 2. Verify Link Import

Ensure `Link` is already imported at the top (it should be):

```typescript
import Link from "next/link"
```

## What This Achieves

Each batch-generated page now links to:
- **3 related integrations** (hardcoded most common ones)
- **3 vertical hub pages** (shipping, customs, logistics)

**Total: 6 links max** — consistent with other templates

## Why Hardcoded Links?

Batch pages are generated from a template with placeholders like `{{SYSTEM_A}}`, `{{CITY}}`. We can't dynamically determine "related" integrations at template level.

Instead, we show the **most commonly needed** integrations:
- CargoWise → NetSuite (most popular)
- Magaya → QuickBooks (SMB segment)
- SAP TM → Oracle (enterprise segment)

This gives users relevant next steps regardless of their specific `{{SYSTEM_A}}` → `{{SYSTEM_B}}` pair.

## Regenerating Pages

After updating the template, regenerate all batch pages:

```bash
cd doc-standard-web

# Clear old batches
rm -rf generated/batch2 generated/batch3 generated/batch4 generated/batch5

# Regenerate with new template
npm run generate:pages

# Or manually:
node scripts/bulk-page-generator.js --batch=2 --count=155
node scripts/bulk-page-generator.js --batch=3 --count=100
node scripts/bulk-page-generator.js --batch=4 --count=110
node scripts/bulk-page-generator.js --batch=5 --count=100

# Build and deploy
npm run build
```

## Testing

Check these URLs after regeneration:
- Any `/atlanta-cargowise-netsuite-mdec-ades` page
- Any `/chicago-magaya-oracle-mdec-ades` page

Look for "Explore More Integrations" section at bottom.

## Checklist

- [ ] Related Services section added before `</main>`
- [ ] 3 integration links (CargoWise→NetSuite, Magaya→QuickBooks, SAP→Oracle)
- [ ] 3 hub links (shipping, customs, logistics)
- [ ] `Link` import verified
- [ ] Template regenerates without errors
- [ ] Sample batch page shows interlinking section
- [ ] Total links = 6 max
