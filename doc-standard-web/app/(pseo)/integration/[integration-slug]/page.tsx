import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { Hero } from "@/components/pseo/dynamic/hero"
import { TechnicalGuideSection } from "@/components/pseo/dynamic/technical-guide"
import { ProcessSteps } from "@/components/pseo/dynamic/process-steps"
import { ConversionCta } from "@/components/pseo/dynamic/conversion-cta"
import type { BlockItem } from "@/lib/pseo/types"
import {
  loadBlocks,
  loadPools,
  resolvePool,
  selectBlock,
  replaceVariables,
  selectProcessBlock,
} from "@/lib/pseo/dynamic-content"
import { promises as fs } from "fs"
import path from "path"

interface IntegrationEntry {
  slug: string
  systemA: string
  systemB: string
  friction: string
  solution: string
  technicalData?: string
}

const INTEGRATION_IMAGE_URL =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200"

const isIntegrationEntry = (value: unknown): value is IntegrationEntry => {
  if (!value || typeof value !== "object") return false
  const entry = value as IntegrationEntry
  return (
    typeof entry.slug === "string" &&
    typeof entry.systemA === "string" &&
    typeof entry.systemB === "string" &&
    typeof entry.friction === "string" &&
    typeof entry.solution === "string"
  )
}

const loadIntegrationDetails = async (): Promise<IntegrationEntry[]> => {
  const filePath = path.join(process.cwd(), "data", "content", "integration-details.json")
  try {
    const content = await fs.readFile(filePath, "utf-8")
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) {
      return parsed.filter(isIntegrationEntry)
    }
    return []
  } catch {
    return []
  }
}

const getIntegrationBySlug = async (slug: string): Promise<IntegrationEntry | null> => {
  const entries = await loadIntegrationDetails()
  return entries.find((entry) => entry.slug === slug) || null
}

const splitToPoints = (text: string, max = 4): string[] => {
  if (!text) return []
  return text
    .split(/(?:\.\s+|;\s+|,\s+|\n+)/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, max)
}

const toBlocks = (text: string, prefix: string): BlockItem[] => {
  const points = splitToPoints(text, 6)
  if (points.length === 0) {
    return [{ id: `${prefix}-1`, text }]
  }

  const uniquePoints = Array.from(new Set(points))
  const ensuredPoints = uniquePoints.length >= 3 ? uniquePoints : uniquePoints.concat(uniquePoints).slice(0, 3)

  return ensuredPoints.map((point, index) => ({
    id: `${prefix}-${index + 1}`,
    text: point,
  }))
}

interface PageProps {
  params: {
    "integration-slug": string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = await getIntegrationBySlug(params["integration-slug"])
  if (!entry) return { title: "Not Found" }

  const title = `${entry.systemA} to ${entry.systemB} Integration | DocStandard`
  const description = entry.solution

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function IntegrationPage({ params }: PageProps) {
  const entry = await getIntegrationBySlug(params["integration-slug"])
  if (!entry) {
    notFound()
  }

  const { systemA, systemB, friction, solution, technicalData } = entry
  const integrationPair = `${systemA} <-> ${systemB}`
  const serviceName = `${systemA} to ${systemB} Integration`

  const [blocks, poolConfig] = await Promise.all([loadBlocks(), loadPools()])
  const pool = resolvePool(poolConfig.pools, { kind: "integration", intentSlug: params["integration-slug"] })
  const seed = `integration-${params["integration-slug"]}`

  const introBlock =
    selectBlock("intro", pool, blocks, seed) ||
    ({ id: "intro-default", text: `Normalize ${systemA} and ${systemB} data into clean exports.` } as BlockItem)
  const ctaBlock =
    selectBlock("cta", pool, blocks, seed) ||
    ({ id: "cta-default", text: "Process your first batch for a flat $799 fee." } as BlockItem)

  const variables = { intentName: serviceName, vertical: "integration", systemA, systemB }
  const processedIntro = { ...introBlock, text: replaceVariables(introBlock.text, variables) }
  const processedPain: BlockItem = { id: "integration-friction", text: friction }
  const processedCta = { ...ctaBlock, text: replaceVariables(ctaBlock.text, variables) }

  const painPoints = splitToPoints(friction, 4)
  const benefits = toBlocks(solution, "integration-benefit")

  const processBlock = selectProcessBlock("integration", blocks.process)
  const processedProcess = processBlock
    ? {
        ...processBlock,
        title: replaceVariables(processBlock.title, variables),
        steps: processBlock.steps.map((step) => ({
          ...step,
          name: replaceVariables(step.name, variables),
          desc: replaceVariables(step.desc, variables),
        })),
      }
    : undefined

  return (
    <main className="min-h-screen">
      <Hero
        intro={processedIntro}
        pain={processedPain}
        intentName={serviceName}
        imageUrl={INTEGRATION_IMAGE_URL}
        integrationPair={integrationPair}
        useCase={solution}
        painPoints={painPoints}
      />

      <TechnicalGuideSection
        vertical="integration"
        integrationGuide={{ systemA, systemB, friction, solution }}
      />

      {technicalData && (
        <section className="mt-12 mb-20 px-4 md:px-0">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Technical Field Mapping Architecture
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Direct system-to-system field normalization protocols.
              </p>
            </div>
            <div className="p-0 overflow-x-auto">
              <div
                className="technical-table-container prose prose-slate max-w-none [&_table]:w-full [&_table]:mb-0 [&_thead]:bg-slate-50 [&_th]:p-4 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_td]:p-4 [&_td]:text-sm [&_tr]:border-b [&_tr:last-child]:border-0"
                dangerouslySetInnerHTML={{ __html: technicalData }}
              />
            </div>
          </div>
        </section>
      )}

      <BenefitsGrid benefits={benefits} />

      <ProcessSteps process={processedProcess} />

      <ConversionCta cta={processedCta} />
    </main>
  )
}
