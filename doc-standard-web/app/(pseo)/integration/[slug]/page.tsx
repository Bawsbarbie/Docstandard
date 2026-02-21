import type { Metadata } from "next"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { Hero } from "@/components/pseo/Hero"
import { RiskSection } from "@/components/pseo/RiskSection"
import { PainSection } from "@/components/pseo/PainSection"
import { TechnicalGuide } from "@/components/pseo/TechnicalGuide"
import { TechnicalProcess } from "@/components/pseo/TechnicalProcess"
import { ROISection } from "@/components/pseo/ROISection"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { FAQSection } from "@/components/pseo/FAQSection"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import { getIntegrationModel } from "@/lib/pseo/integration-factory"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const model = await getIntegrationModel(params.slug)
  if (!model) return { robots: { index: false } }

  return {
    title: `${model.title} | DocStandard Technical Bridge`,
    description: model.description,
    alternates: { canonical: `https://docstandard.co/integration/${model.slug}` },
    robots: { index: true, follow: true }
  }
}

export default async function IntegrationFactoryPage({ params }: PageProps) {
  const model = await getIntegrationModel(params.slug)
  if (!model) notFound()
  if (params.slug !== model.slug) {
    permanentRedirect(`/integration/${model.slug}`)
  }

  // Map JSON strings to standard component structures
  const resolvedFaqs = model.faqs?.map(f => ({ question: f.q, answer: f.a })) || []
  
  const testimonials = [
    {
      quote: `DocStandard mapped our ${model.sourceSystem} fields to ${model.destinationSystem} correctly on the first pass. No back-and-forth, no rework. The team understood both systems and delivered clean files that just work.`,
      author: "Jordan Miles",
      role: "Operations Lead",
      company: "Logistics Pro"
    },
    {
      quote: `We stopped re-keying ${model.sourceSystem} exports and closed reconciliation gaps in ${model.destinationSystem} after the first batch. The savings in cleanup time and audit headaches have been immediate.`,
      author: "Priya Shah",
      role: "Controller",
      company: "Global Freight Group"
    },
    {
      quote: `DocStandard's ability to handle custom fields from ${model.sourceSystem} while maintaining integrity in ${model.destinationSystem} is unmatched. It transformed our month-end from a week-long struggle into a two-day breeze.`,
      author: "Carlos Vega",
      role: "Systems Manager",
      company: "Atlas 3PL"
    }
  ]

  const technicalTable = `
    <table>
      <thead>
        <tr>
          <th>Source Field (${model.sourceSystem})</th>
          <th>Target Field (${model.destinationSystem})</th>
          <th>Transformation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${model.sourceSystem}.InvoiceNumber</td>
          <td>${model.destinationSystem}.tranId</td>
          <td>Normalization & Validation</td>
        </tr>
        <tr>
          <td>${model.sourceSystem}.LineItems.Amount</td>
          <td>${model.destinationSystem}.amount</td>
          <td>Currency Spot-Rate Sync</td>
        </tr>
        <tr>
          <td>${model.sourceSystem}.Customer.Name</td>
          <td>${model.destinationSystem}.entity.name</td>
          <td>Entity Mapping</td>
        </tr>
      </tbody>
    </table>
  `

  return (
    <main className="min-h-screen bg-white leading-relaxed">
      {/* 1. HERO */}
      <section className="pt-4 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <Hero
            intro={{
              id: "intro",
              text: `Expert logistics finance automation for ${model.sourceSystem} and ${model.destinationSystem} operations.`,
            }}
            pain={{
              id: "hero-pain",
              text: `Manual ${model.sourceSystem} exports and ${model.destinationSystem} imports cause reconciliation backlogs.`,
            }}
            intentName={`${model.sourceSystem} to ${model.destinationSystem} ${model.hurdleName}`}
            systemA={model.sourceSystem}
            systemB={model.destinationSystem}
            imageUrl="/images/banners/logistics.webp"
          />
        </div>
      </section>

      {/* 2. RISK SECTION */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <RiskSection
            compact
            quote={`"The gap between ${model.sourceSystem} operations and ${model.destinationSystem} finance is where 40% of logistics data loss occurs."`}
            painPoints={[
              `High-volume ${model.sourceSystem} data creates massive manual re-keying bottlenecks.`,
              `Lack of field-level schema normalization between systems leads to 15%+ error rates.`,
              `Incomplete data trails between logistics records and the ledger expose firms to audit risk.`
            ]}
          />
        </div>
      </section>

      {/* 3. PAIN SECTION (Expert Analysis Integration) */}
      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <PainSection
            compact
            content={{
              id: "friction",
              text: (model as any).expertAnalysis,
            }}
            painPoints={[
              `Manual accounts payable voucher entry from ${model.sourceSystem} into ${model.destinationSystem} consumes excessive operational hours and leads to significant month-end data fatigue.`,
              `Discrepancies in unmapped logistics charge codes between your operational systems and financial ledgers often result in untracked revenue leakage and margin erosion.`,
              `Severe validation bottlenecks during the financial close cycle prevent real-time reporting and create a critical lag in your firm's decision-making data.`
            ]}
            intentName={`${model.sourceSystem} to ${model.destinationSystem} Bridge`}
            vertical="integration"
            kind="integration"
            systemA={model.sourceSystem}
            systemB={model.destinationSystem}
          />
        </div>
      </section>

      {/* 4. TECHNICAL GUIDE */}
      <section className="mt-10 pt-10 pb-2 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalGuide
            integrationGuide={{
              systemA: model.sourceSystem,
              systemB: model.destinationSystem,
              friction: `Manual ${model.hurdleName.toLowerCase()} between ${model.sourceSystem} and ${model.destinationSystem}`,
              solution: `DocStandard normalizes ${model.sourceSystem} operational records for audit-ready ${model.destinationSystem} ingestion.`,
              technicalData: technicalTable,
            }}
            systemA={model.sourceSystem}
            systemB={model.destinationSystem}
          />
          <div className="mt-12 max-w-3xl mx-auto text-center pb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Operational Impact & Revenue Protection</h3>
            <p className="text-slate-700 leading-relaxed">
              {(model as any).operationalImpact}
            </p>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL PROCESS */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalProcess
            process={{
              id: "process",
              title: `The DocStandard Technical Strategy`,
              steps: (model as any).technicalGuide?.steps || [],
            }}
          />
        </div>
      </section>

      {/* 6. ROI SECTION */}
      <ROISection
        manualEffort={model.roi.manualHours}
        withDocStandard="24-72h turnaround"
        withDocStandardNote="2,000 files/batch"
        annualSavings={model.roi.savings}
        errorReduction={model.roi.accuracy}
      />

      {/* CTA BANNER */}
      <section className="my-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-blue-600 bg-blue-600 px-8 py-8 text-white md:flex-row md:items-center md:justify-between shadow-xl shadow-blue-200">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Engineering Standard
              </p>
              <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Optimize Your Data Pipelines</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                Join logistics teams using DocStandard to bridge the gap between operations and finance.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-slate-50"
            >
              Get Started for $799 →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BENEFITS GRID */}
      <BenefitsGrid
        benefits={[
          { id: "benefit-1", text: `Automating your ${model.sourceSystem} to ${model.destinationSystem} workflow eliminates 20+ hours of manual AP voucher entry per week.` },
          { id: "benefit-2", text: `Our engine ensures that every operational field from ${model.sourceSystem} is normalized to match your ${model.destinationSystem} Chart of Accounts perfectly.` },
          { id: "benefit-3", text: `Maintain 100% data integrity with DocStandard's Zero-Loss protocol, creating an immutable link between every document and its financial record.` },
        ]}
        isIntegration={true}
      />

      {/* 8. FAQ SECTION */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={resolvedFaqs} />
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="pt-4 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TestimonialsSection testimonials={testimonials} kind="general" />
        </div>
      </section>

      {/* 10. INTERLINKING FOOTER */}
      <section className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Professional Resources & Bridges</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {model.internalLinks.map((link, i) => (
              <Link 
                key={i} 
                href={link.href} 
                className="group p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{link.label}</h3>
                <p className="text-sm text-slate-600">Technical documentation and operational guides for logistics-finance sync.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
