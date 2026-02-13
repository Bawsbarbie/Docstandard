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

  return {
    title: `Logistics Document Processing in ${cityData.name} | DocStandard`,
    description: `Streamline logistics document processing in ${cityData.name}. Automate BOLs, packing lists, and delivery documents for faster supply chain operations.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function LogisticsCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 mb-4">{cityName} Logistics</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Logistics Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Transform bills of lading, packing lists, and delivery documents into structured data
            for your {cityName} logistics operations. Accelerate document workflows and reduce processing delays.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition">
              View Logistics Integrations <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl font-bold mb-4">Logistics Operations in {cityName}</h2>
            <p className="text-lg text-slate-600 mb-6">
              {cityData.logisticsHub
                ? `${cityName} is a major logistics hub connecting regional and international supply chains. Efficient document processing is critical for maintaining flow.`
                : `${cityName} businesses depend on accurate logistics documentation for timely deliveries and supply chain visibility.`}
            </p>

            {(majorPorts.length > 0 || airports.length > 0) && (
              <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-6">
                <h3 className="font-semibold text-cyan-900 mb-3">Key Infrastructure</h3>
                {majorPorts.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-cyan-700 font-medium mb-1">Port Facilities</p>
                    <p className="text-slate-600">{majorPorts.join(", ")}</p>
                  </div>
                )}
                {airports.length > 0 && (
                  <div>
                    <p className="text-sm text-cyan-700 font-medium mb-1">Air Cargo</p>
                    <p className="text-slate-600">{airports.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-4">Logistics Documents Processed</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Bills of Lading (BOL)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Packing Lists</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Delivery Receipts</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Proof of Delivery (POD)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Shipment Notifications</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /> Exception Reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Processing Pipeline</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { step: "1", title: "Capture", desc: "Receive documents from any source" },
              { step: "2", title: "Extract", desc: "AI extracts shipment data fields" },
              { step: "3", title: "Validate", desc: "Verify against shipment records" },
              { step: "4", title: "Integrate", desc: "Push to TMS or WMS systems" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Optimize logistics in {cityName}</h2>
          <p className="text-slate-400 mb-6">Process logistics documents faster and more accurately.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-700 transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
