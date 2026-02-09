import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { Hero } from "@/components/pseo/dynamic/hero"
import { RiskSection } from "@/components/pseo/RiskSection"
import { PainSection } from "@/components/pseo/PainSection"
import { MiddleCTA } from "@/components/pseo/MiddleCTA"
import { TechnicalGuideSection } from "@/components/pseo/dynamic/technical-guide"
import { ProcessSteps } from "@/components/pseo/dynamic/process-steps"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import { getIntentBySlug, getIntentsByKind } from "@/lib/pseo/intents"
import type { BlockItem } from "@/lib/pseo/types"
import {
  loadBlocks,
  loadPools,
  resolvePool,
  selectBlock,
  selectBlocks,
  replaceVariables,
  selectProcessBlock,
} from "@/lib/pseo/dynamic-content"

interface PageProps {
  params: {
    vertical: string
    "intent-slug": string
  }
}

const verticalAliases: Record<string, string> = {
  audit: "finance",
  logistics: "shipping",
  tms: "integration",
}

const getImageUrlForVertical = (vertical: string): string => {
  const normalized = vertical.toLowerCase()
  const verticalImages: Record<string, string> = {
    customs: "/images/banners/customs.webp",
    compliance: "/images/banners/compliance.webp",
    finance: "/images/banners/finance.webp",
    invoice: "/images/banners/invoice.webp",
    shipping: "/images/banners/shipping.webp",
    logistics: "/images/banners/logistics.webp",
    integration: "/images/banners/logistics.webp",
    tms: "/images/banners/logistics.webp",
    audit: "/images/banners/finance.webp",
  }
  return verticalImages[normalized] || "/images/banners/logistics.webp"
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const intent = await getIntentBySlug(params["intent-slug"])
  if (!intent) return { title: "Not Found" }

  const normalizedVertical = params.vertical.toLowerCase()
  const resolvedVertical = verticalAliases[normalizedVertical] || normalizedVertical
  if (intent.kind.toLowerCase() !== resolvedVertical) {
    return { title: "Not Found" }
  }

  const title = `${intent.name} | DocStandard`
  const description = intent.description || `Professional ${intent.name.toLowerCase()} services.`

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

export async function generateStaticParams() {
  const verticals = ["shipping", "customs", "finance", "compliance", "invoice", "logistics"]
  const params: Array<{ vertical: string; "intent-slug": string }> = []

  for (const vertical of verticals) {
    const resolvedVertical = verticalAliases[vertical] || vertical
    const intents = await getIntentsByKind(resolvedVertical)
    intents
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 10)
      .forEach((intent) => {
        params.push({ vertical, "intent-slug": intent.slug })
      })
  }

  return params
}

export default async function VerticalIntentPage({ params }: PageProps) {
  const intent = await getIntentBySlug(params["intent-slug"])
  if (!intent) {
    notFound()
  }

  const normalizedVertical = params.vertical.toLowerCase()
  const resolvedVertical = verticalAliases[normalizedVertical] || normalizedVertical
  if (intent.kind.toLowerCase() !== resolvedVertical) {
    notFound()
  }

  const [blocks, poolConfig] = await Promise.all([loadBlocks(), loadPools()])
  const pool = resolvePool(poolConfig.pools, {
    kind: intent.kind,
    intentId: intent.id,
    intentSlug: intent.slug,
  })
  const seed = `${resolvedVertical}-${intent.slug}`

  const introBlock =
    selectBlock("intro", pool, blocks, seed) ||
    ({ id: "intro-default", text: `Professional ${intent.name}` } as BlockItem)
  const painBlock =
    selectBlock("pain", pool, blocks, seed) ||
    ({ id: "pain-default", text: "We solve your logistics challenges." } as BlockItem)
  const benefitBlocks = selectBlocks("benefit", pool, blocks, seed, 6)

  const processBlock = selectProcessBlock(resolvedVertical, blocks.process)
  const processedProcess = processBlock
    ? {
        ...processBlock,
        title: replaceVariables(processBlock.title, {
          intentName: intent.name,
          vertical: resolvedVertical,
        }),
        steps: processBlock.steps.map((step) => ({
          ...step,
          name: replaceVariables(step.name, {
            intentName: intent.name,
            vertical: resolvedVertical,
          }),
          desc: replaceVariables(step.desc, {
            intentName: intent.name,
            vertical: resolvedVertical,
          }),
        })),
      }
    : undefined

  const variables = { intentName: intent.name, vertical: resolvedVertical }
  const processedIntro = { ...introBlock, text: replaceVariables(introBlock.text, variables) }
  const processedPain = { ...painBlock, text: replaceVariables(painBlock.text, variables) }
  const processedBenefits = benefitBlocks.map((benefit) => ({
    ...benefit,
    text: replaceVariables(benefit.text, variables),
  }))

  const imageUrl = getImageUrlForVertical(resolvedVertical)

  return (
    <main className="min-h-screen">
      <Hero intro={processedIntro} pain={processedPain} intentName={intent.name} imageUrl={imageUrl} />
      <RiskSection quote={processedPain.text} />
      <PainSection
        content={processedPain}
        intentName={intent.name}
        vertical={resolvedVertical}
        kind={resolvedVertical}
      />
      <TechnicalGuideSection vertical={resolvedVertical} />
      <MiddleCTA />
      <BenefitsGrid benefits={processedBenefits} />
      <ProcessSteps process={processedProcess} />
      <TestimonialsSection kind={resolvedVertical} />
    </main>
  )
}
