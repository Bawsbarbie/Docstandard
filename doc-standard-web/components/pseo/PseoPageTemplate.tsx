import type { PageModel } from "@/lib/pseo/content-factory"
import { IntroBlock } from "./IntroBlock"
import { PainSection } from "./PainSection"
import { BenefitsGrid } from "./BenefitsGrid"
import { FAQSection } from "./FAQSection"
import { CTASection } from "./CTASection"

interface PseoPageTemplateProps {
  pageModel: PageModel
}

export function PseoPageTemplate({ pageModel }: PseoPageTemplateProps) {
  const { city, intent, content, meta, technical } = pageModel

  // Extract technical details for different sections
  const isIntegration = technical?.isIntegration ?? false
  const integrationDetails = technical?.integrationDetails
  const serviceDetails = technical?.serviceDetails

  return (
    <main className="min-h-screen bg-white">
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

      <BenefitsGrid
        benefits={content.benefits}
        // Integration-specific data flow
        dataFlow={integrationDetails?.data_flow}
        prerequisites={integrationDetails?.prerequisites}
        isIntegration={isIntegration}
      />

      <FAQSection faqs={content.faq} />

      <CTASection content={content.cta} />

      {/* Footer note */}
      <div className="container py-8 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>
          Professional {intent.name.toLowerCase()} serving {city.name} and
          surrounding areas.
        </p>
      </div>
    </main>
  )
}
