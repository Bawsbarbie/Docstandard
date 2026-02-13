import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { ArrowRight, CheckCircle, FileText, AlertTriangle, Scale, Clock, DollarSign, Shield } from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  if (!cityData) return { title: "Not Found" }
  
  const cityName = cityData.name
  const country = cityData.country
  
  return {
    title: `Customs Document Processing in ${cityName} | DocStandard`,
    description: `Accelerate customs clearance in ${cityName}, ${country}. Automate customs declarations, duty calculations, and entry documentation for faster port processing.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function CustomsCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) {
    notFound()
  }

  const { name: cityName, country, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-400 mb-4">{cityName} Customs Operations</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Clean Data for Customs Clearance in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            {cityData.customsPort 
              ? `${cityName} customs operations demand precise, timely documentation. Automate entry filings, duty calculations, and clearance paperwork to keep cargo moving through ${cityName} ports.`
              : `Support ${cityName} import/export operations with automated customs documentation. Process entry packets, calculate duties, and maintain audit-ready records for ${country} customs compliance.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition">
              View Customs Integrations <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/comparison" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition">
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* Risk Section */}
      <section className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Cost of Customs Delays in {cityName}</h2>
            <p className="text-lg text-slate-400 mb-8">Documentation errors don't just slow clearance—they cascade into demurrage, detention, and missed delivery windows.</p>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">30%</div>
                <p className="text-slate-400">Of customs delays from document errors</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">$500+</div>
                <p className="text-slate-400">Daily demurrage per container</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">48hrs</div>
                <p className="text-slate-400">Average delay from incorrect entries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why {cityName} Customs Teams Struggle</h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Entry Packet Complexity</h3>
              <p className="text-slate-600">Each shipment requires invoices, BOLs, packing lists, and declarations—each with different formats and data requirements.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Duty Calculation Errors</h3>
              <p className="text-slate-600">Incorrect HS codes or valuation errors lead to underpaid duties, penalties, and customs holds.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Scale className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">PGA Coordination</h3>
              <p className="text-slate-600">FDA, USDA, and other agency holds require precise documentation. Missing data triggers inspections and delays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Guide */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">The Master Mapping Blueprint</h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">Standard field extraction profiles for customs entry documents processed in {cityName}.</p>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-[#0f172a] text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Field</th>
                    <th className="px-6 py-4 font-semibold">JSON Key</th>
                    <th className="px-6 py-4 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Entry Number</td>
                    <td className="px-6 py-4 font-mono text-sm">entry_number</td>
                    <td className="px-6 py-4">123-4567890-0</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Importer of Record</td>
                    <td className="px-6 py-4 font-mono text-sm">importer.name</td>
                    <td className="px-6 py-4">ABC Imports LLC</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">HS Code</td>
                    <td className="px-6 py-4 font-mono text-sm">hs_code</td>
                    <td className="px-6 py-4">8471.30.0100</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">Entered Value</td>
                    <td className="px-6 py-4 font-mono text-sm">entered_value_usd</td>
                    <td className="px-6 py-4">$45,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">The DocStandard Approach</h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-16">Customs document processing pipeline designed for {country} port operations.</p>

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              {[
                { num: "01", title: "Document Ingestion", desc: "Capture BOLs, invoices, and entry docs via email, API, or portal upload." },
                { num: "02", title: "Data Extraction", desc: "AI extracts entry numbers, HS codes, values, and party details with 99.5% accuracy." },
                { num: "03", title: "Duty Calculation", desc: "Automated duty and tax calculations based on {country} tariff schedules." },
                { num: "04", title: "Validation", desc: "HS code verification, PGA flag detection, and consistency checks." },
                { num: "05", title: "Entry Filing", desc: "Structured data delivered to your customs broker or ABI system." },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">{step.num}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0f172a] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Customs Processing Engine</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Document Ingestion Active</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">HS Code Validation v3.1</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Duty Calculation Engine</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span className="text-sm">{country} Tariff Rules Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Operational Impact for {cityName}</h2>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Manual Effort</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">8-12 hrs</div>
              <p className="text-slate-600 text-sm">Per 100 entry packets</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">With DocStandard</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">1-2 hrs</div>
              <p className="text-slate-600 text-sm">Same volume, automated</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Annual Savings</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$60K+</div>
              <p className="text-slate-600 text-sm">Reduced demurrage + labor</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <Shield className="w-8 h-8 text-amber-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Error Reduction</h3>
              <div className="text-3xl font-bold text-amber-600 mb-2">90%</div>
              <p className="text-slate-600 text-sm">Fewer customs holds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why {cityName} Teams Choose DocStandard</h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "Faster Clearance", desc: "Reduce customs processing from days to hours. Get cargo moving through {cityName} ports faster." },
              { title: "Duty Accuracy", desc: "Automated HS code classification and valuation reduces underpayment risk and penalties." },
              { title: "PGA Ready", desc: "Pre-configured FDA, USDA, and agency data fields prevent inspection triggers." },
              { title: "{country} Compliant", desc: "Validated against {country} customs regulations and {cityName} port requirements." },
              { title: "Audit Trail", desc: "Complete documentation history for CBP audits and regulatory inquiries." },
              { title: "Scale Without Stress", desc: "Handle peak season volume without adding customs staff or overtime." },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Common Questions About {cityName} Customs Processing</h2>

          <div className="space-y-6">
            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">Can you handle {country} customs entry forms?</h3>
              <p className="text-slate-600">Yes. We extract data from all standard {country} customs documentation including entry summaries, commercial invoices, and BOLs with 99.5% field-level accuracy.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">How do you validate HS codes for {country} imports?</h3>
              <p className="text-slate-600">Our system validates HS codes against {country} tariff schedules and flags potential misclassifications. We also check for PGA requirements based on product codes.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">What formats do you deliver to customs brokers?</h3>
              <p className="text-slate-600">We deliver structured JSON, CSV for ABI systems, or direct API integration to your customs broker's platform. Custom formats available for specific broker requirements.</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">How fast can you process entry packets for {cityName} shipments?</h3>
              <p className="text-slate-600">Standard processing is 6-12 hours for under 100 entries. Expedited 4-hour processing available for urgent shipments during business hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Trusted by Customs Teams</h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">"Our customs clearance time dropped from 3 days to same-day. DocStandard's HS code validation caught errors our team was missing."</p>
              <div>
                <p className="font-semibold">Michael Torres</p>
                <p className="text-slate-500 text-sm">Customs Manager, Los Angeles Freight</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">"We eliminated demurrage costs during peak season. Automated entry processing means our cargo never sits waiting for paperwork."</p>
              <div>
                <p className="font-semibold">Anna Schmidt</p>
                <p className="text-slate-500 text-sm">Import Director, Hamburg Logistics</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-6 italic">"Passed our CBP audit with zero findings. The audit trail and data consistency gave our brokers confidence in every filing."</p>
              <div>
                <p className="font-semibold">David Kim</p>
                <p className="text-slate-500 text-sm">Compliance Officer, New York Imports</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Accelerate customs clearance in {cityName}</h2>
          <p className="text-slate-400 mb-8 text-lg">Process customs documents faster and more accurately with DocStandard.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
