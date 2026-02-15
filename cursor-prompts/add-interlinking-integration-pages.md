# Cursor Prompt: Add Interlinking to Integration Pages

## File
`app/(pseo)/integration/[integration-slug]/page.tsx`

## Current State
Integration pages end with:
```tsx
<FAQSection faqs={defaultFaqs} />
<TestimonialsSection testimonials={defaultTestimonials} kind="general" />
</main>
```

No internal links. Users hit a dead end.

## Required Changes

### 1. Add Related Integrations Section

Insert this BEFORE the closing `</main>` tag:

```tsx
{/* RELATED INTEGRATIONS — Internal Linking */}
<section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Related Integrations
    </h2>
    <p className="text-slate-600 mb-8">
      Explore other system connections for your logistics stack
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      {getRelatedIntegrations(systemA, systemB, params["integration-slug"]).map((integration) => (
        <Link
          key={integration.slug}
          href={`/integration/${integration.slug}`}
          className="p-6 bg-white rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition"
        >
          <h3 className="font-semibold text-slate-900">
            {integration.systemA} → {integration.systemB}
          </h3>
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">
            {integration.description}
          </p>
        </Link>
      ))}
    </div>
    
    {/* Vertical Hub Links */}
    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-3">
        Browse by Service
      </h3>
      <div className="flex flex-wrap gap-3">
        {[
          { slug: "shipping", label: "Shipping" },
          { slug: "customs", label: "Customs" },
          { slug: "compliance", label: "Compliance" },
          { slug: "finance", label: "Finance" },
          { slug: "logistics", label: "Logistics" },
        ].map((v) => (
          <Link
            key={v.slug}
            href={`/${v.slug}`}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
          >
            {v.label} Services →
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>
```

### 2. Add Helper Function

Add this function near the top of the file (after `loadIntegrationDetails`):

```typescript
// Helper: Get related integrations (share systemA or systemB)
const getRelatedIntegrations = (
  currentSystemA: string,
  currentSystemB: string,
  currentSlug: string
): Array<{ slug: string; systemA: string; systemB: string; description: string }> => {
  // Hardcoded related integrations for common systems
  const integrationMap: Record<
    string,
    Array<{ slug: string; systemA: string; systemB: string; description: string }>
  > = {
    cargowise: [
      { slug: "cargowise-to-netsuite-data-bridge", systemA: "CargoWise", systemB: "NetSuite", description: "Seamless freight data sync to your ERP" },
      { slug: "cargowise-to-sap-s4hana-bridge", systemA: "CargoWise", systemB: "SAP S/4HANA", description: "Enterprise-grade logistics integration" },
      { slug: "cargowise-to-quickbooks-bridge", systemA: "CargoWise", systemB: "QuickBooks", description: "SMB-friendly accounting sync" },
    ],
    magaya: [
      { slug: "magaya-to-oracle-integration", systemA: "Magaya", systemB: "Oracle", description: "Connect freight operations to enterprise systems" },
      { slug: "magaya-to-dynamics365-normalization", systemA: "Magaya", systemB: "Dynamics 365", description: "Microsoft ecosystem integration" },
      { slug: "magaya-to-quickbooks-bridge", systemA: "Magaya", systemB: "QuickBooks", description: "Streamlined accounting for freight" },
    ],
    sap: [
      { slug: "sap-tm-to-oracle-otm-bridge", systemA: "SAP TM", systemB: "Oracle OTM", description: "Enterprise TMS interoperability" },
      { slug: "sap-s4hana-to-cargowise-bridge", systemA: "SAP S/4HANA", systemB: "CargoWise", description: "Connect SAP to freight operations" },
      { slug: "clean-logistics-data-for-sap-s4hana", systemA: "Logistics", systemB: "SAP S/4HANA", description: "Clean data ingestion for SAP" },
    ],
    oracle: [
      { slug: "oracle-to-sap-tm-integration", systemA: "Oracle", systemB: "SAP TM", description: "Cross-platform TMS connectivity" },
      { slug: "oracle-to-magaya-bridge", systemA: "Oracle", systemB: "Magaya", description: "Enterprise to freight forwarder sync" },
      { slug: "descartes-to-oracle-integration", systemA: "Descartes", systemB: "Oracle", description: "Global logistics visibility" },
    ],
    descartes: [
      { slug: "descartes-to-mercurygate-normalization", systemA: "Descartes", systemB: "MercuryGate", description: "TMS platform interoperability" },
      { slug: "descartes-to-netsuite-customs-bridge", systemA: "Descartes", systemB: "NetSuite", description: "Customs data to ERP workflow" },
      { slug: "descartes-to-oracle-integration", systemA: "Descartes", systemB: "Oracle", description: "Global trade compliance integration" },
    ],
    mercurygate: [
      { slug: "mercurygate-to-descartes-integration", systemA: "MercuryGate", systemB: "Descartes", description: "Enhanced visibility and compliance" },
      { slug: "mercurygate-to-sap-tm-bridge", systemA: "MercuryGate", systemB: "SAP TM", description: "Multi-TMS enterprise setup" },
      { slug: "in-house-team-vs-outsourced-processing", systemA: "Manual", systemB: "DocStandard", description: "Compare processing approaches" },
    ],
    motive: [
      { slug: "motive-to-sap-ifta-normalization", systemA: "Motive", systemB: "SAP", description: "Fleet data to ERP normalization" },
      { slug: "motive-to-microsoft-fleet-sync", systemA: "Motive", systemB: "Microsoft", description: "Fleet intelligence integration" },
      { slug: "motive-to-netsuite-expense-bridge", systemA: "Motive", systemB: "NetSuite", description: "Vehicle expense automation" },
    ],
    flexport: [
      { slug: "flexport-to-netsuite-bridge", systemA: "Flexport", systemB: "NetSuite", description: "Modern freight to ERP sync" },
      { slug: "flexport-vs-freightos-comparison", systemA: "Flexport", systemB: "Freightos", description: "Platform comparison guide" },
      { slug: "edi-vs-api-integration", systemA: "EDI", systemB: "API", description: "Integration method comparison" },
    ],
  };

  // Find related integrations by matching systemA or systemB
  const systemAKey = currentSystemA.toLowerCase().replace(/\s+/g, "");
  const systemBKey = currentSystemB.toLowerCase().replace(/\s+/g, "");

  const related: Array<{ slug: string; systemA: string; systemB: string; description: string }> = [];

  // Check if current systemA has related integrations
  if (integrationMap[systemAKey]) {
    related.push(...integrationMap[systemAKey]);
  }

  // Check if current systemB has related integrations
  if (integrationMap[systemBKey]) {
    related.push(...integrationMap[systemBKey]);
  }

  // Filter out current integration and duplicates
  const unique = related
    .filter((i) => i.slug !== currentSlug)
    .filter((i, index, self) => index === self.findIndex((t) => t.slug === i.slug));

  // Return max 3 related integrations
  return unique.slice(0, 3);
};
```

### 3. Ensure Link Import

Make sure `Link` is imported at the top:

```typescript
import Link from "next/link"
```

## What This Achieves

Each integration page now links to:
- **3 related integrations** (same systems or similar pairs)
- **3 vertical hub pages** (shipping, customs, logistics)

**Total: 6 links max** — quality over quantity

## Testing

After changes, verify these URLs have the Related Integrations section:
- `/integration/cargowise-to-netsuite-data-bridge`
- `/integration/magaya-to-quickbooks-bridge`
- `/integration/sap-tm-to-oracle-otm-bridge`

## Checklist

- [ ] Related Integrations section added before `</main>`
- [ ] `getRelatedIntegrations` helper function added
- [ ] `Link` imported from "next/link"
- [ ] 3 related integrations displayed dynamically
- [ ] 3 vertical hub links displayed (shipping, customs, logistics)
- [ ] No more than 6 total links
- [ ] Build passes without errors
