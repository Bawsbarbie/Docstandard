/**
 * Geographic Data Loader
 * Loads and provides fast lookups for countries, states, and cities
 * Uses memoization for performance
 */

import { promises as fs } from "fs"
import { resolveDataPath } from "./data-path"
import type { Country, State, City } from "./types"

// In-memory caches (memoization)
let countriesCache: Country[] | null = null
let statesCache: State[] | null = null
let citiesCache: City[] | null = null

// Fast lookup maps
let cityToStateMap: Map<string, string> | null = null
let stateSlugMap: Map<string, State> | null = null
let stateCodeMap: Map<string, State> | null = null
let citySlugMap: Map<string, City> | null = null

/**
 * Parse CSV data
 */
function parseCSV<T>(csvContent: string, parser: (row: string[]) => T | null): T[] {
  const lines = csvContent.trim().split("\n")
  const results: T[] = []

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Simple CSV parsing (handles basic cases)
    const columns = line.split(",").map((col) => col.trim().replace(/^"|"$/g, ""))
    const parsed = parser(columns)
    if (parsed) results.push(parsed)
  }

  return results
}

/**
 * Load all countries from CSV
 */
export async function loadCountries(): Promise<Country[]> {
  if (countriesCache) return countriesCache

  const csvPath = resolveDataPath("data", "geo.csv")
  const csvContent = await fs.readFile(csvPath, "utf-8")

  // Parse countries (first pass - get unique countries)
  const lines = csvContent.trim().split("\n")
  const countryMap = new Map<string, Country>()

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const columns = line.split(",").map((col) => col.trim().replace(/^"|"$/g, ""))
    const [countryCode, countryName] = columns

    if (countryCode && countryName && !countryMap.has(countryCode)) {
      countryMap.set(countryCode, {
        code: countryCode.toLowerCase(),
        name: countryName,
        slug: countryName.toLowerCase().replace(/\s+/g, "-"),
      })
    }
  }

  countriesCache = Array.from(countryMap.values())
  return countriesCache
}

/**
 * Load all states from CSV
 */
export async function loadStates(): Promise<State[]> {
  if (statesCache) return statesCache

  const csvPath = resolveDataPath("data", "geo.csv")
  const csvContent = await fs.readFile(csvPath, "utf-8")

  const states = parseCSV<State>(csvContent, (cols) => {
    const [countryCode, , stateCode, stateName] = cols
    if (!stateCode || !stateName) return null

    return {
      code: stateCode,
      name: stateName,
      slug: stateName.toLowerCase().replace(/\s+/g, "-"),
      countryCode: countryCode.toLowerCase(),
    }
  })

  // Remove duplicates
  const uniqueStates = Array.from(
    new Map(states.map((s) => [`${s.countryCode}-${s.code}`, s])).values()
  )

  statesCache = uniqueStates
  return statesCache
}

/**
 * Load all cities from CSV
 */
export async function loadCities(): Promise<City[]> {
  if (citiesCache) return citiesCache

  const csvPath = resolveDataPath("data", "geo.csv")
  const csvContent = await fs.readFile(csvPath, "utf-8")

  const cities = parseCSV<City>(csvContent, (cols) => {
    const [countryCode, , stateCode, , cityName, priority, population, lat, lng] =
      cols
    if (!cityName) return null

    return {
      name: cityName,
      slug: cityName.toLowerCase().replace(/\s+/g, "-"),
      stateCode,
      countryCode: countryCode.toLowerCase(),
      priority: priority ? parseInt(priority, 10) : 50,
      population: population ? parseInt(population, 10) : undefined,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
    }
  })

  citiesCache = cities
  return citiesCache
}

/**
 * Initialize lookup maps for fast queries
 */
async function initializeMaps() {
  if (cityToStateMap) return

  const cities = await loadCities()
  const states = await loadStates()

  // Build city slug -> state code map
  cityToStateMap = new Map()
  citySlugMap = new Map()
  for (const city of cities) {
    cityToStateMap.set(city.slug, city.stateCode)
    citySlugMap.set(`${city.countryCode}-${city.stateCode}-${city.slug}`, city)
  }

  // Build state slug -> state map
  stateSlugMap = new Map()
  stateCodeMap = new Map()
  for (const state of states) {
    stateSlugMap.set(`${state.countryCode}-${state.slug}`, state)
    stateCodeMap.set(`${state.countryCode}-${state.code.toLowerCase()}`, state)
  }
}

/**
 * Get state code from city slug (for alias redirect)
 * This is the key function for the alias route
 */
export async function getStateFromCity(
  countryCode: string,
  citySlug: string
): Promise<string | null> {
  await initializeMaps()

  const cities = await loadCities()
  const city = cities.find(
    (c) => c.slug === citySlug && c.countryCode === countryCode
  )

  return city ? city.stateCode : null
}

/**
 * Get city by full path
 */
export async function getCityBySlug(
  countryCode: string,
  stateCode: string,
  citySlug: string
): Promise<City | null> {
  await initializeMaps()
  // Ensure stateCode is uppercase for lookup, as CSV data uses "FL", "NY", etc.
  const normalizedState = stateCode.toUpperCase()
  const key = `${countryCode}-${normalizedState}-${citySlug}`
  return citySlugMap?.get(key) || null
}

/**
 * Get state by slug
 */
export async function getStateBySlug(
  countryCode: string,
  stateSlug: string
): Promise<State | null> {
  await initializeMaps()
  const normalized = stateSlug.toLowerCase()
  const slugKey = `${countryCode}-${normalized}`
  const bySlug = stateSlugMap?.get(slugKey)
  if (bySlug) return bySlug
  const codeKey = `${countryCode}-${normalized}`
  return stateCodeMap?.get(codeKey) || null
}

/**
 * Get country by code
 */
export async function getCountryByCode(code: string): Promise<Country | null> {
  const countries = await loadCountries()
  return countries.find((c) => c.code === code) || null
}

/**
 * Check if a city should be indexed
 */
export function shouldIndexCity(city: City, intentPriority: number): boolean {
  // Index only high-priority cities with top intents
  return city.priority >= 90 && intentPriority <= 15
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonicalUrl(
  country: string,
  state: string,
  city: string,
  intent: string
): string {
  return `/${country}/${state}/${city}/${intent}`
}
