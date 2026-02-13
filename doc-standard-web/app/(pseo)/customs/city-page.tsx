import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { ArrowRight, CheckCircle } from "lucide-react"

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
  if (!cityData) notFound()

  const { name: cityName, country, majorPorts = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-400 mb-4">{cityName} Customs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Customs Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            {cityData.customsPort 
              ? `${cityName} customs operations require precise, timely documentation. Automate entry filings, duty calculations, and clearance paperwork to keep cargo moving through ${cityName} ports.`
              : `Support ${cityName} import/export operations with automated customs documentation. Process entry packets, calculate duties, and maintain audit-ready records for ${country} customs compliance.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              View Customs Integrations <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/comparison" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-4">Customs Challenges in {cityName}</h2>
            <p className="text-lg text-slate-600 mb-6">
              {cityData.customsPort
                ? `As a major customs port, ${cityName} handles thousands of entries daily. Delays in documentation processing directly impact dwell time and demurrage costs.`
                : `${cityName} businesses rely on accurate customs documentation for timely clearance at port facilities. Manual processing creates bottlenecks and compliance risks.`}
            </p>
            
            <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6 mb-6">
              <h3 className="font-semibold text-indigo-900 mb-3">Customs Documents We Process</h3>
              <ul className="space-y-2">
                {[
                  "Commercial Invoices",
                  "Packing Lists",
                  "Bills of Lading",
                  "Arrival Notices",
                  "Customs Entry Forms",
                  "Duty Drawback Claims",
                  "ISF/AMS Filings",
                  "Certificate of Origin",
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-600" /> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-3">Processing Speed</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Standard Processing</span>
                  <span className="font-semibold">12-24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Expedited Processing</span>
                  <span className="font-semibold">4-8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Urgent Same-Day</span>
                  <span className="font-semibold">Available</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-3">{country} Customs Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Harmonized System (HS) code extraction</li>
                <li>• Duty and tax calculations</li>
                <li>• Entry type classification</li>
                <li>• PGA (Partner Government Agency) flags</li>
                <li>• Valuation verification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Customs Processing Workflow</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { step: "1", title: "Receive", desc: "Import docs via email, API, or portal" },
              { step: "2", title: "Extract", desc: "AI extracts all customs data fields" },
              { step: "3", title: "Classify", desc: "HS codes and duty calculations" },
              { step: "4", title: "File", desc: "Export to your customs software" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to accelerate customs in {cityName}?</h2>
          <p className="text-slate-400 mb-6">Process customs documentation faster and more accurately with DocStandard.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
