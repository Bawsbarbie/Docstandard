# /shipping Page Content Blueprint
## Target: 1,500+ words | Structure: Hub → Technical Depth → Ocean/Air Focus

---

## SECTION 1: Hero (150 words)
**H1:** Shipping Document Processing | Ocean & Air Freight | DocStandard
**Subtitle:** BOLs, AWBs, and manifests processed into structured data for your freight operations.

**Body:**
Shipping operations run on documents. Bills of lading for ocean freight. Air waybills for air cargo. Manifests, delivery orders, and arrival notices — each document holds data that needs to reach your freight management system accurately and on time. DocStandard extracts, normalizes, and delivers shipping document data to your TMS or ERP, eliminating manual rekeying and the errors that come with it.

**CTA:** Process Shipping Documents →

---

## SECTION 2: The Shipping Document Challenge (300 words)
**H2:** Why Shipping Documents Are Hard to Process

**Opening Hook:**
Ocean carriers alone issue over 100 million bills of lading annually. Each one is a legal contract, a receipt for goods, and a document of title — all while containing 30+ data points that need to reach your systems accurately.

**Pain Points:**

1. **Master vs. House BOL Complexity**
   A single shipment might have a master BOL (between carrier and NVOCC) and multiple house BOLs (between NVOCC and actual shippers). Data fields differ between them. Container numbers appear on the master but cargo details live on the houses. Matching them correctly requires understanding the bill hierarchy.

2. **Ocean vs. Air Document Differences**
   Ocean BOLs are negotiable documents of title with complex legal language. Air waybills are non-negotiable and follow IATA standards. The same shipment moved by air instead of ocean has completely different document structures, field names, and data formats.

3. **AMS/ISF Filing Pressure**
   U.S. customs requires Importer Security Filing (ISF) data 24 hours before cargo is laden aboard a vessel at origin. That data comes from shipping documents. Delays in document processing directly translate to customs penalties ($5,000 per violation) and cargo holds at destination.

4. **Manifest Discrepancies**
   The carrier's manifest rarely matches the shipper's BOL exactly. Names differ ("ABC Corp" vs "ABC Corporation"). Weights vary (gross vs net). Container counts mismatch (one master vs multiple houses). Reconciling these differences during customs entry is time-sensitive and error-prone.

**Statistic Callout:**
> "30% of customs delays are caused by document errors or missing data." — World Customs Organization

---

## SECTION 3: Ocean Freight Document Processing (350 words)
**H2:** Ocean Bill of Lading Processing

**Intro:**
Ocean freight moves 80% of global trade by volume, and every container ships with a stack of documents. Our ocean document processing handles the full lifecycle — from booking confirmation to proof of delivery.

### Document Types: Ocean

**Bill of Lading (BOL)**
The core ocean freight document. We process:
- **Straight BOLs:** Non-negotiable, consigned to named party
- **Order BOLs:** Negotiable, "to order" of consignee
- **Telex Release BOLs:** Surrendered at origin, released electronically
- **Sea Waybills:** Non-negotiable, functionally equivalent to telex release

**Manifests**
- **Container Manifest:** List of all containers on vessel
- **Cargo Manifest:** Detailed cargo description per container
- **House Manifest:** Consolidated view of LCL shipments

**Related Documents**
- Booking confirmations
- Delivery orders
- Arrival notices
- Container release orders
- Proof of delivery (POD)

### Field Extraction: Ocean BOL

| Field Category | Key Fields | Business Purpose |
|----------------|------------|------------------|
| **Shipment IDs** | BOL number, booking reference, forwarder reference | Tracking and matching across systems |
| **Parties** | Shipper, consignee, notify party, forwarder | Routing, billing, notification |
| **Vessel/Voyage** | Vessel name, voyage number, flag | Schedule tracking and regulatory |
| **Routing** | POL, POD, final destination, transshipment ports | Planning and ETA calculation |
| **Cargo** | Description, HS codes, marks/numbers | Customs classification and handling |
| **Equipment** | Container numbers, types, seal numbers | Yard planning and security |
| **Measurements** | Gross weight, tare weight, net weight, volume | Billing and compliance |
| **Charges** | Freight charges, surcharges, payment terms | Cost allocation and AP |
| **Dates** | Shipped on board date, sailing date | Transit time calculation |

### Special Handling: Ocean

**Container Number Validation**
Container numbers follow ISO 6346 format (4-letter owner code + 6-digit serial + 1 check digit). We validate check digits automatically and flag invalid numbers before they enter your system.

**Seal Number Capture**
Security seals are critical for customs and insurance. We extract seal numbers from BOLs and match them against delivery receipts to detect tampering.

**Multi-Currency Charges**
Ocean freight often involves multiple currencies (freight in USD, local charges in local currency). We extract all charge lines with currency codes and amounts for accurate cost allocation.

---

## SECTION 4: Air Freight Document Processing (350 words)
**H2:** Air Waybill & Air Cargo Processing

**Intro:**
Air freight moves 35% of global trade by value. Speed matters — and so does document accuracy when a shipment is crossing continents in 24 hours.

### Document Types: Air

**Air Waybill (AWB)**
The standard air freight contract. We process:
- **Master AWB (MAWB):** Between airline and forwarder/consolidator
- **House AWB (HAWB):** Between forwarder and actual shipper
- **Neutral AWBs:** Used by freight forwarders

**Related Documents**
- Booking confirmations
- Flight manifests
- Delivery orders
- Arrival notices
- Proof of delivery

### Field Extraction: Air Waybill

| Field Category | Key Fields | Business Purpose |
|----------------|------------|------------------|
| **Shipment IDs** | AWB number (11 digits), HAWB reference, booking ref | IATA standard tracking |
| **Parties** | Shipper, consignee, issuer, agent | Routing and responsibility |
| **Flight Details** | Flight number, date, routing (airports) | Real-time tracking |
| **Airports** | Origin, destination, intermediate airports | Route planning |
| **Cargo** | Description, class, commodity code | Handling requirements |
| **Chargeable Weight** | Gross weight, volume weight, chargeable weight | Airline billing basis |
| **Dimensions** | Pieces count, dimensions per piece | Load planning |
| **Charges** | Weight charge, valuation charge, other charges | Billing breakdown |
| **Service Codes** | Handling codes, product codes (priority, express) | Service level tracking |

### AWB Number Structure

Air waybill numbers are 11 digits:
- **First 3 digits:** Airline prefix (e.g., 001 = American Airlines, 020 = Lufthansa)
- **Next 7 digits:** Serial number
- **Last digit:** Check digit (mod-7 validation)

We validate AWB numbers against airline prefix databases and check digits to catch transcription errors.

### Special Handling: Air

**Chargeable Weight Calculation**
Airlines bill on chargeable weight — the greater of actual gross weight or volumetric weight (L × W × H / dimensional factor). We extract both weights and calculate chargeable weight for cost verification.

**Class and Commodity Codes**
Dangerous goods, temperature-controlled cargo, and live animals require special handling codes. We extract IATA class codes and commodity descriptions for operations planning.

**Routing Validation**
AWBs show the flight routing (e.g., FRA-DXB-SIN). We validate airport codes against IATA standards and flag unusual routings that might indicate transshipment delays.

---

## SECTION 5: Shipping System Integrations (300 words)
**H2:** Connect Shipping Data to Your Systems

**Intro:**
DocStandard delivers structured shipping data to the platforms that run your freight operations.

### Freight Management Platforms

**CargoWise (WiseTech)**
Direct integration with CargoWise eHub. Data flows into:
- Shipment records (automatic creation/update)
- Container tracking (equipment numbers and movements)
- Billing (charge extraction for AP processing)
- Customs (document pre-population for entries)

**SAP Transportation Management (TM)**
Integration via:
- Standard TM freight order interfaces
- Custom BAPI/RFC for specific requirements
- File-based integration for older SAP releases

**Oracle Transportation Management (OTM)**
- Web service integration for shipment creation
- Document attachment automation
- Status update feeds

**Freight Forwarding Systems**
- Magaya: Database-level integration available
- NetFreight: API-based document processing
- ProFreight: File-based integration

### Carrier-Specific Integrations

**Ocean Carriers**
- Maersk (API integration for booking/shipment data)
- MSC (web scraping + document processing hybrid)
- CMA CGM (EDI integration supported)
- Evergreen (document processing + portal integration)

**Airlines**
- IATA ONE Record compatibility (emerging standard)
- Airline-specific APIs where available
- Cargospot integration for cargo community systems

### Customs and Regulatory

**ISF (10+2) Filing Support**
We extract the 10 data elements required for Importer Security Filing:
1. Manufacturer/supplier name/address
2. Seller name/address
3. Buyer name/address
4. Ship-to name/address
5. Container stuffing location
6. Consolidator name/address
7. Importer of record number
8. Consignee number
9. Country of origin
10. Commodity Harmonized Tariff Schedule number

**AES Export Filing**
Automatic Export System data preparation:
- USPPI identification
- Export license determination
- ECCN classification support
- Ultimate consignee validation

---

## SECTION 6: SLA & Quality Metrics (200 words)
**H2:** Shipping Document Processing Times

**Standard Processing:**
- **Ocean BOLs:** 12-24 hours (includes container number validation)
- **Air Waybills:** 6-12 hours (faster due to standardized format)
- **Manifests:** 24-48 hours (depends on document quality)
- **Batch processing:** Up to 500 documents per business day

**Expedited Processing:**
- **Turnaround:** 4-8 hours
- **Availability:** 24/7 for critical shipments
- **Pricing:** 75% surcharge on standard rates

**Accuracy Commitments:**
- **Typed documents:** 99.5% field accuracy
- **Handwritten annotations:** 95% accuracy (flagged for review if below 90%)
- **Container/AWB numbers:** 99.9% (validated against check digits)

**Delivery Options:**
- **Real-time:** Webhook on each document completion
- **Batch:** Scheduled delivery windows
- **API:** Pull-based retrieval on your schedule

**Quality Controls:**
- Automated field validation (check digits, format checks)
- Confidence scoring (fields below 85% flagged)
- Human verification queue for edge cases
- Reprocessing at no charge for our errors

---

## SECTION 7: Internal Links (100 words)
**H2:** Related Services

**Cross-Links:**
- **/logistics:** "Comprehensive logistics document processing across modes"
- **/customs:** "Shipping documents form the basis of customs entries"
- **/finance:** "Freight billing and shipping cost management"
- **/compliance:** "Regulatory compliance for international shipping"

**Integration Links:**
- CargoWise integration pages
- SAP TM integration pages
- Specific carrier integration content

---

## TOTAL WORD COUNT TARGET: ~1,650 words
