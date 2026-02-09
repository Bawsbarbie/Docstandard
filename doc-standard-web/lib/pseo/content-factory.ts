/**
 * Content Factory - Deterministic Content Assembly Engine
 * Core Principle: Content = Function(Hash(City + Intent))
 * 
 * The ContentFactory assembles unique page content by:
 * 1. Hashing the URL parameters (city + intent) to get a stable seed
 * 2. Resolving the block pool chain (Intent -> Kind -> Default)
 * 3. Using the hash to deterministically select content variants
 */

import { promises as fs } from "fs"
import { resolveDataPath } from "./data-path"
import type {
  City,
  Intent,
  BlockItem,
  TestimonialItem,
  ProcessBlock,
  ContentPool,
  IntegrationDetails,
  ServiceDetails,
  IntegrationDetailsFile,
  ServiceDetailsFile,
  TmsErpGuideFile,
  TmsErpGuide,
  CustomsGuideFile,
  CustomsGuide,
  FinanceGuideFile,
  FinanceGuide,
  ShippingGuideFile,
  ShippingGuide,
  InventoryGuideFile,
  InventoryGuide,
  ComplianceGuideFile,
  ComplianceGuide,
  MotiveGuideFile,
  MotiveGuide,
  HSCodeGuideFile,
  HSCodeGuide,
  InvoiceGuideFile,
  InvoiceGuide,
} from "./types"

const GUIDE_MAP: Record<string, string> = {
  "motive-eld-ifta-data-normalization": "motive_ifta_guide",
  "clean-cargowise-data-for-accounting": "tms_erp_bridging_guide",
  "customs-document-data-extraction": "customs_clearance_guide",
  "commercial-invoice-data-digitization": "invoice_digitization_guide",
  "bill-of-lading-data-processing": "shipping_documentation_guide",
  "prepare-magaya-data-for-quickbooks": "finance_operations_guide",
  "packing-list-data-extraction-services": "inventory_management_guide",
  "airway-bill-document-digitization": "shipping_documentation_guide",
  "customs-bond-documentation-processing": "customs_clearance_guide",
  "hs-code-validation-from-docs": "hscode_extraction_guide",
  "freight-bill-audit-data-preparation": "finance_operations_guide",
  "clean-logistics-data-for-sap-s4hana": "tms_erp_bridging_guide",
  "shipment-data-prep-for-netsuite-landed-cost": "tms_erp_bridging_guide",
  "edi-document-normalization-services": "tms_erp_bridging_guide",
  "import-export-license-data-extraction": "compliance_extraction_guide",
}

const INTEGRATION_MAP: Record<string, string> = {
  "clean-cargowise-data-for-accounting": "cargowise-netsuite",
  "motive-eld-ifta-data-normalization": "motive-quickbooks",
  "prepare-magaya-data-for-quickbooks": "magaya-quickbooks",
  "clean-logistics-data-for-sap-s4hana": "cargowise-sap-s4hana",
  "shipment-data-prep-for-netsuite-landed-cost": "cargowise-netsuite",
}

// Block storage types
interface BlockCollection {
  intro: BlockItem[]
  pain: BlockItem[]
  benefit: BlockItem[]
  cta: BlockItem[]
  faq: Array<{ id: string; question: string; answer: string; tags?: string[] }>
  testimonials: TestimonialItem[]
  process: ProcessBlock[]
}

interface PoolConfig {
  pools: ContentPool[]
}

// Page Model - The final assembled content
export interface PageModel {
  city: City
  intent: Intent
  content: {
    intro: BlockItem
    pain: BlockItem
    benefits: BlockItem[]
    cta: BlockItem
    faq: Array<{ question: string; answer: string }>
    testimonials: TestimonialItem[]
    process?: ProcessBlock
  }
  meta: {
    title: string
    description: string
    shouldIndex: boolean
    canonical: string
    imageUrl: string
  }
  // Technical details (when available from Leah's research)
  technical?: {
    isIntegration: boolean
    integrationDetails?: IntegrationDetails
    serviceDetails?: ServiceDetails
    tmsErpGuide?: TmsErpGuide
    customsGuide?: CustomsGuide
    financeGuide?: FinanceGuide
    shippingGuide?: ShippingGuide
    inventoryGuide?: InventoryGuide
    complianceGuide?: ComplianceGuide
    motiveGuide?: MotiveGuide
    hsCodeGuide?: HSCodeGuide
    invoiceGuide?: InvoiceGuide
  }
}

/**
 * ContentFactory Class
 * Handles loading content blocks and assembling pages
 */
export class ContentFactory {
  private blocks: BlockCollection | null = null
  private pools: PoolConfig | null = null
  private integrationDetails: IntegrationDetailsFile | null = null
  private serviceDetails: ServiceDetailsFile | null = null
  private tmsErpGuide: TmsErpGuideFile | null = null
  private customsGuide: CustomsGuideFile | null = null
  private financeGuide: FinanceGuideFile | null = null
  private shippingGuide: ShippingGuideFile | null = null
  private inventoryGuide: InventoryGuideFile | null = null
  private complianceGuide: ComplianceGuideFile | null = null
  private motiveGuide: MotiveGuideFile | null = null
  private hsCodeGuide: HSCodeGuideFile | null = null
  private invoiceGuide: InvoiceGuideFile | null = null

  /**
   * Simple hash function for deterministic random selection
   * Returns a stable number for a given input string
   */
  getHash(input: string): number {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  /**
   * Load content blocks from JSON
   */
  private async loadBlocks(): Promise<BlockCollection> {
    if (this.blocks) return this.blocks

    const blocksPath = resolveDataPath("data", "content", "blocks.json")
    const faqsPath = resolveDataPath("data", "content", "faqs.json")
    const [blocksContent, faqsContent] = await Promise.all([
      fs.readFile(blocksPath, "utf-8"),
      fs.readFile(faqsPath, "utf-8"),
    ])
    const rawBlocks = JSON.parse(blocksContent)
    const rawFaqs = JSON.parse(faqsContent)

    this.blocks = {
      intro: rawBlocks.intro || [],
      pain: rawBlocks.pain || [],
      benefit: rawBlocks.benefit || rawBlocks.benefits || [],
      cta: rawBlocks.cta || [],
      faq: rawBlocks.faq || rawFaqs || [],
      testimonials: rawBlocks.testimonials || [],
      process: rawBlocks.process || [],
    }

    return this.blocks
  }

  /**
   * Load pool configurations from JSON
   */
  private async loadPools(): Promise<PoolConfig> {
    if (this.pools) return this.pools

    const poolsPath = resolveDataPath("data", "content", "pools.json")
    const poolsContent = await fs.readFile(poolsPath, "utf-8")
    this.pools = JSON.parse(poolsContent) as PoolConfig

    return this.pools
  }

  /**
   * Load integration details from Leah's research
   */
  private async loadIntegrationDetails(): Promise<IntegrationDetailsFile> {
    if (this.integrationDetails) return this.integrationDetails

    const detailsPath = resolveDataPath("data", "content", "integration-details.json")
    try {
      const content = await fs.readFile(detailsPath, "utf-8")
      const parsed = JSON.parse(content)
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && "integrations" in parsed) {
        this.integrationDetails = parsed as IntegrationDetailsFile
      } else {
        this.integrationDetails = { integrations: {} }
      }
    } catch {
      this.integrationDetails = { integrations: {} }
    }

    return this.integrationDetails
  }

  /**
   * Load service details from Leah's research
   */
  private async loadServiceDetails(): Promise<ServiceDetailsFile> {
    if (this.serviceDetails) return this.serviceDetails

    const detailsPath = resolveDataPath("data", "content", "service-details.json")
    try {
      const content = await fs.readFile(detailsPath, "utf-8")
      this.serviceDetails = JSON.parse(content) as ServiceDetailsFile
    } catch {
      this.serviceDetails = { services: {} }
    }

    return this.serviceDetails
  }

  /**
   * Load TMS-ERP guide data
   */
  private async loadTmsErpGuide(): Promise<TmsErpGuideFile> {
    if (this.tmsErpGuide) return this.tmsErpGuide

    const guidePath = resolveDataPath("data", "content", "tms-erp-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.tmsErpGuide = JSON.parse(content) as TmsErpGuideFile
    } catch {
      this.tmsErpGuide = { tms_erp_bridging_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.tmsErpGuide
  }

  /**
   * Load Customs guide data
   */
  private async loadCustomsGuide(): Promise<CustomsGuideFile> {
    if (this.customsGuide) return this.customsGuide

    const guidePath = resolveDataPath("data", "content", "customs-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.customsGuide = JSON.parse(content) as CustomsGuideFile
    } catch {
      this.customsGuide = { customs_clearance_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.customsGuide
  }

  /**
   * Load Finance guide data
   */
  private async loadFinanceGuide(): Promise<FinanceGuideFile> {
    if (this.financeGuide) return this.financeGuide

    const guidePath = resolveDataPath("data", "content", "finance-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.financeGuide = JSON.parse(content) as FinanceGuideFile
    } catch {
      this.financeGuide = { finance_operations_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.financeGuide
  }

  /**
   * Load Shipping guide data
   */
  private async loadShippingGuide(): Promise<ShippingGuideFile> {
    if (this.shippingGuide) return this.shippingGuide

    const guidePath = resolveDataPath("data", "content", "shipping-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.shippingGuide = JSON.parse(content) as ShippingGuideFile
    } catch {
      this.shippingGuide = { shipping_documentation_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.shippingGuide
  }

  /**
   * Load Inventory guide data
   */
  private async loadInventoryGuide(): Promise<InventoryGuideFile> {
    if (this.inventoryGuide) return this.inventoryGuide

    const guidePath = resolveDataPath("data", "content", "inventory-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.inventoryGuide = JSON.parse(content) as InventoryGuideFile
    } catch {
      this.inventoryGuide = { inventory_management_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.inventoryGuide
  }

  /**
   * Load Compliance guide data
   */
  private async loadComplianceGuide(): Promise<ComplianceGuideFile> {
    if (this.complianceGuide) return this.complianceGuide

    const guidePath = resolveDataPath("data", "content", "compliance-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.complianceGuide = JSON.parse(content) as ComplianceGuideFile
    } catch {
      this.complianceGuide = { compliance_extraction_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.complianceGuide
  }

  /**
   * Load Motive IFTA guide data
   */
  private async loadMotiveGuide(): Promise<MotiveGuideFile> {
    if (this.motiveGuide) return this.motiveGuide

    const guidePath = resolveDataPath("data", "content", "motive-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.motiveGuide = JSON.parse(content) as MotiveGuideFile
    } catch {
      this.motiveGuide = { motive_ifta_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.motiveGuide
  }

  /**
   * Load HS Code guide data
   */
  private async loadHSCodeGuide(): Promise<HSCodeGuideFile> {
    if (this.hsCodeGuide) return this.hsCodeGuide

    const guidePath = resolveDataPath("data", "content", "hscode-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.hsCodeGuide = JSON.parse(content) as HSCodeGuideFile
    } catch {
      this.hsCodeGuide = { hscode_extraction_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.hsCodeGuide
  }

  /**
   * Load Invoice guide data
   */
  private async loadInvoiceGuide(): Promise<InvoiceGuideFile> {
    if (this.invoiceGuide) return this.invoiceGuide

    const guidePath = resolveDataPath("data", "content", "invoice-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.invoiceGuide = JSON.parse(content) as InvoiceGuideFile
    } catch {
      this.invoiceGuide = { invoice_digitization_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.invoiceGuide
  }

  /**
   * Get technical details for an intent (if available)
   * Checks both intent.id AND intent.slug against JSON keys
   */
  private async getTechnicalDetails(intent: Intent): Promise<{
    isIntegration: boolean
    integrationDetails?: IntegrationDetails
    serviceDetails?: ServiceDetails
    tmsErpGuide?: TmsErpGuide
    customsGuide?: CustomsGuide
    financeGuide?: FinanceGuide
    shippingGuide?: ShippingGuide
    inventoryGuide?: InventoryGuide
    complianceGuide?: ComplianceGuide
    motiveGuide?: MotiveGuide
    hsCodeGuide?: HSCodeGuide
    invoiceGuide?: InvoiceGuide
  } | null> {
    const isIntegration = intent.kind?.toLowerCase() === "integration"
    const guideKey = GUIDE_MAP[intent.slug]

    // Load TMS-ERP guide if keywords match
    let tmsErpGuideData: TmsErpGuide | undefined

    // Load Customs guide if keywords match
    let customsGuideData: CustomsGuide | undefined

    // Load Finance guide if keywords match
    let financeGuideData: FinanceGuide | undefined

    // Load Shipping guide if keywords match
    let shippingGuideData: ShippingGuide | undefined

    // Load Inventory guide if keywords match
    let inventoryGuideData: InventoryGuide | undefined
    let complianceGuideData: ComplianceGuide | undefined
    let motiveGuideData: MotiveGuide | undefined
    let hsCodeGuideData: HSCodeGuide | undefined
    let invoiceGuideData: InvoiceGuide | undefined

    switch (guideKey) {
      case "tms_erp_bridging_guide": {
        const guideFile = await this.loadTmsErpGuide()
        tmsErpGuideData = guideFile.tms_erp_bridging_guide
        break
      }
      case "customs_clearance_guide": {
        const guideFile = await this.loadCustomsGuide()
        customsGuideData = guideFile.customs_clearance_guide
        break
      }
      case "finance_operations_guide": {
        const guideFile = await this.loadFinanceGuide()
        financeGuideData = guideFile.finance_operations_guide
        break
      }
      case "shipping_documentation_guide": {
        const guideFile = await this.loadShippingGuide()
        shippingGuideData = guideFile.shipping_documentation_guide
        break
      }
      case "inventory_management_guide": {
        const guideFile = await this.loadInventoryGuide()
        inventoryGuideData = guideFile.inventory_management_guide
        break
      }
      case "compliance_extraction_guide": {
        const guideFile = await this.loadComplianceGuide()
        complianceGuideData = guideFile.compliance_extraction_guide
        break
      }
      case "motive_ifta_guide": {
        const guideFile = await this.loadMotiveGuide()
        motiveGuideData = guideFile.motive_ifta_guide
        break
      }
      case "hscode_extraction_guide": {
        const guideFile = await this.loadHSCodeGuide()
        hsCodeGuideData = guideFile.hscode_extraction_guide
        break
      }
      case "invoice_digitization_guide": {
        const guideFile = await this.loadInvoiceGuide()
        invoiceGuideData = guideFile.invoice_digitization_guide
        break
      }
      default:
        break
    }

    if (isIntegration) {
      const details = await this.loadIntegrationDetails()
      // Try matching by intent.id first, then by slug
      const mappedIntegrationKey = INTEGRATION_MAP[intent.slug]
      let integrationData =
        (mappedIntegrationKey ? details.integrations[mappedIntegrationKey] : undefined) ||
        details.integrations[intent.id] ||
        details.integrations[intent.slug] ||
        // Also try removing common suffixes like "-services" or "-integration"
        details.integrations[intent.id.replace(/-services?$|-integration$/, "")] ||
        details.integrations[intent.slug.replace(/-to-|-integration$/, "-")]

      // Fuzzy match: pick an integration whose key tokens all appear in the slug (helps magaya-quickbooks, cargowise-netsuite, etc.)
      if (!integrationData) {
        const intentSlugLower = intent.slug.toLowerCase()
        const fuzzy = Object.entries(details.integrations).find(([key]) => {
          const tokens = key
            .toLowerCase()
            .split(/[-_]/)
            .filter((t) => t.length > 2) // ignore tiny words
          return tokens.every((t) => intentSlugLower.includes(t))
        })
        if (fuzzy) {
          integrationData = fuzzy[1]
        }
      }
      if (integrationData || tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData || inventoryGuideData || complianceGuideData || motiveGuideData || hsCodeGuideData || invoiceGuideData) {
        return { 
          isIntegration: true, 
          integrationDetails: integrationData,
          tmsErpGuide: tmsErpGuideData,
          customsGuide: customsGuideData,
          financeGuide: financeGuideData,
          shippingGuide: shippingGuideData,
          inventoryGuide: inventoryGuideData,
          complianceGuide: complianceGuideData,
          motiveGuide: motiveGuideData,
          hsCodeGuide: hsCodeGuideData,
          invoiceGuide: invoiceGuideData
        }
      }
    } else {
      const details = await this.loadServiceDetails()
      // Try matching by intent.id first, then by slug
      let serviceData =
        details.services[intent.id] ||
        details.services[intent.slug] ||
        // Also try removing common suffixes
        details.services[intent.id.replace(/-services?$/, "")]

      // Fallback mapping by intent kind / common keywords
      if (!serviceData) {
        const intentSlugLower = intent.slug.toLowerCase()
        const kindLower = intent.kind?.toLowerCase()

        if (intentSlugLower.includes("hs-code") || intentSlugLower.includes("tariff")) {
          serviceData = details.services["hs-code-classification"]
        } else if (kindLower === "customs") {
          serviceData = details.services["customs-clearance"]
        } else if (kindLower === "finance") {
          serviceData = details.services["freight-audit-finance"]
        } else if (kindLower === "shipping") {
          serviceData = details.services["shipping-logistics"]
        } else if (kindLower === "compliance") {
          serviceData = details.services["trade-compliance"]
        }
      }
      if (serviceData || tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData || inventoryGuideData || complianceGuideData || motiveGuideData || hsCodeGuideData || invoiceGuideData) {
        return { 
          isIntegration: false, 
          serviceDetails: serviceData,
          tmsErpGuide: tmsErpGuideData,
          customsGuide: customsGuideData,
          financeGuide: financeGuideData,
          shippingGuide: shippingGuideData,
          inventoryGuide: inventoryGuideData,
          complianceGuide: complianceGuideData,
          motiveGuide: motiveGuideData,
          hsCodeGuide: hsCodeGuideData,
          invoiceGuide: invoiceGuideData
        }
      }
    }

    // Return guides even if no other technical details found
    if (tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData || inventoryGuideData || complianceGuideData || motiveGuideData || hsCodeGuideData || invoiceGuideData) {
      return {
        isIntegration: false,
        tmsErpGuide: tmsErpGuideData,
        customsGuide: customsGuideData,
        financeGuide: financeGuideData,
        shippingGuide: shippingGuideData,
        inventoryGuide: inventoryGuideData,
        complianceGuide: complianceGuideData,
        motiveGuide: motiveGuideData,
        hsCodeGuide: hsCodeGuideData,
        invoiceGuide: invoiceGuideData
      }
    }

    return null
  }

  /**
   * Resolve the pool chain for a given intent
   * Chain: IntentPool -> KindPool -> DefaultPool
   */
  private async resolvePool(intent: Intent): Promise<ContentPool> {
    const poolConfig = await this.loadPools()
    const pools = poolConfig.pools

    // Find pools in the chain
    const defaultPool = pools.find((p) => p.id === "default")
    const kindPool = pools.find((p) => p.id === intent.kind)
    const intentPool = pools.find((p) => p.id === intent.id)

    // Start with default pool
    let resolvedPool: ContentPool = defaultPool || { id: "default", blocks: {} }

    // Merge kind pool if exists
    if (kindPool) {
      resolvedPool = this.mergePools(resolvedPool, kindPool)
    }

    // Merge intent pool if exists
    if (intentPool) {
      resolvedPool = this.mergePools(resolvedPool, intentPool)
    }

    return resolvedPool
  }

  /**
   * Merge two pools (child overrides parent)
   */
  private mergePools(parent: ContentPool, child: ContentPool): ContentPool {
    return {
      id: child.id,
      extends: child.extends,
      blocks: {
        ...parent.blocks,
        ...child.blocks,
      },
    }
  }

  /**
   * Get block IDs from pool for a specific block type
   */
  private getBlockIdsFromPool(pool: ContentPool, blockType: string): string[] {
    const direct = pool.blocks[blockType]
    if (direct && direct.length > 0) return direct

    if (blockType === "benefit") {
      return pool.blocks.benefits || []
    }

    return []
  }

  /**
   * Select a specific block variant using the hash
   */
  private async selectBlock(
    blockType: string,
    pool: ContentPool,
    seed: string
  ): Promise<BlockItem | null> {
    const blocks = await this.loadBlocks()
    const blockIds = this.getBlockIdsFromPool(pool, blockType)

    if (blockIds.length === 0) {
      // Fallback to all blocks of this type
      const allBlocks = blocks[blockType as keyof BlockCollection] as BlockItem[]
      if (!allBlocks || allBlocks.length === 0) return null

      const hash = this.getHash(seed + blockType)
      const index = hash % allBlocks.length
      return allBlocks[index]
    }

    // Get specific blocks by IDs
    const allBlocks = blocks[blockType as keyof BlockCollection] as BlockItem[]
    const filteredBlocks = allBlocks.filter((b) => blockIds.includes(b.id))

    if (filteredBlocks.length === 0) {
      if (!allBlocks || allBlocks.length === 0) return null
      const hash = this.getHash(seed + blockType)
      const index = hash % allBlocks.length
      return allBlocks[index]
    }

    const hash = this.getHash(seed + blockType)
    const index = hash % filteredBlocks.length
    return filteredBlocks[index]
  }

  /**
   * Select multiple blocks (for benefits)
   */
  private async selectBlocks(
    blockType: string,
    pool: ContentPool,
    seed: string,
    count: number
  ): Promise<BlockItem[]> {
    const blocks = await this.loadBlocks()
    const blockIds = this.getBlockIdsFromPool(pool, blockType)

    let allBlocks: BlockItem[] = []

    if (blockIds.length === 0) {
      allBlocks = (blocks[blockType as keyof BlockCollection] as BlockItem[]) || []
    } else {
      const availableBlocks = (blocks[blockType as keyof BlockCollection] as BlockItem[]) || []
      const filtered = availableBlocks.filter((b) => blockIds.includes(b.id))
      allBlocks = filtered.length > 0 ? filtered : availableBlocks
    }

    if (allBlocks.length === 0) return []

    // Use hash to deterministically select N items
    const selected: BlockItem[] = []
    const maxCount = Math.min(count, allBlocks.length)

    for (let i = 0; i < maxCount; i++) {
      const hash = this.getHash(seed + blockType + i)
      const index = hash % allBlocks.length
      const block = allBlocks[index]

      // Avoid duplicates
      if (!selected.find((b) => b.id === block.id)) {
        selected.push(block)
      }
    }

    return selected
  }

  /**
   * Map intent kind to Unsplash photo ID
   * Uses case-insensitive partial matching
   * All IDs verified working as of 2024
   */
  private getImageUrlForIntent(intent: Intent): string {
    const kind = (intent.kind || "").toLowerCase()

    let photoId: string

    // Customs, compliance, insurance -> professional documents/business photo
    if (kind.includes("customs") || kind.includes("compliance") || kind.includes("insurance")) {
      photoId = "1554224154-26032ffc0d07" // Business/finance documents
    }
    // Shipping or forwarding -> cargo/shipping containers photo
    else if (kind.includes("shipping") || kind.includes("forwarding")) {
      photoId = "1494412651409-8963ce7935a7" // Cargo ship containers
    }
    // Logistics or warehousing -> warehouse/logistics photo
    else if (kind.includes("logistics") || kind.includes("warehousing")) {
      photoId = "1586528116311-ad8dd3c8310d" // Modern warehouse
    }
    // Finance or invoice -> financial/accounting photo
    else if (kind.includes("finance") || kind.includes("invoice")) {
      photoId = "1454165804606-c3d57bc86b40" // Business analytics
    }
    // Integration -> tech/software integration photo
    else if (kind.includes("integration")) {
      photoId = "1558618666-fcd25c85cd64" // Tech integration
    }
    // Default fallback -> professional logistics
    else {
      photoId = "1566576721346-d4a3b4eaeb55" // Logistics operations
    }

    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1200`
  }

  /**
   * Replace template variables in text
   */
  private replaceVariables(
    text: string,
    city: City,
    intent: Intent,
    state?: { name: string; slug: string }
  ): string {
    return text
      .replace(/\{city\}/g, city.name)
      .replace(/\{state\}/g, state?.name || "")
      .replace(/\{service\}/g, intent.name)
      .replace(/\{intent\}/g, intent.name)
      .replace(/\{intentName\}/g, intent.name)
      .replace(/\{vertical\}/g, "logistics") // Default vertical
  }

  private selectProcessBlock(intent: Intent, blocks: ProcessBlock[]): ProcessBlock | null {
    if (!blocks || blocks.length === 0) return null
    const kind = (intent.kind || "").toLowerCase()
    const slug = intent.slug.toLowerCase()

    let targetId = "process_logistics"
    if (["finance", "invoice", "audit"].includes(kind) || slug.includes("audit")) {
      targetId = "process_finance"
    } else if (["customs", "compliance"].includes(kind)) {
      targetId = "process_customs"
    }

    return blocks.find((block) => block.id === targetId) || blocks[0] || null
  }

  /**
   * Assemble a complete page model
   * This is the main public API
   */
  async assemblePage(
    city: City,
    intent: Intent,
    state?: { name: string; slug: string }
  ): Promise<PageModel> {
    // Generate seed for deterministic selection
    const seed = `${city.countryCode}-${city.stateCode}-${city.slug}-${intent.slug}`

    // Resolve pool chain
    const pool = await this.resolvePool(intent)

    // Select content blocks
    const introBlock = await this.selectBlock("intro", pool, seed)
    const painBlock = await this.selectBlock("pain", pool, seed)
    const ctaBlock = await this.selectBlock("cta", pool, seed)
    const benefitBlocks = await this.selectBlocks("benefit", pool, seed, 6)

    const blocks = await this.loadBlocks()

    const pickDeterministic = <T extends { id: string }>(
      items: T[],
      count: number,
      seedSuffix: string
    ): T[] => {
      if (!items || items.length === 0 || count <= 0) return []
      const selected: T[] = []
      let attempts = 0
      const maxAttempts = items.length * 3
      while (selected.length < count && attempts < maxAttempts) {
        const hash = this.getHash(seed + seedSuffix + attempts)
        const index = hash % items.length
        const item = items[index]
        if (!selected.find((s) => s.id === item.id)) {
          selected.push(item)
        }
        attempts += 1
      }
      return selected
    }

    const tagged = (tag: string) =>
      blocks.faq.filter((f) => f.tags?.includes(tag))

    const safetyFaqs = tagged("safety")
    const kindFaqs = tagged(intent.kind)

    const selectedSafety = pickDeterministic(safetyFaqs, 2, "faq-safety")
    const selectedKind = pickDeterministic(kindFaqs, 3, "faq-kind")
    const combinedFaqs = [...selectedSafety, ...selectedKind]

    const fallbackFaqs = blocks.faq.filter(
      (f) => !combinedFaqs.find((s) => s.id === f.id)
    )
    const needed = Math.max(0, 5 - combinedFaqs.length)
    const fillFaqs = pickDeterministic(fallbackFaqs, needed, "faq-fill")

    const selectedFaqs = [...combinedFaqs, ...fillFaqs]

    const technicalData = await this.getTechnicalDetails(intent)

    // Replace variables in all text
    const processedIntro = introBlock
      ? {
          ...introBlock,
          text: this.replaceVariables(introBlock.text, city, intent, state),
        }
      : { id: "default-intro", text: `${intent.name} in ${city.name}` }

    const processedPain = painBlock
      ? {
          ...painBlock,
          text: this.replaceVariables(painBlock.text, city, intent, state),
        }
      : { id: "default-pain", text: "We solve your logistics challenges." }

    const processedCta = ctaBlock
      ? {
          ...ctaBlock,
          text: this.replaceVariables(ctaBlock.text, city, intent, state),
        }
      : { id: "default-cta", text: "Get started today with our $799 flat-fee service." }

    const processedBenefits = benefitBlocks.map((b) => ({
      ...b,
      text: this.replaceVariables(b.text, city, intent, state),
    }))

    const processBlock = this.selectProcessBlock(intent, blocks.process)
    const processedProcess = processBlock
      ? {
          ...processBlock,
          title: this.replaceVariables(processBlock.title, city, intent, state),
          steps: processBlock.steps.map((step) => ({
            ...step,
            name: this.replaceVariables(step.name, city, intent, state),
            desc: this.replaceVariables(step.desc, city, intent, state),
          })),
        }
      : undefined

    const processedFaqs = selectedFaqs.map((f) => ({
      question: this.replaceVariables(f.question, city, intent, state),
      answer: this.replaceVariables(f.answer, city, intent, state),
    }))

    const testimonialKind = (intent.kind || "").toLowerCase()
    const testimonialTag =
      testimonialKind === "finance" || testimonialKind === "invoice"
        ? "finance"
        : testimonialKind === "customs" || testimonialKind === "compliance"
        ? "customs"
        : "logistics"

    const taggedTestimonials = blocks.testimonials.filter((t) =>
      t.tags?.includes(testimonialTag)
    )
    const testimonialFallback = blocks.testimonials.filter(
      (t) => !taggedTestimonials.find((s) => s.id === t.id)
    )
    const selectedTestimonials = pickDeterministic(
      taggedTestimonials,
      3,
      "testimonials"
    )
    const fillTestimonials = pickDeterministic(
      testimonialFallback,
      Math.max(0, 3 - selectedTestimonials.length),
      "testimonials-fill"
    )
    const processedTestimonials = [...selectedTestimonials, ...fillTestimonials]

    // Generate metadata
    const shouldIndex = city.priority >= 90 && intent.priority <= 15

    const title = intent.metaTitle
      ? this.replaceVariables(intent.metaTitle, city, intent, state)
      : `${intent.name} | DocStandard`

    const description =
      intent.metaDescription ||
      `Professional ${intent.name.toLowerCase()}. Flat-fee $799 document processing with same-day turnaround. Expert logistics solutions.`

    const canonical = `/${city.countryCode}/${city.stateCode.toLowerCase()}/${city.slug}/${
      intent.slug
    }`

    const imageUrl = this.getImageUrlForIntent(intent)

    // Debug logging to help diagnose matching issues
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[ContentFactory] Intent ID: ${intent.id}, Kind: ${intent.kind}, Slug: ${intent.slug}, Technical Found: ${!!technicalData}, Image URL: ${imageUrl.substring(0, 60)}...`
      )
    }

    return {
      city,
      intent,
      content: {
        intro: processedIntro,
        pain: processedPain,
        benefits: processedBenefits,
        cta: processedCta,
        faq: processedFaqs,
        testimonials: processedTestimonials,
        process: processedProcess,
      },
      meta: {
        title,
        description,
        shouldIndex,
        canonical,
        imageUrl,
      },
      // Include technical details when available
      technical: technicalData || undefined,
    }
  }
}

// Singleton instance
let factoryInstance: ContentFactory | null = null

/**
 * Get or create the ContentFactory singleton
 */
export function getContentFactory(): ContentFactory {
  if (!factoryInstance) {
    factoryInstance = new ContentFactory()
  }
  return factoryInstance
}
