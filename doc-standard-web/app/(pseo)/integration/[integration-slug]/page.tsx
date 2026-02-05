import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { Hero } from "@/components/pseo/dynamic/hero"
import { RiskSection } from "@/components/pseo/RiskSection"
import { PainSection } from "@/components/pseo/PainSection"
import { MiddleCTA } from "@/components/pseo/MiddleCTA"
import { TechnicalGuideSection } from "@/components/pseo/dynamic/technical-guide"
import { ProcessSteps } from "@/components/pseo/dynamic/process-steps"
import { FAQSection } from "@/components/pseo/FAQSection"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import { ROISection } from "@/components/pseo/ROISection"
import type { BlockItem } from "@/lib/pseo/types"
import {
  loadBlocks,
  loadPools,
  resolvePool,
  selectBlock,
  replaceVariables,
  selectProcessBlock,
} from "@/lib/pseo/dynamic-content"
import { getIntentBySlug } from "@/lib/pseo/intents"
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
  const match = entries.find((entry) => entry.slug === slug)
  if (match) return match

  const intent = await getIntentBySlug(slug)
  if (!intent || intent.kind !== "integration") {
    return null
  }

  const { systemA, systemB } = deriveSystemsFromIntentName(intent.name)
  const solution =
    intent.description ||
    `Normalize ${systemA} and ${systemB} data into clean, system-ready exports.`
  const friction = `Manual ${systemA} exports and ${systemB} imports create re-keying, delays, and audit risk.`

  return {
    slug: intent.slug,
    systemA,
    systemB,
    friction,
    solution,
  }
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

const getStaticBenefits = (systemA: string, systemB: string): BlockItem[] => [
  {
    id: "integration-benefit-1",
    text: `Field-level normalization between ${systemA} and ${systemB} to prevent schema mismatches.`,
  },
  {
    id: "integration-benefit-2",
    text: `System-ready exports that post cleanly into ${systemB} without manual rework.`,
  },
  {
    id: "integration-benefit-3",
    text: "Reduced reconciliation time with consistent mappings across every batch.",
  },
  {
    id: "integration-benefit-4",
    text: "Operational visibility with validated records and audit-ready output.",
  },
]

const getDefaultFAQs = (systemA: string, systemB: string) => [
  {
    question: `Can you handle ${systemA} custom fields?`,
    answer: `Yes. We map custom ${systemA} fields to ${systemB} targets and validate them against your business rules before delivery.`,
  },
  {
    question: `How do you validate ${systemA} data before sending to ${systemB}?`,
    answer: `We normalize field formats, verify identifiers against master records, and run consistency checks so only clean data reaches ${systemB}.`,
  },
  {
    question: `What formats do you deliver to ${systemB}?`,
    answer: `We deliver ${systemB}-ready CSV, JSON, or XML depending on your import method and schema requirements.`,
  },
  {
    question: `How fast can you turn around a ${systemA} to ${systemB} batch?`,
    answer: `Most batches are processed within 24–48 hours, with expedited options available for urgent runs.`,
  },
]

const getDefaultTestimonials = (systemA: string, systemB: string) => [
  {
    quote: `Connecting ${systemA} to ${systemB} used to be a nightmare. Now it's automatic, and the data arrives clean every time.`,
    author: "Jordan Miles",
    role: "Operations Lead",
    company: "North River Logistics",
  },
  {
    quote: `We stopped re-keying ${systemA} exports and eliminated reconciliation gaps in ${systemB} within the first batch.`,
    author: "Priya Shah",
    role: "Controller",
    company: "Summit Freight Group",
  },
  {
    quote: `DocStandard normalized our ${systemA} data to match ${systemB} rules without extra back-and-forth. It just works.`,
    author: "Carlos Vega",
    role: "Systems Manager",
    company: "Atlas 3PL",
  },
]

const normalizeSystemName = (value: string) =>
  value
    .replace(/\b(data|normalization|normalizing|processing|preparation|prep|digitization|extraction)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()

const deriveSystemsFromIntentName = (name: string): { systemA: string; systemB: string } => {
  const lower = name.toLowerCase()
  const splitOn = (token: string) => {
    const parts = name.split(new RegExp(`\\s${token}\\s`, "i")).map((part) => part.trim())
    if (parts.length >= 2) {
      return { systemA: parts[0], systemB: parts.slice(1).join(` ${token} `) }
    }
    return null
  }

  const tokens = ["to", "for", "into", "and", "&", "/"]
  for (const token of tokens) {
    if (token === "&" && !name.includes("&")) continue
    if (token === "/" && !name.includes("/")) continue
    if (token !== "&" && token !== "/" && !lower.includes(` ${token} `)) continue
    const result = splitOn(token)
    if (result) {
      const systemA = normalizeSystemName(result.systemA) || result.systemA
      const systemB = normalizeSystemName(result.systemB) || result.systemB
      return { systemA, systemB }
    }
  }

  const words = name.split(/\s+/).filter(Boolean)
  const systemA = normalizeSystemName(words[0] || name) || name
  return { systemA, systemB: "Core Systems" }
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

  const extractTableRows = (html: string) => {
    if (!html) return ""
    const tbodyMatch = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
    if (tbodyMatch && tbodyMatch[1]) return tbodyMatch[1].trim()
    const rowMatches = html.match(/<tr[\s\S]*?<\/tr>/gi)
    if (rowMatches && rowMatches.length > 0) return rowMatches.join("")
    return ""
  }

  const normalizeTableRows = (html: string) =>
    html.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_match, rowContent) => {
      const cells = Array.from(rowContent.matchAll(/<td[^>]*>[\s\S]*?<\/td>/gi)).map((m) => m[0])
      if (cells.length === 0) return _match
      const missing = Math.max(0, 5 - cells.length)
      const filler = Array.from({ length: missing }, () => "<td></td>").join("")
      return `<tr>${cells.join("")}${filler}</tr>`
    })

  const technicalRows = technicalData ? normalizeTableRows(extractTableRows(technicalData)) : ""

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
  const benefits = getStaticBenefits(systemA, systemB)
  const defaultFaqs = getDefaultFAQs(systemA, systemB)
  const defaultTestimonials = getDefaultTestimonials(systemA, systemB)

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

  // Helper function to extract ROI values from text (same as PseoPageTemplate)
  const extractROIValue = (text: string, type: 'manualEffort' | 'withDocStandard' | 'annualSavings' | 'errorReduction'): string | null => {
    if (!text) return null
    
    switch (type) {
      case 'manualEffort': {
        const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\b/i)
        if (hourMatch) return `${hourMatch[1]}h`
        const minuteMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)\b/i)
        if (minuteMatch) return `${minuteMatch[1]}m`
        const timeMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h|minutes?|mins?|m)/i)
        if (timeMatch) {
          const value = timeMatch[1]
          const unit = timeMatch[0].toLowerCase().includes('hour') || timeMatch[0].toLowerCase().includes('hr') || timeMatch[0].toLowerCase().includes('h') ? 'h' : 'm'
          return `${value}${unit}`
        }
        return null
      }
      case 'withDocStandard': {
        const minuteMatch = text.match(/(?:<|less than|under)?\s*(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)\s*(?:\/|per|for)/i)
        if (minuteMatch) return `${minuteMatch[1]}m`
        const secondMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:seconds?|secs?|s)\s*(?:per|for)/i)
        if (secondMatch) {
          const seconds = parseFloat(secondMatch[1])
          if (seconds < 60) return `${seconds}s`
          const minutes = Math.round(seconds / 60)
          return `${minutes}m`
        }
        const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\s*(?:\/|per|for)/i)
        if (hourMatch) return `${hourMatch[1]}h`
        return null
      }
      case 'annualSavings': {
        const dollarMatch = text.match(/~?\s*\$([\d,.]+)\s*(?:k|thousand|annually|per year|yearly)?/i)
        if (dollarMatch) {
          let value = dollarMatch[1].replace(/,/g, '')
          const numValue = parseFloat(value)
          if (numValue >= 1000) {
            const kValue = Math.round(numValue / 1000)
            return `$${kValue}k`
          }
          return `$${value}`
        }
        const kMatch = text.match(/\$(\d+)k/i)
        if (kMatch) return `$${kMatch[1]}k`
        return null
      }
      case 'errorReduction': {
        const percentMatch = text.match(/(\d+(?:\.\d+)?)%\s*(?:reduction|accuracy|error|rate)?/i)
        if (percentMatch) {
          const value = parseFloat(percentMatch[1])
          if (value >= 90) return "100%"
          return `${Math.round(value)}%`
        }
        const plusMatch = text.match(/(\d+(?:\.\d+)?)%\+/i)
        if (plusMatch) {
          const value = parseFloat(plusMatch[1])
          if (value >= 99) return "100%"
          return `${Math.round(value)}%`
        }
        return null
      }
      default:
        return null
    }
  }

  // Try to extract ROI from solution or friction text
  const roiSourceText = solution || friction || ""
  const extractedManualEffort = extractROIValue(roiSourceText, 'manualEffort')
  const extractedWithDocStandard = extractROIValue(roiSourceText, 'withDocStandard')
  const extractedAnnualSavings = extractROIValue(roiSourceText, 'annualSavings')
  const extractedErrorReduction = extractROIValue(roiSourceText, 'errorReduction')

  const manualEffort = extractedManualEffort ?? undefined
  const withDocStandard = extractedWithDocStandard ?? undefined
  const annualSavings = extractedAnnualSavings ?? undefined
  const errorReduction = extractedErrorReduction ?? undefined

  return (
    <main className="min-h-screen">
      <Hero
        intro={processedIntro}
        pain={processedPain}
        intentName={`${systemA} to ${systemB} Integration`}
        systemA={systemA}
        systemB={systemB}
        visual="data-card"
        showVisual
        integrationPair={integrationPair}
        useCase={solution}
        painPoints={painPoints}
      />

      <RiskSection quote={processedPain.text} painPoints={painPoints} />

      <PainSection
        content={processedPain}
        painPoints={painPoints}
        intentName={serviceName}
        vertical="integration"
        kind="integration"
        systemA={systemA}
        systemB={systemB}
      />

      <TechnicalGuideSection
        vertical="integration"
        integrationGuide={{ systemA, systemB, friction, solution }}
      />

      {technicalData && technicalRows && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Master Mapping Blueprint</h2>
              <p className="text-slate-600 max-w-2xl">
                To achieve high-integrity data bridging, DocStandard normalizes critical field pairs across major systems.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-4 font-semibold text-sm">SOURCE</th>
                      <th className="p-4 font-semibold text-sm">SYSTEM TARGET</th>
                      <th className="p-4 font-semibold text-sm">FIELD</th>
                      <th className="p-4 font-semibold text-sm">ERP FIELD</th>
                      <th className="p-4 font-semibold text-sm">NORMALIZATION LOGIC</th>
                    </tr>
                  </thead>
                  <tbody
                    className="divide-y divide-slate-100 text-sm [&_tr]:hover:bg-blue-50/50 [&_tr]:transition-colors [&_td]:p-4 [&_td]:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: technicalRows }}
                  />
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      <MiddleCTA />

      <BenefitsGrid benefits={benefits} isIntegration />

      <ProcessSteps process={processedProcess} />

      <ROISection
        manualEffort={manualEffort}
        withDocStandard={withDocStandard}
        annualSavings={annualSavings}
        errorReduction={errorReduction}
      />

      <FAQSection faqs={defaultFaqs} />
      <TestimonialsSection testimonials={defaultTestimonials} kind="general" />

    </main>
  )
}
