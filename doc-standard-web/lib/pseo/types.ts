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

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  company: string
  tags?: string[]
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

// Technical Detail Types (from Leah's research)
export interface IntegrationDetails {
  pair: string // e.g., "Motive ↔️ QuickBooks"
  data_flow: string[] // Technical data points
  use_case: string // Specific use case scenario
  technical_specs: string // API/integration details
  prerequisites: string // Required software versions
  pain_points?: string[] // Optional: high-stakes failures specific to the integration
  value_logic?: string // Optional: why service-led integration beats DIY/SaaS
}

export interface ServiceDetails {
  name: string // Full service name
  pain_points: string[] // Industry-specific pain points
  operational_requirements: string[] // Required documents/data
  value_logic: string // Why professional service > SaaS
}

export interface IntegrationDetailsFile {
  integrations: Record<string, IntegrationDetails>
}

export interface ServiceDetailsFile {
  services: Record<string, ServiceDetails>
}

// TMS-ERP Guide Types
export interface ExpertSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    tms_system: string
    erp_system: string
    tms_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface TmsErpGuide {
  title: string
  word_count_target: number
  expert_sections: ExpertSection[]
}

export interface TmsErpGuideFile {
  tms_erp_bridging_guide: TmsErpGuide
}

// Customs Guide Types
export interface CustomsGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    source_field: string
    cbp_field: string
    normalization_logic: string
  }>
}

export interface CustomsGuide {
  title: string
  word_count_target: number
  expert_sections: CustomsGuideSection[]
}

export interface CustomsGuideFile {
  customs_clearance_guide: CustomsGuide
}

// Finance Guide Types
export interface FinanceGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    document_type: string
    source_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface FinanceGuide {
  title: string
  word_count_target: number
  expert_sections: FinanceGuideSection[]
}

export interface FinanceGuideFile {
  finance_operations_guide: FinanceGuide
}

// Shipping Guide Types
export interface ShippingGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    bol_field: string
    system_field: string
    normalization_logic: string
  }>
}

export interface ShippingGuide {
  title: string
  word_count_target: number
  expert_sections: ShippingGuideSection[]
}

export interface ShippingGuideFile {
  shipping_documentation_guide: ShippingGuide
}

// Inventory Guide Types
export interface InventoryGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    packing_list_field: string
    system_field: string
    normalization_logic: string
  }>
}

export interface InventoryGuide {
  title: string
  word_count_target: number
  expert_sections: InventoryGuideSection[]
}

export interface InventoryGuideFile {
  inventory_management_guide: InventoryGuide
}

// Compliance Guide Types
export interface ComplianceGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    tms_system: string
    erp_system: string
    tms_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface ComplianceGuide {
  title: string
  word_count_target: number
  expert_sections: ComplianceGuideSection[]
}

export interface ComplianceGuideFile {
  compliance_extraction_guide: ComplianceGuide
}

// Motive Guide Types
export interface MotiveGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    tms_system: string
    erp_system: string
    tms_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface MotiveGuide {
  title: string
  word_count_target: number
  expert_sections: MotiveGuideSection[]
}

export interface MotiveGuideFile {
  motive_ifta_guide: MotiveGuide
}

// HS Code Guide Types
export interface HSCodeGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    tms_system: string
    erp_system: string
    tms_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface HSCodeGuide {
  title: string
  word_count_target: number
  expert_sections: HSCodeGuideSection[]
}

export interface HSCodeGuideFile {
  hscode_extraction_guide: HSCodeGuide
}

// Invoice Guide Types
export interface InvoiceGuideSection {
  id: string
  title: string
  content: string
  mapping_data?: Array<{
    tms_system: string
    erp_system: string
    tms_field: string
    erp_field: string
    normalization_logic: string
  }>
}

export interface InvoiceGuide {
  title: string
  word_count_target: number
  expert_sections: InvoiceGuideSection[]
}

export interface InvoiceGuideFile {
  invoice_digitization_guide: InvoiceGuide
}
