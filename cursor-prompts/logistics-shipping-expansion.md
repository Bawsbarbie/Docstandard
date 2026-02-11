# Cursor Prompt: Implement Logistics & Shipping Page Expansion + Dynamic Diagrams

## Context
You are expanding two thin hub pages (`/logistics` and `/shipping`) from ~200 words to 1,500+ words each, plus implementing a dynamic SVG diagram system. These pages are currently "Discovered - not indexed" in Google Search Console because they lack technical depth.

## Files to Read First
1. `/content-blueprints/logistics-page-content.md` — Full content structure
2. `/content-blueprints/shipping-page-content.md` — Full content structure  
3. `/components/diagrams/README.md` — Diagram system overview
4. `/components/diagrams/DiagramRegistry.ts` — Color schemes and configs
5. `/components/diagrams/SVGDiagramGenerator.tsx` — SVG generation logic
6. Current pages: `/app/(pseo)/logistics/page.tsx` and `/app/(pseo)/shipping/page.tsx`

---

## TASK 1: Implement Dynamic Diagram System

### Create These Files:

**1. `components/diagrams/DiagramRegistry.ts`**
- Export types: `DiagramType`, `VerticalColorScheme`, `DiagramConfig`
- Create `PageToDiagramMap` with sample configs
- Define `ColorPalettes` for 6 verticals (finance, customs, compliance, invoice, shipping, logistics)
- Export `getRandomVariant()` function

**2. `components/diagrams/SVGDiagramGenerator.tsx`**
- Create `generateSVGDiagram()` function that switches on diagram type
- Implement 4 SVG generators:
  - `generateDataFlowSVG()` — Source → Target with arrow
  - `generatePortMapSVG()` — Location + document icons
  - `generateTimelineSVG()` — SLA badge + processing steps
  - `generateChecklistSVG()` — Validation flow with checkmarks
- Create React wrapper component that uses `dangerouslySetInnerHTML`

**3. `components/diagrams/IntegrationDiagram.tsx`**
- Pre-built component for integration pages
- Props: `sourceSystem`, `targetSystem`, `vertical`, `fields[]`
- Server-side version: `getIntegrationDiagramSVG()`

### Diagram Requirements:
- All SVGs must be self-contained (no external resources)
- Use gradients from color palettes
- Include drop shadows via SVG filters
- Support 800×200 for data flow, 600×300 for port maps
- Server-renderable (Next.js App Router compatible)

---

## TASK 2: Expand /logistics Page

### Replace Current Content
Current page is a thin `VerticalHub` component. Replace with full content structure.

### Sections to Add (from blueprint):

**Hero (150 words)**
```tsx
<section className="relative overflow-hidden py-20 px-6">
  {/* Use existing banner image: /images/banners/logistics.webp */}
  <div className="absolute inset-0 z-0">
    <Image src="/images/banners/logistics.webp" alt="..." fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />
  </div>
  {/* H1, subtitle, body, CTA */}
</section>
```

**Problem Section (300 words)**
- 4 pain points with 2-3 sentences each
- Include statistic callout blockquote

**Pipeline Section (400 words)**
- 5 stages: Ingestion → Classification → Extraction → Normalization → Delivery
- Each stage: description + technical detail bullets

**Field Mapping Section (300 words)**
- Create responsive table component
- BOL fields: bol_number, shipper.name, consignee.name, vessel_name, etc.
- Packing list fields: invoice_reference, items[].sku, etc.

**Integration Section (250 words)**
- TMS list: CargoWise, SAP TM, Oracle, MercuryGate, Blue Yonder
- ERP list: SAP S/4HANA, NetSuite, Dynamics 365, Sage
- WMS list: Blue Yonder, SAP EWM, Manhattan, HighJump
- Delivery formats: JSON, XML, CSV, EDI, Direct API

**SLA Section (200 words)**
- Standard: 12-24 hours
- Expedited: 4-8 hours (50% surcharge)
- Large batches: 3-5 days
- Quality guarantees: 99.5% accuracy

**Internal Links Section (100 words)**
- Link to /finance, /customs, /compliance, /shipping
- Link FROM indexed pages TO this page (add to /finance, /customs, /compliance)

---

## TASK 3: Expand /shipping Page

### Same Structure as Logistics BUT Different Content:

**Focus Areas:**
- Ocean freight (BOLs, manifests) 
- Air freight (AWBs)
- NOT ground/shipping (that's logistics)

**Key Sections:**
- Ocean BOL processing (master vs house, telex release, sea waybills)
- Air waybill processing (MAWB vs HAWB, IATA standards)
- Field mapping tables (different fields for ocean vs air)
- Container number validation (ISO 6346 format)
- AWB number validation (11-digit format with check digit)
- ISF (10+2) filing support for US customs
- AES export filing preparation

**Special Technical Details:**
- Chargeable weight calculation for air
- Container check digit validation
- Seal number capture
- Multi-currency charge extraction

---

## TASK 4: Add Diagrams to Pages

### On /logistics Page:
Add a pipeline diagram showing the 5-stage process:
```tsx
import SVGDiagram from '@/components/diagrams/SVGDiagramGenerator'

<SVGDiagram
  config={{
    type: 'pipeline', // You may need to add this type
    colorScheme: 'logistics',
    width: 800,
    height: 120,
    data: {
      steps: ['Ingest', 'Classify', 'Extract', 'Normalize', 'Deliver']
    }
  }}
  className="w-full max-w-4xl mx-auto my-8"
/>
```

### On /shipping Page:
Add data flow diagrams for ocean and air:
```tsx
{/* Ocean section */}
<IntegrationDiagram
  sourceSystem="Carrier BOL"
  targetSystem="Your TMS"
  vertical="shipping"
  fields={['Container', 'Cargo', 'Charges']}
/>

{/* Air section */}
<IntegrationDiagram
  sourceSystem="Air Waybill"
  targetSystem="Your TMS"
  vertical="shipping"
  fields={['Flight', 'Cargo', 'Charges']}
/>
```

---

## TASK 5: Internal Link Strategy

### Add Links TO /logistics FROM Already-Indexed Pages:

**In /app/(pseo)/finance/page.tsx:**
Add paragraph:
"Logistics cost data flows directly into freight bill auditing workflows. [Learn about our logistics document processing](/logistics)"

**In /app/(pseo)/customs/page.tsx:**
Add paragraph:
"Shipping documents provide the foundation for customs declarations. [Explore logistics data extraction](/logistics)"

**In /app/(pseo)/compliance/page.tsx:**
Add paragraph:
"Logistics compliance requires accurate BOL and packing list data. [See logistics processing capabilities](/logistics)"

### Add Links FROM /logistics TO Indexed Pages:
- Link to /finance: "Freight bill auditing"
- Link to /customs: "Customs clearance document preparation"
- Link to /shipping: "Ocean and air freight document processing"

---

## Implementation Order:

1. **Create diagram components first** (DiagramRegistry.ts, SVGDiagramGenerator.tsx, IntegrationDiagram.tsx)
2. **Test diagrams** in a temporary page
3. **Expand /logistics** with all sections
4. **Expand /shipping** with all sections
5. **Add internal links** to/from indexed pages
6. **Build and deploy**
7. **Verify** pages render correctly
8. **Request reindexing** in GSC (or wait for natural crawl)

---

## Success Criteria:

- [ ] /logistics page has 1,500+ words
- [ ] /shipping page has 1,500+ words
- [ ] Both pages include field mapping tables
- [ ] Both pages include SVG diagrams
- [ ] Internal links added to/from indexed pages
- [ ] Pages pass decision tree validation:
  - Data sufficient (5+ sections)? YES
  - Word count >= 1,500? YES
  - Technical depth present (field mappings)? YES
  - Internal links to indexed pages? YES

---

## NOTES:

- Use existing styling from the codebase (Tailwind classes)
- Keep the existing banner images (/images/banners/logistics.webp, /images/banners/shipping.webp)
- Maintain the existing layout structure (hero banner + content sections)
- SVG diagrams should render server-side (no client JS needed)
- Tables should be responsive (overflow-x-auto on mobile)
