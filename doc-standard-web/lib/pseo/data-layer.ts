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
