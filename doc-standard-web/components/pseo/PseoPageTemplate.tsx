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
        painPoints={serviceDetails?.pain_points}
        valueLogic={serviceDetails?.value_logic}
      />

      <TechnicalGuide guide={tmsErpGuide} />

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

      <TestimonialsSection />

      <CTASection content={content.cta} />
    </main>
  )
}
