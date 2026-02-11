# Integration Page Blueprint: FreightPop-to-NetSuite-Normalization
## Target: 1,500+ words | Focus: SMB Freight Management → Cloud ERP

---

## Hero (150 words)

**H1:** FreightPop to NetSuite Normalization | SMB Freight Integration | DocStandard

**Subtitle:** Connect FreightPop's simplified freight platform to NetSuite. Automate shipment data, freight costs, and carrier invoice reconciliation for growing businesses.

**Body:**
Small and mid-sized businesses choose FreightPop for its simplicity — instant LTL quotes, easy booking, and manageable freight spend. But when those shipments need to flow into NetSuite for accounting, inventory receipt, and cost tracking, the simplicity ends. CSV exports, manual data entry, and spreadsheet gymnastics take over. DocStandard bridges FreightPop to NetSuite, automating the flow of shipment data, freight costs, and delivery confirmations without IT projects or integration middleware.

---

## The SMB Freight-to-ERP Challenge (300 words)

**H2:** Why SMB Freight Data Stalls in NetSuite

**Opening:**
FreightPop fills a gap for businesses shipping 5-50 LTL loads per month — too small for enterprise TMS, too big for carrier websites. But the data handoff to NetSuite follows the same manual pattern as the enterprise: export, manipulate, upload, repeat.

**Pain Points:**

1. **Quote-to-Invoice Variance**
   FreightPop shows a quote of $245 for a Chicago-to-Dallas LTL shipment. The actual invoice comes in at $287 with a fuel surcharge adjustment and residential delivery fee. NetSuite's accrual is wrong, and the variance sits in a spreadsheet until month-end cleanup.

2. **Multi-Carrier Complexity**
   FreightPop shops rates across carriers (FedEx Freight, Old Dominion, XPO, etc.). Each carrier has different invoice timing, formats, and billing rules. NetSuite sees a flood of different vendor bills, each requiring manual classification and GL coding.

3. **BOL-to-Receipt Matching**
   A PO has 3 line items. The FreightPop BOL consolidates them into 1 handling unit. The carrier delivers. NetSuite needs item-level receipts for inventory, but the shipment data is at the BOL level. Breaking this down manually introduces errors.

4. **Limited IT Resources**
   SMBs don't have integration teams. NetSuite administrators are often finance managers wearing multiple hats. Building a custom FreightPop-to-NetSuite integration isn't an option, so manual processes persist despite the pain.

**Statistic:**
> "Small businesses spend 15-20 hours per month on freight invoice processing and reconciliation — time that could be spent on growth activities." — SMB Logistics Benchmark

---

## The DocStandard SMB Bridge Pipeline (400 words)

**H2:** FreightPop-to-NetSuite Normalization Pipeline

### Stage 1: FreightPop Data Ingestion
**Description:**
We extract shipment data from FreightPop via API or scheduled export. Captured data includes:
- Shipment details (BOL number, carrier, service level)
- Quote information (estimated cost, carrier options)
- Pickup/delivery addresses and contacts
- Freight characteristics (class, weight, dimensions, NMFC)
- Actual charges (freight, fuel, accessorials)
- Delivery confirmation (POD, signature, delivery date)

**Technical Details:**
- **API:** FreightPop REST API
- **Export Formats:** CSV, Excel, or JSON (API)
- **Authentication:** API key
- **Update Frequency:** Real-time (webhook) or hourly batch
- **Entity Coverage:** Shipments, quotes, bills, PODs

### Stage 2: Carrier Normalization
**Description:**
FreightPop works with 20+ LTL carriers. We normalize data across carrier differences:
- **Carrier SCAC Codes:** Standardized carrier identifiers
- **Service Levels:** Ground, expedited, guaranteed translated to NetSuite terms
- **Accessorial Mapping:** Liftgate, residential, inside delivery standardized
- **Invoice Timing:** Carrier-specific billing cycles normalized

**Technical Details:**
- **SCAC Database:** All major LTL carriers (ODFL, FDXF, XPO, SAIA, etc.)
- **Service Mapping:** FreightPop codes → NetSuite item codes
- **Accessorial Catalog:** 50+ common accessorials mapped
- **Billing Schedules:** Weekly, bi-weekly, monthly carrier patterns

### Stage 3: Cost Allocation
**Description:**
Freight shipment costs are allocated for NetSuite financial processing:
- **Freight Line Haul:** Base transportation cost
- **Fuel Surcharge:** Variable fuel adjustment
- **Accessorials:** Liftgate, residential, inside delivery
- **Insurance:** Declared value coverage
- **Sales Tax:** Where applicable (some carriers charge tax)

**Technical Details:**
- **GL Account Mapping:** Freight expense vs. inventory landed cost
- **Department Allocation:** By business unit or location
- **Class Tracking:** Mode (LTL, TL), carrier, or service level
- **Customer Bill-Back:** Markup calculations for reimbursable freight

### Stage 4: NetSuite Integration
**Description:**
Normalized freight data posts to NetSuite as:
- **Item Receipts:** With freight as landed cost (if inventory)
- **Vendor Bills:** Carrier invoices for payment
- **Journal Entries:** Freight accruals (quote vs. actual)
- **Sales Orders:** Customer freight charges (if bill-back)

**Technical Details:**
- **API:** NetSuite REST API or SOAP
- **Authentication:** Token-based (TBA)
- **Subsidiary Support:** Multi-location businesses
- **Currency:** USD, CAD supported

### Stage 5: Quote-to-Actual Reconciliation
**Description:**
Automated matching of FreightPop quotes to carrier invoices:
- **Quote Capture:** Original FreightPop estimate stored
- **Invoice Matching:** Actual carrier bill compared to quote
- **Variance Analysis:** Identify fuel adjustments, accessorials, corrections
- **Approval Workflow:** Route variances to logistics or finance

**Technical Details:**
- **Match Tolerance:** Configurable (±5% or ±$25 typical)
- **Variance Alerts:** Email notifications for out-of-tolerance
- **Accrual Cleanup:** Reverse accrual, post actual
- **Reporting:** Quote accuracy by carrier, lane, time period

---

## Field Mapping Reference (350 words)

**H2:** FreightPop-to-NetSuite Field Mapping

### FreightPop Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Shipment ID** | `shipment.id` | "SHIP_12345" | FreightPop identifier |
| **BOL Number** | `shipment.bol_number` | "123456789" | Bill of lading # |
| **Carrier** | `shipment.carrier.name` | "Old Dominion" | Selected carrier |
| **Carrier SCAC** | `shipment.carrier.scac` | "ODFL" | Standard carrier code |
| **Service** | `shipment.service_level` | "LTL Standard" | Speed/service |
| **Status** | `shipment.status` | "delivered" | Shipment status |
| **Origin** | `origin.address.city` | "Chicago, IL" | Ship from |
| **Dest** | `destination.address.city` | "Dallas, TX" | Ship to |
| **Weight** | `freight.total_weight` | 1500 | Total weight (lbs) |
| **Class** | `freight.freight_class` | "65" | NMFC freight class |
| **Quoted Cost** | `quote.total` | 245.00 | Original quote |
| **Actual Cost** | `invoice.total` | 287.50 | Final invoice |
| **Pickup Date** | `dates.pickup_actual` | "2026-02-11" | Actual pickup |
| **Delivery Date** | `dates.delivery_actual` | "2026-02-14" | Actual delivery |

### NetSuite Target Fields (Vendor Bill)

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **Vendor** | `entity` | "Old Dominion Freight" | Carrier name |
| **Invoice #** | `tranid` | "ODFL-123456" | Carrier invoice # |
| **Date** | `trandate` | "2026-02-14" | Invoice date |
| **Due Date** | `duedate` | "2026-03-14" | Payment due |
| **Memo** | `memo` | "BOL 123456789" | Reference |
| **Line Account** | `expenseaccount` | "6100 Freight-LTL" | GL account |
| **Line Amount** | `expenseamount` | 287.50 | Invoice amount |
| **Department** | `department` | "Logistics" | Department |
| **Class** | `class` | "LTL-Outbound" | Mode/class |
| **Location** | `location` | "Chicago" | Origin location |
| **BOL Ref** | `custcol_bol_number` | "123456789" | Custom field |

### NetSuite Item Receipt (Inventory Shipments)

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **Created From** | `createdfrom` | "PO #1234" | Source PO |
| **Date** | `trandate` | "2026-02-14" | Receipt date |
| **Landed Cost Cat** | `landedcostcategory` | "Freight-LTL" | Landed cost type |
| **Landed Cost Amt** | `landedcostamount` | 287.50 | Freight cost |
| **BOL Ref** | `custcol_bol_number` | "123456789" | Tracking field |

### Freight Cost Breakdown Fields

| Cost Component | FreightPop Field | NetSuite Account | Typical % |
|----------------|------------------|------------------|-----------|
| **Line Haul** | `costs.freight` | 6100-Freight | 70-80% |
| **Fuel Surcharge** | `costs.fuel` | 6100-Fuel | 15-20% |
| **Accessorials** | `costs.accessorials` | 6100-Handling | 5-10% |
| **Insurance** | `costs.insurance` | 6100-Insurance | 1-3% |

---

## Carrier Coverage (150 words)

**H2:** Supported LTL Carriers

**Major National Carriers:**
- **FedEx Freight:** Priority and economy services
- **Old Dominion:** LTL leader with high service levels
- **XPO Logistics:** National coverage, competitive rates
- **Estes Express:** Strong regional presence
- **R+L Carriers:** Family-owned, reliable service
- **SAIA:** Southeast and national expansion
- **Southeastern Freight Lines:** Regional specialist
- **Dayton Freight:** Midwest focus
- **Holland:** Regional LTL
- **New Penn:** Northeast specialist

**Data Captured per Carrier:**
- BOL tracking numbers (carrier-specific formats)
- PRO numbers (progressive tracking)
- Service level codes
- Invoice timing and billing schedules
- Accessorial pricing variations

**Quote-to-Invoice Accuracy:**
- **FedEx Freight:** ±3% average variance
- **Old Dominion:** ±2% average variance
- **XPO:** ±4% average variance
- **Regional carriers:** ±5% average variance

---

## SLA & Delivery (100 words)

**H2:** Freight Processing Times

**Standard Processing:**
- **Shipment Data:** 15 minutes after FreightPop status update
- **Invoice Processing:** Within 1 hour of carrier invoice receipt
- **Daily Reconciliation:** Overnight quote-to-actual matching

**SMB-Friendly Features:**
- **No IT Required:** Cloud-to-cloud, no software install
- **Self-Service Setup:** 30-minute configuration
- **Flexible Scheduling:** Real-time or daily batch
- **Error Alerts:** Email notifications for failed transactions

**Quality Guarantees:**
- **Data Accuracy:** 99%+ for structured fields
- **Carrier Recognition:** 100% for supported carriers
- **Cost Allocation:** 100% (rules-based)

---

**Total Word Count Target: ~1,550 words**
