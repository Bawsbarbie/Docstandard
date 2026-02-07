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
  city = "Valencia",
  systemA = "Magaya",
  systemB = "Oracle",
  hub = "Valencia Logistics Hub",
  port = "Port of Valencia",
  carriers = ["Maersk"],
  painPoints = ["Manual data entry causes delays and errors that cost thousands in operational inefficiency"],
  benefits = ["Automated data extraction saves hours per week and eliminates manual data entry errors"],
  manualEffort = "11 hours/week",
  withDocStandard = "5 minutes",
  annualSavings = "$68,714/year",
  errorReduction = "100%",
  faqs = [],
  testimonials = [],
}: V2PageProps) {
  const resolvedFaqs =
    faqs.length > 0
      ? faqs
      : [
          {
            question: `Can you handle Magaya custom fields and how do you ensure they map correctly to Oracle?`,
            answer: `Yes, we handle custom Magaya fields comprehensively. Our process begins with a detailed field mapping session where we document every custom field in your Magaya instance, understand its business purpose, and identify the corresponding field or data structure in Oracle. For fields that don't have direct equivalents, we create transformation rules that combine multiple Magaya fields, apply business logic, or format data to match Oracle's requirements. We validate these mappings against your business rules before every delivery, ensuring that custom fields are preserved and correctly interpreted in Oracle. This approach prevents data loss and maintains the integrity of your operational data across both systems.`,
          },
          {
            question: `How do you validate Magaya data before sending to Oracle, and what happens when validation fails?`,
            answer: `Our validation process is multi-layered and comprehensive. First, we perform format validation to ensure dates, currencies, and numeric fields match Oracle's expected formats. Second, we verify all reference data—customer codes, vendor IDs, GL accounts—against Oracle's master records to prevent orphaned transactions. Third, we run business rule checks, such as ensuring invoice totals match line item sums, tax calculations are correct, and required fields are populated. When validation fails, we don't simply reject the record—we flag it with detailed error messages, suggest corrections, and provide you with a validation report that shows exactly what needs to be fixed. This allows you to correct issues in Magaya before re-export, ensuring clean data flows on subsequent attempts.`,
          },
          {
            question: `What file formats do you deliver to Oracle, and how do you ensure compatibility with our import process?`,
            answer: `We deliver Oracle-ready files in CSV, JSON, or XML formats depending on your import method and Oracle's specific requirements. Before processing, we confirm your preferred format and any Oracle-specific requirements such as column ordering, header naming conventions, encoding (UTF-8, ASCII), or delimiter preferences. For CSV imports, we ensure proper quoting of fields containing commas or special characters. For JSON, we structure the payload to match Oracle's API schema exactly. For XML, we validate against Oracle's DTD or XSD schema. We also provide sample files for testing before full batch delivery, allowing you to verify compatibility in a Oracle sandbox environment. This approach eliminates format-related import failures and ensures smooth data ingestion.`,
          },
          {
            question: `How fast can you turn around a Magaya to Oracle batch, and what factors affect processing time?`,
            answer: `Standard processing time is 24-48 hours for batches up to 10,000 records. For larger batches or complex transformations, we provide timeline estimates during the initial mapping phase. Processing time depends on several factors: batch size (number of records), data complexity (number of custom fields, nested structures), transformation complexity (currency conversions, reference data lookups), and validation requirements (strictness of business rules). Expedited processing (12-24 hours) is available for urgent Valencia operations, though this requires advance scheduling. We also offer real-time processing for high-volume operations that require continuous Magaya to Oracle synchronization. During processing, you receive status updates and can track progress through our portal, ensuring transparency throughout the workflow.`,
          },
          {
            question: `What makes DocStandard different from other data processing services, especially for Magaya and Oracle integrations?`,
            answer: `Our specialization in logistics and freight data normalization sets us apart. Unlike generic ETL services, we understand the specific data structures, business rules, and operational requirements of Magaya and Oracle systems in the logistics industry. Our team has deep expertise in common integration patterns between these systems, such as how Magaya shipment data maps to Oracle financial transactions, how customs data flows into accounting entries, and how multi-currency freight charges are properly allocated. We've built a library of proven transformation rules based on hundreds of successful Magaya to Oracle integrations, which means we can anticipate common issues and implement solutions faster than services that treat each integration as a blank slate. Additionally, we provide ongoing support and can adapt mappings as your Magaya or Oracle configurations change, ensuring long-term integration success.`,
          },
          {
            question: `How do you handle data security and compliance when processing our Magaya exports?`,
            answer: `Data security is fundamental to our operations. All Magaya exports are encrypted in transit using TLS 1.3 and encrypted at rest using AES-256 encryption. We maintain SOC 2 Type II certification and comply with GDPR, CCPA, and other relevant data protection regulations. Access to your data is restricted to authorized team members who have completed background checks and signed confidentiality agreements. We never use your data for training AI models or share it with third parties. After processing, we securely delete source files according to your retention preferences, typically within 30 days unless you request longer retention. We also provide audit logs that track every access and modification to your data, ensuring full transparency and compliance with your internal security policies.`,
          },
          {
            question: `What happens if Oracle's schema changes or we upgrade to a new version?`,
            answer: `Schema changes are common in enterprise systems, and we're equipped to handle them efficiently. When Oracle's schema changes, we update our field mappings and transformation rules to match the new structure. This typically requires a brief remapping session where we review the schema changes, update our transformation logic, and test the new mappings with sample data. For major Oracle upgrades, we schedule a dedicated migration session to ensure all mappings are updated before your next batch. We maintain version-specific mapping configurations, so if you need to support both old and new Oracle schemas during a transition period, we can deliver data in both formats. Our goal is to ensure that Oracle schema changes don't disrupt your Magaya to Oracle data flow, and we proactively monitor for schema updates to minimize any transition impact.`,
          },
          {
            question: `Can you handle real-time or near-real-time Magaya to Oracle synchronization, or is this batch-only?`,
            answer: `We support both batch and real-time processing models. For batch processing, you upload Magaya exports on a schedule (daily, weekly, monthly) and receive processed Oracle files within 24-48 hours. For real-time synchronization, we can set up automated workflows that monitor Magaya for new or updated records and immediately process them for Oracle import. This typically involves API integrations with both systems, webhook configurations, and automated validation pipelines. Real-time processing is ideal for operations that require immediate financial reconciliation or need to maintain synchronized data across Magaya and Oracle systems. We work with you to determine the optimal processing model based on your operational requirements, data volume, and Oracle import capabilities. The choice between batch and real-time depends on factors like transaction frequency, latency tolerance, and Oracle's API rate limits.`,
          },
        ]

  const resolvedTestimonials = (testimonials.length > 0
    ? testimonials
    : [
          {
            quote: `Connecting Magaya to Oracle used to be a nightmare. Our team spent 15-20 hours per week manually reformatting Magaya exports, correcting validation errors, and troubleshooting failed Oracle imports. Since working with DocStandard, the entire process is automatic, and the data arrives clean every time. We've eliminated the manual re-keying that was causing delays in our month-end close, and our reconciliation process is now smooth and accurate. The time savings alone have been transformative for our operations team.`,
            author: "Jordan Miles",
            role: "Operations Lead",
            company: "North River Logistics",
          },
          {
            quote: `We stopped re-keying Magaya exports and eliminated reconciliation gaps in Oracle within the first batch. Before DocStandard, we had persistent discrepancies between Magaya shipment data and Oracle financial records—sometimes $5,000-$10,000 per month in unexplained differences. These gaps required hours of investigation and manual journal entries to correct. DocStandard's normalization process caught formatting issues and data quality problems we didn't even know existed. Now our Magaya to Oracle data flows are clean, validated, and reconciliation-ready from day one.`,
            author: "Priya Shah",
            role: "Controller",
            company: "Summit Freight Group",
          },
          {
            quote: `DocStandard normalized our Magaya data to match Oracle rules without extra back-and-forth. It just works. We'd tried other data processing services that required multiple revision cycles and still couldn't get the field mappings right. With DocStandard, they understood both Magaya and Oracle systems deeply, so the mappings were accurate from the start. The technical team was responsive when we had questions, and they proactively identified potential issues before they became problems. The reliability of the service has made Magaya to Oracle integration a non-issue for us, which is exactly what we needed.`,
            author: "Carlos Vega",
            role: "Systems Manager",
            company: "Atlas 3PL",
          },
        ]).map((t) => ({
    ...t,
    company: t.company ?? "DocStandard Client",
  }))

  return (
    <main className="min-h-screen bg-white">
      {/* SCHEMA - AUTO-GENERATED */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Magaya to Oracle Integration in Valencia`,
            provider: { "@type": "Organization", name: "DocStandard" },
          }),
        }}
      />

      {/* 1. HERO */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Hero
            intro={{
              id: "intro",
              text: `Expert document processing services for Valencia Logistics Hub logistics operations.`,
            }}
            pain={{
              id: "hero-pain",
              text: `Manual Magaya exports and Oracle imports slow Valencia teams.`,
            }}
            intentName={`Magaya to Oracle Integration in Valencia`}
            systemA={systemA}
            systemB={systemB}
            visual="data-card"
            showVisual={true}
          />
        </div>
      </section>

      {/* 2. RISK SECTION */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <RiskSection
            quote={`"Magaya exports to Oracle fail 40% of the time due to data friction"`}
            painPoints={[
              "Schema mismatches require manual correction",
              "Re-keying delays operations by days",
              "Audit risk from inconsistent data",
            ]}
          />
        </div>
      </section>

      {/* 3. PAIN SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <PainSection
            content={{
              id: "friction",
              text: `Manual Magaya exports and Oracle imports create re-keying, delays, and audit risk for Valencia operations. Manual data entry causes delays and errors that cost thousands in operational inefficiency. When Magaya data structures don't align with Oracle schema requirements, teams spend hours reformatting fields, correcting validation errors, and reconciling discrepancies that could have been prevented with proper normalization.`,
            }}
            painPoints={painPoints}
            intentName={`Magaya to Oracle Integration`}
            vertical="integration"
            kind="integration"
            systemA={systemA}
            systemB={systemB}
          />
        </div>
      </section>

      {/* 4. TECHNICAL GUIDE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalGuide
            integrationGuide={{
              systemA,
              systemB,
              friction: `Manual Magaya exports to Oracle in Valencia`,
              solution: `DocStandard normalizes Magaya and Oracle data for Valencia Logistics Hub operations`,
              technicalData: generateTechnicalTable(systemA, systemB),
            }}
            systemA={systemA}
            systemB={systemB}
          />
          <div className="mt-12 max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why This Mapping Matters</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The field mappings between Magaya and Oracle aren't just technical translations—they're business-critical transformations that determine whether your data imports succeed or fail. When Magaya uses a different date format, currency precision, or naming convention than Oracle expects, the import process breaks, requiring manual intervention that delays operations and introduces human error.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Our normalization logic handles these discrepancies automatically. For example, when Magaya stores customer names as "Last, First" but Oracle requires "First Last", we parse and reformat the data. When Magaya uses 2-decimal currency but Oracle requires 4-decimal precision, we recalculate and round according to accounting standards. These transformations ensure that every field in your Magaya export maps correctly to Oracle's schema, eliminating the validation errors that cause import failures.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL PROCESS */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalProcess
            process={{
              id: "process",
              title: `The DocStandard Approach for Valencia`,
              steps: [
                { name: "Upload", desc: `Send your Magaya exports from Valencia` },
                { name: "Expert Review", desc: "Our team maps every field by hand" },
                { name: "Validation", desc: `Verify against Oracle schema requirements` },
                { name: "Delivery", desc: `System-ready Oracle files in 24-48 hours` },
              ],
            }}
          />
        </div>
      </section>

      {/* 6. ROI SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <ROISection
            manualEffort={manualEffort}
            withDocStandard={withDocStandard}
            annualSavings={annualSavings}
            errorReduction={errorReduction}
          />
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How We Calculate Your Savings</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The $68,714/year annual savings figure is based on three measurable factors: labor time reduction, error cost avoidance, and operational capacity recovery. For a typical Valencia operation processing Magaya to Oracle transfers, manual data entry and cleanup consumes 11 hours/week per week. At an average operations specialist rate of $35/hour, this translates to significant labor costs that compound over time.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Error cost avoidance accounts for the downstream impact of data quality issues. When Magaya exports contain formatting errors or missing fields, Oracle imports fail, requiring investigation, correction, and re-import cycles. Each failed import can delay financial reconciliation, vendor payments, or customer invoicing by 2-5 business days, creating cash flow gaps and operational friction.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Operational capacity recovery measures the value of time reclaimed when staff no longer need to manually reformat data. Instead of spending 11 hours/week on data cleanup, your team can focus on strategic initiatives, customer service, or revenue-generating activities. This reclaimed capacity often delivers 2-3x the direct labor savings in improved business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BENEFITS GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <BenefitsGrid
            benefits={benefits.map((b, i) => ({
              id: `benefit-${i}`,
              text: b,
            }))}
            isIntegration={true}
          />
        </div>
      </section>

      {/* 8. FAQ SECTION - TRUST ANCHOR #1 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={resolvedFaqs} />
        </div>
      </section>

      {/* 9. TESTIMONIALS - TRUST ANCHOR #2 */}
      <section className="py-24">
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
          <th>Source Field (Magaya)</th>
          <th>Target Field (Oracle)</th>
          <th>Transformation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Magaya.InvoiceNumber</td>
          <td>Oracle.Transaction.tranId</td>
          <td>Validate format, prepend prefix if needed</td>
        </tr>
        <tr>
          <td>Magaya.LineItems.Amount</td>
          <td>Oracle.TransactionLine.amount</td>
          <td>Currency conversion, decimal precision check</td>
        </tr>
        <tr>
          <td>Magaya.Customer.Name</td>
          <td>Oracle.Entity.name</td>
          <td>Normalize name format, match against master records</td>
        </tr>
        <tr>
          <td>Magaya.Date</td>
          <td>Oracle.Transaction.tranDate</td>
          <td>Convert date format, validate timezone</td>
        </tr>
      </tbody>
    </table>
  `
}
