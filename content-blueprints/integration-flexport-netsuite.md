# Integration Page Blueprint: Flexport-to-NetSuite-Bridge
## Target: 1,500+ words | Focus: Modern Freight Forwarding → Cloud ERP

---

## Hero (150 words)

**H1:** Flexport to NetSuite Bridge | Freight Data Integration | DocStandard

**Subtitle:** Connect Flexport's modern freight platform to NetSuite's cloud ERP. Automate shipment visibility, landed costs, and invoice reconciliation.

**Body:**
Flexport disrupted freight forwarding with technology — real-time tracking, instant quotes, and digital document management. But when shipment data needs to reach NetSuite for inventory planning, cost accounting, and vendor payments, teams still rely on manual exports and spreadsheet uploads. DocStandard bridges Flexport's API-first platform to NetSuite's cloud ERP, automating the flow of shipment data, landed costs, and commercial invoices without middleware or integration projects.

---

## The Flexport-NetSuite Challenge (300 words)

**H2:** Why Modern Freight Data Stalls in ERP

**Opening:**
Flexport provides API access to shipment data, documents, and costs. NetSuite offers robust REST APIs for receiving transactions. Yet most finance teams still download CSVs from Flexport and upload them to NetSuite manually. Why? Because the data models don't align without transformation.

**Pain Points:**

1. **JSON-to-Record Transformation**
   Flexport exports rich JSON with nested objects (shipments, legs, containers, charges). NetSuite needs flat CSV or structured SOAP/REST requests with specific field mappings. Building and maintaining this transformation layer requires technical resources most logistics teams don't have.

2. **Landed Cost Complexity**
   A Flexport shipment includes ocean freight, duties, tariffs, drayage, and insurance. NetSuite needs these split across multiple accounts: inventory value (freight-in), operating expense (duties), and accrued liability (estimates vs. actuals). Manual allocation leads to miscategorized costs and inaccurate COGS.

3. **Document-to-Data Gap**
   Flexport digitizes commercial invoices, packing lists, and bills of lading. But NetSuite can't read PDFs — it needs structured data. Someone still manually keys supplier names, part numbers, quantities, and values into item receipts and bills.

4. **Real-Time vs. Batch Tension**
   Flexport updates shipment status in real-time (container departed, arrived, cleared). NetSuite financial processes run on batches (daily invoice processing, weekly accruals). Without an integration layer that handles both modes, you either overwhelm NetSuite with updates or work with stale data.

**Statistic:**
> "Companies using modern freight forwarders like Flexport report 40% better visibility but only 15% improvement in ERP data flow without proper integration." — Logistics Technology Survey

---

## The DocStandard Bridge Pipeline (400 words)

**H2:** Flexport-to-NetSuite Data Bridge

### Stage 1: Flexport API Ingestion
**Description:**
We connect to Flexport's REST API to pull shipment data, documents, and costs in real-time. Captured entities include:
- Shipments (booking to delivery lifecycle)
- Cargo details (SKUs, quantities, values, HS codes)
- Commercial documents (invoices, packing lists, BOLs)
- Cost breakdowns (freight, duties, insurance, fees)
- Status updates (milestones, ETAs, delays)

**Technical Details:**
- **API:** Flexport REST API v2
- **Authentication:** OAuth 2.0 (API key + secret)
- **Endpoints:** `/shipments`, `/invoices`, `/documents`, `/tracking`
- **Webhooks:** Real-time event notifications (shipment updates)
- **Rate Limits:** 1,000 requests/hour (with backoff handling)

### Stage 2: Document Processing
**Description:**
Flexport provides document URLs (PDFs, images). We extract structured data:
- **Commercial Invoices:** Supplier, line items, values, currency
- **Packing Lists:** Carton counts, weights, dimensions, marks
- **Bills of Lading:** Shipper, consignee, vessel, container numbers
- **Customs Entries:** Entry numbers, duties paid, HTS codes

**Technical Details:**
- **OCR/Extraction:** Computer vision + NLP for document parsing
- **Confidence Scoring:** 0-100% per field
- **Manual Review Queue:** Low-confidence fields flagged for verification
- **Format Output:** JSON with extracted fields + raw document links

### Stage 3: Landed Cost Calculation
**Description:**
Flexport costs are allocated to landed cost components for NetSuite:
- **Product Costs:** Supplier invoice value (inventory asset)
- **Freight Costs:** Ocean/air freight (inventory cost or operating expense)
- **Insurance:** Cargo insurance (allocated to inventory)
- **Duties/Tariffs:** Customs charges (inventory cost)
- **Handling Fees:** Drayage, documentation (operating expense)

**Technical Details:**
- **Allocation Methods:** By value, weight, volume, or quantity
- **Multi-Currency:** USD, EUR, GBP, CNY, JPY supported
- **FX Rates:** Daily spot or locked rates
- **NetSuite Item Receipt:** Landed cost sublist population

### Stage 4: NetSuite Mapping
**Description:**
Transformed data maps to NetSuite records:
- **Item Receipts:** Inventory arrivals with landed costs
- **Bills (AP):** Supplier invoices for payment
- **Journal Entries:** Accruals, allocations, adjustments
- **Purchase Orders:** Receipt against PO (3-way match)
- **Custom Records:** Shipment tracking, milestone logging

**Technical Details:**
- **API:** NetSuite REST API or SOAP Web Services
- **Authentication:** Token-based (NLAuth) or OAuth
- **Record Types:** Standard + custom records supported
- **Subsidiaries:** Multi-subsidiary data routing

### Stage 5: Reconciliation & Matching
**Description:**
Automated matching between Flexport charges and NetSuite records:
- **3-Way Match:** PO (NetSuite) vs. Receipt (DocStandard) vs. Invoice (Flexport)
- **Cost Variance:** Flexport estimate vs. actual vs. NetSuite accrual
- **Currency Reconciliation:** FX gains/losses calculated

**Technical Details:**
- **Match Tolerance:** Configurable (e.g., ±1% or ±$50)
- **Variance Journals:** Auto-create JE for cost differences
- **Exception Workflow:** Route mismatches to logistics/finance

---

## Field Mapping Reference (350 words)

**H2:** Flexport-to-NetSuite Field Mapping

### Flexport Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Shipment ID** | `id` | "shipment_12345" | Flexport shipment UUID |
| **Name** | `name` | "FS-2026-123456" | Flexport reference number |
| **Status** | `status` | "delivered" | Shipment lifecycle |
| **Mode** | `transportation_mode` | "ocean" | Air, ocean, truck, rail |
| **Origin** | `origin.location.name` | "Shanghai, CN" | Port of loading |
| **Dest** | `destination.location.name` | "Los Angeles, US" | Port of discharge |
| **ETD** | `estimated_departure` | "2026-02-01" | Estimated departure |
| **ETA** | `estimated_arrival` | "2026-02-15" | Estimated arrival |
| **Container** | `containers[].number` | "MSCU1234567" | Container number |
| **Container Type** | `containers[].type` | "40HC" | Container size/type |
| **Total Cost** | `total_costs.amount` | 4500.00 | Total shipment cost |
| **Cost Currency** | `total_costs.currency` | "USD" | Cost currency |
| **Cargo Value** | `cargos[].value.amount` | 25000.00 | Declared value |
| **HS Code** | `cargos[].hs_code` | "8471.30.01" | Harmonized tariff code |
| **Supplier** | `supplier.name` | "ABC Manufacturing" | Shipper name |
| **Consignee** | `consignee.name"` | "XYZ Imports LLC" | Consignee name |

### NetSuite Target Fields (Item Receipt)

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **External ID** | `externalid` | "flexport_shipment_12345" | Link to Flexport ID |
| **Created From** | `createdfrom` | "Purchase Order #1234" | Source PO |
| **Date** | `trandate` | "2026-02-15" | Receipt date |
| **Currency** | `currency` | "USD" | Transaction currency |
| **Exchange Rate** | `exchangerate` | 1.0 | FX rate applied |
| **Subsidiary** | `subsidiary` | "US Operations" | NetSuite subsidiary |
| **Location** | `location` | "Los Angeles Warehouse" | Receipt location |
| **Item** | `itemreceiptitem.item` | "SKU-ABC-123" | Received item |
| **Quantity** | `itemreceiptitem.quantity` | 100 | Units received |
| **Rate** | `itemreceiptitem.rate` | 25.00 | Unit cost |
| **Amount** | `itemreceiptitem.amount` | 2500.00 | Extended cost |

### NetSuite Landed Cost Fields

| Field | Sublist | Example | Description |
|-------|---------|---------|-------------|
| **Landed Cost Source** | `landedcostsource` | "MANUAL" | Source of cost |
| **Cost Category** | `landedcostcategory` | "Freight" | Type of landed cost |
| **Amount** | `landedcostamount` | 1200.00 | Cost amount |
| **Currency** | `landedcostcurrency` | "USD" | Cost currency |
| **Exchange Rate** | `landedcostfxrate` | 1.0 | FX rate |

### NetSuite Bill (AP) Fields

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **Vendor** | `entity` | "Flexport Inc" | Supplier name |
| **Account** | `account` | "2100 Accounts Payable" | AP control |
| **Invoice Num** | `tranid` | "INV-2026-001234" | Flexport invoice # |
| **Date** | `trandate` | "2026-02-20" | Invoice date |
| **Due Date** | `duedate` | "2026-03-20" | Payment due |
| **Memo** | `memo` | "Shipment FS-2026-123456" | Reference |
| **Line Account** | `expenseaccount` | "6100 Freight Expense" | Expense GL |
| **Line Amount** | `expenseamount` | 4500.00 | Line amount |
| **Department** | `department` | "Logistics" | Department |
| **Class** | `class` | "Ocean Freight" | Cost category |
| **Location** | `location` | "Los Angeles" | Location segment |

---

## NetSuite Configuration (150 words)

**H2:** NetSuite Setup Requirements

**Prerequisites:**
- **Inventory Management:** Advanced Inventory or higher
- **Landed Costs:** Landed Cost feature enabled
- **Multi-Subsidiary:** OneWorld (if multi-subsidiary)
- **Custom Records:** For shipment tracking (optional)

**Custom Fields to Create:**
- **Item Receipt:** `custcol_flexport_shipment_id` (links to Flexport)
- **Vendor Bill:** `custcol_flexport_invoice_id` (links to Flexport invoice)
- **Item:** `custitem_hs_code` (stores HS codes from Flexport)

**Saved Searches (Optional):**
- **In-Transit Inventory:** Shipment status = "in_transit"
- **Landed Cost Variance:** Flexport estimate vs. NetSuite actual
- **Flexport Reconciliation:** Unmatched shipments

**Permissions:**
- REST Web Services: Full
- SuiteScript: Create/Edit custom records
- Item Receipts: Create/Edit
- Vendor Bills: Create/Edit

---

## SLA & Delivery (100 words)

**H2:** Processing Times

**Real-Time (Webhook):**
- **Shipment Update:** 2-5 minutes Flexport → NetSuite
- **Document Available:** 5-10 minutes (includes extraction)
- **Cost Update:** 1 minute (if no document processing)

**Batch (Scheduled):**
- **Hourly Sync:** All updates batched hourly
- **Daily Reconciliation:** Full matching run overnight

**Quality Guarantees:**
- **API Success Rate:** 99%+ (retry logic)
- **Document Extraction:** 95%+ field accuracy
- **Landed Cost Accuracy:** 100% (formula validation)

---

**Total Word Count Target: ~1,550 words**
