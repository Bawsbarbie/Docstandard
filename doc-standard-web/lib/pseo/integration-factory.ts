import { promises as fs } from "fs"
import { cache } from "react"
import { resolveDataPath } from "./data-path"

const contentDataPath = resolveDataPath("data", "pseo", "integration-factory-content.json")

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

function normalizeSystemSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
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
  const allData = await getIntegrationContent()
  const data = allData[slug]
  if (!isValidIntegrationContentEntry(data)) return null

  const parsed = parseSystemSlugsFromSlug(slug)
  const sourceSlug = parsed?.sourceSlug ?? normalizeSystemSlug(data.sourceSystem)
  const destSlug = parsed?.destSlug ?? normalizeSystemSlug(data.destinationSystem)

  const links = [
    {
      label: `${data.sourceSystem} vs ${data.destinationSystem} Comparison`,
      href: `/comparison/${sourceSlug}-vs-${destSlug}`,
    },
    { label: `Automated ${data.sourceSystem} Data Cleaning`, href: `/services` },
    { label: `Global Logistics Finance Automation`, href: `/finance` },
    { label: `${data.destinationSystem} Integration Guide`, href: `/integration/${slug}` },
  ]

  return {
    slug,
    ...data,
    internalLinks: links
  }
}
