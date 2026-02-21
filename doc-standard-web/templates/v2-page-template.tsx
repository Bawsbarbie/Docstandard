import Head from "next/head"
import Link from "next/link"
import { Hero } from "@/components/pseo/Hero"
import { RiskSection } from "@/components/pseo/RiskSection"
import { PainSection } from "@/components/pseo/PainSection"
import { TechnicalGuide } from "@/components/pseo/TechnicalGuide"
import { TechnicalProcess } from "@/components/pseo/TechnicalProcess"
import { ROISection } from "@/components/pseo/ROISection"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { FAQSection } from "@/components/pseo/FAQSection"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import ContextualSidebar from "@/components/navigation/ContextualSidebar"

interface V2PageProps {
  city?: string
  systemA?: string
  systemB?: string
  hub?: string
  port?: string
  carriers?: string[]
  painPoints?: string[]
  benefits?: string[]
  manualEffort?: string
  withDocStandard?: string
  annualSavings?: string
  errorReduction?: string
  faqs?: { question: string; answer: string }[]
  testimonials?: { quote: string; author: string; role: string; company?: string }[]
  mappingText?: string
  roiCalculationText?: string
  introText?: string
  layout?: "A" | "B" | "C"
}

export default function V2Page({
  city = "{{CITY}}",
  systemA = "{{SYSTEM_A}}",
  systemB = "{{SYSTEM_B}}",
  hub = "{{HUB}}",
  port = "{{PORT}}",
  carriers = ["{{CARRIER_1}}"],
  painPoints = ["{{PAIN_POINT}}"],
  benefits = ["{{BENEFIT}}"],
  manualEffort = "{{ROI_MANUAL}}",
  withDocStandard = "5 minutes",
  annualSavings = "{{ROI_SAVINGS}}",
  errorReduction = "100%",
  faqs = [],
  testimonials = [],
  mappingText = "{{MAPPING_TEXT}}",
  roiCalculationText = "{{ROI_CALCULATION_TEXT}}",
  introText = "{{INTRO_TEXT}}",
  layout = "{{LAYOUT}}",
}: V2PageProps) {
  const resolvedFaqs = faqs.length > 0 ? faqs : []
  const resolvedTestimonials = testimonials.map((t) => ({
    ...t,
    company: t.company ?? "DocStandard Client",
  }))

  const sections = {
    hero: (
      <section key="hero" className="pt-4 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <Hero
            intro={{ id: "intro", text: introText }}
            pain={{ id: "hero-pain", text: `Manual {{SYSTEM_A}} exports and {{SYSTEM_B}} imports slow {{CITY}} ({{UNLOCODE}}) teams.` }}
            intentName={`{{SYSTEM_A}} to {{SYSTEM_B}} Integration in {{CITY}}`}
            systemA={systemA}
            systemB={systemB}
            imageUrl="{{HERO_IMAGE}}"
          />
        </div>
      </section>
    ),
    risk: (
      <section key="risk" className="py-4 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <RiskSection
            compact
            quote={`"{{SYSTEM_A}} exports to {{SYSTEM_B}} at {{TERMINAL}} fail 40% of the time due to data friction"`}
            painPoints={[
              "Schema mismatches require manual correction",
              "Re-keying delays operations by days",
              "Local {{CUSTOMS}} compliance audit risk",
            ]}
          />
        </div>
      </section>
    ),
    pain: (
      <section key="pain" className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <PainSection
            compact
            content={{
              id: "friction",
              text: `{{PAIN_POINT}}. Local operations near {{TERMINAL}} ({{DISTANCE}} from city center) face specific {{CUSTOMS}} hurdles when bridging {{SYSTEM_A}} and {{SYSTEM_B}}.`,
            }}
            painPoints={painPoints}
            intentName={`{{SYSTEM_A}} to {{SYSTEM_B}} Integration`}
            vertical="integration"
            kind="integration"
            systemA={systemA}
            systemB={systemB}
          />
        </div>
      </section>
    ),
    technical: (
      <section key="technical" className="mt-10 pt-10 pb-2 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalGuide
            integrationGuide={{
              systemA,
              systemB,
              friction: `Manual {{SYSTEM_A}} exports to {{SYSTEM_B}} in {{CITY}}`,
              solution: `DocStandard normalizes {{SYSTEM_A}} and {{SYSTEM_B}} data for {{HUB}} operations`,
              technicalData: generateTechnicalTable(systemA, systemB),
            }}
            systemA={systemA}
            systemB={systemB}
          />
          <div className="mt-12 max-w-3xl mx-auto text-center pb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Technical Mapping for {{UNLOCODE}}</h3>
            <div className="text-slate-700 leading-relaxed space-y-4">
              {mappingText}
            </div>
          </div>
        </div>
      </section>
    ),
    roi: (
      <div key="roi">
        <ROISection
          manualEffort={manualEffort}
          withDocStandard="24-72h expert turnaround"
          withDocStandardNote="1,000 files/batch"
          annualSavings={annualSavings}
          errorReduction={errorReduction}
        />
        <section className="pt-6 pb-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mt-12 max-w-3xl mx-auto text-center pb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Financial ROI: {{VAT}} VAT Compliance</h3>
              <div className="text-slate-700 leading-relaxed space-y-4">
                {roiCalculationText}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  };

  const layoutMap = {
    A: [sections.hero, sections.risk, sections.pain, sections.technical, sections.roi],
    B: [sections.hero, sections.roi, sections.technical, sections.pain, sections.risk],
    C: [sections.hero, sections.pain, sections.risk, sections.roi, sections.technical],
  };

  const renderedSections = layoutMap[layout] || layoutMap.A;

  return (
    <>
      <Head>
        {{NOINDEX}}
      </Head>
      <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: `{{SYSTEM_A}} to {{SYSTEM_B}} Integration in {{CITY}}`,
              provider: { "@type": "Organization", name: "DocStandard" },
            }),
          }}
        />

        {renderedSections}

        <section className="my-6 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-start gap-6 rounded-3xl border border-blue-600 bg-blue-600 px-8 py-8 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Service-First Normalization</p>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">From Raw Files to Reconciled Records</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">Each batch is normalized by human operators, schema-checked, and delivered import-ready for finance and operations teams.</p>
              </div>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-white/90">Start Secure Intake →</Link>
            </div>
          </div>
        </section>

        <BenefitsGrid
          benefits={[
            { id: "benefit-1", text: "Automated data extraction saves hours per week and eliminates manual entry." },
            { id: "benefit-2", text: "Normalized data ready for ERP import with consistent field formatting." },
            { id: "benefit-3", text: "Audit-ready output with full traceability and validation logs." },
          ]}
          isIntegration={true}
        />

        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <FAQSection faqs={resolvedFaqs} />
            </div>
            <div className="mt-8 lg:mt-0">
              <ContextualSidebar currentCity={city} currentSlug="" />
            </div>
          </div>
        </section>

        <section className="pt-4 pb-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <TestimonialsSection testimonials={resolvedTestimonials} kind="general" />
          </div>
        </section>
      </main>
    </>
  )
}

function generateTechnicalTable(systemA: string, systemB: string) {
  return `
    <table>
      <thead>
        <tr><th>Source Field ({{SYSTEM_A}})</th><th>Target Field ({{SYSTEM_B}})</th><th>Transformation</th></tr>
      </thead>
      <tbody>
        <tr><td>{{SYSTEM_A}}.InvoiceNumber</td><td>{{SYSTEM_B}}.Transaction.tranId</td><td>Validate format, prepend prefix if needed</td></tr>
        <tr><td>{{SYSTEM_A}}.LineItems.Amount</td><td>{{SYSTEM_B}}.TransactionLine.amount</td><td>Currency conversion, decimal precision check</td></tr>
        <tr><td>{{SYSTEM_A}}.Customer.Name</td><td>{{SYSTEM_B}}.Entity.name</td><td>Normalize name format, match against master records</td></tr>
        <tr><td>{{SYSTEM_A}}.Date</td><td>{{SYSTEM_B}}.Transaction.tranDate</td><td>Convert date format, validate timezone</td></tr>
      </tbody>
    </table>
  `
}
