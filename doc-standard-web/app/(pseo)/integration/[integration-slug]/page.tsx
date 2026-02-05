import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { Hero } from "@/components/pseo/dynamic/hero"
import { PainSection } from "@/components/pseo/PainSection"
import { TechnicalGuide } from "@/components/pseo/TechnicalGuide"
import { TechnicalProcess } from "@/components/pseo/TechnicalProcess"
import { FAQSection } from "@/components/pseo/FAQSection"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import { ROISection } from "@/components/pseo/ROISection"
import type { BlockItem } from "@/lib/pseo/types"
import { getDynamicROI } from "@/lib/pseo/roi-helper"
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
    const { systemA, systemB } = deriveSystemsFromSlug(slug)
    return {
      slug,
      systemA,
      systemB,
      friction: `Manual ${systemA} exports and ${systemB} imports create re-keying, delays, and audit risk.`,
      solution: `Normalize ${systemA} and ${systemB} data into clean, system-ready exports.`,
    }
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

const deriveSystemsFromSlug = (slug: string): { systemA: string; systemB: string } => {
  const cleaned = slug
    .replace(/-(integration|bridge|data-bridge|sync|connector|pipeline)$/i, "")
    .replace(/-to-/i, "|")
    .replace(/-/g, " ")
  const parts = cleaned.split("|").map((part) => part.trim()).filter(Boolean)
  if (parts.length >= 2) {
    return {
      systemA: normalizeSystemName(parts[0]) || parts[0],
      systemB: normalizeSystemName(parts.slice(1).join(" ")) || parts.slice(1).join(" "),
    }
  }
  const fallback = normalizeSystemName(cleaned)
  return { systemA: fallback || slug, systemB: "Core Systems" }
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

  const variables = { intentName: serviceName, vertical: "integration", systemA, systemB }
  const processedIntro = { ...introBlock, text: replaceVariables(introBlock.text, variables) }
  const processedPain: BlockItem = { id: "integration-friction", text: friction }

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

  const roiSourceText = [solution, friction].filter(Boolean).join(" ")
  const roiData = getDynamicROI(undefined, roiSourceText)

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

      <PainSection
        content={processedPain}
        painPoints={painPoints}
        intentName={serviceName}
        vertical="integration"
        kind="integration"
        systemA={systemA}
        systemB={systemB}
      />

      <TechnicalGuide
        integrationGuide={{ systemA, systemB, friction, solution, technicalData }}
        systemA={systemA}
        systemB={systemB}
      />

      <TechnicalProcess process={processedProcess} />

      <ROISection
        manualEffort={roiData.manualEffort}
        withDocStandard={roiData.withDocStandard}
        annualSavings={roiData.annualSavings}
        errorReduction={roiData.errorReduction}
      />

      <BenefitsGrid benefits={benefits} isIntegration />

      <FAQSection faqs={defaultFaqs} />
      <TestimonialsSection testimonials={defaultTestimonials} kind="general" />

    </main>
  )
}
