# Integration Page Blueprint: Descartes-to-NetSuite-Customs-Bridge
## Target: 1,500+ words | Focus: Customs Compliance → Cloud ERP

---

## Hero (150 words)

**H1:** Descartes to NetSuite Customs Bridge | Customs Data Integration | DocStandard

**Subtitle:** Flow customs entries, duties, and compliance data from Descartes GLM to NetSuite. Automate landed cost capture and import accounting.

**Body:**
Importers using Descartes Global Logistics Management (GLM) for customs brokerage need those entries, duties, and fees to flow into NetSuite for accurate inventory valuation and cost accounting. The gap: customs data lives in Descartes while finance teams manually key landed costs into NetSuite item receipts. DocStandard automates this customs-to-ERP bridge, extracting entry summaries, duty calculations, and broker fees from Descartes and delivering NetSuite-ready landed cost transactions.

---

## The Customs-to-ERP Gap (300 words)

**H2:** Why Customs Data Breaks Down in ERP

**Opening:**
Descartes handles millions of customs entries annually. Their GLM platform manages classification, duty calculation, and broker workflows. But once the container clears customs, the data trail often goes silent — until a bill arrives weeks later and finance manually allocates costs.

**Pain Points:**

1. **Delayed Cost Visibility**
   A shipment clears customs Monday. Duties and fees are calculated in Descartes. But NetSuite doesn't know about these costs until the broker invoice arrives 14-30 days later. Month-end accruals are guesses, and COGS calculations are perpetually outdated.

2. **Landed Cost Fragmentation**
   A single import might have: customs duties (ad valorem), merchandise processing fees, harbor maintenance fees, FDA/USDA inspection fees, and broker charges. Each hits different GL accounts. Without automated allocation, costs get lumped into "freight expense" and inventory valuation is wrong.

3. **Entry-to-Receipt Matching**
   Descartes assigns entry numbers. NetSuite tracks receipts by PO line. Matching a customs entry (CBP Form 7501) to the correct item receipt requires cross-referencing commercial invoices, container numbers, and PO numbers — a manual puzzle that delays period close.

4. **Compliance Documentation**
   Audits require proof of duty calculations, classification rationale, and fee breakdowns. Descartes has this data. NetSuite needs it attached to transactions. Without integration, audit prep means logging into Descartes, printing reports, and manually attaching them to NetSuite records.

**Statistic:**
> "Import compliance costs average 2.5% of shipment value, but companies without automated landed cost capture often underestimate this by 30-40%." — Supply Chain Compliance Survey

---

## The DocStandard Customs Bridge Pipeline (400 words)

**H2:** Descartes-to-NetSuite Customs Pipeline

### Stage 1: Descartes Data Extraction
**Description:**
We extract customs entry data from Descartes GLM via API or structured export. Captured data includes:
- Entry headers (entry number, importer, entry type, port)
- Line items (HTS codes, country of origin, entered value)
- Duty calculations (ad valorem, specific, compound duties)
- Fee schedules (MPF, HMF, other CBP fees)
- Broker charges (clearance fees, processing fees)
- Documents (7501, commercial invoices, packing lists)

**Technical Details:**
- **API:** Descartes CustomsInfo or GLM API
- **Export Formats:** XML, JSON, or EDI (ANSI X12.355)
- **Authentication:** API key or SFTP credentials
- **Data Retention:** Entry records available for 5+ years
- **Update Frequency:** Real-time (status changes) or daily batch

### Stage 2: Customs Entry Normalization
**Description:**
Descartes entry data is normalized for NetSuite financial processing:
- **HTS Codes:** Standardized 10-digit harmonized tariff schedule
- **Duty Types:** Categorized (column 1 general, column 2, free, etc.)
- **Fee Allocation:** MPF, HMF separated from duty amounts
- **Currency Conversion:** Foreign value converted to USD (customs value)
- **Related Party Flags:** Marked for transfer pricing compliance

**Technical Details:**
- **HTS Validation:** Against CBP tariff database
- **Duty Rate Lookup:** Current rates by HTS and country
- **MPF Caps:** $614 min/$23,244 max applied
- **HMF Calculation:** 0.125% of cargo value (waterborne only)

### Stage 3: Landed Cost Allocation
**Description:**
Customs costs are allocated to landed cost components:
- **Duties:** Ad valorem duties added to inventory value
- **MPF/HMF:** CBP fees (accounting preference: inventory or expense)
- **Broker Fees:** Service fees (typically expense)
- **Inspection Fees:** USDA/FDA charges (inventory or expense)
- **Anti-Dumping/CVD:** Special duties tracked separately

**Technical Details:**
- **Allocation Basis:** By line item value, weight, or quantity
- **Multi-SKU Entries:** Costs split across receipt lines
- **NetSuite Landed Cost:** Populated on item receipt sublist
- **Variance Tracking:** Estimated vs. actual duty comparison

### Stage 4: NetSuite Integration
**Description:**
Normalized customs data posts to NetSuite as:
- **Item Receipts:** With landed cost sublist populated
- **Journal Entries:** Duty accruals if receipt not yet posted
- **Vendor Bills:** Broker invoices for payment
- **Custom Records:** Entry tracking for compliance audit trail

**Technical Details:**
- **API:** NetSuite REST API or SOAP Web Services
- **Authentication:** Token-based (TBA) or OAuth
- **Record Linkage:** Descartes entry number → NetSuite external ID
- **Document Attachments:** PDFs of 7501, invoices uploaded to file cabinet

### Stage 5: Reconciliation & Compliance
**Description:**
Automated matching and audit preparation:
- **Entry-to-Receipt:** Match CBP entry to NetSuite receipt
- **Duty Reconciliation:** CBP liquidation vs. initial duty deposit
- **Audit Trail:** Full lineage from Descartes entry to NetSuite JE
- **Liquidation Alerts:** Notify when entries liquidate (final duty determination)

**Technical Details:**
- **Match Keys:** Entry number, container, commercial invoice
- **Liquidation Monitoring:** Daily check of CBP status
- **Post-Entry Amendments:** Track PSI, reconciliations, protests

---

## Field Mapping Reference (350 words)

**H2:** Descartes-to-NetSuite Field Mapping

### Descartes Source Fields

| Field | API Path | Example | Description |
|-------|----------|---------|-------------|
| **Entry Number** | `entry.number` | "123-4567890-1" | CBP entry identifier |
| **Entry Type** | `entry.type` | "01" | Consumption, TIB, FTZ, etc. |
| **Port Code** | `entry.port_code` | "4701" | CBP port of entry |
| **Entry Date** | `entry.date` | "2026-02-11" | Date of entry filing |
| **Importer** | `importer.name` | "XYZ Imports LLC" | Importer of record |
| **IOR Num** | `importer.number` | "12-3456789" | Importer ID |
| **Line Num** | `lines[].number` | 1 | Entry line sequence |
| **HTS Code** | `lines[].hts` | "8471.30.0100" | Harmonized tariff code |
| **Description** | `lines[].description` | "Laptop computers" | Product description |
| **COO** | `lines[].country_origin` | "CN" | Country of origin |
| **Entered Qty** | `lines[].quantity` | 100 | Units entered |
| **Entered Value** | `lines[].value` | 25000.00 | Customs value (USD) |
| **Duty Rate** | `lines[].duty_rate` | 0.0 | Ad valorem duty rate |
| **Duty Amount** | `lines[].duty_amount` | 0.00 | Calculated duty |
| **MPF** | `lines[].mpf` | 152.50 | Merchandise processing fee |
| **HMF** | `lines[].hmf` | 31.25 | Harbor maintenance fee |

### NetSuite Target Fields (Item Receipt)

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **External ID** | `externalid` | "descartes_123-4567890-1" | Link to Descartes |
| **Created From** | `createdfrom` | "PO #1234" | Source PO |
| **Date** | `trandate` | "2026-02-11" | Receipt date |
| **Currency** | `currency` | "USD" | USD only for customs |
| **Item** | `itemreceiptitem.item` | "SKU-LAPTOP-001" | Received SKU |
| **Quantity** | `itemreceiptitem.quantity` | 100 | Units received |
| **Rate** | `itemreceiptitem.rate` | 250.00 | Unit cost |

### NetSuite Landed Cost Fields

| Field | Sublist | Example | Description |
|-------|---------|---------|-------------|
| **Landed Cost Category** | `landedcostcategory` | "Customs Duties" | Duty cost category |
| **Landed Cost Amount** | `landedcostamount` | 183.75 | Total fees |
| **Landed Cost Currency** | `landedcostcurrency` | "USD" | USD |
| **Duty Component** | `landedcostdata1` | 0.00 | Duty portion |
| **MPF Component** | `landedcostdata2` | 152.50 | MPF portion |
| **HMF Component** | `landedcostdata3` | 31.25 | HMF portion |

### NetSuite Vendor Bill (Broker Invoice)

| Field | NetSuite ID | Example | Description |
|-------|-------------|---------|-------------|
| **Vendor** | `entity` | "Descartes Customs" | Broker name |
| **Account** | `account` | "2100 Accounts Payable" | AP control |
| **Invoice #** | `tranid` | "INV-2026-1234" | Broker invoice |
| **Line Account** | `expenseaccount` | "6170 Broker Fees" | Fee GL |
| **Line Amount** | `expenseamount` | 350.00 | Broker charges |
| **Memo** | `memo` | "Entry 123-4567890-1" | Reference |

---

## CBP Fee Reference (150 words)

**H2:** U.S. Customs Fee Structure

**Merchandise Processing Fee (MPF):**
- **Rate:** 0.3464% of entered value
- **Minimum:** $31.67
- **Maximum:** $614.35
- **Applies To:** All formal entries

**Harbor Maintenance Fee (HMF):**
- **Rate:** 0.125% of cargo value
- **Applies To:** Waterborne imports only
- **Exemptions:** Air, truck, rail

**Formal vs. Informal Entries:**
- **Formal:** Value > $2,500, requires bond, full entry process
- **Informal:** Value ≤ $2,500, simplified process, flat $2-9 fee

**Duty Types:**
- **Column 1 (General):** Most favored nation rates
- **Column 1 (Special):** Free trade agreement rates
- **Column 2:** Non-MFN countries (higher rates)
- **Temporary:** TIB, temporary importation under bond

---

## SLA & Delivery (100 words)

**H2:** Customs Processing Times

**Standard Processing:**
- **Entry-to-NetSuite:** 15 minutes after Descartes status update
- **Document Attachment:** 5 minutes (PDF processing)
- **Daily Reconciliation:** Overnight matching run

**Liquidation Monitoring:**
- **Status Checks:** Daily CBP liquidation lookup
- **Alert Timing:** Within 24 hours of liquidation
- **Post-Entry Amendments:** 48-hour processing

**Quality Guarantees:**
- **Entry Accuracy:** 99.5% (validated against CBP)
- **Duty Calculation:** 100% (formula validation)
- **HTS Validation:** 99%+ (against current tariff)

---

**Total Word Count Target: ~1,550 words**
