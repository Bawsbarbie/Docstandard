import { promises as fs } from "fs"
import path from "path"
import type { BlockItem, ContentPool, ProcessBlock } from "./types"

export interface ContentBlocks {
  intro: BlockItem[]
  pain: BlockItem[]
  benefit: BlockItem[]
  cta: BlockItem[]
  process: ProcessBlock[]
}

interface PoolConfig {
  pools: ContentPool[]
}

export async function loadBlocks(): Promise<ContentBlocks> {
  const blocksPath = path.join(process.cwd(), "data", "content", "blocks.json")
  const raw = await fs.readFile(blocksPath, "utf-8")
  const parsed = JSON.parse(raw)

  return {
    intro: parsed.intro || [],
    pain: parsed.pain || [],
    benefit: parsed.benefit || parsed.benefits || [],
    cta: parsed.cta || [],
    process: parsed.process || [],
  }
}

export async function loadPools(): Promise<PoolConfig> {
  const poolsPath = path.join(process.cwd(), "data", "content", "pools.json")
  const raw = await fs.readFile(poolsPath, "utf-8")
  return JSON.parse(raw) as PoolConfig
}

export function getHash(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

const mergePools = (parent: ContentPool, child?: ContentPool): ContentPool => {
  if (!child) return parent
  return {
    id: child.id,
    extends: child.extends,
    blocks: {
      ...parent.blocks,
      ...child.blocks,
    },
  }
}

export function resolvePool(
  pools: ContentPool[],
  options: { kind?: string; intentId?: string; intentSlug?: string }
): ContentPool {
  const defaultPool = pools.find((pool) => pool.id === "default") || { id: "default", blocks: {} }
  const kindPool = options.kind ? pools.find((pool) => pool.id === options.kind) : undefined
  const intentPool =
    (options.intentId && pools.find((pool) => pool.id === options.intentId)) ||
    (options.intentSlug && pools.find((pool) => pool.id === options.intentSlug))

  return mergePools(mergePools(defaultPool, kindPool), intentPool)
}

const getBlockIdsFromPool = (pool: ContentPool, blockType: string): string[] => {
  const direct = pool.blocks[blockType]
  if (direct && direct.length > 0) return direct
  if (blockType === "benefit") {
    return pool.blocks.benefits || []
  }
  return []
}

export function selectBlock(
  blockType: "intro" | "pain" | "benefit" | "cta",
  pool: ContentPool,
  blocks: ContentBlocks,
  seed: string
): BlockItem | null {
  const blockIds = getBlockIdsFromPool(pool, blockType)
  const allBlocks = blocks[blockType] || []
  const filtered = blockIds.length > 0 ? allBlocks.filter((block) => blockIds.includes(block.id)) : allBlocks
  const usable = filtered.length > 0 ? filtered : allBlocks
  if (usable.length === 0) return null
  const index = getHash(`${seed}-${blockType}`) % usable.length
  return usable[index]
}

export function selectBlocks(
  blockType: "benefit",
  pool: ContentPool,
  blocks: ContentBlocks,
  seed: string,
  count: number
): BlockItem[] {
  const blockIds = getBlockIdsFromPool(pool, blockType)
  const allBlocks = blocks[blockType] || []
  const filtered = blockIds.length > 0 ? allBlocks.filter((block) => blockIds.includes(block.id)) : allBlocks
  const usable = filtered.length > 0 ? filtered : allBlocks
  if (usable.length === 0) return []

  const selected: BlockItem[] = []
  const maxCount = Math.min(count, usable.length)
  for (let i = 0; i < maxCount; i++) {
    const index = getHash(`${seed}-${blockType}-${i}`) % usable.length
    const candidate = usable[index]
    if (!selected.find((item) => item.id === candidate.id)) {
      selected.push(candidate)
    }
  }
  return selected
}

export function replaceVariables(
  text: string,
  vars: { intentName?: string; vertical?: string; systemA?: string; systemB?: string }
): string {
  const intentName = vars.intentName || ""
  const vertical = vars.vertical || "logistics"
  const systemA = vars.systemA || ""
  const systemB = vars.systemB || ""

  return text
    .replace(/\{intentName\}|\{intent\}|\{service\}/g, intentName)
    .replace(/\{vertical\}/g, vertical)
    .replace(/\{systemA\}/g, systemA)
    .replace(/\{systemB\}/g, systemB)
}

export function selectProcessBlock(vertical: string, blocks: ProcessBlock[]): ProcessBlock | null {
  if (!blocks || blocks.length === 0) return null
  const normalized = vertical.toLowerCase()
  let targetId = "process_logistics"
  if (["finance", "invoice", "audit"].includes(normalized)) {
    targetId = "process_finance"
  } else if (["customs", "compliance"].includes(normalized)) {
    targetId = "process_customs"
  }
  return blocks.find((block) => block.id === targetId) || blocks[0] || null
}
