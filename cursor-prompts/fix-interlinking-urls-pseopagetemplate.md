# Cursor Prompt: Fix Interlinking URLs in PseoPageTemplate

## Problem
The interlinking URLs in PseoPageTemplate are generating 404s because they use incorrect route patterns.

## Current (Broken) URLs:
- ❌ `/us/ca/los-angeles/shipping` — `shipping` is a vertical, not an intent slug
- ❌ `/us/tx/houston/customs` — `customs` is a vertical, not an intent slug
- ❌ `/europe/nl/rotterdam/logistics` — `europe` isn't a country code

## Correct URL Patterns:

### Pattern 1: Vertical + City (Simpler)
- ✅ `/shipping/los-angeles` — Vertical hub for city
- ✅ `/customs/houston` — Vertical hub for city
- ✅ `/logistics/rotterdam` — Vertical hub for city

### Pattern 2: Full Canonical (Country/State/City/Intent)
- ✅ `/us/ca/los-angeles/bill-of-lading-data-processing`
- ✅ `/nl/zh/rotterdam/clean-logistics-data-for-sap-s4hana`

## Fix: Update Helper Functions

Replace the broken helper functions in `PseoPageTemplate.tsx` with these corrected versions:

```typescript
// Helper: Get related cities with CORRECT URLs (vertical + city pattern)
const getRelatedCityLinks = (
  currentCitySlug: string,
  currentVertical: string,
  maxResults: number = 2
): Array<{ name: string; href: string }> = {
  // City clusters with their correct slugs
  const cityClusters: Record<string, Array<{ name: string; slug: string }>> = {
    "los-angeles": [
      { name: "Long Beach", slug: "long-beach" },
      { name: "Oakland", slug: "oakland" },
    ],
    "long-beach": [
      { name: "Los Angeles", slug: "los-angeles" },
      { name: "Oakland", slug: "oakland" },
    ],
    "new-york": [
      { name: "Newark", slug: "newark" },
      { name: "Philadelphia", slug: "philadelphia" },
    ],
    "chicago": [
      { name: "Detroit", slug: "detroit" },
      { name: "Milwaukee", slug: "milwaukee" },
    ],
    "houston": [
      { name: "Dallas", slug: "dallas" },
      { name: "San Antonio", slug: "san-antonio" },
    ],
    "miami": [
      { name: "Fort Lauderdale", slug: "fort-lauderdale" },
      { name: "Tampa", slug: "tampa" },
    ],
    "antwerp": [
      { name: "Rotterdam", slug: "rotterdam" },
      { name: "Hamburg", slug: "hamburg" },
    ],
    "rotterdam": [
      { name: "Antwerp", slug: "antwerp" },
      { name: "Amsterdam", slug: "amsterdam" },
    ],
    "hamburg": [
      { name: "Rotterdam", slug: "rotterdam" },
      { name: "Antwerp", slug: "antwerp" },
    ],
    "singapore": [
      { name: "Port Klang", slug: "port-klang" },
      { name: "Jakarta", slug: "jakarta" },
    ],
    "dubai": [
      { name: "Abu Dhabi", slug: "abu-dhabi" },
      { name: "Doha", slug: "doha" },
    ],
    "london": [
      { name: "Felixstowe", slug: "felixstowe" },
      { name: "Southampton", slug: "southampton" },
    ],
  };

  const related = cityClusters[currentCitySlug.toLowerCase()] || [];
  
  // Return with CORRECT URL pattern: /vertical/city-slug
  return related
    .slice(0, maxResults)
    .map((city) => ({
      name: city.name,
      href: `/${currentVertical}/${city.slug}`,
    }));
};

// Helper: Get related verticals for same city with CORRECT URLs
const getRelatedVerticalLinks = (
  currentCitySlug: string,
  currentVertical: string,
  maxResults: number = 2
): Array<{ name: string; label: string; href: string }> = {
  const verticals = [
    { slug: "shipping", label: "Shipping" },
    { slug: "customs", label: "Customs" },
    { slug: "compliance", label: "Compliance" },
    { slug: "finance", label: "Finance" },
    { slug: "logistics", label: "Logistics" },
  ];

  // Return with CORRECT URL pattern: /vertical/city-slug
  return verticals
    .filter((v) => v.slug !== currentVertical)
    .slice(0, maxResults)
    .map((v) => ({
      name: v.slug,
      label: v.label,
      href: `/${v.slug}/${currentCitySlug}`,
    }));
};

// Helper: Get related integrations (these URLs are already correct)
const getRelatedIntegrationLinks = (
  currentVertical: string,
  maxResults: number = 2
): Array<{ label: string; href: string }> = {
  const integrationMap: Record<string, Array<{ slug: string; label: string }>> = {
    shipping: [
      { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise → NetSuite" },
      { slug: "magaya-to-quickbooks-bridge", label: "Magaya → QuickBooks" },
    ],
    customs: [
      { slug: "descartes-to-netsuite-customs-bridge", label: "Descartes → NetSuite" },
      { slug: "sap-tm-to-oracle-otm-bridge", label: "SAP TM → Oracle" },
    ],
    compliance: [
      { slug: "cargowise-to-sap-s4hana-bridge", label: "CargoWise → SAP" },
      { slug: "edi-document-normalization-services", label: "EDI Normalization" },
    ],
    finance: [
      { slug: "magaya-to-quickbooks-bridge", label: "Magaya → QuickBooks" },
      { slug: "flexport-to-netsuite-bridge", label: "Flexport → NetSuite" },
    ],
    logistics: [
      { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise → NetSuite" },
      { slug: "motive-to-sap-ifta-normalization", label: "Motive → SAP" },
    ],
  };

  return (integrationMap[currentVertical] || integrationMap["logistics"] || [])
    .slice(0, maxResults)
    .map((i) => ({
      label: i.label,
      href: `/integration/${i.slug}`,
    }));
};
```

## Updated Section JSX

Replace the "Related Locations & Services" section with this corrected version:

```tsx
{/* RELATED LOCATIONS & SERVICES — Internal Linking */}
<section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Explore More
    </h2>
    <p className="text-slate-600 mb-8">
      Related services and locations
    </p>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Related cities (same vertical) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Other Locations
        </h3>
        <ul className="space-y-3">
          {getRelatedCityLinks(city.slug, intent.kind, 2).map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className="text-[#2563eb] hover:underline flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Related verticals (same city) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Other Services in {city.name}
        </h3>
        <ul className="space-y-3">
          {getRelatedVerticalLinks(city.slug, intent.kind, 2).map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className="text-[#2563eb] hover:underline flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    {/* Integration Links */}
    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-3">
        System Integrations
      </h3>
      <div className="flex flex-wrap gap-3">
        {getRelatedIntegrationLinks(intent.kind, 2).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
```

## Key Changes

| Before (Broken) | After (Fixed) |
|-----------------|---------------|
| `/us/ca/los-angeles/shipping` | `/shipping/los-angeles` |
| `/us/tx/houston/customs` | `/customs/houston` |
| `/europe/nl/rotterdam/logistics` | `/logistics/rotterdam` |

## Testing

Verify these URLs work after the fix:
- `/shipping/los-angeles` ✅
- `/customs/houston` ✅
- `/logistics/rotterdam` ✅
- `/integration/cargowise-to-netsuite-data-bridge` ✅

## Checklist

- [ ] Old helper functions removed
- [ ] New `getRelatedCityLinks()` added
- [ ] New `getRelatedVerticalLinks()` added
- [ ] New `getRelatedIntegrationLinks()` added
- [ ] Section JSX updated with correct hrefs
- [ ] Links use `/vertical/city-slug` pattern
- [ ] No more 404s on interlinking
- [ ] Build passes
