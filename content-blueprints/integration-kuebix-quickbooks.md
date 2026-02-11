# Integration Page Blueprint: Kuebix-to-QuickBooks-Bridge
## Target: 1,500+ words | Focus: Transportation Procurement → SMB Accounting

---

## Hero (150 words)

**H1:** Kuebix to QuickBooks Bridge | TMS Expense Integration | DocStandard

**Subtitle:** Flow freight costs from Kuebix transportation management into QuickBooks. Automate carrier invoice processing and freight expense tracking for shippers.

**Body:**
Shippers use Kuebix to manage transportation procurement, rate shopping, and carrier selection. But when carriers invoice for services rendered, the data needs to reach QuickBooks for payment and expense tracking. DocStandard automates this bridge, extracting Kuebix shipment and cost data and generating QuickBooks bills for carrier payments and expense categorization.

---

## The Shipper TMS Accounting Challenge (300 words)

**H2:** Why Transportation Spend Data Breaks Down in QuickBooks

**Opening:**
Kuebix modernized how shippers buy transportation — giving them visibility into rates across carriers and control over freight spend. But the accounting side hasn't kept pace. Carrier invoices arrive via email, PDF, or EDI, each with different formats and reference numbers. Matching them to Kuebix shipments requires manual detective work.

**Pain Points:**

1. **Invoice-to-Shipment Matching**
   A carrier invoice arrives with a PRO number. Kuebix tracks BOL numbers. The same shipment might have different identifiers in each system. Without automated matching, someone manually cross-references dates, amounts, and lanes to confirm it's the right shipment.

2. **Rate Verification**
   Kuebix negotiated a rate of $2.50/mile with a carrier. The invoice bills at $2.75/mile. Catching this discrepancy requires comparing every invoice line to the Kuebix rate agreement — impractical at volume.

3. **GL Coding Inconsistency**
   Inbound raw materials, outbound finished goods, and inter-facility moves all hit different GL accounts. But carriers don't know (or care) about your accounting. Every invoice needs manual review and classification.

4. **Accrual Timing**
   Shipments deliver in January. Carrier invoices arrive in February. Month-end accruals are guesses based on shipment estimates, adjusted later when actual invoices arrive. This distorts financial reporting and budgeting.

**Statistic:**
> "Shippers process an average of 3-5 carrier invoices per shipment, spending 12-15 minutes per invoice on data entry and verification." — Inbound Logistics Cost Study

---

## The DocStandard Shipper Bridge Pipeline (400 words)

**H2:** Kuebix-to-QuickBooks Shipper Pipeline

### Stage 1: Kuebix Data Extraction
**Description:**
We extract shipper transportation data from Kuebix via API or export. Captured data includes:
- Shipment details (BOL, PRO, reference numbers)
- Carrier assignments (selected carrier, service level)
- Rate agreements (contract rates, fuel surcharge rules)
- Shipment costs (estimated and actual charges)
- Delivery confirmation (POD, delivery date, signed by)

**Technical Details:**
- **API:** Kuebix TMS REST API
- **Export Formats:** CSV, Excel, XML
- **Authentication:** API key (OAuth 2.0)
- **Update Frequency:** Real-time or daily batch
- **Entity Coverage:** Shipments, carriers, rates, invoices

### Stage 2: Carrier Invoice Matching
**Description:**
Incoming carrier invoices are matched to Kuebix shipments:
- **Reference Matching:** PRO, BOL, or PO number lookup
- **Fuzzy Matching:** Date + amount + lane when references don't align
- **Rate Verification:** Invoice amount vs. Kuebix contracted rate
- **Exception Flagging:** Out-of-tolerance invoices for review

**Technical Details:**
- **Match Confidence:** 0-100% scoring
- **Auto-Approval:** Within ±2% or ±$25 of expected
- **Exception Routing:** Email alerts for mismatches
- **Carrier Portal:** Status tracking for invoice disputes

### Stage 3: Cost Allocation
**Description:**
Matched costs are allocated for QuickBooks processing:
- **GL Account Mapping:** Inbound/outbound/inter-facility → different accounts
- **Department Allocation:** By facility or business unit
- **Cost Center:** By product line or project
- **Class Tracking:** Mode (LTL, TL, parcel) for analysis

**Technical Details:**
- **Allocation Rules:** Configurable by lane, carrier, product
- **Split Logic:** Multi-stop shipments proportionally allocated
- **Tax Handling:** Freight tax rules by jurisdiction
- **Prepayment:** QuickPay vs. standard terms handling

### Stage 4: QuickBooks Integration
**Description:**
Processed carrier bills create QuickBooks transactions:
- **Bills:** Carrier invoices for accounts payable
- **Expense Entries:** Direct GL postings (if preferred)
- **Check Transactions:** For immediate payments
- **Credit Card Charges:** If paying carriers via card
- **Journal Entries:** Accruals and adjustments

**Technical Details:**
- **QuickBooks Online:** REST API (Intuit Developer)
- **QuickBooks Desktop:** QBXML via Web Connector
- **Vendor Setup:** Auto-create carriers as vendors if new
- **Document Attach:** Carrier invoice PDFs attached to QB bills

### Stage 5: Spend Analytics
**Description:**
Transportation spend visibility and reporting:
- **Cost per Lane:** Average cost by origin-destination
- **Carrier Performance:** Cost and service by carrier
- **Budget vs. Actual:** Monthly freight spend tracking
- **Accrual Accuracy:** Estimated vs. actual cost comparison

**Technical Details:**
- **Dashboard:** Real-time spend visibility
- **Alerts:** Budget threshold notifications
- **Savings Tracking:** Rate negotiation impact measurement
- **Month-End:** Automated accrual reports

---

## Field Mapping Reference (350 words)

**H2:** Kuebix-to-QuickBooks Field Mapping

### Kuebix Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Shipment ID** | `shipment.id` | "SHIP_12345" | Kuebix identifier |
| **BOL Number** | `shipment.bol` | "123456789" | Bill of lading |
| **PRO Number** | `shipment.pro_number` | "PRO987654" | Carrier tracking # |
| **Reference** | `shipment.reference` | "PO-2026-001" | Customer PO ref |
| **Carrier** | `carrier.name` | "FedEx Freight" | Selected carrier |
| **Carrier SCAC** | `carrier.scac` | "FDXF" | Standard code |
| **Origin** | `origin.city` | "Detroit, MI" | Ship from |
| **Destination** | `destination.city` | "Atlanta, GA" | Ship to |
| **Est Cost** | `costs.estimated` | 450.00 | Kuebix estimate |
| **Actual Cost** | `costs.actual` | 475.50 | Final invoice amt |
| **Weight** | `freight.weight` | 2500 | Shipment weight |
| **Class** | `freight.class` | "55" | NMFC class |
| **Ship Date** | `dates.shipped` | "2026-02-11" | Pickup date |
| **Delivery Date** | `dates.delivered` | "2026-02-13" | Delivery date |

### QuickBooks Online Bill Fields

| Field | QBO API | Example | Description |
|-------|---------|---------|-------------|
| **Vendor** | `VendorRef.value` | "35" | QBO vendor ID |
| **Vendor Name** | `VendorRef.name` | "FedEx Freight" | Carrier name |
| **Account** | `APAccountRef.value` | "33" | AP control account |
| **Invoice #** | `DocNumber` | "FDXF-2026-001234" | Carrier invoice # |
| **Txn Date** | `TxnDate` | "2026-02-13" | Invoice date |
| **Due Date** | `DueDate` | "2026-03-15" | Payment due |
| **Line Amount** | `Line[0].Amount` | 475.50 | Bill amount |
| **Line Account** | `Line[0].AccountBasedExpenseLineDetail.AccountRef` | "61" | Expense GL |
| **Description** | `Line[0].Description` | "LTL DET-ATL BOL:123456" | Ref details |
| **Memo** | `PrivateNote` | "Kuebix SHIP_12345" | Internal ref |
| **Attachments** | `AttachableRef` | PDF | Invoice image |

### GL Account Mapping Examples

| Shipment Type | Kuebix Lane | QuickBooks Account |
|---------------|-------------|-------------------|
| **Inbound Raw** | Supplier→Factory | 5100 - Freight-In (Raw Materials) |
| **Outbound FG** | Factory→Customer | 6100 - Freight-Out |
| **Inter-Facility** | Factory→DC | 6200 - Intercompany Freight |
| **Returns** | Customer→Factory | 6300 - Return Freight |

### Carrier Invoice Fields

| Field | Source | Example | Use |
|-------|--------|---------|-----|
| **Invoice #** | Carrier PDF | "FDXF-INV-001234" | Bill number |
| **Invoice Date** | Carrier | "2026-02-15" | Bill date |
| **Invoice Amt** | Carrier | 475.50 | Total due |
| **Line Haul** | Carrier | 400.00 | Base freight |
| **FSC** | Carrier | 55.00 | Fuel surcharge |
| **Accessorials** | Carrier | 20.50 | Extra fees |
| **PRO Number** | Carrier | "PRO987654" | Match key |

---

## Carrier Coverage (150 words)

**H2:** Supported Carrier Invoice Formats

**Major LTL Carriers:**
- **FedEx Freight:** PDF invoices, PRO tracking
- **UPS Freight (TForce):** PDF and EDI invoicing
- **XPO Logistics:** PDF and web portal
- **Old Dominion:** PDF invoices
- **Estes Express:** PDF and EDI
- **R+L Carriers:** PDF invoices
- **SAIA:** PDF and web portal
- **Dayton Freight:** PDF invoices
- **Southeastern Freight:** PDF

**Trload Carriers:**
- **Schneider:** PDF and EDI
- **J.B. Hunt:** PDF and web portal
- **Landstar:** PDF invoices
- **Werner:** PDF and EDI

**Parcel:**
- **FedEx Ground/Express:** PDF and EDI
- **UPS Ground/Air:** PDF and EDI
- **USPS:** Web download

**Invoice Formats:**
- **PDF:** OCR extraction with confidence scoring
- **EDI:** ANSI X12.210 (Motor Carrier Freight Details)
- **Email:** Structured email parsing
- **Web Portal:** Automated download and extraction

---

## SLA & Delivery (100 words)

**H2:** Shipper Processing Times

**Standard Processing:**
- **Invoice Receipt-to-QB:** 15 minutes (PDF processing)
- **EDI Invoices:** 5 minutes (structured data)
- **Daily Reconciliation:** Overnight matching run
- **Exception Review:** Real-time email alerts

**Shipper-Friendly Features:**
- **No IT Required:** Cloud-to-cloud setup
- **Self-Service:** 30-minute configuration
- **Multi-Carrier:** One integration for all carriers
- **Audit Support:** Full document trail

**Quality Guarantees:**
- **Invoice Matching:** 95%+ auto-matched
- **OCR Accuracy:** 98%+ for clean PDFs
- **Rate Verification:** 100% (against Kuebix rates)

---

**Total Word Count Target: ~1,550 words**
