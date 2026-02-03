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
import path from "path"
import type {
  City,
  Intent,
  BlockItem,
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
} from "./types"

// Block storage types
interface BlockCollection {
  intro: BlockItem[]
  pain: BlockItem[]
  benefit: BlockItem[]
  cta: BlockItem[]
  faq: Array<{ id: string; question: string; answer: string }>
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

    const blocksPath = path.join(process.cwd(), "data", "content", "blocks.json")
    const faqsPath = path.join(process.cwd(), "data", "content", "faqs.json")
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
    }

    return this.blocks
  }

  /**
   * Load pool configurations from JSON
   */
  private async loadPools(): Promise<PoolConfig> {
    if (this.pools) return this.pools

    const poolsPath = path.join(process.cwd(), "data", "content", "pools.json")
    const poolsContent = await fs.readFile(poolsPath, "utf-8")
    this.pools = JSON.parse(poolsContent) as PoolConfig

    return this.pools
  }

  /**
   * Load integration details from Leah's research
   */
  private async loadIntegrationDetails(): Promise<IntegrationDetailsFile> {
    if (this.integrationDetails) return this.integrationDetails

    const detailsPath = path.join(process.cwd(), "data", "content", "integration-details.json")
    try {
      const content = await fs.readFile(detailsPath, "utf-8")
      this.integrationDetails = JSON.parse(content) as IntegrationDetailsFile
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

    const detailsPath = path.join(process.cwd(), "data", "content", "service-details.json")
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

    const guidePath = path.join(process.cwd(), "data", "content", "tms-erp-guide.json")
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

    const guidePath = path.join(process.cwd(), "data", "content", "customs-guide.json")
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

    const guidePath = path.join(process.cwd(), "data", "content", "finance-guide.json")
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

    const guidePath = path.join(process.cwd(), "data", "content", "shipping-guide.json")
    try {
      const content = await fs.readFile(guidePath, "utf-8")
      this.shippingGuide = JSON.parse(content) as ShippingGuideFile
    } catch {
      this.shippingGuide = { shipping_documentation_guide: { title: "", word_count_target: 0, expert_sections: [] } }
    }

    return this.shippingGuide
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
  } | null> {
    const isIntegration = intent.kind?.toLowerCase() === "integration"
    const intentSlug = intent.slug.toLowerCase()
    
    // Check if intent slug contains TMS/ERP keywords
    const tmsErpKeywords = ['cargowise', 'sap', 'netsuite', 'mercurygate', 'blue-yonder']
    const hasTmsErpKeyword = tmsErpKeywords.some(keyword => intentSlug.includes(keyword))

    // Check if intent slug contains Customs/Invoice/Packing keywords
    const customsKeywords = ['customs', 'invoice', 'packing']
    const hasCustomsKeyword = customsKeywords.some(keyword => intentSlug.includes(keyword))

    // Check if intent slug contains Finance/Audit/QuickBooks/Magaya keywords
    const financeKeywords = ['finance', 'audit', 'quickbooks', 'magaya']
    const hasFinanceKeyword = financeKeywords.some(keyword => intentSlug.includes(keyword))

    // Check if intent slug contains Shipping/BOL/Airway/Container keywords
    const shippingKeywords = ['bill-of-lading', 'airway-bill', 'shipping', 'container']
    const hasShippingKeyword = shippingKeywords.some(keyword => intentSlug.includes(keyword))

    // Load TMS-ERP guide if keywords match
    let tmsErpGuideData: TmsErpGuide | undefined
    if (hasTmsErpKeyword) {
      const guideFile = await this.loadTmsErpGuide()
      tmsErpGuideData = guideFile.tms_erp_bridging_guide
    }

    // Load Customs guide if keywords match
    let customsGuideData: CustomsGuide | undefined
    if (hasCustomsKeyword) {
      const guideFile = await this.loadCustomsGuide()
      customsGuideData = guideFile.customs_clearance_guide
    }

    // Load Finance guide if keywords match
    let financeGuideData: FinanceGuide | undefined
    if (hasFinanceKeyword) {
      const guideFile = await this.loadFinanceGuide()
      financeGuideData = guideFile.finance_operations_guide
    }

    // Load Shipping guide if keywords match
    let shippingGuideData: ShippingGuide | undefined
    if (hasShippingKeyword) {
      const guideFile = await this.loadShippingGuide()
      shippingGuideData = guideFile.shipping_documentation_guide
    }

    if (isIntegration) {
      const details = await this.loadIntegrationDetails()
      // Try matching by intent.id first, then by slug
      const integrationData =
        details.integrations[intent.id] ||
        details.integrations[intent.slug] ||
        // Also try removing common suffixes like "-services" or "-integration"
        details.integrations[intent.id.replace(/-services?$|-integration$/, "")] ||
        details.integrations[intent.slug.replace(/-to-|-integration$/, "-")]
      if (integrationData || tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData) {
        return { 
          isIntegration: true, 
          integrationDetails: integrationData,
          tmsErpGuide: tmsErpGuideData,
          customsGuide: customsGuideData,
          financeGuide: financeGuideData,
          shippingGuide: shippingGuideData
        }
      }
    } else {
      const details = await this.loadServiceDetails()
      // Try matching by intent.id first, then by slug
      const serviceData =
        details.services[intent.id] ||
        details.services[intent.slug] ||
        // Also try removing common suffixes
        details.services[intent.id.replace(/-services?$/, "")]
      if (serviceData || tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData) {
        return { 
          isIntegration: false, 
          serviceDetails: serviceData,
          tmsErpGuide: tmsErpGuideData,
          customsGuide: customsGuideData,
          financeGuide: financeGuideData,
          shippingGuide: shippingGuideData
        }
      }
    }

    // Return guides even if no other technical details found
    if (tmsErpGuideData || customsGuideData || financeGuideData || shippingGuideData) {
      return {
        isIntegration: false,
        tmsErpGuide: tmsErpGuideData,
        customsGuide: customsGuideData,
        financeGuide: financeGuideData,
        shippingGuide: shippingGuideData
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

    if (filteredBlocks.length === 0) return null

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
      allBlocks = availableBlocks.filter((b) => blockIds.includes(b.id))
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

    // Select FAQs
    const blocks = await this.loadBlocks()
    const faqIds = this.getBlockIdsFromPool(pool, "faq")
    let faqItems = blocks.faq

    if (faqIds.length > 0) {
      const filtered = blocks.faq.filter((f) => faqIds.includes(f.id))
      faqItems = filtered.length > 0 ? filtered : blocks.faq
    }

    // Use hash to select 4-6 FAQs
    const faqCount = 4 + (this.getHash(seed + "faq-count") % 3) // 4, 5, or 6
    const selectedFaqs: typeof faqItems = []
    const maxCount = Math.min(faqCount, faqItems.length)
    let attempts = 0

    while (selectedFaqs.length < maxCount && attempts < faqItems.length * 2) {
      const hash = this.getHash(seed + "faq" + attempts)
      const index = hash % faqItems.length
      const faq = faqItems[index]

      if (!selectedFaqs.find((f) => f.id === faq.id)) {
        selectedFaqs.push(faq)
      }

      attempts += 1
    }

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

    const processedFaqs = selectedFaqs.map((f) => ({
      question: this.replaceVariables(f.question, city, intent, state),
      answer: this.replaceVariables(f.answer, city, intent, state),
    }))

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

    // Get technical details if available (Leah's research data)
    const technicalData = await this.getTechnicalDetails(intent)

    // Debug logging to help diagnose matching issues
    console.log(
      `[ContentFactory] Intent ID: ${intent.id}, Kind: ${intent.kind}, Slug: ${intent.slug}, Technical Found: ${!!technicalData}, Image URL: ${imageUrl.substring(0, 60)}...`
    )

    return {
      city,
      intent,
      content: {
        intro: processedIntro,
        pain: processedPain,
        benefits: processedBenefits,
        cta: processedCta,
        faq: processedFaqs,
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
