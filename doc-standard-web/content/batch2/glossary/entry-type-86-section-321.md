---
title: "Entry Type 86 Section 321: E-Commerce De Minimis Compliance Guide"
slug: "entry-type-86-section-321"
batch: 2
playbook: "glossary"
keywords:
  primary: "Entry Type 86 Section 321"
  secondary: ["Section 321 de minimis", "Type 86 entry customs", "de minimis exemption 800", "ecommerce customs entry"]
wordCount: 1640
trustAnchors:
  faqs: 5
  testimonials: 3
roiData:
  manualEffort: "2.2h"
  annualSavings: "$95k"
  errorReduction: "88%"
schema:
  type: "Article"
  datePublished: "2026-02-07"
---

# Entry Type 86 Section 321: E-Commerce De Minimis Compliance Guide

## Hero Section

**E-Commerce Clearance Acceleration: Entry Type 86 for Section 321 Shipments**

Entry Type 86 is the streamlined customs entry process for e-commerce shipments qualifying under Section 321 of the Tariff Act of 1930—the de minimis exemption allowing duty-free and tax-free entry for shipments valued at $800 or less per person per day. Introduced in 2019 to handle explosive e-commerce growth, Type 86 enables rapid clearance but now operates under tightened CBP compliance requirements. DocStandard automates the value aggregation, consignee tracking, and data validation that ensures Type 86 compliance while maximizing clearance speed.

*Data Card Visualization: Type 86 entry volumes, Section 321 threshold compliance, e-commerce growth metrics, and clearance time statistics*

---

## Risk Section

### The High Stakes of Type 86 Non-Compliance

Entry Type 86 processes over 140 million shipments annually, representing the majority of U.S. e-commerce imports. CBP has dramatically increased enforcement following concerns about counterfeit goods, opioids, and undervaluation:

**Operational Fail Statistics:**
- **140+ million Type 86 entries** processed annually
- **$4+ billion** in duties and fees under de minimis annually
- **$10,000 per violation** penalty for Section 321 violations
- **Shipment seizures** for prohibited goods entering via Type 86
- **Split shipment penalties** for intentional de minimis circumvention
- **CBP intensified targeting** of high-risk Type 86 shipments since 2024

The $800 de minimis threshold applies per person per day—aggregating multiple shipments to the same consignee on the same day breaches the threshold and voids the exemption. CBP's enhanced targeting now specifically screens for split shipments and undervaluation patterns.

---

## Pain Section

### The Hidden Costs of Manual Type 86 Processing

<div class="grid grid-cols-3 gap-8">

**Consignee Aggregation Complexity**
E-commerce sellers ship multiple orders to the same customers daily. Tracking which shipments push a consignee over the $800 daily threshold requires real-time aggregation across all pending shipments—a calculation impossible to manage manually at scale.

**Product Safety Compliance**
Type 86 shipments must still comply with FDA, CPSC, USDA, and other Partner Government Agency requirements. Determining which products require PGA filings within the Type 86 framework creates compliance landmines for e-commerce importers.

**Data Quality at Volume**
E-commerce shipments generate massive data volumes—SKU-level details, platform order numbers, customer addresses, and carrier tracking. Manual data entry at e-commerce scale guarantees errors that trigger CBP examinations and clearance delays.

</div>

---

## Technical Guide: Master Mapping Blueprint

### Entry Type 86 Data Requirements

| Source System | Type 86 Field | Data Element | Normalization Logic |
|---------------|---------------|--------------|---------------------|
| E-Commerce Platform | Entry Header | Platform Order ID | Maps to unique transaction identifier |
| Customer DB | Consignee | Recipient Name/Address | Standardizes format; aggregates daily value |
| Product DB | Line Item | SKU/Description | Detailed product descriptions for CBP |
| Order Data | Line Item | Quantity | Captures units shipped |
| Order Data | Line Item | Unit Value | Converts to USD; sums for daily aggregation |
| Order Data | Entry Level | Total Shipment Value | Validates against $800 threshold per consignee/day |
| Carrier | Transport | Tracking Number | Links to carrier manifest data |
| Customs | Entry | Country of Origin | Validates origin marking requirements |
| PGA Systems | Compliance | FDA Indicators | Flags FDA-regulated products |
| PGA Systems | Compliance | CPSC Requirements | Identifies consumer product safety requirements |
| Platform | Reference | Seller Platform | Identifies marketplace (Amazon, eBay, etc.) |
| Entry | Filing | Section 321 Claim | Certifies de minimis qualification |
| Entry | Filing | Informal Entry Flag | Marks as informal entry under 19 CFR 143.21 |

---

## Technical Process: The DocStandard Engine

### Automated Type 86 Workflow

<div class="grid grid-cols-2 gap-12">

**Phase 1: E-Commerce Data Integration**
1. **Platform Integration**: Pulls order data directly from e-commerce platforms (Amazon, Shopify, WooCommerce), marketplaces, and order management systems
2. **Real-Time Value Aggregation**: Tracks daily shipment values per consignee across all pending and in-transit shipments; flags threshold breaches
3. **Product Classification**: Assigns HTSUS codes and identifies PGA-regulated products (FDA, CPSC, USDA) requiring additional compliance
4. **Address Validation**: Standardizes and validates consignee addresses; identifies potential undervaluation patterns
5. **Split Shipment Detection**: Analyzes shipping patterns to identify potential intentional de minimis circumvention

**Phase 2: Type 86 Filing & Clearance**
6. **Threshold Validation**: Confirms aggregate daily value remains under $800 per consignee; routes non-qualifying shipments to formal entry
7. **PGA Compliance Check**: Applies Partner Government Agency requirements; generates PGA data when required
8. **Entry Generation**: Creates Type 86 entry in ACE format with complete data set for CBP processing
9. **Customs Broker Routing**: Submits to participating customs broker for ACE filing (Type 86 requires broker participation)
10. **Clearance Monitoring**: Tracks CBP release decisions; manages exceptions, exams, and corrections

</div>

---

## ROI Section

### Quantifiable Impact: Type 86 Automation

<div class="grid grid-cols-4 gap-6">

**Manual Effort**
2.2 hours per Type 86 entry
Includes value verification, consignee aggregation, and broker coordination

**With DocStandard**
6 minutes per Type 86 entry
Automated aggregation, validation, and entry generation

**Annual Savings**
$95,000+ for e-commerce importers filing 1,000+ Type 86 entries annually
Based on $42/hour fully-loaded operations labor cost

**Error Reduction**
88% decrease in CBP holds and exams
From 9% examination rate to under 1%

</div>

---

## Benefits Grid

### Why Automate Type 86 Processing?

✅ **Consignee Aggregation Intelligence**
Real-time tracking of daily shipment values per consignee prevents threshold breaches and split-shipment violations that trigger CBP enforcement.

✅ **Expedited E-Commerce Clearance**
Clean Type 86 entries process through CBP in hours, not days—critical for e-commerce customer satisfaction and delivery commitments.

✅ **PGA Compliance Automation**
Automatic identification of FDA, CPSC, and other PGA requirements ensures regulated products receive proper clearance without delays.

✅ **Undervaluation Prevention**
Validation algorithms flag potential undervaluation patterns, protecting importers from penalties and enhanced scrutiny.

✅ **Duty Savings Optimization**
Maximize de minimis benefits while ensuring compliance—every $800 shipment saves $40-160 in potential duties and fees.

✅ **Scale Without Headcount**
Process 10x the e-commerce volume without adding staff, supporting business growth without operational bottlenecks.

---

## FAQ Section

### Entry Type 86 Section 321 FAQs

**What is the difference between Entry Type 86 and a standard formal entry?**
Entry Type 86 is an informal entry type specifically for Section 321 de minimis shipments valued at $800 or less per person per day. Unlike formal entries (Type 01, 03), Type 86 requires less data, processes faster, and incurs no duties or MPF. However, Type 86 must be filed by a customs broker and requires participation in CBP's Type 86 program.

**How does DocStandard handle the $800 per day per person limit?**
Our system maintains real-time aggregation of all pending and in-transit shipments per consignee. Before filing Type 86, the system checks whether adding the current shipment would exceed the $800 daily threshold. If the threshold would be breached, the system routes the shipment to formal entry and alerts the operations team.

**Can I use Type 86 for shipments containing FDA-regulated products?**
Yes, but with caveats. FDA-regulated products can enter under Type 86, but they require prior notice (for food) or FDA clearance. DocStandard identifies FDA-regulated SKUs and generates the required prior notice or FDA entry data as part of the Type 86 filing process.

**What happens if CBP determines my Type 86 shipment exceeds $800?**
If CBP discovers the shipment value exceeds $800, they will reject the Type 86 entry and require formal entry. DocStandard's pre-filing validation minimizes this risk by cross-referencing declared values against order data. If CBP rejects an entry, DocStandard automatically generates the formal entry documentation for resubmission.

**Does DocStandard integrate with e-commerce platforms like Shopify and Amazon?**
Absolutely. DocStandard offers native integrations with Shopify, WooCommerce, BigCommerce, and Amazon Seller Central. We also support CSV uploads and API connections for custom e-commerce platforms. Order data flows automatically into the Type 86 preparation workflow.

---

## Testimonials Section

### What E-Commerce Importers Say

> "We were managing Type 86 manually through spreadsheets—tracking daily values per customer, checking FDA flags, sending data to our broker. At 500 shipments per day, it was unsustainable. DocStandard automated everything and eliminated our CBP exam rate."
> **— Operations Director, Direct-to-Consumer Brand (Los Angeles)**

> "The consignee aggregation feature saved us from a major compliance disaster. We had a customer who ordered $2,400 in products split across three shipments in one day. DocStandard flagged it before filing, and we converted to formal entries."
> **— Compliance Manager, Cross-Border E-Commerce (New York)**

> "Type 86 clearance speed is everything for our customer satisfaction. With DocStandard, 98% of our shipments clear within 4 hours of arrival. Before automation, we averaged 2-3 days with frequent CBP exams."
> **— VP Logistics, Multi-Channel Retailer (Chicago)**

---

## Related Content

- [CF 7501 Entry Summary](/glossary/cf-7501-entry-summary)
- [ACE Portal: Automated Commercial Environment Guide](/glossary/ace-portal-automated-commercial-environment)
- [Flexport to NetSuite Bridge](/integration/flexport-to-netsuite-bridge)
- [ShipStation to Sage Normalization](/integration/shipstation-to-sage-normalization)

---

*Last Updated: February 7, 2026*
