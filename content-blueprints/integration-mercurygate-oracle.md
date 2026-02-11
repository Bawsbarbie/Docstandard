# Integration Page Blueprint: MercuryGate-to-Oracle-Integration
## Target: 1,500+ words | Focus: TMS → ERP Shipment Data Bridge

---

## Hero (150 words)

**H1:** MercuryGate to Oracle Integration | TMS-to-ERP Data Bridge | DocStandard

**Subtitle:** Seamlessly flow shipment data from MercuryGate TMS into Oracle ERP. Automate freight cost allocation, accruals, and invoice matching.

**Body:**
Logistics teams use MercuryGate to plan and execute shipments, then struggle to get that data into Oracle for financial processing. Shipment costs, carrier invoices, and delivery confirmations live in the TMS while AP, accruals, and GL entries happen in ERP. DocStandard automates this handoff, extracting MercuryGate shipment data and delivering Oracle-compatible formats that post directly to your financial modules — no manual rekeying, no spreadsheet gymnastics.

---

## The TMS-to-ERP Gap (300 words)

**H2:** Why MercuryGate-Oracle Integration Breaks Down

**Opening:**
MercuryGate excels at transportation planning and execution. Oracle dominates financial management. Between them lies a data chasm that logistics finance teams bridge manually — costing hours and introducing errors.

**Pain Points:**

1. **Shipment Cost Fragmentation**
   A single shipment might have base freight, fuel surcharges, accessorials, and detention fees — each appearing as separate lines in MercuryGate but needing to roll up to a single GL account in Oracle. Without automated allocation rules, finance teams manually split and categorize every invoice.

2. **Accrual Timing Misalignment**
   MercuryGate knows a shipment delivered yesterday. But the carrier invoice won't arrive for 7-14 days. Oracle needs an accrual today for month-end close. Most teams either miss accruals (understating expenses) or use estimates that require painful adjustments later.

3. **Carrier Invoice Reconciliation**
   MercuryGate shows planned costs. Carrier invoices show actual charges. The difference? Detention, layover, reweigh fees not captured in planning. Matching actual-to-planned across hundreds of shipments requires spreadsheets and patience — both in short supply at month-end.

4. **Multi-Leg Shipment Complexity**
   A shipment from Chicago to Berlin might have a truck leg, ocean leg, and final mile leg — each with different carriers, currencies, and GL accounts. MercuryGate tracks the full journey. Oracle needs cost split by leg and business unit. Manual allocation is error-prone and slow.

**Statistic:**
> "Finance teams spend 60% of freight payment processing time on data reconciliation between TMS and ERP." — APQC Benchmarking

---

## The DocStandard Bridge Pipeline (400 words)

**H2:** MercuryGate-to-Oracle Data Pipeline

### Stage 1: MercuryGate Data Extraction
**Description:**
We pull shipment data from MercuryGate via API or scheduled export. Captured data includes:
- Shipment headers (reference numbers, dates, status)
- Route details (origin, destination, stops, modes)
- Cost breakdowns (base, accessorials, fuel, total)
- Carrier assignments (SCAC, carrier name, contract terms)
- Delivery confirmation (POD, appointment times, exceptions)

**Technical Details:**
- **API:** MercuryGate REST API v2.0
- **Authentication:** API Key + OAuth 2.0
- **Export Formats:** XML (native), JSON (API), or CSV (scheduled reports)
- **Data Latency:** Real-time (API) or hourly (batch export)
- **Entity Coverage:** Shipments, loads, stops, costs, appointments, PODs

### Stage 2: Cost Normalization
**Description:**
MercuryGate costs are normalized for Oracle financial processing:
- **Currency Conversion:** Multi-currency shipments converted to ledger currency
- **Tax Handling:** VAT, GST, sales tax separated from freight costs
- **Allocation Rules:** Costs split by GL account based on shipment attributes
- **Accrual Logic:** Estimated vs. actual cost tracking

**Technical Details:**
- **FX Rates:** Daily spot rates or fixed corporate rates
- **Tax Engines:** Vertex, Avalara, or native Oracle tax integration
- **Allocation Keys:** Mode, carrier, business unit, cost center, SKU-level

### Stage 3: Oracle Mapping
**Description:**
Normalized data maps to Oracle EBS or Fusion modules:
- **AP Invoices:** Carrier invoices for payment processing
- **GL Journals:** Accruals, expense allocations, cost center splits
- **Cost Management:** Landed cost capture for inventory valuation
- **Receivables:** Customer freight charges for billing back

**Technical Details:**
- **Oracle EBS:** FBDI (File-Based Data Import) or direct API
- **Oracle Fusion:** REST API with OAuth 2.0
- **IDoc Support:** SAP to Oracle migration scenarios
- **Chart of Accounts:** Dynamic segment mapping

### Stage 4: Matching & Reconciliation
**Description:**
Automated matching of MercuryGate planned costs to carrier actual invoices:
- **Three-Way Match:** Planned (MercuryGate) vs. Billed (Carrier) vs. Received (POD)
- **Tolerance Handling:** Auto-approve within threshold, flag exceptions
- **Dispute Workflow:** Route variances to logistics or carrier relations

**Technical Details:**
- **Match Tolerance:** Configurable (e.g., ±5% or ±$25)
- **Exception Routing:** Email alerts, Oracle workflow integration
- **Dispute Tracking:** Case numbers linked to shipments

### Stage 5: Financial Posting
**Description:**
Validated data posts to Oracle in your preferred format:
- **Real-time:** Webhook push on shipment completion
- **Batch:** Hourly/daily scheduled loads
- **Approval Queue:** Hold for finance review before posting

**Technical Details:**
- **Posting Formats:** FBDI CSV, Oracle BI Publisher XML, REST JSON
- **Error Handling:** Retry logic with exponential backoff
- **Audit Trail:** Full lineage from MercuryGate ID to Oracle transaction

---

## Field Mapping Reference (350 words)

**H2:** MercuryGate-to-Oracle Field Mapping

### MercuryGate Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Shipment ID** | `shipment.id` | "SH_123456" | MercuryGate shipment identifier |
| **Shipment Num** | `shipment.shipment_num` | "SH-2026-0001234" | User reference number |
| **Status** | `shipment.status` | "DELIVERED" | Shipment lifecycle status |
| **Mode** | `shipment.mode` | "LTL" | Transportation mode |
| **Origin** | `stops[0].location.city` | "Chicago, IL" | Ship from location |
| **Dest** | `stops[-1].location.city` | "Dallas, TX" | Ship to location |
| **Carrier SCAC** | `carrier.scac` | "UPSN" | Standard carrier code |
| **Carrier Name** | `carrier.name` | "UPS Freight" | Carrier legal name |
| **Total Cost** | `costs.total` | 1250.00 | Planned total cost |
| **Base Freight** | `costs.base` | 980.00 | Line haul cost |
| **Fuel Surcharge** | `costs.fuel` | 150.00 | FSC component |
| **Accessorials** | `costs.accessorials[]` | [{type: "LIFT", amt: 120}] | Additional charges |
| **Currency** | `costs.currency` | "USD" | Cost currency |
| **Delivery Date** | `stops[-1].actual_arrival` | "2026-02-11" | Actual delivery date |
| **POD Received** | `pod.received_date` | "2026-02-11" | Proof of delivery date |

### Oracle EBS Target Fields (AP/GL)

| Field | Oracle Table | Example | Description |
|-------|--------------|---------|-------------|
| **Invoice Num** | `AP_INVOICES` | "CRR-UPS-123456" | Supplier invoice number |
| **Supplier** | `PO_VENDORS` | "UPS FREIGHT" | Oracle supplier name |
| **Invoice Amt** | `AP_INVOICES` | 1250.00 | Invoice amount |
| **Line Amount** | `AP_INVOICE_LINES` | 980.00 | Distribution line |
| **Account** | `GL_CODE_COMBINATIONS` | "01-6100-1000-0000" | GL account string |
| **Cost Center** | `GL_CODE_COMBINATIONS` | "CC_100" | Cost center segment |
| **Project** | `PA_PROJECTS` | "PRJ_2026_001" | Project (if capital) |
| **Reference** | `AP_INVOICES` | "SH_123456" | MercuryGate shipment ID |
| **Accrual Flag** | `AP_INVOICES` | "Y" | Accrual vs. actual |

### Oracle Fusion Target Fields

| Field | REST API Path | Example | Description |
|-------|---------------|---------|-------------|
| **Invoice ID** | `invoiceId` | "INV123456" | Oracle invoice identifier |
| **Business Unit** | `businessUnit` | "US Operations" | BU for posting |
| **Supplier** | `supplier` | "UPS Freight" | Supplier name |
| **Invoice Lines** | `invoiceLines[].amount` | 1250.00 | Line amounts |
| **Distribution** | `invoiceLines[].distribution` | "01-6100" | GL distribution |
| **Shipment Ref** | `invoiceLines[].attribute1` | "SH_123456" | TMS reference |
| **Accrual Date** | `accountingDate` | "2026-02-11" | GL date |

### Cost Allocation Examples

| Scenario | MercuryGate Input | Oracle Output |
|----------|-------------------|---------------|
| **Standard LTL** | Total: $1,250 | 6100-Freight: $1,250 |
| **Multi-leg** | Truck: $500, Air: $2,000 | 6100-Ground: $500, 6100-Air: $2,000 |
| **With Accessorials** | Base: $980, Lift: $120, Fuel: $150 | 6100-Freight: $980, 6100-Handling: $120, 6100-Fuel: $150 |
| **Customer Bill-Back** | Total: $1,250 | 4100-Revenue: $1,250 (AR) |

---

## Oracle Module Coverage (150 words)

**H2:** Supported Oracle Modules

**Oracle E-Business Suite (EBS):**
- **AP (Accounts Payable):** Supplier invoices, payment processing
- **GL (General Ledger):** Accruals, journal entries, allocations
- **CE (Cash Management):** Freight payment reconciliation
- **CST (Cost Management):** Landed costs for inventory

**Oracle Fusion Cloud:**
- **Payables:** Supplier invoices, approval workflows
- **General Ledger:** Journal entries, allocations
- **Cash Management:** Bank reconciliation
- **Procurement:** Purchase order matching

**Integration Methods:**
- **FBDI (File-Based Data Import):** CSV/XML for EBS
- **REST API:** JSON for Fusion
- **Oracle BI Publisher:** Custom report formats
- **IDoc:** SAP-to-Oracle migration scenarios

---

## SLA & Delivery (100 words)

**H2:** Processing Times

**Standard Processing:**
- **Shipment-to-Oracle:** 15 minutes after MercuryGate status update
- **Accrual Processing:** Hourly batch (configurable)
- **Invoice Matching:** Daily reconciliation run

**Quality Guarantees:**
- **Field Accuracy:** 99.5% for structured data
- **GL Account Mapping:** 100% (validation rules)
- **Posting Success:** 99%+ (retry logic for failures)

---

**Total Word Count Target: ~1,550 words**
