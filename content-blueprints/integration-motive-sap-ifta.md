# Integration Page Blueprint: Motive-to-SAP-IFTA-Normalization
## Target: 1,500+ words | Focus: Fleet Data → Tax Compliance

---

## Hero (150 words)

**H1:** Motive to SAP IFTA Normalization | Fleet Data Bridge | DocStandard

**Subtitle:** Transform Motive fleet telematics data into SAP-compliant IFTA fuel tax records. Automate quarterly reporting with validated, audit-ready outputs.

**Body:**
Fleet operators using Motive for ELD compliance and SAP for ERP need accurate IFTA (International Fuel Tax Agreement) data to file quarterly fuel tax returns. The problem: Motive exports raw telematics. SAP needs structured tax records with jurisdiction splits, distance calculations, and fuel purchase allocations. DocStandard bridges this gap, normalizing Motive's GPS and fuel data into SAP-ready IFTA formats that pass audit scrutiny.

---

## The IFTA Data Problem (300 words)

**H2:** Why IFTA Data Integration Fails

**Opening:**
IFTA compliance requires precise tracking of every mile driven and every gallon purchased across member jurisdictions. For fleets running Motive ELDs and SAP ERP, the handoff between systems is where data breaks down.

**Pain Points:**

1. **Jurisdiction Boundary Ambiguity**
   Motive tracks GPS coordinates. IFTA requires jurisdiction-by-jurisdiction summaries. Drawing the line between California and Nevada isn't always clear — especially near border towns. Manual allocation leads to over/under-payment of fuel taxes and audit flags.

2. **Fuel Purchase Timing Mismatches**
   A driver fuels in Arizona on Monday. The Motive ELD logs the location. But the fuel card transaction clears Wednesday with a different timestamp. Matching these events for IFTA reporting requires cross-referencing multiple data sources — a manual process prone to error.

3. **Distance Calculation Discrepancies**
   Motive calculates miles driven from GPS traces. SAP needs IFTA miles by jurisdiction. The difference? Personal conveyance, yard moves, and deadheading don't count the same way. Without proper categorization, your IFTA return over-reports taxable miles.

4. **Quarterly Reporting Crunch**
   IFTA returns are due quarterly: January, April, July, October. Fleet managers spend 2-3 weeks manually compiling spreadsheets from Motive exports, fuel card statements, and SAP cost center data. Miss the deadline? Penalties accrue daily.

**Statistic:**
> "30% of fleet IFTA audits reveal discrepancies in distance or fuel records." — FleetOwner Industry Report

---

## The DocStandard IFTA Pipeline (400 words)

**H2:** Motive-to-SAP IFTA Processing Pipeline

### Stage 1: Motive Data Ingestion
**Description:**
We pull fleet telematics data from Motive via API export or file delivery. This includes:
- GPS location history (latitude, longitude, timestamp)
- Vehicle identification (VIN, asset ID, unit number)
- Driver assignment (driver ID, duty status changes)
- Odometer readings (engine vs. GPS-calculated)
- Geofence events (yard entry/exit, customer sites)

**Technical Details:**
- **API Endpoint:** Motive Fleet API v1
- **Authentication:** OAuth 2.0 with fleet manager credentials
- **Data Retention:** Up to 6 months historical (per Motive limits)
- **Export Formats:** JSON (API), CSV (bulk export), or PDF (driver logs)

### Stage 2: Jurisdiction Mapping
**Description:**
Raw GPS coordinates are mapped to IFTA jurisdictions using geospatial boundary databases. We handle:
- State/province boundary detection
- Special jurisdiction zones (Indian reservations, federal lands)
- Toll road allocation (miles by state even on single tollway)
- Border zone logic (which jurisdiction gets the mile)

**Technical Details:**
- **Geocoding:** Reverse geocoding to IFTA jurisdiction codes
- **Precision:** ±50 meters (adequate for tax jurisdiction)
- **Updates:** Quarterly boundary updates from IFTA Inc.

### Stage 3: Fuel Purchase Matching
**Description:**
Fuel card transactions (WEX, FleetCor, Comdata) are matched to vehicle locations from Motive. We reconcile:
- Fuel card timestamp vs. GPS timestamp (±15 min window)
- Fuel card location vs. GPS location (±1 mile radius)
- Fuel type (diesel, gasoline, alternative) for tax rate application
- Purchase gallons vs. tank capacity sanity checks

**Technical Details:**
- **Matching Algorithm:** Fuzzy matching on time + location
- **Confidence Threshold:** 85% for auto-match, manual review below
- **Supported Cards:** WEX, FleetCor, Comdata, EFS, TCH

### Stage 4: Distance Calculation & Categorization
**Description:**
Total miles are split by jurisdiction and categorized for IFTA:
- **Taxable Miles:** Distance traveled in each jurisdiction
- **Exempt Miles:** Personal conveyance, yard moves (if properly logged)
- **Gross/Gallons Ratio:** MPG calculation per jurisdiction

**Technical Details:**
- **Distance Method:** Shortest path practical (IFTA standard)
- **Odometer Validation:** Cross-check GPS vs. engine odometer
- **Rounding:** 0.1 mile precision (IFTA requirement)

### Stage 5: SAP Delivery
**Description:**
Normalized IFTA data loads into SAP as structured tax records:
- FI-GL postings for fuel tax accruals
- Cost center allocations by jurisdiction
- Vehicle/asset assignment for fleet tracking
- Audit trail with source document references

**Technical Details:**
- **SAP Module:** FI (Financial Accounting), AA (Asset Accounting)
- **Formats:** IDoc (FI_AP_INVOICE), CSV (legacy), or direct RFC
- **Delivery:** Real-time (webhook) or batch (scheduled)

---

## Field Mapping Reference (300 words)

**H2:** Motive-to-SAP IFTA Field Mapping

### Motive Source Fields

| Field | JSON Path | Example | Description |
|-------|-----------|---------|-------------|
| **Vehicle ID** | `vehicle.id` | "VH_12345" | Motive vehicle identifier |
| **VIN** | `vehicle.vin` | "1HGBH41JXMN109186" | Vehicle identification number |
| **Unit Number** | `vehicle.unit_number` | "TRK-042" | Fleet asset number |
| **Timestamp** | `gps.timestamp` | "2026-02-11T14:30:00Z" | ISO 8601 UTC |
| **Latitude** | `gps.latitude` | 34.0522 | Decimal degrees |
| **Longitude** | `gps.longitude` | -118.2437 | Decimal degrees |
| **Odometer** | `vehicle.odometer` | 124567.3 | Engine odometer (miles) |
| **Driver ID** | `driver.id` | "DRV_789" | Motive driver identifier |
| **Duty Status** | `driver.duty_status` | "D" | HOS status (D=Drive, ON=On Duty) |
| **Location Name** | `gps.location_name` | "Los Angeles, CA" | Reverse geocoded city |

### SAP Target Fields (IFTA)

| Field | SAP Field | Example | Description |
|-------|-----------|---------|-------------|
| **Jurisdiction Code** | `IFTA_JURIS` | "CA" | 2-char IFTA jurisdiction |
| **Taxable Miles** | `IFTA_MILES` | 1250.5 | Distance in jurisdiction |
| **Fuel Gallons** | `IFTA_GALLONS` | 187.3 | Fuel purchased |
| **Tax Rate** | `IFTA_RATE` | 0.529 | $/gallon tax rate |
| **Tax Due** | `IFTA_TAX` | 99.08 | Calculated tax |
| **Vehicle Ref** | `ASSET_NO` | "TRK-042" | Links to AA module |
| **Period** | `IFTA_QUARTER` | "2026Q1" | Reporting period |
| **Fuel Type** | `FUEL_TYPE` | "DSL" | Diesel/Gas/Alternative |

### Fuel Card Fields

| Field | Source | Example | Match Key |
|-------|--------|---------|-----------|
| **Transaction ID** | WEX/FleetCor | "TXN_123456" | Primary key |
| **Card Number** | Fuel card | "****1234" | Last 4 digits |
| **Fuel Date** | Card data | "2026-02-11" | Match to GPS date |
| **Fuel Time** | Card data | "14:35:00" | Match to GPS time |
| **Station Location** | Card data | "Phoenix, AZ" | Match to GPS city |
| **Gallons** | Card data | 95.2 | IFTA input |
| **Price/Gallon** | Card data | 3.859 | Cost calculation |

---

## IFTA Compliance Coverage (200 words)

**H2:** IFTA Jurisdictions Supported

**Base Jurisdictions (48 US States + 10 Canadian Provinces):**
- **US:** All 48 contiguous states (excludes AK, HI for IFTA)
- **Canada:** AB, BC, MB, NB, NL, NS, ON, PE, QC, SK

**Special Handling:**
- **Oregon:** Weight-mile tax (separate from fuel tax)
- **Kentucky:** Weight-distance tax quarterly filing
- **New Mexico:** Weight-distance permit integration
- **New York:** Highway use tax (HUT) decaling
- **Canadian Fuel Charge:** Federal carbon pricing add-on

**Tax Rate Updates:**
- **Frequency:** Quarterly (IFTA Inc. publishes rates)
- **Effective Dates:** January 1, April 1, July 1, October 1
- **Delivery:** Auto-update via API or manual rate table upload

**Audit Support:**
- **Source Retention:** 4 years (IFTA requirement)
- **Documentation:** GPS breadcrumbs + fuel receipts + jurisdiction summaries
- **Format:** Excel/CSV export for auditor review

---

## SLA & Delivery (150 words)

**H2:** IFTA Processing Times

**Quarterly Reporting (Standard):**
- **Due Date:** Last day of month following quarter end (Jan 31, Apr 30, Jul 31, Oct 31)
- **Processing Window:** 5-7 business days before deadline
- **Output:** SAP-ready IFTA return file

**Monthly Reporting (Add-on):**
- **Mid-quarter estimates:** Provisional tax accruals
- **Delivery:** 2 business days after month close

**Urgent Processing:**
- **Audit response:** 48-hour turnaround for documentation
- **Amended returns:** 24-hour reprocessing if error found

**Quality Guarantees:**
- **Jurisdiction Accuracy:** 99.5% (validated against geofences)
- **Fuel Match Rate:** 95%+ auto-matched to GPS locations
- **Tax Calculation:** 100% (formula validation)

---

## Related Services (100 words)

**H3:** Related Fleet Solutions

- **Fleet Document Processing:** General fleet paperwork automation
- **ELD Data Extraction:** Driver log digitization and compliance checks
- **Fuel Card Reconciliation:** Multi-card fleet expense management

---

**Total Word Count Target: ~1,600 words**
