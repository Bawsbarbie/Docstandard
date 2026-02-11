# /logistics Page Content Blueprint
## Target: 1,500+ words | Structure: Hub → Technical Depth → Integration

---

## SECTION 1: Hero (150 words)
**H1:** Logistics Document Processing Hub | DocStandard
**Subtitle:** Transform messy logistics documents into clean, structured data your TMS and ERP can actually use.

**Body:**
Logistics operators drown in documents. Bills of lading, packing lists, delivery receipts, proof of delivery scans — each shipment generates a paper trail that someone has to manually key into your TMS. DocStandard automates this extraction pipeline, delivering normalized JSON, CSV, or direct API feeds to your existing systems. No custom integrations. No implementation projects. Just clean data, fast.

**CTA:** Upload Your Documents →

---

## SECTION 2: The Logistics Data Problem (300 words)
**H2:** Why Logistics Teams Struggle with Document Data

**Opening Hook:**
A single international shipment generates 8-12 distinct documents. Multiply that by hundreds of shipments per week, and your data entry team is processing thousands of pages — each with slightly different formats, field names, and data structures.

**Pain Points (bullet with 2-3 sentences each):**

1. **Inconsistent Formats Across Carriers**
   Every freight forwarder, steamship line, and airline uses their own BOL template. Some list container numbers in the header, others bury them in line items. Some use "Gross Weight," others use "Total Weight" or "GW." Your extraction logic breaks every time a new carrier enters the mix.

2. **Handwritten Amendments and Stamps**
   The clean PDF from your EDI feed rarely matches the paper reality. Dock supervisors add handwritten corrections. Customs agents stamp approval codes. These annotations contain critical data — voyage changes, seal numbers, inspection results — that automated OCR typically misses.

3. **Multi-Language Documents**
   A shipment from Shanghai to Rotterdam might include a Chinese packing list, English BOL, and Dutch customs declaration. Extracting consistent data across languages without losing field mapping accuracy requires specialized handling.

4. **Time Pressure vs. Accuracy Trade-off**
   When a container hits the port, you have hours — not days — to file customs entries, arrange drayage, and notify consignees. Rushing data entry introduces errors. Waiting for accuracy delays clearance. Most teams choose speed, then spend weeks reconciling billing discrepancies.

**Statistic Callout:**
> "Logistics teams spend 40% of administrative time on document processing and data entry." — Transportation Research Board

---

## SECTION 3: Document Processing Pipeline (400 words)
**H2:** The DocStandard Logistics Pipeline

**Intro:**
Our logistics document processing follows a proven 5-stage pipeline designed for operational environments where accuracy and speed both matter.

### Stage 1: Ingestion (Multi-Channel Capture)
**Description (80 words):**
Upload via web portal, email dropbox, or API. We accept PDFs, scanned images (TIFF, PNG, JPEG), and even photos from mobile devices. Our preprocessing pipeline deskews skewed scans, enhances low-resolution images, and handles multi-page documents automatically. Each document receives a unique tracking ID tied to your shipment reference.

**Technical Detail:**
- Supported formats: PDF, TIFF, PNG, JPEG, BMP (up to 50MB per file)
- Batch upload: Up to 100 documents per batch
- Email ingestion: Dedicated address per customer account

### Stage 2: Classification (Document Type Recognition)
**Description (80 words):**
Before extraction, we identify what we're looking at. Is this a master BOL or a house BOL? A packing list or a delivery receipt? Our classification model was trained on 50,000+ logistics documents and recognizes 40+ document types across air, ocean, and ground transport. Misclassified documents are flagged for human review rather than processed with the wrong extraction rules.

**Technical Detail:**
- Recognition accuracy: 97.3% for standard formats
- Supported types: BOL, AWB, CMR, packing list, commercial invoice, delivery receipt, POD, customs declaration, certificate of origin

### Stage 3: Extraction (Field-Level Data Capture)
**Description (80 words):**
This is where the work happens. We extract 50+ standard fields from logistics documents: shipper/consignee details, cargo descriptions, weights and measures, container numbers, voyage references, incoterms, and charges. For tables (like packing list line items), we preserve row relationships and nested structures. Handwritten annotations are captured separately and flagged for verification.

**Technical Detail:**
- Field confidence scoring: 0-100% per field
- Threshold for auto-acceptance: 85% confidence
- Below threshold: Human verification queue

### Stage 4: Normalization (Standardization)
**Description (80 words):**
Raw extracted data is messy. "Gross Wt." becomes `gross_weight_kg`. "40' HC" becomes `container_type: "40ft_high_cube"`. Dates normalize to ISO 8601. Currencies convert to standard codes. We apply your custom field mappings so the output matches your TMS schema exactly — whether that's CargoWise, SAP TM, Oracle Transportation Management, or a custom system.

**Technical Detail:**
- Unit standardization: kg/lbs, m/ft, CBM/cubic feet (configurable)
- Date formats: Auto-detect and convert to ISO 8601
- Custom mappings: JSON schema definition supported

### Stage 5: Delivery (Integration)
**Description (80 words):**
Normalized data delivers to your systems via webhook, API pull, SFTP drop, or email. We support real-time delivery (webhook on completion) and batch windows (hourly, twice daily, daily). Each delivery includes a manifest file linking document IDs to your shipment references, plus an audit trail of confidence scores and any human verification steps.

**Technical Detail:**
- Webhook retries: 3 attempts with exponential backoff
- SFTP: SSH key authentication supported
- API: REST with JSON, GraphQL available

---

## SECTION 4: Field Mapping Reference (300 words)
**H2:** Standard Logistics Field Mappings

**Intro:**
Every logistics document type has a standard field extraction profile. Below are the core fields captured from Bills of Lading and Packing Lists — the two most common logistics documents we process.

### Bill of Lading (BOL) Field Map

| Field | JSON Key | Example Value | Notes |
|-------|----------|---------------|-------|
| BOL Number | `bol_number` | "HLCUBU1234567" | Master or house BOL |
| Shipper Name | `shipper.name` | "ABC Manufacturing Ltd" | Parsed from address block |
| Shipper Address | `shipper.address` | Full structured address | Split into components |
| Consignee Name | `consignee.name` | "XYZ Distribution Inc" | Notify party if consignee is "To Order" |
| Vessel Name | `vessel_name` | "MSC GULSUN" | For ocean BOLs |
| Voyage Number | `voyage_number` | "123E" | Combined with vessel for tracking |
| Port of Loading | `pol` | "Shanghai, China" | UN/LOCODE preferred |
| Port of Discharge | `pod` | "Rotterdam, Netherlands" | Final destination if different |
| Container Numbers | `containers[].number` | ["MSCU1234567", "MSCU7654321"] | Full list with types |
| Container Types | `containers[].type` | ["40HC", "20DC"] | Standardized codes |
| Cargo Description | `cargo.description` | "Electronic Components" | HS code extraction available |
| Gross Weight | `cargo.gross_weight_kg` | 18500.5 | Converted to kg |
| Measurement | `cargo.volume_cbm` | 45.2 | CBM or cubic feet |
| Freight Terms | `freight_terms` | "PREPAID" | PREPAID, COLLECT, or specific terms |
| Shipped Date | `shipped_date` | "2026-02-11" | ISO 8601 format |
| Number of Packages | `cargo.total_packages` | 450 | Sum of line items |

### Packing List Field Map

| Field | JSON Key | Example Value |
|-------|----------|---------------|
| Invoice Reference | `invoice_reference` | "INV-2026-001234" |
| Line Items | `items[]` | Array of objects |
| Item SKU | `items[].sku` | "PART-ABC-123" |
| Item Description | `items[].description` | "Widget Assembly" |
| Quantity | `items[].quantity` | 100 |
| Unit | `items[].unit` | "PCS" |
| Net Weight | `items[].net_weight_kg` | 2.5 |
| Dimensions | `items[].dimensions_cm` | {"l": 30, "w": 20, "h": 15} |

**Custom Fields:**
Need fields not listed here? We can add custom extraction rules for document types specific to your operations — supplier-specific formats, internal routing codes, or customer reference numbers.

---

## SECTION 5: Integration Ecosystem (250 words)
**H2:** Logistics System Integrations

**Intro:**
DocStandard delivers data to the logistics systems you already use. No rip-and-replace. No forced migrations.

### Transportation Management Systems (TMS)
- **CargoWise:** Direct API injection or file-based import
- **SAP TM:** IDoc, SOAP, or REST API feeds
- **Oracle Transportation Management:** Integration via OTM's web services
- **MercuryGate:** Standard integration adapter available
- **Blue Yonder (JDA):** File-based or API delivery

### Enterprise Resource Planning (ERP)
- **SAP S/4HANA:** Direct RFC or OData API
- **Oracle NetSuite:** RESTlet or CSV import
- **Microsoft Dynamics 365:** Data entity integration
- **Sage:** CSV or direct database (on-premise)

### Warehouse Management Systems (WMS)
- **Blue Yonder WMS:** Real-time receiving integration
- **SAP EWM:** Message-based integration
- **Manhattan Associates:** Standard interface support
- **HighJump (Körber):** Configurable data feeds

### Customs and Compliance
- **Integration with customs brokers:** Data pre-population for entry filings
- **AES (Automated Export System):** EEI data preparation
- **ISF (Importer Security Filing):** 10+2 data extraction

**Delivery Formats:**
- **JSON:** Nested structure with full field hierarchy
- **XML:** Industry-standard formats (CARGO-XML, etc.)
- **CSV/Excel:** Flat files for legacy systems
- **EDI:** X12 (204, 210, 214, 310, 315) and EDIFACT
- **Direct API:** Webhook push or REST polling

---

## SECTION 6: SLA & Delivery (200 words)
**H2:** Processing Times & Service Levels

**Standard Processing:**
- **Turnaround:** 12-24 hours for batches under 100 documents
- **Delivery:** Next business day for batches received before 5 PM local time
- **Confidence threshold:** 85% for automated processing

**Expedited Processing (Add-on):**
- **Turnaround:** 4-8 hours
- **Availability:** Business hours, Monday-Friday
- **Surcharge:** 50% of document batch fee

**Large Batch Processing:**
- **Over 500 documents:** 3-5 business days
- **Over 2,000 documents:** Custom timeline based on complexity
- **Dedicated queue:** Priority routing for recurring large batches

**Quality Guarantees:**
- **Accuracy:** 99.5% field-level accuracy for typed documents
- **Coverage:** 95%+ field extraction coverage (flagged if below)
- **Reprocessing:** Free reprocessing for errors on our end

**Output Delivery Options:**
- **Real-time:** Webhook notification on document completion
- **Scheduled:** Hourly, twice daily, or daily batch delivery
- **On-demand:** API pull whenever your system checks

---

## SECTION 7: Internal Link Block (100 words)
**H2:** Related Logistics Services

**Links (from indexed pages TO this page):**
- **From /finance:** "Logistics cost data flows directly into freight bill auditing workflows"
- **From /customs:** "Shipping documents provide the foundation for customs declarations"
- **From /compliance:** "Logistics compliance requires accurate BOL and packing list data"
- **From integration pages:** "Part of comprehensive logistics data infrastructure"

**Outbound Links FROM this page:**
- Link to `/finance`: "Freight bill auditing and logistics finance"
- Link to `/customs`: "Customs clearance document preparation"
- Link to `/shipping`: "Ocean and air freight document processing"

---

## TOTAL WORD COUNT TARGET: ~1,700 words
