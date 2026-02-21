import { promises as fs } from "fs"
import { cache } from "react"
import { resolveDataPath } from "./data-path"

const contentDataPath = resolveDataPath("data", "pseo", "integration-factory-content.json")
const legacyContentDataPath = resolveDataPath("data", "content", "integration-details.json")

export interface IntegrationFaq {
  q: string
  a: string
}

export interface IntegrationTechnicalStep {
  name: string
  details: string
}

export interface IntegrationTechnicalGuide {
  title: string
  overview: string
  steps: IntegrationTechnicalStep[]
}

export interface IntegrationContentEntry {
  title: string
  description: string
  sourceSystem: string
  destinationSystem: string
  hurdleName: string
  hurdleFocus: string
  roi: {
    manualHours: string
    accuracy: string
    savings: string
  }
  faqs: IntegrationFaq[]
  technicalGuide: IntegrationTechnicalGuide
  expertAnalysis: string
  operationalImpact: string
  internalLinks?: Array<{ label: string; href: string }>
}

export interface IntegrationModel {
  slug: string
  title: string
  description: string
  sourceSystem: string
  destinationSystem: string
  hurdleName: string
  hurdleFocus: string
  roi: {
    manualHours: string
    accuracy: string
    savings: string
  }
  faqs: IntegrationFaq[]
  technicalGuide: IntegrationTechnicalGuide
  expertAnalysis: string
  operationalImpact: string
  internalLinks: Array<{ label: string; href: string }>
}

const HURDLE_NAME_TO_SUFFIX: Record<string, string> = {
  "General Ledger Mapping": "gl-mapping",
  "VAT & Tax Reconciliation": "vat-compliance",
  "Multi-Currency Synchronization": "multi-currency",
  "Audit-Ready Data Trails": "audit-trail",
  "Landed Cost Attribution": "landed-cost",
  "Vendor Statement Matching": "vendor-reconciliation",
  "Accounts Payable Workflow": "ap-automation",
  "Accounts Receivable Integration": "ar-sync",
}

const HURDLE_SUFFIXES = Object.values(HURDLE_NAME_TO_SUFFIX)
const HURDLE_PRIORITY = [
  "gl-mapping",
  "vat-compliance",
  "ap-automation",
  "audit-trail",
  "landed-cost",
  "vendor-reconciliation",
  "ar-sync",
  "multi-currency",
]

const SOURCE_ALIASES: Record<string, string[]> = {
  "motive-eld": ["motive"],
  manhattan: ["manhattan-associates"],
  roserocket: ["rose-rocket"],
  "source-systems-mercurygate-3pl-central-cargowise": ["mercurygate", "3pl-central", "cargowise"],
  "tms-wms-systems-motive-manhattan-blueyonder-cargowise": [
    "motive",
    "manhattan-associates",
    "blueyonder",
    "cargowise",
  ],
}

const DEST_ALIASES: Record<string, string[]> = {
  sap: ["sap-s4hana", "sap-business-one"],
  quickbooks: ["quickbooks-online", "quickbooks-desktop"],
  "dynamics-bc": ["microsoft-dynamics-365-business-central"],
  dynamics365: [
    "microsoft-dynamics-365-business-central",
    "microsoft-dynamics-365-finance--operations",
  ],
  "dynamics-365": [
    "microsoft-dynamics-365-business-central",
    "microsoft-dynamics-365-finance--operations",
  ],
  oracle: ["oracle-erp-cloud"],
  "erp-systems": ["netsuite", "sap-s4hana", "oracle-erp-cloud"],
}

function normalizeSystemSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeRequestedSlug(value: string): string {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^integration\//, "")
}

function toUnique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function getAliasCandidates(raw: string, aliases: Record<string, string[]>): string[] {
  const normalized = normalizeSystemSlug(raw)
  const candidates = [normalized]

  if (normalized.endsWith("-finance-operations")) {
    candidates.push(normalized.replace(/-finance-operations$/, "-finance--operations"))
  }

  if (aliases[normalized]) {
    candidates.push(...aliases[normalized])
  }

  return toUnique(candidates)
}

function pickCanonicalSlugForPair(
  allData: Record<string, IntegrationContentEntry>,
  sourceCandidates: string[],
  destinationCandidates: string[]
): string | null {
  const keys = Object.keys(allData)
  const keySet = new Set(keys)

  for (const source of sourceCandidates) {
    for (const destination of destinationCandidates) {
      for (const hurdle of HURDLE_PRIORITY) {
        const exact = `${source}-to-${destination}-${hurdle}`
        if (keySet.has(exact)) {
          return exact
        }
      }

      const prefix = `${source}-to-${destination}-`
      const firstPrefixMatch = keys.find((key) => key.startsWith(prefix))
      if (firstPrefixMatch) {
        return firstPrefixMatch
      }
    }
  }

  return null
}

function parseBridgeSlug(slug: string): { source: string; destination: string } | null {
  if (!slug.endsWith("-bridge")) return null
  const base = slug.slice(0, -"-bridge".length)
  const marker = "-to-"
  const markerIndex = base.indexOf(marker)
  if (markerIndex <= 0) return null

  return {
    source: base.slice(0, markerIndex),
    destination: base.slice(markerIndex + marker.length),
  }
}

interface LegacyIntegrationEntry {
  slug: string
  systemA: string
  systemB: string
  friction: string
  solution: string
}

const isLegacyIntegrationEntry = (value: unknown): value is LegacyIntegrationEntry => {
  if (!value || typeof value !== "object") return false
  const entry = value as Partial<LegacyIntegrationEntry>
  return (
    typeof entry.slug === "string" &&
    typeof entry.systemA === "string" &&
    typeof entry.systemB === "string" &&
    typeof entry.friction === "string" &&
    typeof entry.solution === "string"
  )
}

const getLegacyIntegrationDetails = cache(async (): Promise<Record<string, LegacyIntegrationEntry>> => {
  const raw = await fs.readFile(legacyContentDataPath, "utf8")
  const parsed = JSON.parse(raw) as unknown
  if (!Array.isArray(parsed)) return {}

  const bySlug: Record<string, LegacyIntegrationEntry> = {}
  for (const item of parsed) {
    if (!isLegacyIntegrationEntry(item)) continue
    bySlug[item.slug] = item
  }
  return bySlug
})

function resolveCanonicalIntegrationSlug(
  requestedSlug: string,
  allData: Record<string, IntegrationContentEntry>,
  legacyEntry?: LegacyIntegrationEntry
): string | null {
  if (allData[requestedSlug]) {
    return requestedSlug
  }

  const bridgePair = parseBridgeSlug(requestedSlug)
  if (bridgePair) {
    const sourceCandidates = getAliasCandidates(bridgePair.source, SOURCE_ALIASES)
    const destinationCandidates = getAliasCandidates(bridgePair.destination, DEST_ALIASES)
    const match = pickCanonicalSlugForPair(allData, sourceCandidates, destinationCandidates)
    if (match) return match
  }

  if (legacyEntry) {
    const sourceCandidates = getAliasCandidates(legacyEntry.systemA, SOURCE_ALIASES)
    const destinationCandidates = getAliasCandidates(legacyEntry.systemB, DEST_ALIASES)
    const match = pickCanonicalSlugForPair(allData, sourceCandidates, destinationCandidates)
    if (match) return match
  }

  return null
}

function buildLegacyFallbackModel(entry: LegacyIntegrationEntry): IntegrationModel {
  const sourceSlug = normalizeSystemSlug(entry.systemA)
  const destinationSlug = normalizeSystemSlug(entry.systemB)

  return {
    slug: entry.slug,
    title: `${entry.systemA} to ${entry.systemB} Integration`,
    description: entry.solution || entry.friction,
    sourceSystem: entry.systemA,
    destinationSystem: entry.systemB,
    hurdleName: "Data Normalization Bridge",
    hurdleFocus: entry.friction,
    roi: {
      manualHours: "10-18 hours/week",
      accuracy: "99.9%",
      savings: "$85,000-$180,000/year",
    },
    faqs: [
      {
        q: `Can you normalize ${entry.systemA} exports for ${entry.systemB}?`,
        a: `Yes. We normalize raw ${entry.systemA} exports into import-ready ${entry.systemB} formats with field-level validation and audit traceability.`,
      },
      {
        q: "How quickly can we start?",
        a: "Most teams start with a pilot batch in 24-72 hours, then move into a repeatable production workflow.",
      },
      {
        q: "Do you support custom fields and edge cases?",
        a: "Yes. We map custom references, charge codes, and exception paths so your output stays consistent across each batch.",
      },
    ],
    technicalGuide: {
      title: `Technical Process: ${entry.systemA} -> ${entry.systemB}`,
      overview:
        "We run every batch through schema validation, field normalization, and reconciliation checks before final delivery.",
      steps: [
        {
          name: "Schema Discovery",
          details: `Analyze ${entry.systemA} source structure and target ${entry.systemB} import expectations.`,
        },
        {
          name: "Normalization Pipeline",
          details: "Apply deterministic field mapping, type enforcement, and controlled transformations.",
        },
        {
          name: "Quality Validation",
          details: "Run reconciliation checks and deliver import-ready files with traceable output.",
        },
      ],
    },
    expertAnalysis: `${entry.friction} ${entry.solution}`,
    operationalImpact: entry.solution,
    internalLinks: [
      {
        label: `${entry.systemA} vs ${entry.systemB} Comparison`,
        href: `/comparison/${sourceSlug}-vs-${destinationSlug}`,
      },
      { label: "Document Processing Services", href: "/services" },
      { label: "Finance Automation Workflows", href: "/finance" },
      { label: `${entry.destinationSystem} Integration Guide`, href: `/integration/${entry.slug}` },
    ],
  }
}

function parseSystemSlugsFromSlug(slug: string): { sourceSlug: string; destSlug: string } | null {
  const marker = "-to-"
  const markerIndex = slug.indexOf(marker)
  if (markerIndex <= 0) return null

  const sourceSlug = slug.slice(0, markerIndex)
  const right = slug.slice(markerIndex + marker.length)
  for (const suffix of HURDLE_SUFFIXES) {
    const suffixMarker = `-${suffix}`
    if (right.endsWith(suffixMarker)) {
      return { sourceSlug, destSlug: right.slice(0, -suffixMarker.length) }
    }
  }

  return null
}

function isValidIntegrationContentEntry(value: unknown): value is IntegrationContentEntry {
  if (!value || typeof value !== "object") return false
  const entry = value as Partial<IntegrationContentEntry>
  if (
    typeof entry.title !== "string" ||
    typeof entry.description !== "string" ||
    typeof entry.sourceSystem !== "string" ||
    typeof entry.destinationSystem !== "string" ||
    typeof entry.hurdleName !== "string" ||
    typeof entry.hurdleFocus !== "string" ||
    typeof entry.expertAnalysis !== "string" ||
    typeof entry.operationalImpact !== "string"
  ) {
    return false
  }

  if (
    !entry.roi ||
    typeof entry.roi.manualHours !== "string" ||
    typeof entry.roi.accuracy !== "string" ||
    typeof entry.roi.savings !== "string"
  ) {
    return false
  }

  if (!Array.isArray(entry.faqs) || !entry.faqs.every((faq) => faq && typeof faq.q === "string" && typeof faq.a === "string")) {
    return false
  }

  if (
    !entry.technicalGuide ||
    typeof entry.technicalGuide.title !== "string" ||
    typeof entry.technicalGuide.overview !== "string" ||
    !Array.isArray(entry.technicalGuide.steps) ||
    !entry.technicalGuide.steps.every(
      (step) => step && typeof step.name === "string" && typeof step.details === "string"
    )
  ) {
    return false
  }

  return true
}

export const getIntegrationContent = cache(async (): Promise<Record<string, IntegrationContentEntry>> => {
  const raw = await fs.readFile(contentDataPath, "utf8")
  return JSON.parse(raw) as Record<string, IntegrationContentEntry>
})

export const getIntegrationSlugs = cache(async (): Promise<string[]> => {
  const allData = await getIntegrationContent()
  return Object.keys(allData)
})

export async function getIntegrationModel(slug: string): Promise<IntegrationModel | null> {
  const requestedSlug = normalizeRequestedSlug(slug)
  const allData = await getIntegrationContent()
  const legacyBySlug = await getLegacyIntegrationDetails()
  const legacyEntry = legacyBySlug[requestedSlug]
  const resolvedSlug = resolveCanonicalIntegrationSlug(requestedSlug, allData, legacyEntry)

  if (!resolvedSlug) {
    if (legacyEntry) return buildLegacyFallbackModel(legacyEntry)
    return null
  }

  const data = allData[resolvedSlug]
  if (!isValidIntegrationContentEntry(data)) return null

  const parsed = parseSystemSlugsFromSlug(resolvedSlug)
  const sourceSlug = parsed?.sourceSlug ?? normalizeSystemSlug(data.sourceSystem)
  const destSlug = parsed?.destSlug ?? normalizeSystemSlug(data.destinationSystem)

  const links = [
    {
      label: `${data.sourceSystem} vs ${data.destinationSystem} Comparison`,
      href: `/comparison/${sourceSlug}-vs-${destSlug}`,
    },
    { label: `Automated ${data.sourceSystem} Data Cleaning`, href: `/services` },
    { label: `Global Logistics Finance Automation`, href: `/finance` },
    { label: `${data.destinationSystem} Integration Guide`, href: `/integration/${resolvedSlug}` },
  ]

  return {
    slug: resolvedSlug,
    ...data,
    internalLinks: links
  }
}
