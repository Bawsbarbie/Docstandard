/**
 * data-layer.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the new pSEO architecture.
 * Reads from:
 *   data/verticals.json
 *   data/software-systems.json
 *   data/documents.json
 *   data/hurdles.json
 *   data/locations.json
 *
 * This module DOES NOT replace the existing lib/pseo/geo.ts, city-data.ts, or
 * integration-factory.ts — those continue to power existing logistics pages.
 * This module powers the new verticals (accountants, real-estate, warehousing)
 * and will be the foundation for refactoring existing verticals in Phase 2.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import verticalsData from "@/data/verticals.json"
import systemsData from "@/data/software-systems.json"
import documentsData from "@/data/documents.json"
import hurdlesData from "@/data/hurdles.json"
import locationsData from "@/data/locations.json"
import systemProfilesData from "@/data/comparisons/system-profiles.json"
import featureMatrixData from "@/data/comparisons/feature-matrix.json"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Vertical {
  id: string
  slug: string
  name: string
  phase: number
  status: "active" | "planned"
  hubTitle: string
  hubDescription: string
  canonical: string
  image: string
  color: string
  industries: string[]
  integrationRoute: string
  documentsRoute: string
}

export interface SoftwareSystem {
  id: string
  name: string
  slug: string
  category: string
}

export interface Document {
  id: string
  name: string
  slug: string
  abbrev: string
  priority: number
}

export interface Hurdle {
  id: string
  name: string
  slug: string
  priority: number
  description: string
}

export interface Location {
  id: string
  slug: string
  name: string
  country: string
  countryName: string
  state: string | null
  stateName: string | null
  region: string
  priority: number
  population: number
  lat: number
  lng: number
  logisticsHub: boolean
  customsPort: boolean
  ports: string[]
  airports: string[]
  hub: string
  unlocode: string
  vat: string
  customs: string
  terminal: string | null
  portDistance: string
  carrier: string | null
  verticals: string[]
}

export interface IntegrationPair {
  source: SoftwareSystem
  destination: SoftwareSystem
  verticalId: string
  slug: string // "{source-slug}-to-{dest-slug}"
}

export interface IntegrationPageParams {
  vertical: string
  source: string   // slug
  destination: string // slug
  hurdle?: string  // slug
  city?: string    // slug
}

// ─────────────────────────────────────────────────────────────────────────────
// In-memory caches
// ─────────────────────────────────────────────────────────────────────────────

let _verticals: Vertical[] | null = null
let _locations: Location[] | null = null

// ─────────────────────────────────────────────────────────────────────────────
// Verticals
// ─────────────────────────────────────────────────────────────────────────────

export function getVerticals(): Vertical[] {
  if (_verticals) return _verticals
  _verticals = verticalsData as Vertical[]
  return _verticals
}

export function getVertical(id: string): Vertical | undefined {
  return getVerticals().find((v) => v.id === id || v.slug === id)
}

export function getActiveVerticals(): Vertical[] {
  return getVerticals().filter((v) => v.status === "active")
}

export function getPlannedVerticals(): Vertical[] {
  return getVerticals().filter((v) => v.status === "planned")
}

// ─────────────────────────────────────────────────────────────────────────────
// Software Systems
// ─────────────────────────────────────────────────────────────────────────────

type SystemsMap = Record<string, { source: SoftwareSystem[]; destination: SoftwareSystem[] }>

function getSystemsMap(): SystemsMap {
  // Strip the _comment key
  const { _comment: _c, ...map } = systemsData as Record<string, unknown>
  void _c
  return map as SystemsMap
}

export function getSourceSystems(verticalId: string): SoftwareSystem[] {
  return getSystemsMap()[verticalId]?.source ?? []
}

export function getDestinationSystems(verticalId: string): SoftwareSystem[] {
  return getSystemsMap()[verticalId]?.destination ?? []
}

export function getAllSystems(verticalId: string): SoftwareSystem[] {
  const map = getSystemsMap()[verticalId]
  if (!map) return []
  // Deduplicate by id
  const seen = new Set<string>()
  return [...map.source, ...map.destination].filter((s) => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
}

export function getSystemBySlug(verticalId: string, slug: string): SoftwareSystem | undefined {
  return getAllSystems(verticalId).find((s) => s.slug === slug)
}

// ─────────────────────────────────────────────────────────────────────────────
// Documents
// ─────────────────────────────────────────────────────────────────────────────

type DocumentsMap = Record<string, Document[]>

function getDocumentsMap(): DocumentsMap {
  const { _comment: _c, ...map } = documentsData as Record<string, unknown>
  void _c
  return map as DocumentsMap
}

export function getDocuments(verticalId: string): Document[] {
  return getDocumentsMap()[verticalId] ?? []
}

export function getDocumentBySlug(verticalId: string, slug: string): Document | undefined {
  return getDocuments(verticalId).find((d) => d.slug === slug)
}

// ─────────────────────────────────────────────────────────────────────────────
// Hurdles
// ─────────────────────────────────────────────────────────────────────────────

type HurdlesMap = Record<string, Hurdle[]>

function getHurdlesMap(): HurdlesMap {
  const { _comment: _c, ...map } = hurdlesData as Record<string, unknown>
  void _c
  return map as HurdlesMap
}

export function getHurdles(verticalId: string): Hurdle[] {
  return getHurdlesMap()[verticalId] ?? []
}

export function getHurdleBySlug(verticalId: string, slug: string): Hurdle | undefined {
  return getHurdles(verticalId).find((h) => h.slug === slug)
}

// ─────────────────────────────────────────────────────────────────────────────
// Locations
// ─────────────────────────────────────────────────────────────────────────────

export function getLocations(options?: {
  verticalId?: string
  minPriority?: number
}): Location[] {
  if (!_locations) {
    _locations = (locationsData as { locations: Location[] }).locations
  }

  let results = _locations

  if (options?.verticalId) {
    results = results.filter((loc) => loc.verticals.includes(options.verticalId!))
  }

  if (options?.minPriority !== undefined) {
    results = results.filter((loc) => loc.priority >= options.minPriority!)
  }

  return results
}

export function getLocationBySlug(slug: string): Location | undefined {
  return getLocations().find((loc) => loc.slug === slug)
}

export function getPhase1Locations(verticalId?: string): Location[] {
  return getLocations({ verticalId, minPriority: 90 })
}

// ─────────────────────────────────────────────────────────────────────────────
// Integration Pairs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate all unique source→destination pairs for a given vertical.
 * Skips pairs where source === destination (same system ID).
 */
export function getIntegrationPairs(verticalId: string): IntegrationPair[] {
  const sources = getSourceSystems(verticalId)
  const destinations = getDestinationSystems(verticalId)
  const pairs: IntegrationPair[] = []

  for (const source of sources) {
    for (const dest of destinations) {
      if (source.id === dest.id) continue
      pairs.push({
        source,
        destination: dest,
        verticalId,
        slug: `${source.slug}-to-${dest.slug}`,
      })
    }
  }

  return pairs
}

/**
 * Get a specific integration pair by source and destination slugs.
 */
export function getIntegrationPair(
  verticalId: string,
  sourceSlug: string,
  destSlug: string
): IntegrationPair | undefined {
  const source = getSourceSystems(verticalId).find((s) => s.slug === sourceSlug)
  const dest = getDestinationSystems(verticalId).find((d) => d.slug === destSlug)
  if (!source || !dest) return undefined
  return { source, destination: dest, verticalId, slug: `${source.slug}-to-${dest.slug}` }
}

// ─────────────────────────────────────────────────────────────────────────────
// URL Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the canonical URL for an integration page.
 * Pattern: /{vertical}/integration/{source}-to-{dest}
 * With hurdle: /{vertical}/integration/{source}-to-{dest}/{hurdle}
 * With hurdle + city: /{vertical}/integration/{source}-to-{dest}/{hurdle}/{city}
 */
export function buildIntegrationUrl(params: IntegrationPageParams): string {
  const { vertical, source, destination, hurdle, city } = params
  let url = `/${vertical}/integration/${source}-to-${destination}`
  if (hurdle) url += `/${hurdle}`
  if (city) url += `/${city}`
  return url
}

/**
 * Build canonical URL for a vertical hub page.
 */
export function buildVerticalUrl(verticalId: string): string {
  return `/${verticalId}`
}

/**
 * Build canonical URL for a city page within a vertical.
 * Pattern: /{vertical}/city/{city-slug}
 */
export function buildCityUrl(verticalId: string, citySlug: string): string {
  return `/${verticalId}/city/${citySlug}`
}

/**
 * Build canonical URL for a document type page within a vertical.
 * Pattern: /{vertical}/documents/{document-slug}
 */
export function buildDocumentUrl(verticalId: string, documentSlug: string): string {
  return `/${verticalId}/documents/${documentSlug}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Count Estimates (for architecture planning / build tooling)
// ─────────────────────────────────────────────────────────────────────────────

export interface PageCountEstimate {
  verticalId: string
  integrationPairs: number
  integrationWithHurdles: number
  integrationWithCity: number
  cityPages: number
  documentPages: number
  total: number
}

export function estimatePageCount(
  verticalId: string,
  options: { includeHurdles?: boolean; includeCity?: boolean; phase1Only?: boolean } = {}
): PageCountEstimate {
  const pairs = getIntegrationPairs(verticalId).length
  const hurdles = getHurdles(verticalId).length
  const cityCount = options.phase1Only
    ? getPhase1Locations(verticalId).length
    : getLocations({ verticalId }).length
  const documentCount = getDocuments(verticalId).length

  const integrationWithHurdles = options.includeHurdles ? pairs * hurdles : 0
  const integrationWithCity = options.includeCity ? pairs * cityCount : 0

  return {
    verticalId,
    integrationPairs: pairs,
    integrationWithHurdles,
    integrationWithCity,
    cityPages: cityCount,
    documentPages: documentCount,
    total:
      pairs +
      integrationWithHurdles +
      integrationWithCity +
      cityCount +
      documentCount,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Comparison Data Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SystemProfile {
  name: string
  category: string
  bestFor: string[]
  pricing: { model: string; entry: string; typical: string }
  api: { type: string; complexity: string; notes: string }
  industries: string[]
  strengths: string[]
  weaknesses: string[]
  integrationComplexity: string
  typicalDataVolume: string
  accountingSyncDifficulty: string
  implementationMonths: string
  errorRateWithoutNormalization: string
  manualHoursPerDay: string
}

export interface ComparisonRow {
  feature: string
  [key: string]: string
}

export interface ComparisonData {
  systems: string[]
  category: string
  useCase: string
  winner: string
  comparisonTable: ComparisonRow[]
  chooseAIf: string[]
  chooseBIf: string[]
  integrationComplexity: Record<string, string>
  estimatedSyncTime: Record<string, string>
  docStandardFit: string
  bottomLine: string
  // Document volume / cost metrics (used in ROI section)
  monthlyDocumentVolume?: string
  costPerDocumentBefore?: string
  costPerDocumentAfter?: string
  monthlyErrorCost?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Comparison Data Access
// ─────────────────────────────────────────────────────────────────────────────

const profiles = systemProfilesData as Record<string, SystemProfile>
const matrix = featureMatrixData as Record<string, ComparisonData>

/**
 * Returns system profile for a given slug (e.g. "cargowise", "netsuite").
 * Returns null if not found.
 */
export function getSystemProfile(slug: string): SystemProfile | null {
  return profiles[slug] ?? null
}

/**
 * Returns all system profile slugs.
 */
export function getAllSystemSlugs(): string[] {
  return Object.keys(profiles)
}

/**
 * Looks up feature-matrix data for a comparison page slug.
 * The slug format is "{systemA}-vs-{systemB}".
 * Also tries the reversed order "{systemB}-vs-{systemA}" for symmetry.
 */
export function getComparisonData(slugA: string, slugB: string): ComparisonData | null {
  const key = `${slugA}-vs-${slugB}`
  const reverseKey = `${slugB}-vs-${slugA}`
  return matrix[key] ?? matrix[reverseKey] ?? null
}

/**
 * Parses a comparison page slug (e.g. "netsuite-vs-dynamics365") into
 * the two system keys, accounting for multi-word system names.
 * Returns { slugA, slugB } or null if the slug doesn't look like a comparison.
 */
export function parseComparisonSlug(
  slug: string
): { slugA: string; slugB: string } | null {
  // Find the "-vs-" separator
  const vsIdx = slug.indexOf("-vs-")
  if (vsIdx === -1) return null
  const slugA = slug.slice(0, vsIdx)
  const slugB = slug.slice(vsIdx + 4)
  return { slugA, slugB }
}

/**
 * Returns the full comparison data and both system profiles for a page slug.
 * Also returns resolved display names for both systems.
 */
export function resolveComparison(pageSlug: string): {
  slugA: string
  slugB: string
  nameA: string
  nameB: string
  profileA: SystemProfile | null
  profileB: SystemProfile | null
  comparisonData: ComparisonData | null
} | null {
  const parsed = parseComparisonSlug(pageSlug)
  if (!parsed) return null

  const { slugA, slugB } = parsed
  const profileA = getSystemProfile(slugA)
  const profileB = getSystemProfile(slugB)
  const comparisonData = getComparisonData(slugA, slugB)

  // Derive display names: prefer profile name, fall back to title-cased slug
  const toDisplayName = (slug: string, profile: SystemProfile | null) =>
    profile?.name ?? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

  return {
    slugA,
    slugB,
    nameA: toDisplayName(slugA, profileA),
    nameB: toDisplayName(slugB, profileB),
    profileA,
    profileB,
    comparisonData,
  }
}

/**
 * Derives a complexity label from a system slug.
 * Used for ROI and integration complexity sections.
 */
export function calculateIntegrationComplexity(
  systemSlug: string
): "Low" | "Medium" | "High" | "Very High" {
  const profile = getSystemProfile(systemSlug)
  if (!profile) return "Medium"
  const c = profile.integrationComplexity
  if (c === "Very High") return "Very High"
  if (c === "High") return "High"
  if (c === "Medium") return "Medium"
  return "Low"
}

/**
 * Returns a DocStandard-specific ROI blurb for a system, based on its
 * manual hours and error rate data.
 */
export function getSystemRoiStats(systemSlug: string): {
  errorRate: string
  manualHours: string
  annualCostEstimate: string
  syncDifficulty: string
} {
  const profile = getSystemProfile(systemSlug)
  if (!profile) {
    return {
      errorRate: "~20%",
      manualHours: "3–5 hrs/day",
      annualCostEstimate: "$40,000–$80,000",
      syncDifficulty: "Medium",
    }
  }
  // Parse manual hours range and calculate annual cost estimate at $35/hr
  const hours = profile.manualHoursPerDay
  const low = parseFloat(hours.split("–")[0]) || 2
  const high = parseFloat(hours.split("–")[1]) || 4
  const annualLow = Math.round(low * 220 * 35 / 1000) * 1000
  const annualHigh = Math.round(high * 220 * 35 / 1000) * 1000
  return {
    errorRate: profile.errorRateWithoutNormalization,
    manualHours: `${hours} hrs/day`,
    annualCostEstimate: `$${annualLow.toLocaleString()}–$${annualHigh.toLocaleString()}`,
    syncDifficulty: profile.accountingSyncDifficulty,
  }
}
