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
  const { city, intent, content } = pageModel

  return (
    <main className="min-h-screen">
      <IntroBlock
        content={content.intro}
        cityName={city.name}
        serviceName={intent.name}
      />

      <PainSection content={content.pain} />

      <BenefitsGrid benefits={content.benefits} />

      <FAQSection faqs={content.faq} />

      <CTASection content={content.cta} />

      {/* Footer note */}
      <div className="container py-8 text-center text-sm text-muted-foreground border-t">
        <p>
          Professional {intent.name.toLowerCase()} serving {city.name} and
          surrounding areas.
        </p>
      </div>
    </main>
  )
}
