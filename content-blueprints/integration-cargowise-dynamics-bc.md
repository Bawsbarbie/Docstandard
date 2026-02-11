# Integration Page Blueprint: CargoWise-to-Dynamics-BC-Bridge
## Target: 1,500+ words | Focus: Enterprise Logistics → SMB ERP

---

## Hero (150 words)

**H1:** CargoWise to Dynamics 365 Business Central Bridge | Freight Data Integration | DocStandard

**Subtitle:** Connect WiseTech's CargoWise platform to Microsoft's Dynamics 365 BC. Bridge enterprise freight operations to mid-market ERP without custom development.

**Body:**
Mid-sized freight forwarders and logistics providers often run CargoWise for operations but need the financial controls of Dynamics 365 Business Central. The gap: shipment data, costs, and revenue live in CargoWise while accounting, reporting, and compliance happen in BC. DocStandard automates this bridge, extracting CargoWise operational data and delivering Dynamics BC-compatible formats for financial management.

---

## The CargoWise-BC Challenge (300 words)

**H2:** Why Enterprise Logistics Data Stalls in SMB ERP

**Opening:**
CargoWise is the dominant platform for freight forwarding — handling everything from bookings and customs to warehousing and accounting. But many mid-market forwarders outgrow CargoWise's basic accounting and want Dynamics 365 BC for deeper financial controls, multi-currency consolidation, and advanced reporting.

**Pain Points:**

1. **Chart of Accounts Mismatch**
   CargoWise uses its own GL structure designed for logistics. Dynamics BC has a standard chart of accounts. Mapping revenue, costs, and allocations between the two requires manual translation every month.

2. **Multi-Currency Complexity**
   A single shipment might have revenue in USD (customer), costs in EUR (airline), and need reporting in GBP (parent company). CargoWise handles this operationally, but getting clean multi-currency journals into BC is manual.

3. **Job Costing vs. Project Accounting**
   CargoWise tracks profitability by shipment (job). Dynamics BC uses project accounting or dimensions. Aligning these structures for profitability reporting requires spreadsheet gymnastics.

4. **Period-End Pressure**
   Month-end means exporting trial balances from CargoWise, manipulating in Excel, and importing to BC. This 3-5 day process delays management reports and risks cutoff errors.

**Statistic:**
> "Freight forwarders using separate operational and financial systems spend 25+ hours per month on reconciliation between platforms." — Freight Forwarding Technology Survey

---

## The DocStandard BC Bridge Pipeline (400 words)

**H2:** CargoWise-to-Dynamics BC Data Pipeline

### Stage 1: CargoWise Data Extraction
**Description:**
We extract forwarding data from CargoWise via eAdapter, web services, or database export. Captured data includes:
- Shipment headers (job numbers, modes, routes)
- Financial data (revenue, costs, allocations)
- Invoice registers (customer invoices, carrier bills)
- Job profitability (revenue - costs = margin)
- GL transactions (CargoWise accounting entries)

**Technical Details:**
- **eAdapter:** XML messaging for real-time integration
- **Web Services:** SOAP API for data queries
- **Database:** Direct read from CargoWise backend (SQL)
- **File Export:** CSV/Excel scheduled exports
- **Security:** Restricted to read-only data access

### Stage 2: Financial Normalization
**Description:**
CargoWise financial data is normalized for Dynamics BC:
- **Account Mapping:** CargoWise GL → Dynamics BC chart of accounts
- **Currency Conversion:** Multi-currency transactions standardized
- **Dimension Mapping:** Job, department, branch → BC dimensions
- **VAT/GST Handling:** Tax codes translated to BC tax setup
- **Intercompany:** Multi-branch transactions flagged

**Technical Details:**
- **GL Mapping Table:** Configurable account translation
- **FX Rates:** Daily spot or monthly average
- **Tax Engines:** BC native tax or external (Avalara)
- **Rounding:** Penny/cent rounding rules applied

### Stage 3: BC Integration
**Description:**
Normalized data posts to Dynamics BC as:
- **General Journals:** GL entries (revenue, costs, accruals)
- **Sales Invoices:** Customer billing (if not using CargoWise invoicing)
- **Purchase Invoices:** Carrier/vendor bills
- **Jobs/Projects:** Job profitability tracking
- **Bank Transactions:** Cash receipt/payment matching

**Technical Details:**
- **API:** Dynamics 365 BC REST API (Business Central API v2.0)
- **Authentication:** OAuth 2.0 (Azure AD)
- **Formats:** JSON (API), XML (configurable), CSV (import)
- **Batch Size:** Optimized for BC API limits

### Stage 4: Reconciliation Automation
**Description:**
Automated matching between CargoWise and BC:
- **Trial Balance Comparison:** CargoWise TB vs. BC GL balance
- **Job Profitability:** CargoWise job margin vs. BC project P&L
- **AR/AP Matching:** Outstanding invoices cross-referenced
- **Currency Revaluation:** Unrealized gains/losses calculated

**Technical Details:**
- **Variance Thresholds:** Configurable tolerance (e.g., ±$1.00)
- **Exception Reports:** Unmatched transactions flagged
- **Auto-Correction:** Minor rounding differences auto-adjusted
- **Audit Trail:** Full transaction lineage maintained

### Stage 5: Reporting & Compliance
**Description:**
Consolidated reporting and compliance support:
- **Management Reports:** P&L by branch, mode, customer
- **Statutory Reports:** VAT returns, GST reports, tax filings
- **Audit Support:** Transaction drill-down from BC to CargoWise
- **Multi-Company:** Consolidation for group reporting

**Technical Details:**
- **Power BI:** Direct BC data for dashboards
- **Financial Statements:** BC native financial reports
- **Consolidation:** Elimination entries for intercompany
- **Retention:** 7-year audit trail compliance

---

## Field Mapping Reference (350 words)

**H2:** CargoWise-to-Dynamics BC Field Mapping

### CargoWise Source Fields

| Field | Source | Example | Description |
|-------|--------|---------|-------------|
| **Job Number** | `tblJob.JobNumber` | "CHI123456" | Shipment identifier |
| **Job Type** | `tblJob.JobType` | "SEA" | Mode (SEA/AIR/ROAD) |
| **Job Status** | `tblJob.JobStatus` | "COMPLETED" | Job lifecycle status |
| **Branch** | `tblJob.Branch` | "CHI" | Operating branch |
| **Department** | `tblJob.Department` | "OCEAN" | Department code |
| **Customer** | `tblOrganization.OrgName` | "ABC Imports" | Bill-to customer |
| **Revenue** | `tblJob.Revenue` | 5000.00 | Total job revenue |
| **Cost** | `tblJob.DirectCosts` | 3500.00 | Total job costs |
| **Profit** | `tblJob.Profit` | 1500.00 | Gross profit |
| **Currency** | `tblJob.CurrencyCode` | "USD" | Job currency |
| **Invoice #** | `tblInvoice.InvoiceNumber` | "INV-001234" | Customer invoice |
| **Invoice Amt** | `tblInvoice.TotalAmount` | 5000.00 | Invoice amount |

### Dynamics BC General Journal Fields

| Field | BC API | Example | Description |
|-------|--------|---------|-------------|
| **Journal Template** | `journalTemplateName` | "GENERAL" | Journal batch template |
| **Journal Batch** | `journalBatchName` | "CARGOWISE" | Specific batch name |
| **Posting Date** | `postingDate` | "2026-02-11" | Transaction date |
| **Document No** | `documentNumber` | "CW-123456" | Reference number |
| **Account Type** | `accountType` | "G/L Account" | GL account |
| **Account No** | `accountNumber` | "61100" | BC account number |
| **Description** | `description` | "Freight Revenue" | Line description |
| **Amount** | `amount` | 5000.00 | Debit/Credit amount |
| **Currency Code** | `currencyCode` | "USD" | Transaction currency |
| **Dimension 1** | `shortcutDimension1Code` | "CHI" | Branch dimension |
| **Dimension 2** | `shortcutDimension2Code` | "OCEAN" | Department dimension |
| **External Doc** | `externalDocumentNumber` | "CHI123456" | CargoWise job ref |

### Dynamics BC Sales Invoice Fields

| Field | BC API | Example | Description |
|-------|--------|---------|-------------|
| **Customer No** | `customerNumber` | "C001" | BC customer code |
| **Posting Date** | `postingDate` | "2026-02-11" | Invoice date |
| **Document Date** | `documentDate` | "2026-02-11" | Document date |
| **Due Date** | `dueDate` | "2026-03-13" | Payment due |
| **Line Amount** | `amount` | 5000.00 | Line amount |
| **Description** | `description` | "Ocean Freight CHI-LAX" | Service description |
| **Job No** | `jobNumber` | "CHI123456" | Link to BC job |

### Account Mapping Example

| CargoWise Account | Dynamics BC Account | Description |
|-------------------|---------------------|-------------|
| **REV-OCN** | 61100 | Ocean Freight Revenue |
| **REV-AIR** | 61200 | Air Freight Revenue |
| **COST-OCN** | 71100 | Ocean Freight Costs |
| **COST-AIR** | 71200 | Air Freight Costs |
| **EXP-ADM** | 81100 | Administrative Expense |

---

## Dynamics BC Configuration (150 words)

**H2:** BC Setup Requirements

**Modules Required:**
- **General Ledger:** Core accounting
- **Sales & Receivables:** Customer invoicing (if applicable)
- **Purchases & Payables:** Vendor bills (if applicable)
- **Jobs:** Job/project accounting for shipment profitability
- **Dimensions:** Branch, department, mode tracking

**Custom Fields to Create:**
- **GL Entry:** `CargoWiseJobNo` (links BC entry to CargoWise)
- **Customer:** `CargoWiseOrgCode` (customer mapping)
- **Job Card:** `CargoWiseJobRef` (job linkage)

**Dimensions Setup:**
- **Dimension 1:** BRANCH (CHI, NYC, LAX, etc.)
- **Dimension 2:** DEPARTMENT (OCEAN, AIR, ROAD, WAREHOUSE)
- **Dimension 3:** MODE (LCL, FCL, CONSOL, etc.)

**Permissions:**
- **API Access:** Dynamics 365 Business Central API
- **User:** Service account with GL, Sales, Purchasing permissions
- **OAuth:** Azure AD app registration

---

## SLA & Delivery (100 words)

**H2:** BC Processing Times

**Standard Processing:**
- **Job-to-Journal:** 15 minutes after CargoWise job completion
- **Invoice Sync:** Real-time or hourly batch
- **Daily Reconciliation:** Overnight TB comparison

**Dynamics Versions Supported:**
- **Dynamics 365 BC Cloud:** SaaS (preferred)
- **Dynamics 365 BC On-Premise:** With API access configured
- **NAV 2018+:** Limited support via OData

**Quality Guarantees:**
- **Account Mapping:** 100% (validated against chart)
- **Currency Accuracy:** 100% (rate validation)
- **Journal Posting:** 99%+ (retry logic)

---

**Total Word Count Target: ~1,550 words**
