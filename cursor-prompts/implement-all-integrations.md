# Cursor Prompt: Implement All 11 Integration Pages
## Comprehensive Integration Expansion for DocStandard

**Context:** You are implementing 11 integration pages for DocStandard's pSEO strategy. Each page needs 1,500+ words with technical depth including field mapping tables, pipeline details, and system-specific content. These pages target high-intent searches and improve indexation rates.

**Files to Reference:**
- `content-blueprints/integration-motive-sap-ifta.md`
- `content-blueprints/integration-mercurygate-oracle.md`
- `content-blueprints/integration-flexport-netsuite.md`
- `content-blueprints/integration-descartes-netsuite.md`
- `content-blueprints/integration-freightpop-netsuite.md`
- `content-blueprints/integration-roserocket-quickbooks.md`
- `content-blueprints/integration-cargowise-dynamics-bc.md`
- `content-blueprints/integration-kuebix-quickbooks.md`
- `content-blueprints/integration-manhattan-sap.md`
- `content-blueprints/integration-edi-normalization.md`
- `content-blueprints/integration-clean-logistics-sap-s4hana.md`

---

## Common Structure (All Pages)

Each integration page MUST include:

1. **Hero Section (150 words)**
   - H1 with integration name
   - Value proposition subtitle
   - Body paragraph explaining the bridge
   - CTA button

2. **Problem Section (300 words)**
   - Opening hook about the data gap
   - 4 pain points with technical details
   - Industry statistic callout

3. **Pipeline Section (400 words)**
   - 5-stage technical pipeline
   - Each stage: description + technical details bullets
   - Data extraction, transformation, delivery

4. **Field Mapping Tables (350 words)**
   - Source system fields (JSON paths, examples)
   - Target system fields (API paths, examples)
   - Mapping logic explanation

5. **System Coverage (150 words)**
   - Supported modules/transactions
   - Configuration requirements
   - Authentication methods

6. **SLA Section (100 words)**
   - Processing times
   - Quality guarantees
   - Supported versions

7. **Related Links (100 words)**
   - Internal links to other integrations
   - Links to vertical pages (/logistics, /finance)

**Total per page: 1,550+ words**

---

## Integration 1: Motive-to-SAP-IFTA-Normalization

**URL:** `/integration/motive-to-sap-ifta-normalization`
**Focus:** Fleet telematics data → SAP fuel tax compliance (IFTA)
**Target Systems:** Motive (source) → SAP ERP (target)

**Key Content:**
- IFTA fuel tax compliance (International Fuel Tax Agreement)
- GPS coordinate → jurisdiction mapping
- Fuel card transaction matching
- Quarterly reporting automation
- Field mappings: Motive JSON → SAP IFTA fields

**Technical Depth:**
- 48 US states + 10 Canadian provinces
- MPF (Merchandise Processing Fee) calculation
- HMF (Harbor Maintenance Fee) calculation
- Duty types: Column 1, Column 2, free rates
- SAP GL account mapping for fuel taxes

**Read blueprint:** `content-blueprints/integration-motive-sap-ifta.md`

---

## Integration 2: MercuryGate-to-Oracle-Integration

**URL:** `/integration/mercurygate-to-oracle-integration`
**Focus:** TMS shipment data → Oracle ERP freight costs
**Target Systems:** MercuryGate (source) → Oracle EBS/Fusion (target)

**Key Content:**
- Shipment cost allocation to Oracle GL
- Accrual timing alignment
- Carrier invoice reconciliation
- Multi-leg shipment cost splitting
- Field mappings: MercuryGate API → Oracle tables

**Technical Depth:**
- Oracle EBS: AP Invoices, GL Journals, Cost Management
- Oracle Fusion: Payables, General Ledger, Cash Management
- FBDI (File-Based Data Import) format
- Three-way matching: Planned vs. Billed vs. Received
- Chart of accounts mapping

**Read blueprint:** `content-blueprints/integration-mercurygate-oracle.md`

---

## Integration 3: Flexport-to-NetSuite-Bridge

**URL:** `/integration/flexport-to-netsuite-bridge`
**Focus:** Modern freight forwarder → NetSuite cloud ERP
**Target Systems:** Flexport API (source) → NetSuite (target)

**Key Content:**
- API-first freight platform integration
- Landed cost calculation and allocation
- Document processing (invoices, packing lists, BOLs)
- Real-time vs. batch data flow
- Field mappings: Flexport JSON → NetSuite records

**Technical Depth:**
- NetSuite REST API / SOAP Web Services
- Item receipts with landed cost sublist
- Multi-currency handling
- Quote-to-actual reconciliation
- Document attachments to NetSuite file cabinet

**Read blueprint:** `content-blueprints/integration-flexport-netsuite.md`

---

## Integration 4: Descartes-to-NetSuite-Customs-Bridge

**URL:** `/integration/descartes-to-netsuite-customs-bridge`
**Focus:** Customs brokerage data → NetSuite landed costs
**Target Systems:** Descartes GLM (source) → NetSuite (target)

**Key Content:**
- Customs entry processing (CBP Form 7501)
- Duty and fee allocation
- HTS code normalization
- Broker invoice reconciliation
- Field mappings: Descartes API → NetSuite landed costs

**Technical Depth:**
- MPF (0.3464%, min $31.67, max $614.35)
- HMF (0.125% for waterborne)
- HTS code validation
- Entry-to-receipt matching
- NetSuite landed cost categories

**Read blueprint:** `content-blueprints/integration-descartes-netsuite.md`

---

## Integration 5: FreightPop-to-NetSuite-Normalization

**URL:** `/integration/freightpop-to-netsuite-normalization`
**Focus:** SMB freight platform → NetSuite accounting
**Target Systems:** FreightPop (source) → NetSuite (target)

**Key Content:**
- LTL freight cost processing
- Quote-to-invoice variance tracking
- Multi-carrier normalization (20+ LTL carriers)
- GL coding by shipment type
- Field mappings: FreightPop API → NetSuite bills

**Technical Depth:**
- Carrier SCAC codes (ODFL, FDXF, XPO, SAIA, etc.)
- Accessorial mapping (liftgate, residential, inside delivery)
- Service level translation
- Quote accuracy tracking
- SMB-friendly self-service setup

**Read blueprint:** `content-blueprints/integration-freightpop-netsuite.md`

---

## Integration 6: RoseRocket-to-QuickBooks-Bridge

**URL:** `/integration/roserocket-to-quickbooks-bridge`
**Focus:** Broker TMS → QuickBooks accounting
**Target Systems:** RoseRocket (source) → QuickBooks Online/Desktop (target)

**Key Content:**
- Freight broker revenue recognition
- Carrier cost recognition
- Margin tracking per load
- Customer invoicing automation
- Field mappings: RoseRocket API → QuickBooks invoices/bills

**Technical Depth:**
- QuickBooks Online REST API
- QuickBooks Desktop QBXML / Web Connector
- Customer/vendor matching
- Load profitability calculation
- 1099 tracking for carrier payments

**Read blueprint:** `content-blueprints/integration-roserocket-quickbooks.md`

---

## Integration 7: CargoWise-to-Dynamics-BC-Bridge

**URL:** `/integration/cargowise-to-dynamics-bc-bridge`
**Focus:** Enterprise forwarding → Dynamics 365 Business Central
**Target Systems:** CargoWise (source) → Dynamics 365 BC (target)

**Key Content:**
- Forwarding job data to BC
- Multi-currency consolidation
- Chart of accounts mapping
- Period-end reconciliation
- Field mappings: CargoWise → Dynamics BC journals

**Technical Depth:**
- Dynamics 365 BC REST API (Business Central API v2.0)
- Azure AD OAuth 2.0 authentication
- General journal postings
- Job/project accounting
- Dimension mapping (branch, department, mode)

**Read blueprint:** `content-blueprints/integration-cargowise-dynamics-bc.md`

---

## Integration 8: Kuebix-to-QuickBooks-Bridge

**URL:** `/integration/kuebix-to-quickbooks-bridge`
**Focus:** Shipper TMS → QuickBooks expense tracking
**Target Systems:** Kuebix (source) → QuickBooks (target)

**Key Content:**
- Transportation spend management
- Carrier invoice matching
- Rate verification against contracts
- GL coding by shipment type (inbound/outbound/inter-facility)
- Field mappings: Kuebix → QuickBooks bills

**Technical Depth:**
- PRO number matching
- BOL-to-invoice reconciliation
- OCR for PDF carrier invoices
- EDI 210 (Motor Carrier Freight Invoice) support
- Spend analytics and reporting

**Read blueprint:** `content-blueprints/integration-kuebix-quickbooks.md`

---

## Integration 9: Manhattan-to-SAP-Normalization

**URL:** `/integration/manhattan-to-sap-normalization`
**Focus:** WMS events → SAP ERP inventory
**Target Systems:** Manhattan Associates WMS (source) → SAP ERP (target)

**Key Content:**
- Warehouse movement processing
- High-volume transaction handling (100K+/day)
- Inventory state synchronization
- Serial/lot tracking preservation
- Field mappings: Manhattan → SAP IDocs/BAPIs

**Technical Depth:**
- SAP IDocs: WMMBXY, WMSUMO, WMTOCO
- SAP BAPIs: BAPI_GOODSMVT_CREATE
- Movement types: 101, 261, 311, 601
- Unit of measure conversions
- Batch/serial number handling

**Read blueprint:** `content-blueprints/integration-manhattan-sap.md`

---

## Integration 10: EDI-Document-Normalization-Services

**URL:** `/integration/edi-document-normalization-services`
**Focus:** Document-to-EDI conversion service
**Target Systems:** PDF/Email/API (source) → X12/EDIFACT (target)

**Key Content:**
- Multi-channel document ingestion
- OCR + document classification
- Data extraction and validation
- X12 and EDIFACT generation
- VAN/AS2 delivery

**Technical Depth:**
- X12: 204, 210, 214, 810, 850, 856, 997, etc.
- EDIFACT: ORDERS, DESADV, INVOIC, IFTMIN, etc.
- cXML for e-commerce
- Trading partner onboarding (5-14 days)
- VAN connectivity (OpenText, SPS Commerce)

**Read blueprint:** `content-blueprints/integration-edi-normalization.md`

---

## Integration 11: Clean-Logistics-Data-for-SAP-S4HANA

**URL:** `/integration/clean-logistics-data-for-sap-s4hana`
**Focus:** Data preparation for S/4HANA migration/operation
**Target Systems:** Any documents (source) → SAP S/4HANA (target)

**Key Content:**
- S/4HANA data quality assurance
- Migration data cleansing
- Universal Journal integrity
- Multi-module integration (MM, SD, IM, LE, FI)
- Field mappings to S/4HANA OData/BAPI/IDoc

**Technical Depth:**
- S/4HANA Cloud and On-premise support
- OData API, BAPI, IDoc, File Upload (LTMC/LSMW)
- Universal Journal (ACDOCA) posting
- Master data validation
- Data quality monitoring dashboards

**Read blueprint:** `content-blueprints/integration-clean-logistics-sap-s4hana.md`

---

## Implementation Order

**Phase 1 (Priority - Do First):**
1. Motive→SAP IFTA
2. MercuryGate→Oracle
3. Flexport→NetSuite

**Phase 2:**
4. Descartes→NetSuite
5. FreightPop→NetSuite
6. RoseRocket→QuickBooks

**Phase 3:**
7. CargoWise→Dynamics BC
8. Kuebix→QuickBooks
9. Manhattan→SAP

**Phase 4:**
10. EDI Normalization
11. Clean Logistics SAP S/4HANA

---

## Technical Requirements (All Pages)

### Page Structure
```tsx
// app/(pseo)/integration/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import SVGDiagram from "@/components/diagrams/SVGDiagramGenerator"

export const metadata: Metadata = {
  title: "[Integration Name] | DocStandard",
  description: "[Value proposition]"
}

export default function IntegrationPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        {/* Banner image */}
        {/* Title, subtitle, body, CTA */}
      </section>
      
      {/* Problem Section */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        {/* 4 pain points */}
      </section>
      
      {/* Pipeline Section */}
      <section className="bg-slate-50 py-14">
        {/* 5-stage pipeline */}
      </section>
      
      {/* Field Mapping Tables */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        {/* Responsive tables */}
      </section>
      
      {/* System Coverage */}
      <section className="bg-slate-50 py-14">
        {/* Modules, config, auth */}
      </section>
      
      {/* SLA */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        {/* Processing times, guarantees */}
      </section>
      
      {/* Related Links */}
      <section className="bg-slate-50 py-14">
        {/* Internal links */}
      </section>
    </div>
  )
}
```

### Diagram Integration
Include at least one diagram per page:

```tsx
<SVGDiagram
  config={{
    type: "data-flow",
    colorScheme: "finance", // or "logistics", "customs", etc.
    width: 800,
    height: 200,
    data: {
      source: { name: "SourceSystem", icon: "source" },
      target: { name: "TargetSystem", icon: "target" },
      transformation: "Data Bridge",
      fields: ["Field1", "Field2", "Field3"]
    }
  }}
  className="w-full max-w-4xl mx-auto my-8"
/>
```

### Table Styling
Use responsive tables:

```tsx
<div className="overflow-x-auto">
  <table className="w-full text-sm">
    <thead className="bg-slate-100">
      <tr>
        <th className="px-4 py-2 text-left">Field</th>
        <th className="px-4 py-2 text-left">Source Path</th>
        <th className="px-4 py-2 text-left">Example</th>
      </tr>
    </thead>
    <tbody>
      {/* Table rows */}
    </tbody>
  </table>
</div>
```

---

## Validation Checklist (Per Page)

Before considering a page complete:

- [ ] 1,500+ words of content
- [ ] Hero with H1, subtitle, value prop, CTA
- [ ] 4 pain points with technical details
- [ ] 5-stage pipeline with technical bullets
- [ ] Field mapping tables (source → target)
- [ ] System coverage section (modules, config)
- [ ] SLA section (processing times, guarantees)
- [ ] Related links section
- [ ] At least one SVG diagram
- [ ] Internal links to 3+ other pages
- [ ] Responsive table styling
- [ ] Passes `npm run lint`

---

## Success Metrics

After implementing all 11 pages:
- **Total new pages:** 11
- **Total word count:** ~17,000+ words
- **Expected index rate:** 40-50% (based on technical depth pattern)
- **Expected indexed pages:** 4-6 within 2 weeks
- **Internal links added:** 30+ (3 per page)

---

## Deployment

After all pages are implemented:
1. Run `npm run build` (verify no errors)
2. Run `npm run lint` (fix any issues)
3. Deploy to production
4. Submit sitemap to Google Search Console
5. Request indexing for all 11 new URLs
6. Monitor GSC for "Discovered → Indexed" movement

---

Start with Phase 1 (Motive→SAP, MercuryGate→Oracle, Flexport→NetSuite).

Read each blueprint file and implement the corresponding page with full technical depth.
