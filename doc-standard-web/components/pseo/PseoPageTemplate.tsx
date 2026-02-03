import type { PageModel } from "@/lib/pseo/content-factory"
import { IntroBlock } from "./IntroBlock"
import { PainSection } from "./PainSection"
import { BenefitsGrid } from "./BenefitsGrid"
import { ProcessingBatchSection } from "./ProcessingBatchSection"
import { FAQSection } from "./FAQSection"
import { TestimonialsSection } from "./TestimonialsSection"
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

      <MiddleCTA cityName={city.name} />

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

      {/* Footer credit */}
      <div className="bg-slate-50 py-12 border-t border-gray-100">
        <div className="container px-4 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Professional {intent.name.toLowerCase()} serving <span className="text-brand-600">{city.name}</span> hubs and surrounding regions.
          </p>
        </div>
      </div>
    </main>
  )
}
