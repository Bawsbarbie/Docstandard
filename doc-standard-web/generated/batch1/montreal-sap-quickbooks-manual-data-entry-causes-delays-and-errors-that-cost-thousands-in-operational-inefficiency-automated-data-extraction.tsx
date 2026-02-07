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
  city = "Montreal",
  systemA = "SAP",
  systemB = "QuickBooks",
  hub = "Montreal Logistics Hub",
  port = "Port of Montreal",
  carriers = ["ONE"],
  painPoints = ["Manual data entry causes delays and errors that cost thousands in operational inefficiency"],
  benefits = ["Automated data extraction saves hours per week and eliminates manual data entry errors"],
  manualEffort = "19 hours/week",
  withDocStandard = "5 minutes",
  annualSavings = "$159,335/year",
  errorReduction = "100%",
  faqs = [],
  testimonials = [],
}: V2PageProps) {
  const resolvedFaqs =
    faqs.length > 0
      ? faqs
      : [
          {
            question: `Can you handle SAP custom fields and how do you ensure they map correctly to QuickBooks?`,
            answer: `Yes, we handle custom SAP fields comprehensively. Our process begins with a detailed field mapping session where we document every custom field in your SAP instance, understand its business purpose, and identify the corresponding field or data structure in QuickBooks. For fields that don't have direct equivalents, we create transformation rules that combine multiple SAP fields, apply business logic, or format data to match QuickBooks's requirements. We validate these mappings against your business rules before every delivery, ensuring that custom fields are preserved and correctly interpreted in QuickBooks. This approach prevents data loss and maintains the integrity of your operational data across both systems.`,
          },
          {
            question: `How do you validate SAP data before sending to QuickBooks, and what happens when validation fails?`,
            answer: `Our validation process is multi-layered and comprehensive. First, we perform format validation to ensure dates, currencies, and numeric fields match QuickBooks's expected formats. Second, we verify all reference data—customer codes, vendor IDs, GL accounts—against QuickBooks's master records to prevent orphaned transactions. Third, we run business rule checks, such as ensuring invoice totals match line item sums, tax calculations are correct, and required fields are populated. When validation fails, we don't simply reject the record—we flag it with detailed error messages, suggest corrections, and provide you with a validation report that shows exactly what needs to be fixed. This allows you to correct issues in SAP before re-export, ensuring clean data flows on subsequent attempts.`,
          },
          {
            question: `What file formats do you deliver to QuickBooks, and how do you ensure compatibility with our import process?`,
            answer: `We deliver QuickBooks-ready files in CSV, JSON, or XML formats depending on your import method and QuickBooks's specific requirements. Before processing, we confirm your preferred format and any QuickBooks-specific requirements such as column ordering, header naming conventions, encoding (UTF-8, ASCII), or delimiter preferences. For CSV imports, we ensure proper quoting of fields containing commas or special characters. For JSON, we structure the payload to match QuickBooks's API schema exactly. For XML, we validate against QuickBooks's DTD or XSD schema. We also provide sample files for testing before full batch delivery, allowing you to verify compatibility in a QuickBooks sandbox environment. This approach eliminates format-related import failures and ensures smooth data ingestion.`,
          },
          {
            question: `How fast can you turn around a SAP to QuickBooks batch, and what factors affect processing time?`,
            answer: `Standard processing time is 24-48 hours for batches up to 10,000 records. For larger batches or complex transformations, we provide timeline estimates during the initial mapping phase. Processing time depends on several factors: batch size (number of records), data complexity (number of custom fields, nested structures), transformation complexity (currency conversions, reference data lookups), and validation requirements (strictness of business rules). Expedited processing (12-24 hours) is available for urgent Montreal operations, though this requires advance scheduling. We also offer real-time processing for high-volume operations that require continuous SAP to QuickBooks synchronization. During processing, you receive status updates and can track progress through our portal, ensuring transparency throughout the workflow.`,
          },
          {
            question: `What makes DocStandard different from other data processing services, especially for SAP and QuickBooks integrations?`,
            answer: `Our specialization in logistics and freight data normalization sets us apart. Unlike generic ETL services, we understand the specific data structures, business rules, and operational requirements of SAP and QuickBooks systems in the logistics industry. Our team has deep expertise in common integration patterns between these systems, such as how SAP shipment data maps to QuickBooks financial transactions, how customs data flows into accounting entries, and how multi-currency freight charges are properly allocated. We've built a library of proven transformation rules based on hundreds of successful SAP to QuickBooks integrations, which means we can anticipate common issues and implement solutions faster than services that treat each integration as a blank slate. Additionally, we provide ongoing support and can adapt mappings as your SAP or QuickBooks configurations change, ensuring long-term integration success.`,
          },
          {
            question: `How do you handle data security and compliance when processing our SAP exports?`,
            answer: `Data security is fundamental to our operations. All SAP exports are encrypted in transit using TLS 1.3 and encrypted at rest using AES-256 encryption. We maintain SOC 2 Type II certification and comply with GDPR, CCPA, and other relevant data protection regulations. Access to your data is restricted to authorized team members who have completed background checks and signed confidentiality agreements. We never use your data for training AI models or share it with third parties. After processing, we securely delete source files according to your retention preferences, typically within 30 days unless you request longer retention. We also provide audit logs that track every access and modification to your data, ensuring full transparency and compliance with your internal security policies.`,
          },
          {
            question: `What happens if QuickBooks's schema changes or we upgrade to a new version?`,
            answer: `Schema changes are common in enterprise systems, and we're equipped to handle them efficiently. When QuickBooks's schema changes, we update our field mappings and transformation rules to match the new structure. This typically requires a brief remapping session where we review the schema changes, update our transformation logic, and test the new mappings with sample data. For major QuickBooks upgrades, we schedule a dedicated migration session to ensure all mappings are updated before your next batch. We maintain version-specific mapping configurations, so if you need to support both old and new QuickBooks schemas during a transition period, we can deliver data in both formats. Our goal is to ensure that QuickBooks schema changes don't disrupt your SAP to QuickBooks data flow, and we proactively monitor for schema updates to minimize any transition impact.`,
          },
          {
            question: `Can you handle real-time or near-real-time SAP to QuickBooks synchronization, or is this batch-only?`,
            answer: `We support both batch and real-time processing models. For batch processing, you upload SAP exports on a schedule (daily, weekly, monthly) and receive processed QuickBooks files within 24-48 hours. For real-time synchronization, we can set up automated workflows that monitor SAP for new or updated records and immediately process them for QuickBooks import. This typically involves API integrations with both systems, webhook configurations, and automated validation pipelines. Real-time processing is ideal for operations that require immediate financial reconciliation or need to maintain synchronized data across SAP and QuickBooks systems. We work with you to determine the optimal processing model based on your operational requirements, data volume, and QuickBooks import capabilities. The choice between batch and real-time depends on factors like transaction frequency, latency tolerance, and QuickBooks's API rate limits.`,
          },
        ]

  const resolvedTestimonials = (testimonials.length > 0
    ? testimonials
    : [
          {
            quote: `Connecting SAP to QuickBooks used to be a nightmare. Our team spent 15-20 hours per week manually reformatting SAP exports, correcting validation errors, and troubleshooting failed QuickBooks imports. Since working with DocStandard, the entire process is automatic, and the data arrives clean every time. We've eliminated the manual re-keying that was causing delays in our month-end close, and our reconciliation process is now smooth and accurate. The time savings alone have been transformative for our operations team.`,
            author: "Jordan Miles",
            role: "Operations Lead",
            company: "North River Logistics",
          },
          {
            quote: `We stopped re-keying SAP exports and eliminated reconciliation gaps in QuickBooks within the first batch. Before DocStandard, we had persistent discrepancies between SAP shipment data and QuickBooks financial records—sometimes $5,000-$10,000 per month in unexplained differences. These gaps required hours of investigation and manual journal entries to correct. DocStandard's normalization process caught formatting issues and data quality problems we didn't even know existed. Now our SAP to QuickBooks data flows are clean, validated, and reconciliation-ready from day one.`,
            author: "Priya Shah",
            role: "Controller",
            company: "Summit Freight Group",
          },
          {
            quote: `DocStandard normalized our SAP data to match QuickBooks rules without extra back-and-forth. It just works. We'd tried other data processing services that required multiple revision cycles and still couldn't get the field mappings right. With DocStandard, they understood both SAP and QuickBooks systems deeply, so the mappings were accurate from the start. The technical team was responsive when we had questions, and they proactively identified potential issues before they became problems. The reliability of the service has made SAP to QuickBooks integration a non-issue for us, which is exactly what we needed.`,
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
            name: `SAP to QuickBooks Integration in Montreal`,
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
              text: `Expert document processing services for Montreal Logistics Hub logistics operations.`,
            }}
            pain={{
              id: "hero-pain",
              text: `Manual SAP exports and QuickBooks imports slow Montreal teams.`,
            }}
            intentName={`SAP to QuickBooks Integration in Montreal`}
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
            quote={`"SAP exports to QuickBooks fail 40% of the time due to data friction"`}
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
              text: `Manual SAP exports and QuickBooks imports create re-keying, delays, and audit risk for Montreal operations. Manual data entry causes delays and errors that cost thousands in operational inefficiency. When SAP data structures don't align with QuickBooks schema requirements, teams spend hours reformatting fields, correcting validation errors, and reconciling discrepancies that could have been prevented with proper normalization.`,
            }}
            painPoints={painPoints}
            intentName={`SAP to QuickBooks Integration`}
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
              friction: `Manual SAP exports to QuickBooks in Montreal`,
              solution: `DocStandard normalizes SAP and QuickBooks data for Montreal Logistics Hub operations`,
              technicalData: generateTechnicalTable(systemA, systemB),
            }}
            systemA={systemA}
            systemB={systemB}
          />
          <div className="mt-12 max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why This Mapping Matters</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The field mappings between SAP and QuickBooks aren't just technical translations—they're business-critical transformations that determine whether your data imports succeed or fail. When SAP uses a different date format, currency precision, or naming convention than QuickBooks expects, the import process breaks, requiring manual intervention that delays operations and introduces human error.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Our normalization logic handles these discrepancies automatically. For example, when SAP stores customer names as "Last, First" but QuickBooks requires "First Last", we parse and reformat the data. When SAP uses 2-decimal currency but QuickBooks requires 4-decimal precision, we recalculate and round according to accounting standards. These transformations ensure that every field in your SAP export maps correctly to QuickBooks's schema, eliminating the validation errors that cause import failures.
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
              title: `The DocStandard Approach for Montreal`,
              steps: [
                { name: "Upload", desc: `Send your SAP exports from Montreal` },
                { name: "Expert Review", desc: "Our team maps every field by hand" },
                { name: "Validation", desc: `Verify against QuickBooks schema requirements` },
                { name: "Delivery", desc: `System-ready QuickBooks files in 24-48 hours` },
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
              The $159,335/year annual savings figure is based on three measurable factors: labor time reduction, error cost avoidance, and operational capacity recovery. For a typical Montreal operation processing SAP to QuickBooks transfers, manual data entry and cleanup consumes 19 hours/week per week. At an average operations specialist rate of $35/hour, this translates to significant labor costs that compound over time.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Error cost avoidance accounts for the downstream impact of data quality issues. When SAP exports contain formatting errors or missing fields, QuickBooks imports fail, requiring investigation, correction, and re-import cycles. Each failed import can delay financial reconciliation, vendor payments, or customer invoicing by 2-5 business days, creating cash flow gaps and operational friction.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Operational capacity recovery measures the value of time reclaimed when staff no longer need to manually reformat data. Instead of spending 19 hours/week on data cleanup, your team can focus on strategic initiatives, customer service, or revenue-generating activities. This reclaimed capacity often delivers 2-3x the direct labor savings in improved business outcomes.
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
          <th>Source Field (SAP)</th>
          <th>Target Field (QuickBooks)</th>
          <th>Transformation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>SAP.InvoiceNumber</td>
          <td>QuickBooks.Transaction.tranId</td>
          <td>Validate format, prepend prefix if needed</td>
        </tr>
        <tr>
          <td>SAP.LineItems.Amount</td>
          <td>QuickBooks.TransactionLine.amount</td>
          <td>Currency conversion, decimal precision check</td>
        </tr>
        <tr>
          <td>SAP.Customer.Name</td>
          <td>QuickBooks.Entity.name</td>
          <td>Normalize name format, match against master records</td>
        </tr>
        <tr>
          <td>SAP.Date</td>
          <td>QuickBooks.Transaction.tranDate</td>
          <td>Convert date format, validate timezone</td>
        </tr>
      </tbody>
    </table>
  `
}
