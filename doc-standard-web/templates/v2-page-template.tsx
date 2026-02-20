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
}: V2PageProps) {
  const resolvedFaqs = (faqs.length > 0
    ? faqs
    : [
          {
            question: `Can you handle {{SYSTEM_A}} custom fields and how do you ensure they map correctly to {{SYSTEM_B}}?`,
            answer: `Yes, we handle custom {{SYSTEM_A}} fields comprehensively. Our process begins with a detailed field mapping session where we document every custom field in your {{SYSTEM_A}} instance, understand its business purpose, and identify the corresponding field or data structure in {{SYSTEM_B}}. For fields that don't have direct equivalents, we create transformation rules that combine multiple {{SYSTEM_A}} fields, apply business logic, or format data to match {{SYSTEM_B}}'s requirements. We validate these mappings against your business rules before every delivery, ensuring that custom fields are preserved and correctly interpreted in {{SYSTEM_B}}. This approach prevents data loss and maintains the integrity of your operational data across both systems.`,
          },
          {
            question: `How do you validate {{SYSTEM_A}} data before sending to {{SYSTEM_B}}, and what happens when validation fails?`,
            answer: `Our validation process is multi-layered and comprehensive. First, we perform format validation to ensure dates, currencies, and numeric fields match {{SYSTEM_B}}'s expected formats. Second, we verify all reference data—customer codes, vendor IDs, GL accounts—against {{SYSTEM_B}}'s master records to prevent orphaned transactions. Third, we run business rule checks, such as ensuring invoice totals match line item sums, tax calculations are correct, and required fields are populated. When validation fails, we don't simply reject the record—we flag it with detailed error messages, suggest corrections, and provide you with a validation report that shows exactly what needs to be fixed. This allows you to correct issues in {{SYSTEM_A}} before re-export, ensuring clean data flows on subsequent attempts.`,
          },
          {
            question: `What file formats do you deliver to {{SYSTEM_B}}, and how do you ensure compatibility with our import process?`,
            answer: `We deliver {{SYSTEM_B}}-ready files in CSV, JSON, or XML formats depending on your import method and {{SYSTEM_B}}'s specific requirements. Before processing, we confirm your preferred format and any {{SYSTEM_B}}-specific requirements such as column ordering, header naming conventions, encoding (UTF-8, ASCII), or delimiter preferences. For CSV imports, we ensure proper quoting of fields containing commas or special characters. For JSON, we structure the payload to match {{SYSTEM_B}}'s API schema exactly. For XML, we validate against {{SYSTEM_B}}'s DTD or XSD schema. We also provide sample files for testing before full batch delivery, allowing you to verify compatibility in a {{SYSTEM_B}} sandbox environment. This approach eliminates format-related import failures and ensures smooth data ingestion.`,
          },
          {
            question: `How fast can you turn around a {{SYSTEM_A}} to {{SYSTEM_B}} batch, and what factors affect processing time?`,
            answer: `Standard processing time is 24-48 hours for batches up to 10,000 records. For larger batches or complex transformations, we provide timeline estimates during the initial mapping phase. Processing time depends on several factors: batch size (number of records), data complexity (number of custom fields, nested structures), transformation complexity (currency conversions, reference data lookups), and validation requirements (strictness of business rules). Expedited processing (12-24 hours) is available for urgent {{CITY}} operations, though this requires advance scheduling. We also offer real-time processing for high-volume operations that require continuous {{SYSTEM_A}} to {{SYSTEM_B}} synchronization. During processing, you receive status updates and can track progress through our portal, ensuring transparency throughout the workflow.`,
          },
          {
            question: `What makes DocStandard different from other data processing services, especially for {{SYSTEM_A}} and {{SYSTEM_B}} integrations?`,
            answer: `Our specialization in logistics and freight data normalization sets us apart. Unlike generic ETL services, we understand the specific data structures, business rules, and operational requirements of {{SYSTEM_A}} and {{SYSTEM_B}} systems in the logistics industry. Our team has deep expertise in common integration patterns between these systems, such as how {{SYSTEM_A}} shipment data maps to {{SYSTEM_B}} financial transactions, how customs data flows into accounting entries, and how multi-currency freight charges are properly allocated. We've built a library of proven transformation rules based on hundreds of successful {{SYSTEM_A}} to {{SYSTEM_B}} integrations, which means we can anticipate common issues and implement solutions faster than services that treat each integration as a blank slate. Additionally, we provide ongoing support and can adapt mappings as your {{SYSTEM_A}} or {{SYSTEM_B}} configurations change, ensuring long-term integration success.`,
          },
          {
            question: `How do you handle data security and compliance when processing our {{SYSTEM_A}} exports?`,
            answer: `Data security is fundamental to our operations. All {{SYSTEM_A}} exports are encrypted in transit using TLS 1.3 and encrypted at rest using AES-256 encryption. We maintain SOC 2 Type II certification and comply with GDPR, CCPA, and other relevant data protection regulations. Access to your data is restricted to authorized team members who have completed background checks and signed confidentiality agreements. We never use your data for training AI models or share it with third parties. After processing, we securely delete source files according to your retention preferences, typically within 30 days unless you request longer retention. We also provide audit logs that track every access and modification to your data, ensuring full transparency and compliance with your internal security policies.`,
          },
          {
            question: `What happens if {{SYSTEM_B}}'s schema changes or we upgrade to a new version?`,
            answer: `Schema changes are common in enterprise systems, and we're equipped to handle them efficiently. When {{SYSTEM_B}}'s schema changes, we update our field mappings and transformation rules to match the new structure. This typically requires a brief remapping session where we review the schema changes, update our transformation logic, and test the new mappings with sample data. For major {{SYSTEM_B}} upgrades, we schedule a dedicated migration session to ensure all mappings are updated before your next batch. We maintain version-specific mapping configurations, so if you need to support both old and new {{SYSTEM_B}} schemas during a transition period, we can deliver data in both formats. Our goal is to ensure that {{SYSTEM_B}} schema changes don't disrupt your {{SYSTEM_A}} to {{SYSTEM_B}} data flow, and we proactively monitor for schema updates to minimize any transition impact.`,
          },
          {
            question: `Can you handle real-time or near-real-time {{SYSTEM_A}} to {{SYSTEM_B}} synchronization, or is this batch-only?`,
            answer: `We support both batch and real-time processing models. For batch processing, you upload {{SYSTEM_A}} exports on a schedule (daily, weekly, monthly) and receive processed {{SYSTEM_B}} files within 24-48 hours. For real-time synchronization, we can set up automated workflows that monitor {{SYSTEM_A}} for new or updated records and immediately process them for {{SYSTEM_B}} import. This typically involves API integrations with both systems, webhook configurations, and automated validation pipelines. Real-time processing is ideal for operations that require immediate financial reconciliation or need to maintain synchronized data across {{SYSTEM_A}} and {{SYSTEM_B}} systems. We work with you to determine the optimal processing model based on your operational requirements, data volume, and {{SYSTEM_B}} import capabilities. The choice between batch and real-time depends on factors like transaction frequency, latency tolerance, and {{SYSTEM_B}}'s API rate limits.`,
          },
        ]

  const resolvedTestimonials = (testimonials.length > 0
    ? testimonials
    : [
          {
            quote: `Connecting {{SYSTEM_A}} to {{SYSTEM_B}} used to be a nightmare. DocStandard eliminated manual re-keying and the data arrives clean every time. Our month-end close is smooth and accurate, and the ops team finally has time back. The turnaround has been consistently reliable.`,
            author: "Jordan Miles",
            role: "Operations Lead",
            company: "North River Logistics",
          },
          {
            quote: `We stopped re-keying {{SYSTEM_A}} exports and closed reconciliation gaps in {{SYSTEM_B}} after the first batch. DocStandard caught formatting issues we missed, so imports now pass validation. The savings in cleanup time and audit headaches have been immediate and measurable.`,
            author: "Priya Shah",
            role: "Controller",
            company: "Summit Freight Group",
          },
          {
            quote: `DocStandard mapped our {{SYSTEM_A}} fields to {{SYSTEM_B}} correctly on the first pass. No back-and-forth, no rework. The team understood both systems, flagged risks early, and delivered clean files that just work. Integration is now predictable and low-maintenance.`,
            author: "Carlos Vega",
            role: "Systems Manager",
            company: "Atlas 3PL",
          },
        ]).map((t) => ({
    ...t,
    company: t.company ?? "DocStandard Client",
  }))

  return (
    <>
      <Head>
        {{NOINDEX}}
      </Head>
      <main className="min-h-screen bg-white">
      {/* SCHEMA - AUTO-GENERATED */}
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

      {/* 1. HERO */}
      <section className="pt-4 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <Hero
            intro={{
              id: "intro",
              text: `Expert document processing services for {{HUB}} logistics operations.`,
            }}
            pain={{
              id: "hero-pain",
              text: `Manual {{SYSTEM_A}} exports and {{SYSTEM_B}} imports slow {{CITY}} teams.`,
            }}
            intentName={`{{SYSTEM_A}} to {{SYSTEM_B}} Integration in {{CITY}}`}
            systemA={systemA}
            systemB={systemB}
            imageUrl="/images/banners/logistics.webp"
          />
        </div>
      </section>

      {/* 2. RISK SECTION */}
      <section className="py-4 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <RiskSection
            compact
            quote={`"{{SYSTEM_A}} exports to {{SYSTEM_B}} fail 40% of the time due to data friction"`}
            painPoints={[
              "Schema mismatches require manual correction",
              "Re-keying delays operations by days",
              "Audit risk from inconsistent data",
            ]}
          />
        </div>
      </section>

      {/* 3. PAIN SECTION */}
      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <PainSection
            compact
            content={{
              id: "friction",
              text: `Manual {{SYSTEM_A}} exports and {{SYSTEM_B}} imports create re-keying, delays, and audit risk for {{CITY}} operations. {{PAIN_POINT}}. When {{SYSTEM_A}} data structures don't align with {{SYSTEM_B}} schema requirements, teams spend hours reformatting fields, correcting validation errors, and reconciling discrepancies that could have been prevented with proper normalization.`,
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

      {/* 4. TECHNICAL GUIDE */}
      <section className="mt-10 pt-10 pb-2 bg-slate-50">
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
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why This Mapping Matters</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              {`The field mappings between {{SYSTEM_A}} and {{SYSTEM_B}} aren't just technical translations—they're business-critical transformations that determine whether your data imports succeed or fail. When {{SYSTEM_A}} uses a different date format, currency precision, or naming convention than {{SYSTEM_B}} expects, the import process breaks, requiring manual intervention that delays operations and introduces human error.`}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {`Our normalization logic handles these discrepancies automatically. For example, when {{SYSTEM_A}} stores customer names as "Last, First" but {{SYSTEM_B}} requires "First Last", we parse and reformat the data. When {{SYSTEM_A}} uses 2-decimal currency but {{SYSTEM_B}} requires 4-decimal precision, we recalculate and round according to accounting standards. These transformations ensure that every field in your {{SYSTEM_A}} export maps correctly to {{SYSTEM_B}}'s schema, eliminating the validation errors that cause import failures.`}
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
              title: `The DocStandard Approach for {{CITY}}`,
              steps: [
                { name: "Upload", desc: `Send your {{SYSTEM_A}} exports from {{CITY}}` },
                { name: "Expert Review", desc: "Our team maps every field with accuracy" },
                { name: "Validation", desc: `Verify against {{SYSTEM_B}} schema requirements` },
                { name: "Delivery", desc: `System-ready {{SYSTEM_B}} files in 24-48 hours` },
              ],
            }}
          />
        </div>
      </section>

      {/* 6. ROI SECTION */}
      <ROISection
        manualEffort={manualEffort}
        withDocStandard="24h turnaround"
        withDocStandardNote="1,000 files/batch"
        annualSavings={annualSavings}
        errorReduction={errorReduction}
      />
      <section className="pt-6 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-12 max-w-3xl mx-auto text-center pb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How We Calculate Your Savings</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              {`The {{ROI_SAVINGS}} annual savings figure is based on three measurable factors: labor time reduction, error cost avoidance, and operational capacity recovery. For a typical {{CITY}} operation processing {{SYSTEM_A}} to {{SYSTEM_B}} transfers, manual data entry and cleanup consumes {{ROI_MANUAL}} per week. At an average operations specialist rate of $35/hour, this translates to significant labor costs that compound over time.`}
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              {`Error cost avoidance accounts for the downstream impact of data quality issues. When {{SYSTEM_A}} exports contain formatting errors or missing fields, {{SYSTEM_B}} imports fail, requiring investigation, correction, and re-import cycles. Each failed import can delay financial reconciliation, vendor payments, or customer invoicing by 2-5 business days, creating cash flow gaps and operational friction.`}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {`Operational capacity recovery measures the value of time reclaimed when staff no longer need to manually reformat data. Instead of spending {{ROI_MANUAL}} on data cleanup, your team can focus on strategic initiatives, customer service, or revenue-generating activities. This reclaimed capacity often delivers 2-3x the direct labor savings in improved business outcomes.`}
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="my-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-blue-600 bg-blue-600 px-8 py-8 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Operational Efficiency
              </p>
              <h3 className="mt-3 text-2xl font-semibold md:text-3xl">Optimize Your Document Workflows</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                Join dozens of logistics and finance teams who have eliminated manual data entry backlogs.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-white/90"
            >
              Get Started for $799 →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BENEFITS GRID */}
      <BenefitsGrid
        benefits={[
          { id: "benefit-1", text: "Automated data extraction saves hours per week and eliminates manual entry." },
          { id: "benefit-2", text: "Normalized data ready for ERP import with consistent field formatting." },
          { id: "benefit-3", text: "Audit-ready output with full traceability and validation logs." },
        ]}
        isIntegration={true}
      />

      {/* 8. FAQ SECTION - TRUST ANCHOR #1 */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={resolvedFaqs} />
        </div>
      </section>

      {/* 9. TESTIMONIALS - TRUST ANCHOR #2 */}
      <section className="pt-4 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TestimonialsSection testimonials={resolvedTestimonials} kind="general" />
        </div>
      </section>
    </main>
  )
}

function generateTechnicalTable(systemA: string, systemB: string) {
  return `
    <table>
      <thead>
        <tr>
          <th>Source Field ({{SYSTEM_A}})</th>
          <th>Target Field ({{SYSTEM_B}})</th>
          <th>Transformation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{SYSTEM_A}}.InvoiceNumber</td>
          <td>{{SYSTEM_B}}.Transaction.tranId</td>
          <td>Validate format, prepend prefix if needed</td>
        </tr>
        <tr>
          <td>{{SYSTEM_A}}.LineItems.Amount</td>
          <td>{{SYSTEM_B}}.TransactionLine.amount</td>
          <td>Currency conversion, decimal precision check</td>
        </tr>
        <tr>
          <td>{{SYSTEM_A}}.Customer.Name</td>
          <td>{{SYSTEM_B}}.Entity.name</td>
          <td>Normalize name format, match against master records</td>
        </tr>
        <tr>
          <td>{{SYSTEM_A}}.Date</td>
          <td>{{SYSTEM_B}}.Transaction.tranDate</td>
          <td>Convert date format, validate timezone</td>
        </tr>
      </tbody>
    </table>
  `
}
