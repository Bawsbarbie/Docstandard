import { promises as fs } from "fs"
import { cache } from "react"
import { resolveDataPath } from "./data-path"
import { getCityBySlug, getCustomsSystemsForCity } from "./city-data"

const slugDataPath = resolveDataPath("data", "pseo", "near-me-slugs.json")

const ACRONYM_MAP: Record<string, string> = {
  awb: "AWB",
  bol: "BOL",
  erp: "ERP",
  tms: "TMS",
  wms: "WMS",
}

export interface NearMePageModel {
  slug: string
  citySlug: string
  cityName: string
  country: string
  region: string
  locationQualifier: "near me" | "nearby"
  actionLabel: string
  documentLabel: string
  title: string
  description: string
  canonicalUrl: string
  hubName: string
  portName: string
  systems: string[]
  airportName?: string
}

function titleize(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => ACRONYM_MAP[part] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

function normalizeDocumentSlug(raw: string) {
  if (!raw) return "documents"
  return raw === "doc" ? "documents" : raw
}

function parseSlug(slug: string): NearMePageModel | null {
  const marker = slug.includes("-near-me-")
    ? "-near-me-"
    : slug.includes("-nearby-")
      ? "-nearby-"
      : null

  if (!marker) return null

  const [prefix, citySlug] = slug.split(marker)
  if (!prefix || !citySlug) return null

  const parts = prefix.split("-").filter(Boolean)
  if (parts.length === 0) return null

  const action = parts[0]
  const rawDocument = normalizeDocumentSlug(parts.slice(1).join("-"))
  const cityRecord = getCityBySlug(citySlug)
  const cityName = cityRecord?.name ?? titleize(citySlug)
  const actionLabel = titleize(action)
  const documentLabel = titleize(rawDocument || "documents")
  const locationQualifier = marker === "-near-me-" ? "near me" : "nearby"
  const country = cityRecord?.country ?? "Global"
  const region = cityRecord?.region ?? "Global"
  const portName = cityRecord?.majorPorts?.[0] ?? `Port of ${cityName}`
  const hubName = `${cityName} Logistics Hub`
  const systems = cityRecord
    ? getCustomsSystemsForCity(cityRecord)
    : ["ACE", "PLDA", "NCTS"]
  const airportName = cityRecord?.airports?.[0]

  return {
    slug,
    citySlug,
    cityName,
    country,
    region,
    locationQualifier,
    actionLabel,
    documentLabel,
    title: `${actionLabel} ${documentLabel} ${locationQualifier} in ${cityName} | DocStandard`,
    description: `High-scale ${action.toLowerCase()} ${rawDocument.toLowerCase()} ${locationQualifier} in ${cityName}. Technical data extraction and normalization for ${portName} operations.`,
    canonicalUrl: `https://docstandard.co/near-me/${slug}`,
    hubName,
    portName,
    systems,
    airportName,
  }
}

export const getNearMeSlugs = cache(async (): Promise<string[]> => {
  const raw = await fs.readFile(slugDataPath, "utf8")
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed)) return []
  return parsed.filter((item): item is string => typeof item === "string")
})

const getNearMeSlugSet = cache(async (): Promise<Set<string>> => {
  const slugs = await getNearMeSlugs()
  return new Set(slugs)
})

export async function getNearMePageModel(slug: string): Promise<NearMePageModel | null> {
  const slugSet = await getNearMeSlugSet()
  if (!slugSet.has(slug)) return null
  return parseSlug(slug)
}
