/**
 * Intent Data Loader
 * Loads and provides access to service intents/keywords
 */

import { promises as fs } from "fs"
import { resolveDataPath } from "./data-path"
import type { Intent } from "./types"

// In-memory cache
let intentsCache: Intent[] | null = null
let intentSlugMap: Map<string, Intent> | null = null

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

    const columns = line.split(",").map((col) => col.trim().replace(/^"|"$/g, ""))
    const parsed = parser(columns)
    if (parsed) results.push(parsed)
  }

  return results
}

/**
 * Load all intents from CSV
 */
export async function loadIntents(): Promise<Intent[]> {
  if (intentsCache) return intentsCache

  const csvPath = resolveDataPath("data", "intents.csv")
  const csvContent = await fs.readFile(csvPath, "utf-8")

  const intents = parseCSV<Intent>(csvContent, (cols) => {
    const [id, slug, name, kind, priority, description] = cols
    if (!id || !slug || !name) return null

    return {
      id,
      slug,
      name,
      kind: kind || "general",
      priority: priority ? parseInt(priority, 10) : 99,
      description: description || undefined,
    }
  })

  intentsCache = intents

  // Build slug map
  intentSlugMap = new Map()
  for (const intent of intents) {
    intentSlugMap.set(intent.slug, intent)
  }

  return intentsCache
}

/**
 * Get intent by slug
 */
export async function getIntentBySlug(slug: string): Promise<Intent | null> {
  if (!intentSlugMap) {
    await loadIntents()
  }
  return intentSlugMap?.get(slug) || null
}

/**
 * Get top intents by priority
 */
export async function getTopIntents(limit = 15): Promise<Intent[]> {
  const intents = await loadIntents()
  return intents.filter((i) => i.priority <= limit).sort((a, b) => a.priority - b.priority)
}

/**
 * Get intents by kind (document type)
 */
export async function getIntentsByKind(kind: string): Promise<Intent[]> {
  const intents = await loadIntents()
  return intents.filter((i) => i.kind === kind)
}
