# Integration Page Blueprint: RoseRocket-to-QuickBooks-Bridge
## Target: 1,500+ words | Focus: Modern TMS → SMB Accounting

---

## Hero (150 words)

**H1:** RoseRocket to QuickBooks Bridge | TMS Data Integration | DocStandard

**Subtitle:** Flow shipment data and freight costs from RoseRocket TMS into QuickBooks Online or Desktop. Automate invoice creation and expense tracking for freight brokers and 3PLs.

**Body:**
Freight brokers and 3PLs use RoseRocket to manage shipments, carriers, and customer quotes. But billing customers and paying carriers happens in QuickBooks — requiring manual rekeying of shipment details, rates, and delivery confirmations. DocStandard automates this bridge, extracting RoseRocket shipment data and generating QuickBooks invoices for customers and bills for carriers, eliminating double entry and accelerating cash flow.

---

## The Broker Accounting Challenge (300 words)

**H2:** Why Freight Brokerage Data Breaks Down in QuickBooks

**Opening:**
RoseRocket modernized freight brokerage operations with cloud-based TMS. But the accounting side still relies on spreadsheets and manual entry. A broker might handle 50 shipments per day — each requiring a customer invoice and a carrier payment. That's 100 QuickBooks transactions daily, mostly keyed by hand.

**Pain Points:**

1. **Rate Confirmation to Invoice Lag**
   A rate confirmation is agreed in RoseRocket. The shipment delivers. But the invoice sits in a queue for 2-3 days until someone has time to create it in QuickBooks. Cash flow suffers, and customers question delays.

2. **Carrier Payment Complexity**
   Carriers invoice the broker separately — often weeks later, with different reference numbers than the RoseRocket shipment. Matching carrier bills to customer revenue requires detective work: cross-referencing BOLs, rate confirmations, and delivery receipts.

3. **Accessorial Chaos**
   A shipment quotes at $800. But detention, layover, and reweigh fees add $340. The customer needs an amended invoice. The carrier invoice shows different accessorial codes. QuickBooks doesn't know about any of this until manual entry catches up.

4. **Multi-Location Headaches**
   Brokers with multiple agents need visibility across locations. RoseRocket handles this. But QuickBooks often runs separate files per location (or classes get misapplied). Consolidated financial reporting requires manual rollups.

**Statistic:**
> "Freight brokers spend 40% of back-office time on billing and payment processing — activities that could be 80% automated." — Transportation Intermediaries Association

---

## The DocStandard Broker Bridge Pipeline (400 words)

**H2:** RoseRocket-to-QuickBooks Broker Pipeline

### Stage 1: RoseRocket Data Extraction
**Description:**
We extract brokerage shipment data from RoseRocket via API. Captured data includes:
- Shipment details (BOL, reference numbers, status)
- Customer information (bill-to, credit terms)
- Carrier assignments (assigned carrier, rate confirmation)
- Rate data (customer rate, carrier rate, margin calculation)
- Accessorials (detention, layover, fuel surcharges)
- Delivery confirmation (POD, delivery date, signed by)

**Technical Details:**
- **API:** RoseRocket REST API
- **Authentication:** API key (OAuth 2.0)
- **Data Latency:** Real-time webhooks or hourly polling
- **Entity Coverage:** Loads, customers, carriers, invoices, settlements

### Stage 2: Revenue Recognition
**Description:**
Customer revenue is prepared for QuickBooks invoicing:
- **Customer Matching:** RoseRocket customer → QuickBooks customer
- **Rate Calculation:** Line haul + accessorials + fuel = total charge
- **Tax Determination:** Sales tax rules by customer location
- **Invoice Timing:** Delivered = ready to bill, or bill-on-ship options
- **Terms Application:** Net 15, Net 30, QuickPay discounts

**Technical Details:**
- **Customer Sync:** RoseRocket ID maps to QuickBooks CustomerRef
- **Item Mapping:** Freight services → QuickBooks Items
- **Tax Codes:** AvaTax, TaxJar, or QuickBooks native tax
- **Multi-Currency:** USD, CAD supported

### Stage 3: Cost Recognition
**Description:**
Carrier costs prepared for QuickBooks bill payment:
- **Carrier Matching:** RoseRocket carrier → QuickBooks vendor
- **Rate Confirmation:** Carrier pay = line haul + accessorials
- **Settlement Timing:** QuickPay (same day) vs. standard (30 days)
- **Deductions:** Insurance, factoring fees, claims
- **1099 Tracking:** Carrier payments tracked for tax reporting

**Technical Details:**
- **Vendor Sync:** RoseRocket carrier → QuickBooks VendorRef
- **Expense Accounts:** Transportation expense categories
- **Check/Voucher:** Payment method preferences
- **Settlement IDs:** Link RoseRocket settlement to QB bill

### Stage 4: QuickBooks Integration
**Description:**
Transformed data creates QuickBooks transactions:
- **Invoices:** Customer billing (A/R)
- **Sales Receipts:** Cash sales (if paid at delivery)
- **Bills:** Carrier payables (A/P)
- **Journal Entries:** Revenue/cost accruals
- **Credit Memos:** Adjustments, claims, refunds

**Technical Details:**
- **QuickBooks Online:** REST API (Intuit Developer Platform)
- **QuickBooks Desktop:** QBD SDK or QWC web connector
- **Authentication:** OAuth 2.0 (QBO), certificate (QBD)
- **Sandbox:** Test environment available

### Stage 5: Reconciliation & Reporting
**Description:**
Automated matching and margin tracking:
- **Shipment Profit:** Customer revenue - carrier cost = gross margin
- **Invoice Status:** RoseRocket invoice linked to QB invoice
- **Payment Matching:** Customer payments applied to shipments
- **Carrier Settlements:** Settlement amounts vs. QB bills
- **Agent Commission:** Split calculations for multi-agent offices

**Technical Details:**
- **Margin Report:** By shipment, customer, carrier, lane, period
- **Aging Reports:** Customer A/R and carrier A/P aging
- **Agent Splits:** Configurable commission percentages
- **Reconciliation:** Daily sync of payment status

---

## Field Mapping Reference (350 words)

**H2:** RoseRocket-to-QuickBooks Field Mapping

### RoseRocket Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Load ID** | `load.id` | "LD_12345" | RoseRocket load identifier |
| **BOL Number** | `load.bol_number` | "123456789" | Bill of lading |
| **Customer** | `customer.name` | "ABC Manufacturing" | Bill-to customer |
| **Customer ID** | `customer.id` | "CUST_001" | Customer reference |
| **Carrier** | `carrier.name` | "XYZ Trucking" | Assigned carrier |
| **Carrier ID** | `carrier.id` | "CARR_001" | Carrier reference |
| **Origin** | `origin.city` | "Chicago, IL" | Pickup location |
| **Destination** | `destination.city` | "Dallas, TX" | Delivery location |
| **Customer Rate** | `financials.customer_rate` | 1200.00 | Revenue amount |
| **Carrier Rate** | `financials.carrier_rate` | 950.00 | Cost amount |
| **Margin** | `financials.margin` | 250.00 | Gross profit |
| **Status** | `load.status` | "delivered" | Load status |
| **Delivery Date** | `dates.delivered_at` | "2026-02-11" | Delivery timestamp |
| **Accessorials** | `financials.accessorials` | [...] | Extra charges |

### QuickBooks Online Invoice Fields

| Field | QBO API Path | Example | Description |
|-------|--------------|---------|-------------|
| **CustomerRef** | `CustomerRef.value` | "61" | QBO customer ID |
| **Line Amount** | `Line[0].Amount` | 1200.00 | Invoice line amount |
| **Description** | `Line[0].Description` | "LTL Chicago-Dallas" | Service description |
| **ItemRef** | `Line[0].SalesItemLineDetail.ItemRef` | "3" | QBO item ID |
| **TxnDate** | `TxnDate` | "2026-02-11" | Invoice date |
| **DueDate** | `DueDate` | "2026-03-13" | Due date (Net 30) |
| **DocNumber** | `DocNumber` | "1001" | Invoice number |
| **PrivateNote** | `PrivateNote` | "BOL: 123456789" | Internal memo |
| **Custom Field** | `CustomField` | "LD_12345" | RoseRocket load ID |

### QuickBooks Online Bill Fields

| Field | QBO API Path | Example | Description |
|-------|--------------|---------|-------------|
| **VendorRef** | `VendorRef.value` | "45" | QBO vendor ID |
| **Line Amount** | `Line[0].Amount` | 950.00 | Bill amount |
| **AccountRef** | `Line[0].AccountBasedExpenseLineDetail.AccountRef` | "75" | Expense account |
| **TxnDate** | `TxnDate` | "2026-02-11" | Bill date |
| **DueDate** | `DueDate` | "2026-03-13" | Payment due |
| **DocNumber** | `DocNumber` | "INV-XYZ-001" | Carrier invoice # |
| **PrivateNote** | `PrivateNote` | "Load: LD_12345" | Reference |

### QuickBooks Desktop Fields (QBD)

| Field | QBXML Tag | Example | Description |
|-------|-----------|---------|-------------|
| **CustomerRef** | `<CustomerRef>` | "ABC Manufacturing" | Customer name |
| **TxnDate** | `<TxnDate>` | "2026-02-11" | Transaction date |
| **RefNumber** | `<RefNumber>` | "1001" | Invoice # |
| **ItemRef** | `<ItemRef>` | "LTL Freight" | Item name |
| **Amount** | `<Amount>` | 1200.00 | Line amount |

---

## Brokerage Accounting Workflow (150 words)

**H2:** Typical Brokerage Workflow

**Day 1 - Shipment Booking:**
1. Customer calls with load (Chicago to Dallas, 5 pallets)
2. RoseRocket: Create load, quote customer $1,200
3. RoseRocket: Assign carrier XYZ Trucking at $950
4. DocStandard: Queue customer invoice (delivered trigger)

**Day 2 - Pickup:**
1. Carrier picks up load
2. RoseRocket: Status = "In Transit"
3. DocStandard: Awaiting delivery confirmation

**Day 3 - Delivery:**
1. Load delivers, POD signed
2. RoseRocket: Status = "Delivered", upload POD
3. DocStandard: Create QuickBooks invoice for $1,200 (A/R)
4. DocStandard: Create QuickBooks bill for $950 (A/P)

**Day 5-30 - Payment:**
1. Customer pays $1,200 (Net 30)
2. QuickBooks: Payment applied to invoice
3. DocStandard: Sync payment status to RoseRocket
4. Broker pays carrier $950 (QuickPay or Net 30)

**Month-End:**
- Gross margin: $250 per load
- QuickBooks reports match RoseRocket activity

---

## SLA & Delivery (100 words)

**H2:** Brokerage Processing Times

**Standard Processing:**
- **Invoice Creation:** 5 minutes after delivery confirmation
- **Bill Creation:** 5 minutes after delivery (or carrier invoice receipt)
- **Daily Sync:** Payment status sync overnight

**QuickBooks Versions Supported:**
- **QuickBooks Online:** All plans (Simple Start to Advanced)
- **QuickBooks Desktop:** Pro, Premier, Enterprise (2020+)

**Quality Guarantees:**
- **Customer Matching:** 99%+ (name/ID lookup)
- **Rate Accuracy:** 100% (from RoseRocket)
- **Transaction Success:** 99%+ (retry logic)

---

**Total Word Count Target: ~1,550 words**
