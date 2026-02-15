# Cursor Prompt: Add Interlinking to Urgency Pages

## File
`app/(pseo)/[vertical]/[intent-slug]/[urgency]/[document]/[action]/page.tsx`

## Current State
Urgency pages have no internal links — users hit a dead end after reading.

## Required Changes

### 1. Add "Related Services" Section

Insert this BEFORE the final CTA section (before the last `<section>` with the dark background):

```tsx
{/* RELATED SERVICES — Internal Linking */}
<section className="py-16 px-6 bg-slate-50 border-y border-slate-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Related {cityName} Services
    </h2>
    <p className="text-slate-600 mb-8">
      Explore other document processing options in {cityName}
    </p>
    
    <div className="grid md:grid-cols-3 gap-6">
      {/* Same City, Other Documents */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">
          Other Documents in {cityName}
        </h3>
        <ul className="space-y-2">
          {getRelatedDocuments(params.document, 2).map((doc) => (
            <li key={doc.slug}>
              <Link 
                href={`/${params.vertical}/${params["intent-slug"]}/${params.urgency}/${doc.slug}/${params.action}`}
                className="text-[#2563eb] hover:underline text-sm"
              >
                {doc.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Same Document, Other Urgency Levels */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">
          Other {document.singular} Timelines
        </h3>
        <ul className="space-y-2">
          {getRelatedUrgencies(params.urgency, 2).map((urg) => (
            <li key={urg.slug}>
              <Link 
                href={`/${params.vertical}/${params["intent-slug"]}/${urg.slug}/${params.document}/${params.action}`}
                className="text-[#2563eb] hover:underline text-sm"
              >
                {urg.label} {document.singular}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Same City, Other Verticals */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">
          Other {cityName} Operations
        </h3>
        <ul className="space-y-2">
          {getRelatedVerticals(params.vertical, 2).map((vert) => (
            <li key={vert.slug}>
              <Link 
                href={`/${vert.slug}/${params["intent-slug"]}/${params.urgency}/${params.document}/${params.action}`}
                className="text-[#2563eb] hover:underline text-sm"
              >
                {vert.label} in {cityName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    {/* Integration Links */}
    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-3">
        {cityName} System Integrations
      </h3>
      <p className="text-slate-600 text-sm mb-4">
        Connect your {document.plural.toLowerCase()} directly to your TMS or ERP
      </p>
      <div className="flex flex-wrap gap-3">
        {getRelatedIntegrations(params.vertical, 2).map((integration) => (
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

Add these helper functions after the existing configs (urgencyConfig, documentConfig, etc.):

```typescript
// Helper: Get related documents (exclude current, max 2)
const getRelatedDocuments = (currentDoc: string, maxResults: number = 2) => {
  const allDocs = [
    { slug: "bill-of-lading", label: "Bill of Lading" },
    { slug: "customs-declaration", label: "Customs Declaration" },
    { slug: "invoice", label: "Invoice" },
    { slug: "packing-list", label: "Packing List" },
    { slug: "certificate-of-origin", label: "Certificate of Origin" },
    { slug: "freight-document", label: "Freight Document" },
    { slug: "shipping-label", label: "Shipping Label" },
    { slug: "delivery-receipt", label: "Delivery Receipt" },
    { slug: "commercial-invoice", label: "Commercial Invoice" },
  ]
  return allDocs
    .filter(d => d.slug !== currentDoc)
    .slice(0, maxResults)
}

// Helper: Get related urgency levels (exclude current, max 2)
const getRelatedUrgencies = (currentUrgency: string, maxResults: number = 2) => {
  const allUrgencies = [
    { slug: "urgent", label: "Urgent" },
    { slug: "same-day", label: "Same-Day" },
    { slug: "emergency", label: "Emergency" },
    { slug: "rush", label: "Rush" },
    { slug: "priority", label: "Priority" },
  ]
  return allUrgencies
    .filter(u => u.slug !== currentUrgency)
    .slice(0, maxResults)
}

// Helper: Get related verticals (exclude current, max 2)
const getRelatedVerticals = (currentVertical: string, maxResults: number = 2) => {
  const allVerticals = [
    { slug: "shipping", label: "Shipping" },
    { slug: "customs", label: "Customs" },
    { slug: "compliance", label: "Compliance" },
    { slug: "finance", label: "Finance" },
    { slug: "logistics", label: "Logistics" },
  ]
  return allVerticals
    .filter(v => v.slug !== currentVertical)
    .slice(0, maxResults)
}

// Helper: Get relevant integrations for vertical (max 2)
const getRelatedIntegrations = (currentVertical: string, maxResults: number = 2) => {
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
  }
  return (integrationMap[currentVertical] || integrationMap["logistics"] || []).slice(0, maxResults)
}
```

### 3. Ensure Link Import

Make sure Link is imported at the top:

```typescript
import Link from "next/link"
```

## What This Achieves

Each urgency page now links to:
- **2 other document types** in same city
- **2 other urgency levels** for same document
- **2 other verticals** in same city
- **2 relevant integrations**

**Total: 6 links max** — quality over quantity

## Benefits

- ✅ No more orphan pages
- ✅ Crawlers discover related content
- ✅ Link equity flows to priority pages
- ✅ Users find related services
- ✅ Better topical authority

## Testing

After changes, verify these URLs have the Related Services section:
- `/logistics/antwerp/urgent/bill-of-lading/processing`
- `/customs/rotterdam/same-day/customs-declaration/preparation`
- `/compliance/singapore/emergency/certificate-of-origin/processing`

## Checklist

- [ ] "Related Services" section added before final CTA
- [ ] `getRelatedDocuments()` helper added (max 2)
- [ ] `getRelatedUrgencies()` helper added (max 2)
- [ ] `getRelatedVerticals()` helper added (max 2)
- [ ] `getRelatedIntegrations()` helper added (max 2)
- [ ] `Link` imported from "next/link"
- [ ] Total links = 6 max
- [ ] Build passes without errors
