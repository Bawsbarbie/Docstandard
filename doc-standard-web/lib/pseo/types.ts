/**
 * pSEO Type Definitions
 * Core types for the programmatic SEO engine
 */

// Geographic Data Types
export interface Country {
  code: string // e.g., "us"
  name: string // e.g., "United States"
  slug: string // e.g., "united-states"
}

export interface State {
  code: string // e.g., "CA"
  name: string // e.g., "California"
  slug: string // e.g., "california"
  countryCode: string
}

export interface City {
  name: string // e.g., "Los Angeles"
  slug: string // e.g., "los-angeles"
  stateCode: string
  countryCode: string
  priority: number // 0-100, determines if page should be indexed
  population?: number
  lat?: number
  lng?: number
}

// Intent/Service Types
export interface Intent {
  id: string // e.g., "customs-clearance"
  slug: string // e.g., "customs-clearance-services"
  name: string // e.g., "Customs Clearance Services"
  kind: string // e.g., "customs" (document type category)
  priority: number // 1-15 for top intents, higher numbers for long-tail
  description?: string
  metaTitle?: string // Template for meta title
  metaDescription?: string // Template for meta description
}

// Content Block Types
export interface BlockItem {
  id: string
  text: string
  tags?: string[] // For filtering/targeting specific scenarios
}

export interface ContentPool {
  id: string // e.g., "default", "customs", "freight-forwarding"
  extends?: string // Pool inheritance (e.g., "default")
  blocks: Record<string, string[]> // blockType -> array of block IDs
}

// Page Generation Types
export interface PageParams {
  country: string
  state?: string
  city: string
  intent: string
}

export interface PageData {
  country: Country
  state: State
  city: City
  intent: Intent
  shouldIndex: boolean
  canonical: string
}

// Content Assembly Types
export interface AssembledContent {
  intro: BlockItem
  pain: BlockItem
  benefits: BlockItem[]
  faq: Array<{ question: string; answer: string }>
  cta: BlockItem
}
