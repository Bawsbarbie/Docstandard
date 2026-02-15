# Cursor Prompt: Add Interlinking to PseoPageTemplate (Vertical/City Pages)

## File
`components/pseo/PseoPageTemplate.tsx`

## Current State
Vertical and city pages end with:
```tsx
<FAQSection faqs={content.faq} />
<TestimonialsSection kind={intent.kind} testimonials={content.testimonials} />
</main>
```

No internal links. Users can't navigate to related cities or other services.

## Required Changes

### 1. Add Related Locations & Services Section

Insert this BEFORE the closing `</main>` tag:

```tsx
{/* RELATED LOCATIONS & SERVICES — Internal Linking */}
<section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Explore More
    </h2>
    <p className="text-slate-600 mb-8">
      Related services and locations for {intent.name.toLowerCase()}
    </p>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Same intent, other cities */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          {intent.name} in Other Cities
        </h3>
        <ul className="space-y-3">
          {getRelatedCities(city.slug, 2).map((cityName) => (
            <li key={cityName}>
              <Link 
                href={`/${country?.code?.toLowerCase() || 'us'}/${state?.code?.toLowerCase() || 'ca'}/${cityName.toLowerCase().replace(/\s+/g, '-')}/${intent.slug}`}
                className="text-[#2563eb] hover:underline flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {intent.name} in {cityName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Same city, other intents/verticals */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Other Services in {city.name}
        </h3>
        <ul className="space-y-3">
          {getRelatedIntents(intent.slug, intent.kind, 2).map((relatedIntent) => (
            <li key={relatedIntent.slug}>
              <Link 
                href={`/${country?.code?.toLowerCase() || 'us'}/${state?.code?.toLowerCase() || 'ca'}/${city.slug}/${relatedIntent.slug}`}
                className="text-[#2563eb] hover:underline flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                {relatedIntent.name} in {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    {/* Integration Links */}
    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-3">
        System Integrations for {city.name}
      </h3>
      <p className="text-slate-600 text-sm mb-4">
        Connect your {intent.name.toLowerCase()} workflows to your TMS or ERP
      </p>
      <div className="flex flex-wrap gap-3">
        {getRelatedIntegrationsForCity(intent.kind).map((integration) => (
          <Link
            key={integration.slug}
            href={`/integration/${integration.slug}`}
            className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
          >
            {integration.label} →
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
```

### 2. Add Helper Functions

Add these helper functions inside the `PseoPageTemplate` component (before the return statement):

```typescript
// Helper: Get related cities for same intent
const getRelatedCities = (currentCitySlug: string, maxResults: number = 2): string[] => {
  // Map of related cities by major logistics hubs
  const cityClusters: Record<string, string[]> = {
    "los-angeles": ["Long Beach", "Oakland", "Seattle"],
    "long-beach": ["Los Angeles", "Oakland", "San Diego"],
    "new-york": ["Newark", "Philadelphia", "Boston"],
    "newark": ["New York", "Philadelphia", "Baltimore"],
    "chicago": ["Detroit", "Milwaukee", "Indianapolis"],
    "houston": ["Dallas", "San Antonio", "New Orleans"],
    "miami": ["Fort Lauderdale", "Tampa", "Jacksonville"],
    "seattle": ["Portland", "Oakland", "Los Angeles"],
    "oakland": ["San Francisco", "San Jose", "Los Angeles"],
    "san-francisco": ["Oakland", "San Jose", "Sacramento"],
    "antwerp": ["Rotterdam", "Hamburg", "Bremerhaven"],
    "rotterdam": ["Antwerp", "Amsterdam", "Hamburg"],
    "hamburg": ["Rotterdam", "Antwerp", "Bremerhaven"],
    "singapore": ["Port Klang", "Jakarta", "Bangkok"],
    "dubai": ["Abu Dhabi", "Doha", "Kuwait City"],
    "london": ["Felixstowe", "Southampton", "Liverpool"],
    "felixstowe": ["London", "Southampton", "Immingham"],
    "southampton": ["London", "Felixstowe", "Plymouth"],
  };

  const related = cityClusters[currentCitySlug.toLowerCase()] || [];
  return related.slice(0, maxResults);
};

// Helper: Get related intents for same city
const getRelatedIntents = (
  currentIntentSlug: string,
  currentKind: string,
  maxResults: number = 2
): Array<{ slug: string; name: string }> = {
  // Define related intents by vertical category
  const intentMap: Record<
    string,
    Array<{ slug: string; name: string }>
  > = {
    shipping: [
      { slug: "customs-declaration-preparation", name: "Customs Declaration Preparation" },
      { slug: "compliance-document-processing", name: "Compliance Document Processing" },
      { slug: "freight-bill-audit", name: "Freight Bill Audit" },
    ],
    customs: [
      { slug: "shipping-document-processing", name: "Shipping Document Processing" },
      { slug: "compliance-document-processing", name: "Compliance Document Processing" },
      { slug: "trade-finance-documentation", name: "Trade Finance Documentation" },
    ],
    compliance: [
      { slug: "customs-declaration-preparation", name: "Customs Declaration Preparation" },
      { slug: "shipping-document-processing", name: "Shipping Document Processing" },
      { slug: "audit-ready-documentation", name: "Audit-Ready Documentation" },
    ],
    finance: [
      { slug: "invoice-processing", name: "Invoice Processing" },
      { slug: "freight-bill-audit", name: "Freight Bill Audit" },
      { slug: "shipping-document-processing", name: "Shipping Document Processing" },
    ],
    logistics: [
      { slug: "shipping-document-processing", name: "Shipping Document Processing" },
      { slug: "customs-declaration-preparation", name: "Customs Declaration Preparation" },
      { slug: "freight-bill-audit", name: "Freight Bill Audit" },
    ],
    invoice: [
      { slug: "freight-bill-audit", name: "Freight Bill Audit" },
      { slug: "shipping-document-processing", name: "Shipping Document Processing" },
      { slug: "finance-document-processing", name: "Finance Document Processing" },
    ],
  };

  const related = intentMap[currentKind] || intentMap["logistics"] || [];
  return related
    .filter((i) => i.slug !== currentIntentSlug)
    .slice(0, maxResults);
};

// Helper: Get relevant integrations for this vertical/city
const getRelatedIntegrationsForCity = (
  verticalKind: string
): Array<{ slug: string; label: string }> = {
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
      { slug: "oracle-to-magaya-bridge", label: "Oracle → Magaya" },
    ],
    finance: [
      { slug: "magaya-to-quickbooks-bridge", label: "Magaya → QuickBooks" },
      { slug: "flexport-to-netsuite-bridge", label: "Flexport → NetSuite" },
    ],
    logistics: [
      { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise → NetSuite" },
      { slug: "motive-to-sap-ifta-normalization", label: "Motive → SAP" },
    ],
    invoice: [
      { slug: "magaya-to-quickbooks-bridge", label: "Magaya → QuickBooks" },
      { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise → NetSuite" },
    ],
  };

  return integrationMap[verticalKind] || integrationMap["logistics"] || [];
};
```

### 3. Add Required Imports

At the top of the file, add:

```typescript
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
```

### 4. Ensure Data is Available

The `pageModel` already contains:
- `city` (with `name`, `slug`)
- `intent` (with `name`, `slug`, `kind`)
- `country` (with `code`)
- `state` (with `code`)

Make sure these are destructured from `pageModel` at the top of the component:

```typescript
const { city, intent, content, meta, technical, country, state } = pageModel
```

If `country` and `state` are not in `pageModel`, you may need to pass them from the parent or use fallback values.

## What This Achieves

Each vertical/city page now links to:
- **2 other cities** with same intent (e.g., LA → Long Beach, Oakland)
- **2 other intents** in same city (e.g., Shipping → Customs, Compliance)
- **2 relevant integrations** for that vertical

**Total: 6 links** — quality over quantity

## Testing

After changes, verify these URLs have the Related Locations section:
- `/us/ca/los-angeles/shipping`
- `/us/tx/houston/customs`
- `/europe/nl/rotterdam/logistics`

## Important Notes

1. **City clusters are hardcoded** — Add more as needed for major logistics hubs
2. **Fallback URLs** — Use `/us/ca/` prefix if country/state codes aren't available in pageModel
3. **Max 2 per category** — Keeps it clean and focused
4. **Responsive grid** — 2 columns on desktop, stacks on mobile

## Checklist

- [ ] "Explore More" section added before `</main>`
- [ ] `getRelatedCities()` helper added
- [ ] `getRelatedIntents()` helper added
- [ ] `getRelatedIntegrationsForCity()` helper added
- [ ] `Link`, `MapPin`, `ArrowRight` imported
- [ ] 2 related cities displayed
- [ ] 2 related intents displayed
- [ ] 2 integrations displayed
- [ ] Total = 6 links exactly
- [ ] Build passes without errors
