# Implementation Plan: Add Interlinking to All pSEO Pages

## Goal
Fix orphan page issue by adding 4-6 quality internal links to all existing pSEO pages before the next batch deploys.

## Pages to Update

### 1. Urgency Pages (1,600 pages)
**File:** `app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

**Add:**
- "Related Services" section before final CTA
- 4-6 links max:
  - 2 other documents in same city
  - 2 other verticals in same city
  - 1-2 related integrations

**Status:** ✅ Prompt ready in `cursor-prompts/add-interlinking-urgency-pages.md`

---

### 2. Integration Pages (19 pages)
**File:** `app/(pseo)/integration/[integration-slug]/page.tsx`

**Add before `</main>`:**
```tsx
{/* RELATED INTEGRATIONS */}
<section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Related Integrations
    </h2>
    <p className="text-slate-600 mb-8">
      Explore other system connections for your logistics stack
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      {/* Dynamic: Show integrations with same systemA or systemB */}
      {getRelatedIntegrations(systemA, systemB).map((integration) => (
        <Link
          key={integration.slug}
          href={`/integration/${integration.slug}`}
          className="p-6 bg-white rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition"
        >
          <h3 className="font-semibold text-slate-900">
            {integration.systemA} → {integration.systemB}
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            {integration.tagline}
          </p>
        </Link>
      ))}
    </div>
    
    {/* Link to vertical hubs */}
    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-3">
        Browse by Service
      </h3>
      <div className="flex flex-wrap gap-3">
        {['shipping', 'customs', 'compliance', 'finance'].map((v) => (
          <Link
            key={v}
            href={`/${v}`}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition capitalize"
          >
            {v} Services →
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
```

**Helper function to add:**
```typescript
const getRelatedIntegrations = (currentSystemA: string, currentSystemB: string) => {
  // Return integrations that share systemA OR systemB with current
  // Max 3 integrations
  // Filter out current integration
}
```

---

### 3. Vertical/City Pages (via PseoPageTemplate)
**File:** `components/pseo/PseoPageTemplate.tsx`

**Add before `</main>`:**
```tsx
{/* RELATED LOCATIONS & SERVICES */}
<section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Same intent, other cities */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">
          {intent.name} in Other Cities
        </h3>
        <ul className="space-y-2">
          {getRelatedCities(city.slug).map((c) => (
            <li key={c.slug}>
              <Link 
                href={`/${country.code}/${state?.code}/${c.slug}/${intent.slug}`}
                className="text-[#2563eb] hover:underline text-sm"
              >
                {intent.name} in {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Same city, other intents */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">
          Other Services in {city.name}
        </h3>
        <ul className="space-y-2">
          {getRelatedIntents(intent.slug).map((i) => (
            <li key={i.slug}>
              <Link 
                href={`/${country.code}/${state?.code}/${city.slug}/${i.slug}`}
                className="text-[#2563eb] hover:underline text-sm"
              >
                {i.name} in {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
```

**Note:** This requires passing `city`, `state`, `country`, `intent` data to PseoPageTemplate (should already be available via pageModel).

---

## Implementation Order

1. **Start with Integration pages** (easiest, 1 file, 19 pages)
2. **Then PseoPageTemplate** (affects all vertical/city pages)
3. **Finally Urgency pages** (most complex, 1,600 pages)

## Testing

Before full deploy:
```bash
# Build locally
npm run build

# Test specific URLs
# Integration: /integration/cargowise-to-netsuite-data-bridge
# Vertical: /us/ca/los-angeles/shipping
# Urgency: /logistics/antwerp/urgent/bill-of-lading/processing
```

## Deployment Steps

1. Update all 3 templates
2. Build (will take time with 1,600+ pages)
3. Deploy to production
4. Resubmit sitemap to GSC
5. Monitor indexing improvements over next 7-14 days

## Expected Impact

- Crawlers discover pages faster
- Link equity flows to priority pages
- Lower bounce rate (users navigate to related content)
- Better topical authority signals to Google
- No more orphan pages

## Time Estimate

| Task | Time |
|------|------|
| Integration pages | 30 min |
| PseoPageTemplate | 45 min |
| Urgency pages | 45 min |
| Testing | 30 min |
| Build + Deploy | 1-2 hours |
| **Total** | **~4 hours** |

---

**Ready to start?** I recommend beginning with Integration pages (easiest win).
