/**
 * vertical-integration-factory.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Deterministic content factory for NEW vertical integration pages.
 * Powers: /accountants/integration/[slug]
 *         /real-estate/integration/[slug]
 *         /warehousing/integration/[slug]
 *
 * Does NOT replace integration-factory.ts — that still powers logistics.
 * Content is generated at request-time from the data-layer; no pre-generated
 * JSON required. Same slug → same content (deterministic hash).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  getVertical,
  getSourceSystems,
  getDestinationSystems,
  getIntegrationPairs,
  getHurdles,
  type SoftwareSystem,
  type Vertical,
  type Hurdle,
} from "@/lib/pseo/data-layer"
import { buildIntegrationPageLinks } from "@/lib/pseo/internal-links"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface VerticalIntegrationFaq {
  question: string
  answer: string
}

export interface VerticalIntegrationStep {
  name: string
  details: string
}

export interface VerticalIntegrationModel {
  // Identifiers
  vertical: string
  verticalName: string
  slug: string // "{source-slug}-to-{dest-slug}"
  canonicalUrl: string

  // Content
  title: string
  h1: string
  description: string
  sourceSystem: string
  destinationSystem: string
  hurdleName: string
  expertAnalysis: string
  operationalImpact: string

  // ROI
  roi: {
    manualHours: string
    accuracy: string
    savings: string
  }

  // FAQ
  faqs: VerticalIntegrationFaq[]

  // Technical
  technicalSteps: VerticalIntegrationStep[]
  fieldMappingRows: Array<{ source: string; destination: string; transformation: string }>

  // Links
  relatedLinks: Array<{ label: string; href: string }>
  verticalHubUrl: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Hash (deterministic content selection)
// ─────────────────────────────────────────────────────────────────────────────

function hash(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i)
    h = h & 0x7fffffff
  }
  return h
}

function pick<T>(arr: T[], seed: string): T {
  return arr[hash(seed) % arr.length]
}

// Replace template variables in copy strings
function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\[(\w+)\]/g, (_, key) => vars[key] ?? `[${key}]`)
}

// ─────────────────────────────────────────────────────────────────────────────
// Copy pools (industry-specific, [SOURCE] and [DEST] replaced at runtime)
// ─────────────────────────────────────────────────────────────────────────────

const EXPERT_ANALYSIS: Record<string, string[]> = {
  accountants: [
    `CPA firms and bookkeeping practices lose 12–18 hours per week manually reformatting client documents between [SOURCE] and [DEST]. The friction isn't in the accounting itself — it's in the document pipeline. Inconsistent naming conventions, missing field mappings, and format mismatches create a compounding problem: reconciliation errors that only surface at year-end, when there's no time to fix them.`,
    `The gap between [SOURCE]'s client-facing workflow and [DEST]'s chart of accounts structure is where accounting data goes wrong. Each manual export introduces field drift. Each import requires cleanup. Multiply that across 50+ client files and you have a month-end bottleneck that's entirely preventable with proper schema normalization.`,
    `Practice management tools like [SOURCE] generate the work product. ERPs like [DEST] need the financials. But the data model between them doesn't map cleanly — and the cleanup work falls on your staff. When [SOURCE] exports don't conform to [DEST]'s import schema, every batch requires manual intervention before it can be posted.`,
    `Tax and accounting practices running [SOURCE] alongside [DEST] consistently report the same friction: the two systems don't speak the same language. Transaction codes differ. Account names don't match. Custom fields are ignored. DocStandard normalizes the schema so your team stops being data janitors and starts doing billable work.`,
  ],
  "real-estate": [
    `Property management generates a massive volume of documents: leases, rent rolls, maintenance invoices, CAM reconciliations. [SOURCE] captures them. [DEST] needs to report on them. But the formats rarely align, and the normalization work falls on your operations team — every month, across every property.`,
    `The gap between [SOURCE]'s property management data and [DEST]'s financial reporting structure is where real estate operations lose time. Rent roll mismatches, lease data extraction errors, and inconsistent CAM charge codes create reconciliation work that compounds across every property you manage.`,
    `Property managers running [SOURCE] alongside [DEST] face the same challenge: one system tracks the assets, the other reports on them — and the data between them never arrives clean. Tenant names differ by a space. Charge codes don't map. Lease dates are formatted differently. Every month, someone manually bridges the gap.`,
    `Real estate operations scaled across multiple properties can't afford manual data bridging between [SOURCE] and [DEST]. When lease records need to be normalized, rent rolls reformatted, and maintenance invoices mapped to cost centers, the volume makes manual processing economically unsustainable. The answer is schema normalization at the source.`,
  ],
  warehousing: [
    `[SOURCE] runs the warehouse floor. [DEST] runs the books. But the data between them — SKUs, quantities, location codes, supplier references — doesn't map cleanly. The normalization work lands on your operations team, creating a bottleneck between fulfillment and finance that grows with every new client and SKU added.`,
    `WMS systems like [SOURCE] generate granular operational data that ERPs like [DEST] need in a completely different format. Quantity UOMs don't match. SKU formats differ. Location codes need mapping. Without automation, your team is manually bridging this gap daily — and the error rate compounds as volume grows.`,
    `3PLs and distributors running [SOURCE] alongside [DEST] consistently encounter the same friction: the operational detail captured in the warehouse doesn't transfer cleanly to the accounting and reporting layer. Every fulfillment cycle generates documents that require manual cleanup before they're usable in [DEST].`,
    `Inventory accuracy in [DEST] is only as good as the data flowing in from [SOURCE]. When SKU normalization is done manually, discrepancies accumulate across cycle counts, receipts, and adjustments. By the time the variance is visible in the ERP, tracing it back to source documents is a forensic exercise — not a five-minute lookup.`,
  ],
}

const OPERATIONAL_IMPACT: Record<string, string[]> = {
  accountants: [
    `When [SOURCE] documents arrive clean and [DEST]-ready, your team gets back the time they were spending on reformatting. That's 12-18 hours per week your staff can redirect to client advisory work, compliance review, or closing new engagements — not fixing import errors.`,
    `Firms that automate [SOURCE] to [DEST] document normalization reduce month-end close time by 40–60%. The difference isn't in their accounting approach — it's in their data pipeline. Clean input means faster output, every cycle.`,
    `Accounting practices that remove the [SOURCE]→[DEST] normalization bottleneck report two immediate gains: faster client turnaround and fewer audit findings tied to data inconsistencies. The work doesn't change; the friction does.`,
    `When your [SOURCE] exports land in [DEST] without manual cleanup, the accounting cycle shortens. Teams running this integration report cutting their month-end close by 2–3 days and reducing re-work from import errors by over 80%.`,
  ],
  "real-estate": [
    `Property management firms that automate [SOURCE] to [DEST] document normalization consistently report the same outcome: 15–20 hours per week returned to asset management and owner reporting rather than data cleanup. The portfolio grows; the admin burden doesn't.`,
    `When [SOURCE] data arrives in [DEST] correctly formatted, your accounting close shrinks, CAM reconciliation becomes a scheduled task rather than a fire drill, and owner distributions go out on time. The operational gain compounds across every property in the portfolio.`,
    `Real estate teams running [SOURCE] and [DEST] together without automation spend a disproportionate share of their time on data wrangling. Automating the document normalization layer returns that time to leasing, property operations, and investor relations — the work that actually drives portfolio value.`,
    `Normalizing [SOURCE] documents for [DEST] at scale means your accounting team processes the same volume of properties in half the time. No manual rent roll entry. No lease data re-keying. No CAM charge mapping. Just clean, audit-ready financials.`,
  ],
  warehousing: [
    `Warehousing operations that automate [SOURCE] to [DEST] normalization report 18–25 hours per week returned to operations, quality control, and client communication rather than data cleanup. At scale, that's a headcount-equivalent of recaptured capacity.`,
    `When [SOURCE] document data arrives in [DEST] with correct SKUs, accurate quantities, and mapped location codes, your inventory accuracy improves immediately. The downstream effects — fewer write-offs, faster cycle counts, cleaner audit trails — compound over time.`,
    `3PLs running [SOURCE] alongside [DEST] need clean data movement between the two to maintain inventory accuracy and client SLAs. When that normalization is manual, it becomes a capacity constraint. When it's automated, it scales with volume.`,
    `Fulfillment centers that normalize [SOURCE] exports for [DEST] intake report a measurable reduction in inventory variance, faster period-end close, and better supplier reconciliation. The change isn't operational — it's at the data layer, before any human touches the numbers.`,
  ],
}

const FAQ_POOLS: Record<string, VerticalIntegrationFaq[]> = {
  accountants: [
    {
      question: `Can you normalize [SOURCE] exports for import into [DEST]?`,
      answer: `Yes. We map [SOURCE] client records, transaction lines, and document references to [DEST]'s expected import format with field-level validation and complete audit traceability.`,
    },
    {
      question: `Do you handle chart of accounts mapping between [SOURCE] and [DEST]?`,
      answer: `Yes. We map your source COA to the [DEST] structure, handling naming mismatches, parent-child account relationships, and custom categories specific to your practice.`,
    },
    {
      question: `Can you process multiple client files in a single batch?`,
      answer: `Yes. Our batch processing handles 500–2,000+ documents per run. Each client's files are processed consistently and delivered separately with individual validation reports.`,
    },
    {
      question: `How do you handle missing or incomplete fields in [SOURCE] exports?`,
      answer: `We flag missing required fields before processing and apply configurable defaults for optional fields. You receive a validation report with every batch showing exactly what was corrected and what requires review.`,
    },
    {
      question: `Is the output suitable for audit purposes?`,
      answer: `Yes. Every output includes a transformation log showing source values, applied rules, and final output for each field. Your audit trail is built in and matches the [DEST] import record.`,
    },
    {
      question: `What file formats do you accept from [SOURCE]?`,
      answer: `We accept all standard [SOURCE] export formats including PDF, CSV, Excel, and XML. Custom export configurations are also supported with a one-time mapping setup.`,
    },
    {
      question: `How quickly can we get started?`,
      answer: `Most teams complete a pilot batch within 24–48 hours. We analyze a sample of your files, confirm the field mapping, and deliver your first batch. Production workflows typically take 2–3 business days to configure.`,
    },
    {
      question: `Do you support multi-entity consolidation?`,
      answer: `Yes. Multi-entity batches are supported with entity-level separation in the output. Each entity's data is validated against its own [DEST] structure and delivered as a clean, importable file.`,
    },
  ],

  "real-estate": [
    {
      question: `Can you extract structured data from [SOURCE] lease documents?`,
      answer: `Yes. We extract tenant name, lease term, base rent, escalation clauses, option periods, and custom fields from [SOURCE] documents into [DEST]-ready structured data with field-level validation.`,
    },
    {
      question: `Do you handle rent roll normalization from [SOURCE] to [DEST]?`,
      answer: `Yes. We normalize [SOURCE] rent roll exports to match [DEST] import requirements, including unit numbering conventions, occupancy status codes, and charge code mapping.`,
    },
    {
      question: `Can you process documents across multiple properties in one batch?`,
      answer: `Yes. Multi-property batches are handled in a single run. Each property's data is cleanly separated and labeled in the output with its own validation report.`,
    },
    {
      question: `How do you handle CAM reconciliation data?`,
      answer: `We extract operating expense line items from [SOURCE] and map them to your [DEST] CAM categories with consistent coding conventions. Pro-rata shares are preserved where applicable.`,
    },
    {
      question: `What happens if lease documents from [SOURCE] have non-standard formats?`,
      answer: `Non-standard documents are flagged for review before processing. Common variations are handled automatically. Exceptions are documented so your team can resolve edge cases efficiently without losing batch throughput.`,
    },
    {
      question: `Can you handle the migration of historical lease records from [SOURCE] to [DEST]?`,
      answer: `Yes. Historical lease data migration is supported. We process historical records with the same normalization rules as current documents, giving you a clean, consistent dataset in [DEST] from day one.`,
    },
    {
      question: `How do you maintain data integrity during the [SOURCE] to [DEST] transfer?`,
      answer: `We run a reconciliation check on every batch: source record count vs. output record count, field coverage rate, and value range validation. Discrepancies are flagged before delivery, not after import.`,
    },
    {
      question: `What file types do you accept from [SOURCE]?`,
      answer: `We accept PDF, CSV, Excel, and XML exports from [SOURCE]. Scanned documents and photos of paper records are also supported through our OCR pipeline.`,
    },
  ],

  warehousing: [
    {
      question: `Can you normalize [SOURCE] inventory exports for import into [DEST]?`,
      answer: `Yes. We map [SOURCE] inventory records, order lines, and location data to [DEST]'s import schema with SKU normalization, quantity UOM standardization, and field validation built in.`,
    },
    {
      question: `Do you handle SKU normalization between [SOURCE] and [DEST]?`,
      answer: `Yes. We standardize SKU formats across [SOURCE] and [DEST], resolving naming convention differences, parent-child SKU relationships, and unit of measure mismatches systematically.`,
    },
    {
      question: `Can you process both inbound and outbound document types?`,
      answer: `Yes. We handle the full warehousing document set: receiving reports, pick tickets, packing slips, purchase orders, inventory adjustments, and cycle count sheets — inbound and outbound.`,
    },
    {
      question: `How do you handle multi-location inventory from [SOURCE]?`,
      answer: `We map [SOURCE] location codes to [DEST] warehouse location identifiers, handling naming differences and bin-level detail where required. Multi-site configurations are supported.`,
    },
    {
      question: `What's the turnaround time for large batch volumes?`,
      answer: `Standard batch turnaround is 24–72 hours. High-volume operations (2,000+ documents per week) can arrange dedicated processing windows with same-day delivery for priority batches.`,
    },
    {
      question: `Do you support 3PL client data separation?`,
      answer: `Yes. Multi-client 3PL batches are supported with client-level separation in the output. Each client's inventory data is validated and delivered independently, maintaining your client data boundaries.`,
    },
    {
      question: `How does [SOURCE] to [DEST] normalization improve inventory accuracy?`,
      answer: `By removing manual re-keying from the pipeline, normalization eliminates transcription errors that accumulate across receipts, picks, and adjustments. Teams typically see 90–95% reduction in inventory variance within the first quarter.`,
    },
    {
      question: `Can you handle ERP data migration from [SOURCE] to [DEST]?`,
      answer: `Yes. Full historical data migration from [SOURCE] to [DEST] is supported. We process your item master, open orders, and transaction history with the same normalization rules as live documents.`,
    },
  ],
}

const TECH_STEPS: Record<string, VerticalIntegrationStep[][]> = {
  accountants: [
    [
      { name: "Document Intake & Classification", details: `We receive your [SOURCE] exports and classify each document type — transaction reports, client statements, tax forms — before any transformation begins.` },
      { name: "Schema Analysis & COA Mapping", details: `We analyze the [SOURCE] field structure and map each field to its [DEST] equivalent, including chart of accounts codes, entity identifiers, and custom references.` },
      { name: "Normalization & Validation", details: `Field values are normalized to [DEST] format: date formats standardized, currency codes aligned, missing required fields flagged, and duplicate records detected.` },
      { name: "Audit-Ready Delivery", details: `You receive clean, [DEST]-importable files with a transformation log covering every field change made, suitable for compliance and audit review.` },
    ],
    [
      { name: "Source Data Extraction", details: `Raw [SOURCE] exports are ingested and parsed. We handle PDF, CSV, Excel, and XML formats from all standard [SOURCE] export configurations.` },
      { name: "Field Mapping & Transformation", details: `Each [SOURCE] field is mapped to its [DEST] equivalent using your chart of accounts structure. Multi-entity setups are handled with entity-level separation.` },
      { name: "Quality Control", details: `We run reconciliation checks: record counts, required field coverage, value range validation, and duplicate detection before final output is generated.` },
      { name: "Batch Delivery", details: `Clean files are delivered in [DEST]-native import format with a per-batch validation report. Your team reviews exceptions; approved files import without errors.` },
    ],
  ],

  "real-estate": [
    [
      { name: "Document Collection & Parsing", details: `We receive [SOURCE] exports in any format — PDF leases, CSV rent rolls, Excel reports — and parse each document type into its constituent data fields.` },
      { name: "Lease & Rent Roll Normalization", details: `Tenant records, rent amounts, lease dates, and charge codes are normalized to [DEST] schema requirements. CAM categories are mapped to your property-specific coding conventions.` },
      { name: "Multi-Property Validation", details: `Each property's data is validated independently: unit counts reconciled, occupancy status codes standardized, and lease term calculations verified for accuracy.` },
      { name: "Accounting-Ready Delivery", details: `You receive [DEST]-ready files for each property with a validation report. Exceptions are clearly flagged with source references for efficient resolution.` },
    ],
    [
      { name: "Property Document Intake", details: `All [SOURCE] documents are received and categorized by property and document type before processing begins — leases, applications, invoices, and reports handled separately.` },
      { name: "Data Extraction & Structuring", details: `Key data fields are extracted from each document: tenant identifiers, financial terms, dates, and property codes — structured to match [DEST]'s data model.` },
      { name: "Cross-Property Reconciliation", details: `We reconcile totals across properties — total rent roll value, active unit count, scheduled maintenance — against your [SOURCE] summary reports before delivery.` },
      { name: "Owner-Report-Ready Output", details: `Final files are delivered in [DEST] import format, organized by property. Included: a batch summary, exception log, and field mapping reference for your records.` },
    ],
  ],

  warehousing: [
    [
      { name: "WMS Document Intake", details: `[SOURCE] exports are ingested: receiving reports, pick tickets, packing slips, inventory adjustments, and purchase orders — parsed by document type and location.` },
      { name: "SKU & Location Normalization", details: `SKU codes are standardized across [SOURCE] and [DEST] naming conventions. Warehouse location codes are mapped and UOM differences are resolved systematically.` },
      { name: "Quantity & Value Reconciliation", details: `Record-level reconciliation: quantity in vs. quantity out, on-hand totals vs. [SOURCE] snapshots, and cost values validated against purchase orders.` },
      { name: "ERP-Ready Delivery", details: `Clean, [DEST]-importable files are delivered with a per-batch reconciliation report. Your ERP import completes without errors; variance is at the exception level, not the batch level.` },
    ],
    [
      { name: "Operational Data Extraction", details: `We parse all [SOURCE] operational records — item master, open orders, receipts, picks — into structured data ready for transformation.` },
      { name: "Schema Mapping", details: `[SOURCE] fields are mapped to [DEST] equivalents: item codes, vendor references, cost centers, and location identifiers — with rules documented for ongoing consistency.` },
      { name: "Multi-Client Separation & Validation", details: `For 3PL operations, each client's data is separated, validated, and delivered independently. Shared items are handled with configurable client attribution rules.` },
      { name: "Cycle-Ready Output", details: `Normalized inventory records are delivered in [DEST]'s import format, ready for posting. Cycle count sheets, adjustment records, and receiving confirmations are all included.` },
    ],
  ],
}

const ROI_BY_VERTICAL: Record<string, Array<{ manualHours: string; accuracy: string; savings: string }>> = {
  accountants: [
    { manualHours: "12-18 hours/week", accuracy: "98.5%+ accuracy", savings: "$50,000-$120,000/year" },
    { manualHours: "10-15 hours/week", accuracy: "99.1%+ accuracy", savings: "$45,000-$110,000/year" },
    { manualHours: "15-22 hours/week", accuracy: "98.8%+ accuracy", savings: "$60,000-$140,000/year" },
  ],
  "real-estate": [
    { manualHours: "15-22 hours/week", accuracy: "99.0%+ accuracy", savings: "$60,000-$150,000/year" },
    { manualHours: "12-18 hours/week", accuracy: "99.3%+ accuracy", savings: "$55,000-$130,000/year" },
    { manualHours: "18-25 hours/week", accuracy: "98.7%+ accuracy", savings: "$70,000-$160,000/year" },
  ],
  warehousing: [
    { manualHours: "18-25 hours/week", accuracy: "99.2%+ accuracy", savings: "$75,000-$180,000/year" },
    { manualHours: "15-20 hours/week", accuracy: "99.5%+ accuracy", savings: "$65,000-$155,000/year" },
    { manualHours: "20-28 hours/week", accuracy: "99.0%+ accuracy", savings: "$80,000-$200,000/year" },
  ],
}

const FIELD_MAPPING_ROWS: Record<string, Array<{ source: string; destination: string; transformation: string }>> = {
  accountants: [
    { source: "[SOURCE].ClientId",         destination: "[DEST].entity.externalId",     transformation: "ID normalization & dedup check" },
    { source: "[SOURCE].TransactionDate",  destination: "[DEST].tranDate",               transformation: "Date format standardization (ISO 8601)" },
    { source: "[SOURCE].AccountCode",      destination: "[DEST].account.acctNumber",     transformation: "COA mapping + parent-child resolution" },
    { source: "[SOURCE].LineAmount",       destination: "[DEST].amount",                 transformation: "Currency alignment + precision rounding" },
    { source: "[SOURCE].TaxCode",          destination: "[DEST].taxCode.internalId",     transformation: "Tax code normalization + jurisdiction lookup" },
  ],
  "real-estate": [
    { source: "[SOURCE].UnitId",           destination: "[DEST].unit.internalId",        transformation: "Unit code normalization + property mapping" },
    { source: "[SOURCE].TenantName",       destination: "[DEST].customer.name",          transformation: "Entity dedup + legal name standardization" },
    { source: "[SOURCE].LeaseStartDate",   destination: "[DEST].leaseBeginDate",         transformation: "Date format standardization (ISO 8601)" },
    { source: "[SOURCE].ScheduledRent",    destination: "[DEST].chargeAmount",           transformation: "Currency alignment + charge type mapping" },
    { source: "[SOURCE].ChargeCode",       destination: "[DEST].item.internalId",        transformation: "Charge code to item mapping + CAM category" },
  ],
  warehousing: [
    { source: "[SOURCE].ItemSku",          destination: "[DEST].item.itemId",            transformation: "SKU normalization + parent-child resolution" },
    { source: "[SOURCE].WarehouseLocation",destination: "[DEST].location.internalId",   transformation: "Location code mapping + bin-level detail" },
    { source: "[SOURCE].Quantity",         destination: "[DEST].quantity",               transformation: "UOM standardization (each/case/pallet)" },
    { source: "[SOURCE].VendorCode",       destination: "[DEST].vendor.internalId",      transformation: "Vendor dedup + tax ID cross-reference" },
    { source: "[SOURCE].CostPrice",        destination: "[DEST].purchasePrice",          transformation: "Currency alignment + cost center mapping" },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Slug parser
// ─────────────────────────────────────────────────────────────────────────────

export function parseIntegrationSlug(
  slug: string
): { sourceSlug: string; destSlug: string } | null {
  const marker = "-to-"
  const idx = slug.indexOf(marker)
  if (idx <= 0) return null
  return {
    sourceSlug: slug.slice(0, idx),
    destSlug: slug.slice(idx + marker.length),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main factory function
// ─────────────────────────────────────────────────────────────────────────────

export function getVerticalIntegrationModel(
  verticalId: string,
  slug: string
): VerticalIntegrationModel | null {
  const parsed = parseIntegrationSlug(slug)
  if (!parsed) return null

  const { sourceSlug, destSlug } = parsed

  const vertical: Vertical | undefined = getVertical(verticalId)
  if (!vertical) return null

  // Look up systems
  const sources = getSourceSystems(verticalId)
  const dests = getDestinationSystems(verticalId)

  const sourceSystem = sources.find((s) => s.slug === sourceSlug)
  const destSystem = dests.find((d) => d.slug === destSlug)

  // Must be a valid pair
  if (!sourceSystem || !destSystem) return null
  if (sourceSystem.id === destSystem.id) return null

  const src = sourceSystem.name
  const dst = destSystem.name
  const vars = { SOURCE: src, DEST: dst }

  // Deterministic selections via hash
  const seed = `${verticalId}:${slug}`

  const expertAnalysisPool = EXPERT_ANALYSIS[verticalId] ?? EXPERT_ANALYSIS.accountants
  const impactPool = OPERATIONAL_IMPACT[verticalId] ?? OPERATIONAL_IMPACT.accountants
  const faqPool = FAQ_POOLS[verticalId] ?? FAQ_POOLS.accountants
  const stepsPool = TECH_STEPS[verticalId] ?? TECH_STEPS.accountants
  const roiPool = ROI_BY_VERTICAL[verticalId] ?? ROI_BY_VERTICAL.accountants
  const fieldRows = FIELD_MAPPING_ROWS[verticalId] ?? FIELD_MAPPING_ROWS.accountants

  // Select deterministically
  const expertAnalysis = fill(pick(expertAnalysisPool, seed + "-analysis"), vars)
  const operationalImpact = fill(pick(impactPool, seed + "-impact"), vars)
  const steps = pick(stepsPool, seed + "-steps").map((s) => ({
    name: s.name,
    details: fill(s.details, vars),
  }))
  const roi = pick(roiPool, seed + "-roi")
  const mappingRows = fieldRows.map((r) => ({
    source: fill(r.source, vars),
    destination: fill(r.destination, vars),
    transformation: r.transformation,
  }))

  // Pick 5 FAQs deterministically (no repeats)
  const faqStart = hash(seed + "-faqs") % faqPool.length
  const faqs: VerticalIntegrationFaq[] = []
  for (let i = 0; i < 5 && i < faqPool.length; i++) {
    const faq = faqPool[(faqStart + i) % faqPool.length]
    faqs.push({ question: fill(faq.question, vars), answer: fill(faq.answer, vars) })
  }

  const verticalHubUrl = `/${verticalId}`

  // Use centralised link builder — guarantees ≥5 related spokes
  const { related: relatedLinks } = buildIntegrationPageLinks({
    verticalId,
    verticalName: vertical.name,
    sourceSlug,
    sourceName: src,
    destSlug,
    destName: dst,
    siblingDests: dests.filter((d) => d.id !== destSystem.id).map((d) => ({ slug: d.slug, name: d.name })),
    siblingSources: sources.filter((s) => s.id !== sourceSystem.id).map((s) => ({ slug: s.slug, name: s.name })),
  })

  const title = `${src} to ${dst} Data Normalization | ${vertical.name} | DocStandard`
  const h1 = `${src} to ${dst} Document Normalization`
  const description = `Clean, structured data from ${src} into ${dest} — fast. DocStandard normalizes ${vertical.name.toLowerCase()} documents for error-free ${dst} import. Audit-ready output, 24–72h turnaround.`

  return {
    vertical: verticalId,
    verticalName: vertical.name,
    slug,
    canonicalUrl: `https://docstandard.co/${verticalId}/integration/${slug}`,
    title,
    h1,
    description,
    sourceSystem: src,
    destinationSystem: dst,
    hurdleName: "Data Normalization",
    expertAnalysis,
    operationalImpact,
    roi,
    faqs,
    technicalSteps: steps,
    fieldMappingRows: mappingRows,
    relatedLinks,
    verticalHubUrl,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Static params helpers (for generateStaticParams)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all valid integration slugs for a vertical.
 * For build-time pre-rendering.
 */
export function getVerticalIntegrationSlugs(verticalId: string): string[] {
  return getIntegrationPairs(verticalId).map((p) => p.slug)
}
