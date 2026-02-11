# Service Page Blueprint: EDI Document Normalization Services
## Target: 1,500+ words | Focus: EDI Integration Document Processing

---

## Hero (150 words)

**H1:** EDI Document Normalization Services | Electronic Data Interchange | DocStandard

**Subtitle:** Transform non-EDI documents into structured EDI formats. Bridge paper-based and API-based trading partners into your EDI workflows.

**Body:**
Electronic Data Interchange (EDI) powers modern supply chains — X12 and EDIFACT messages flow between ERPs, TMS platforms, and trading partners. But not every partner uses EDI. Suppliers send PDF invoices. Customers email purchase orders. Carriers provide web portals or API access. DocStandard normalizes these non-EDI sources into standard EDI formats, allowing you to maintain a single EDI workflow while accepting documents from any source format.

---

## The EDI Gap Challenge (300 words)

**H2:** Why EDI Workflows Break at Document Boundaries

**Opening:**
Your ERP is configured for EDI. Your TMS speaks X12. Your 3PL expects EDIFACT. But your smaller suppliers can't afford EDI software. Your customers email PDFs. Your carriers have modern REST APIs. Each non-EDI source creates manual work, slowing your automated workflows.

**Pain Points:**

1. **Supplier Onboarding Friction**
   A new supplier is ready to ship, but they only have email and PDFs. Requiring EDI adds 4-6 weeks to onboarding and $500-2,000 in setup costs. Many small suppliers simply can't comply, forcing you into manual processing.

2. **Customer Format Diversity**
   Enterprise customers demand EDI. Mid-market customers use portals. Small customers email PDFs. Maintaining separate workflows for each format duplicates effort and increases error rates.

3. **Carrier API Sprawl**
   Each carrier (FedEx, UPS, DHL) has different APIs, authentication schemes, and data formats. Building point-to-point integrations for each is unsustainable. You need normalized data flowing into your EDI infrastructure.

4. **Legacy Document Persistence**
   Faxes, scanned documents, and email attachments still represent 30-40% of supply chain transactions. Ignoring them means incomplete visibility. Manually keying them means delays and errors.

**Statistic:**
> "Companies with hybrid EDI/non-EDI trading partner networks spend 60% more time on document processing than those with full EDI automation." - EDI Alliance Benchmark Study

---

## The DocStandard EDI Pipeline (400 words)

**H2:** Document-to-EDI Normalization Pipeline

### Stage 1: Multi-Channel Ingestion
**Description:**
We accept documents from any source format or channel:
- **PDF Documents:** Invoices, purchase orders, ASNs, BOLs
- **Email:** Structured email parsing with attachment extraction
- **Web Portals:** Automated scraping and API polling
- **API Feeds:** REST, SOAP, GraphQL from carrier/supplier systems
- **Scanned/Fax:** OCR processing for paper documents
- **Spreadsheets:** CSV, Excel data import

**Technical Details:**
- **PDF Processing:** OCR + layout analysis for structured extraction
- **Email Parsing:** Rule-based extraction with attachment handling
- **Web Scraping:** Scheduled polling with change detection
- **API Connectors:** Pre-built for 50+ logistics platforms
- **Confidence Scoring:** 0-100% per field extraction

### Stage 2: Document Classification
**Description:**
Incoming documents are identified and routed:
- **Invoice:** Accounts payable, freight bills, supplier invoices
- **Purchase Order:** Customer orders, replenishment orders
- **ASN:** Advance ship notices, delivery notifications
- **BOL:** Bills of lading, freight contracts
- **Payment:** Remittance advice, payment confirmations
- **Custom:** Trading partner-specific formats

**Technical Details:**
- **ML Classification:** Document type recognition (95%+ accuracy)
- **Trading Partner ID:** Automatic sender identification
- **Routing Rules:** Business rules for document handling
- **Exception Queue:** Unclassifiable documents flagged for review

### Stage 3: Data Extraction & Validation
**Description:**
Structured data is extracted and validated:
- **Field Extraction:** PO numbers, dates, line items, amounts
- **Business Rules:** Validation against trading partner agreements
- **Reference Matching:** Link to existing orders, shipments, invoices
- **Data Enrichment:** Add GL codes, cost centers, reference data
- **Error Flagging:** Invalid data routed for correction

**Technical Details:**
- **Extraction Templates:** Trading partner-specific layouts
- **Validation Engine:** Rules-based and ML-assisted
- **Cross-Reference:** Match to SAP, NetSuite, Oracle records
- **Correction Workflow:** Human-in-the-loop for low-confidence fields

### Stage 4: EDI Generation
**Description:**
Validated data converts to standard EDI formats:
- **X12 (ANSI):** US standard (204, 210, 214, 810, 850, 856, etc.)
- **EDIFACT:** International standard (INVOIC, ORDERS, DESADV, etc.)
- **XML:** cXML, ebXML, proprietary schemas
- **JSON:** Modern API-first trading partners
- **Custom:** Trading partner-specific formats

**Technical Details:**
- **X12 Segments:** ISA, GS, ST, BEG, N1, PO1, CTT, SE, GE, IEA
- **EDIFACT Segments:** UNB, UNH, BGM, NAD, LIN, QTY, UNT, UNZ
- **Version Support:** X12 4010, 5010, 6020; EDIFACT D96A, D01B
- **Character Sets:** ASCII, UTF-8, EDIFACT syntax rules

### Stage 5: Delivery & Integration
**Description:**
Generated EDI flows to your systems:
- **VAN:** Value-Added Network (OpenText, SPS Commerce, etc.)
- **AS2:** Direct EDI over HTTPS
- **SFTP:** Secure file transfer
- **API:** REST/SOAP delivery to ERP/TMS
- **Email:** EDI as attachment for smaller partners

**Technical Details:**
- **VAN Connectivity:** OpenText GXS, SPS Commerce, TrueCommerce
- **AS2 Certificates:** PKI management for secure exchange
- **Retry Logic:** Exponential backoff for failed deliveries
- **Acknowledgments:** 997/CONTRL functional acknowledgments

---

## Supported EDI Transaction Sets (350 words)

**H2:** EDI Document Types Supported

### X12 Transaction Sets

| X12 Code | Name | Direction | Use Case |
|----------|------|-----------|----------|
| **204** | Motor Carrier Load Tender | Outbound | Tender shipment to carrier |
| **210** | Motor Carrier Freight Invoice | Inbound | Carrier freight bill |
| **214** | Transportation Carrier Shipment Status | Inbound | Tracking updates |
| **753** | Request for Routing Instructions | Outbound | Request carrier routing |
| **754** | Routing Instructions | Inbound | Carrier routing response |
| **810** | Invoice | Inbound | Supplier/customer invoice |
| **812** | Credit/Debit Adjustment | Both | Payment adjustments |
| **820** | Payment Order/Remittance | Outbound | Payment + remittance |
| **824** | Application Advice | Inbound | Error notification |
| **830** | Planning Schedule | Outbound | Forecast/schedule |
| **846** | Inventory Inquiry/Advice | Both | Stock status |
| **850** | Purchase Order | Both | Order placement |
| **855** | PO Acknowledgment | Outbound | Order confirmation |
| **856** | Ship Notice/Manifest | Outbound | ASN |
| **857** | Shipment and Billing Notice | Outbound | ASN + invoice |
| **860** | PO Change Request | Both | Order modifications |
| **861** | Receiving Advice | Inbound | Receipt confirmation |
| **862** | Shipping Schedule | Outbound | Shipping requirements |
| **990** | Response to Load Tender | Inbound | Carrier acceptance |
| **997** | Functional Acknowledgment | Both | EDI receipt confirmation |

### EDIFACT Messages

| EDIFACT | Name | Direction | Use Case |
|---------|------|-----------|----------|
| **ORDERS** | Purchase Order | Both | Order placement |
| **ORDRSP** | Order Response | Outbound | Order confirmation |
| **DESADV** | Despatch Advice | Outbound | ASN |
| **INVOIC** | Invoice | Both | Billing |
| **REMADV** | Remittance Advice | Outbound | Payment advice |
| **IFTMIN** | Instruction | Outbound | Shipping instructions |
| **IFTSTA** | Status Report | Inbound | Status updates |
| **INVRPT** | Inventory Report | Both | Stock status |
| **SLSRPT** | Sales Data Report | Inbound | Sales reporting |
| **RECADV** | Receiving Advice | Inbound | Receipt confirmation |

### cXML (Commerce XML)

| Document | Purpose |
|----------|---------|
| **OrderRequest** | PunchOut ordering |
| **ConfirmationRequest** | Order acknowledgment |
| **ShipNoticeRequest** | ASN |
| **InvoiceDetailRequest** | Electronic invoicing |
| **PaymentRemittanceRequest** | Payment advice |

---

## Trading Partner Onboarding (150 words)

**H2:** EDI Partner Setup Process

**Step 1: Document Analysis (Day 1-2)**
- Review sample documents from trading partner
- Identify required data elements
- Map to EDI transaction set

**Step 2: Template Configuration (Day 3-5)**
- Build extraction template
- Configure validation rules
- Set up EDI mapping

**Step 3: Testing (Day 6-10)**
- Test extraction accuracy
- Validate EDI output
- Trading partner approval

**Step 4: Production (Day 11-14)**
- Go-live with monitoring
- Exception queue setup
- SLA monitoring activated

**Typical Timeline:**
- **PDF-to-EDI:** 5-7 business days
- **Email-to-EDI:** 3-5 business days
- **API-to-EDI:** 7-10 business days
- **Complex formats:** 10-14 business days

---

## SLA & Delivery (100 words)

**H2:** EDI Processing Times

**Standard Processing:**
- **PDF-to-EDI:** 15-30 minutes per document
- **Email-to-EDI:** 5-10 minutes
- **API-to-EDI:** Real-time (2-5 minutes)
- **Batch Processing:** Hourly or scheduled windows

**Quality Guarantees:**
- **Extraction Accuracy:** 95%+ for clean documents
- **EDI Validation:** 100% (syntax validation)
- **Delivery Success:** 99.5%+ (retry logic)
- **Trading Partner Match:** 98%+ (automatic ID)

**Monitoring:**
- **Dashboard:** Real-time document tracking
- **Alerts:** Exception notifications
- **Audit Trail:** Complete transaction history
- **Reporting:** Monthly volume and accuracy stats

---

**Total Word Count Target: ~1,550 words**
