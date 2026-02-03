import type { PageModel } from "@/lib/pseo/content-factory"
import { IntroBlock } from "./IntroBlock"
import { PainSection } from "./PainSection"
import { TechnicalGuide } from "./TechnicalGuide"
import { BenefitsGrid } from "./BenefitsGrid"
import { ProcessingBatchSection } from "./ProcessingBatchSection"
import { FAQSection } from "./FAQSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { CTASection } from "./CTASection"
import { MiddleCTA } from "./MiddleCTA"

interface PseoPageTemplateProps {
  pageModel: PageModel
}

export function PseoPageTemplate({ pageModel }: PseoPageTemplateProps) {
  const { city, intent, content, meta, technical } = pageModel

  // Extract technical details for different sections
  const isIntegration = technical?.isIntegration ?? false
  const integrationDetails = technical?.integrationDetails
  const serviceDetails = technical?.serviceDetails
  const tmsErpGuide = technical?.tmsErpGuide
  const customsGuide = technical?.customsGuide
  const financeGuide = technical?.financeGuide
  const shippingGuide = technical?.shippingGuide
  const inventoryGuide = technical?.inventoryGuide
  const complianceGuide = technical?.complianceGuide
  const motiveGuide = technical?.motiveGuide
  const hsCodeGuide = technical?.hsCodeGuide
  const invoiceGuide = technical?.invoiceGuide
  const painPoints =
    serviceDetails?.pain_points ||
    integrationDetails?.pain_points ||
    undefined
  const valueLogic =
    serviceDetails?.value_logic ||
    integrationDetails?.value_logic ||
    undefined
  const derivedPainPoints = (() => {
    if (painPoints && painPoints.length > 0) return painPoints

    const extractNumberedPoints = (text?: string): string[] => {
      if (!text) return []
      return text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^\d+\.\s+/.test(line))
        .map((line) =>
          line
            .replace(/^\d+\.\s+/, "")
            .replace(/\*\*/g, "")
            .trim()
        )
        .filter(Boolean)
    }

    const extractSectionTitles = (sections?: Array<{ title: string }>) => {
      if (!sections) return []
      return sections.map((s) => s.title).filter(Boolean)
    }

    const sources = [
      tmsErpGuide?.expert_sections,
      customsGuide?.expert_sections,
      financeGuide?.expert_sections,
      shippingGuide?.expert_sections,
      inventoryGuide?.expert_sections,
    ]

    const collected: string[] = []
    for (const sections of sources) {
      if (collected.length >= 4) break
      sections?.forEach((section) => {
        if (collected.length >= 4) return
        const points = extractNumberedPoints(section.content)
        collected.push(...points)
      })
    }

    if (collected.length < 3) {
      for (const sections of sources) {
        if (collected.length >= 4) break
        const titles = extractSectionTitles(sections)
        collected.push(...titles)
      }
    }

    const unique = Array.from(new Set(collected)).slice(0, 4)
    return unique.length > 0 ? unique : undefined
  })()

  return (
    <main className="min-h-screen">
      <IntroBlock
        content={content.intro}
        cityName={city.name}
        serviceName={intent.name}
        imageUrl={meta.imageUrl}
        // Pass integration-specific data
        integrationPair={integrationDetails?.pair}
        useCase={integrationDetails?.use_case}
        technicalSpecs={integrationDetails?.technical_specs}
        // Pass service-specific data
        operationalRequirements={serviceDetails?.operational_requirements}
      />

      <PainSection
        content={content.pain}
        // Service-specific pain points (high-stakes problems)
        painPoints={derivedPainPoints}
        valueLogic={valueLogic}
      />

      <TechnicalGuide guide={tmsErpGuide} customsGuide={customsGuide} financeGuide={financeGuide} shippingGuide={shippingGuide} inventoryGuide={inventoryGuide} complianceGuide={complianceGuide} motiveGuide={motiveGuide} hsCodeGuide={hsCodeGuide} invoiceGuide={invoiceGuide} />

      <MiddleCTA />

      <BenefitsGrid
        benefits={content.benefits}
        // Integration-specific data flow
        dataFlow={integrationDetails?.data_flow}
        prerequisites={integrationDetails?.prerequisites}
        isIntegration={isIntegration}
      />

      <ProcessingBatchSection />

      <FAQSection faqs={content.faq} />

      {/* Pass intent kind to render domain-relevant testimonials */}
      <TestimonialsSection kind={intent.kind} />
    </main>
  )
}
