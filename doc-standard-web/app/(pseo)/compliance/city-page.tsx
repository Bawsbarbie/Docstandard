import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { ArrowRight, CheckCircle, FileJson, RefreshCw, BarChart, AlertTriangle, Clock, DollarSign, Shield } from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  if (!cityData) return { title: "Not Found", robots: { index: false } }

  const { name: cityName, country } = cityData
  const title = `Compliance Document Processing in ${cityName} | DocStandard`
  const description = `Streamline import/export compliance documentation in ${cityName}, ${country}. Automate license verification, regulatory filings, and audit-ready record keeping.`
  const canonical = `https://docstandard.co/compliance/city/${params.city}`

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, type: "website", siteName: "DocStandard" },
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function ComplianceCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) {
    notFound()
  }

  const { name: cityName, country, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-4">
            {cityName} Operations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Clean Data for Compliance Operations in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Import and export operations in {cityName} demand precise compliance documentation. 
            From license verification to regulatory filings, DocStandard automates the extraction 
            and normalization of compliance records for {country}-based trade operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/integration"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Compliance Integrations
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/comparison"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* Risk Section - Dark theme */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The Invisible Drain on {cityName} Trade Operations
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Compliance documentation errors create cascading delays that impact customs clearance, 
              regulatory audits, and supply chain velocity.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">40%</div>
                <p className="text-slate-400">Of compliance delays stem from documentation errors</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">$2,500</div>
                <p className="text-slate-400">Average cost per customs documentation penalty</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">72hrs</div>
                <p className="text-slate-400">Average delay from incomplete compliance packets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section - 3 column icons */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why {cityName} Compliance Teams Struggle
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileJson className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inconsistent Formats</h3>
              <p className="text-slate-600">
                Every regulatory body and trade partner uses different license formats, certificate layouts, 
                and declaration structures. Manual extraction rules break constantly.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Version Control Chaos</h3>
              <p className="text-slate-600">
                Regulatory forms update frequently. Teams waste hours re-keying data from outdated 
                templates while operations wait for clearance.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Audit Trail Gaps</h3>
              <p className="text-slate-600">
                When regulators request documentation history, scattered files and manual processes 
                create compliance vulnerabilities and potential penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Guide - Master Mapping Blueprint */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            The Master Mapping Blueprint
          </h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
            Every compliance document type has a standard extraction profile. Below are the core fields 
            captured from Import Licenses and Certificates of Origin for {cityName} operations.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-[#0f172a] text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Field</th>
                    <th className="px-6 py-4 font-semibold">JSON Key</th>
                    <th className="px-6 py-4 font-semibold">Example Value</th>
                    <th className="px-6 py-4 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">License Number</td>
                    <td className="px-6 py-4 font-mono text-sm">license_number</td>
                    <td className="px-6 py-4">IMP-2026-001234</td>
                    <td className="px-6 py-4 text-sm">Unique identifier per license</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Issue Date</td>
                    <td className="px-6 py-4 font-mono text-sm">issue_date</td>
                    <td className="px-6 py-4">2026-01-15</td>
                    <td className="px-6 py-4 text-sm">ISO 8601 format</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Expiry Date</td>
                    <td className="px-6 py-4 font-mono text-sm">expiry_date</td>
                    <td className="px-6 py-4">2026-12-31</td>
                    <td className="px-6 py-4 text-sm">Critical for validation</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Importer Name</td>
                    <td className="px-6 py-4 font-mono text-sm">importer.name</td>
                    <td className="px-6 py-4">ABC Trading GmbH</td>
                    <td className="px-6 py-4 text-sm">Parsed from license header</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">HS Code Range</td>
                    <td className="px-6 py-4 font-mono text-sm">hs_codes[]</td>
                    <td className="px-6 py-4">8471.30, 8471.41</td>
                    <td className="px-6 py-4 text-sm">Array of covered codes</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Quantity Authorized</td>
                    <td className="px-6 py-4 font-mono text-sm">quantity</td>
                    <td className="px-6 py-4">10,000 units</td>
                    <td className="px-6 py-4 text-sm">With unit of measure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Process - Engine Visual */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            The DocStandard Approach
          </h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-16">
            Our compliance document processing follows a proven pipeline designed for regulatory 
            environments where accuracy and audit trails matter.
          </p>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              {[
                { num: "01", title: "Multi-Channel Ingestion", desc: "Upload via web portal, email dropbox, or API. We accept PDFs, scanned images, and mobile captures." },
                { num: "02", title: "AI Classification", desc: "Document type recognition distinguishes import licenses from certificates of origin with 97.3% accuracy." },
                { num: "03", title: "Field Extraction", desc: "50+ standard fields extracted including license numbers, HS codes, quantities, and validity periods." },
                { num: "04", title: "Regulatory Validation", desc: "Automated checks against {country} customs requirements and expiry date verification." },
                { num: "05", title: "Audit-Ready Delivery", desc: "Structured data delivered to your compliance system with full extraction confidence scoring." },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Processing Engine</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Document Ingestion Active</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Classification Model v2.4</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Field Extraction 99.5%</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span className="text-sm">{cityName} Regulatory Rules Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Operational Impact for {cityName}
          </h2>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Manual Effort</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">12-16 hrs</div>
              <p className="text-slate-600 text-sm">Per 100 compliance documents</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">With DocStandard</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">2-3 hrs</div>
              <p className="text-slate-600 text-sm">Same volume, automated</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Annual Savings</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$45K+</div>
              <p className="text-slate-600 text-sm">For mid-volume operations</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Error Reduction</h3>
              <div className="text-3xl font-bold text-amber-600 mb-2">85%</div>
              <p className="text-slate-600 text-sm">Fewer compliance violations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - 3+ cards */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why {cityName} Teams Choose DocStandard
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Time Savings
              </h3>
              <p className="text-slate-600">
                Reduce compliance document processing from hours to minutes. Your team 
                focuses on regulatory strategy, not data entry.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Data Quality
              </h3>
              <p className="text-slate-600">
                99.5% field-level accuracy with confidence scoring. Low-confidence 
                extractions are flagged for human review before delivery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Audit Readiness
              </h3>
              <p className="text-slate-600">
                Complete extraction logs and transformation traceability for every 
                document. Ready for regulatory audits without scrambling.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                {country} Compliance
              </h3>
              <p className="text-slate-600">
                Pre-configured validation rules for {country} customs and regulatory 
                requirements. Stay compliant without constant manual checks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Integration Ready
              </h3>
              <p className="text-slate-600">
                Direct API, webhook, or file delivery to your compliance management 
                system. No custom development required.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Scale Without Headcount
              </h3>
              <p className="text-slate-600">
                Handle seasonal volume spikes and business growth without adding 
                compliance staff. Automated processing scales with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Trust Anchor #1 */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Common Questions About {cityName} Compliance Processing
          </h2>

          <div className="space-y-6">
            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">Can you handle {country} customs license formats?</h3>
              <p className="text-slate-600">
                Yes. Our extraction models are trained on {country} import/export license formats, 
                including regional variations. We capture license numbers, HS codes, quantities, 
                and validity periods with 99.5% accuracy.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">How do you validate compliance data before delivery?</h3>
              <p className="text-slate-600">
                Every extraction runs through {country}-specific validation rules. We check license 
                expiry dates against current dates, validate HS code formats, verify quantity units, 
                and flag any inconsistencies for human review.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">What formats do you deliver compliance data in?</h3>
              <p className="text-slate-600">
                We deliver structured JSON with nested hierarchy, flat CSV for spreadsheet imports, 
                or direct API integration to your compliance management system. Custom formats 
                available for enterprise requirements.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">How fast can you turn around compliance document batches in {cityName}?</h3>
              <p className="text-slate-600">
                Standard processing is 12-24 hours for under 100 documents. Expedited processing 
                available for 4-8 hour turnaround during business hours, subject to 50% surcharge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Trust Anchor #2 */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted by Compliance Teams
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">
                "Our customs clearance delays dropped by 60% after automating compliance 
                document processing. DocStandard catches errors before they become penalties."
              </p>
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-slate-500 text-sm">Trade Compliance Manager, Rotterdam Logistics</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">
                "We passed our last regulatory audit with zero findings on documentation. 
                The audit trail feature alone justified the investment."
              </p>
              <div>
                <p className="font-semibold">Marcus Weber</p>
                <p className="text-slate-500 text-sm">Compliance Director, Hamburg Freight Group</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">
                "Processing 500+ import licenses per month used to take a full-time employee. 
                Now it's automated and our accuracy is actually higher."
              </p>
              <div>
                <p className="font-semibold">Jennifer Park</p>
                <p className="text-slate-500 text-sm">Operations Lead, Singapore Trade Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Context */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Compliance Operations in {cityName}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {cityData.customsPort 
                  ? `${cityName} is a major customs port with high volumes of import/export documentation requiring precise compliance handling. Efficient document processing is critical for maintaining clearance velocity.`
                  : `${cityName} serves as a key logistics hub where compliance documentation flows between inland operations and port facilities. Accurate processing ensures smooth handoffs.`}
              </p>
              
              {majorPorts.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Major Port Facilities</h3>
                  <ul className="space-y-2">
                    {majorPorts.map((port) => (
                      <li key={port} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        {port}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {airports.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Air Cargo Facilities</h3>
                  <ul className="space-y-2">
                    {airports.map((airport) => (
                      <li key={airport} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        {airport}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-bold mb-4">Document Types Processed</h3>
              <ul className="space-y-3">
                {[
                  "Import/Export Licenses",
                  "Certificate of Origin",
                  "Commercial Invoices",
                  "Packing Lists",
                  "Bills of Lading",
                  "Customs Declarations",
                  "Regulatory Compliance Forms",
                  "Audit Documentation",
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to streamline compliance in {cityName}?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Join forwarders and importers in {cityName} who have automated their 
            compliance documentation processing with DocStandard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Start Processing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
