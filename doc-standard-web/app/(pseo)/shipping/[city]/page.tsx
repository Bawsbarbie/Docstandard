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
    title: `Shipping Document Processing in ${cityData.name} | DocStandard`,
    description: `Process ocean and air freight documents in ${cityData.name}. Extract BOLs, AWBs, and manifests for faster shipping operations.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function ShippingCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-4">{cityName} Shipping</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shipping Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            {cityData.customsPort
              ? `${cityName} handles significant ocean and air cargo volumes. Process bills of lading, air waybills, and manifests faster with automated document extraction.`
              : `Support ${cityName} shipping operations with accurate document processing. Transform freight paperwork into structured data for your TMS.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
              View Shipping Integrations <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl font-bold mb-4">Ocean & Air Cargo Documents</h2>
            <p className="text-lg text-slate-600 mb-6">
              Process the complete range of shipping documentation for {cityName} freight operations. 
              From ocean BOLs to air waybills, extract critical shipment data accurately.
            </p>

            <div className="space-y-4">
              {[
                { icon: "🚢", title: "Ocean Freight", docs: "BOLs, manifests, arrival notices" },
                { icon: "✈️", title: "Air Cargo", docs: "AWBs, flight manifests, release orders" },
                { icon: "📋", title: "Supporting Docs", docs: "Packing lists, certificates, instructions" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.docs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {(majorPorts.length > 0 || airports.length > 0) && (
              <div className="rounded-2xl bg-sky-50 border border-sky-100 p-6">
                <h3 className="font-semibold text-sky-900 mb-4">{cityName} Shipping Infrastructure</h3>
                {majorPorts.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-sky-700 font-medium mb-1">🚢 Port Facilities</p>
                    <ul className="space-y-1 text-slate-600">
                      {majorPorts.map((port) => (
                        <li key={port}>• {port}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {airports.length > 0 && (
                  <div>
                    <p className="text-sm text-sky-700 font-medium mb-1">✈️ Air Cargo Hubs</p>
                    <ul className="space-y-1 text-slate-600">
                      {airports.map((airport) => (
                        <li key={airport}>• {airport}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-4">Extraction Capabilities</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Container numbers (ISO 6346 validated)</li>
                <li>• Vessel and voyage details</li>
                <li>• Shipper/consignee information</li>
                <li>• Cargo descriptions and HS codes</li>
                <li>• Weights, measures, and volumes</li>
                <li>• Freight charges and terms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Shipping Document Workflow</h2>
          <div className="grid gap-6 lg:grid-cols-5">
            {[
              { step: "1", title: "Ingest", desc: "Multi-channel capture" },
              { step: "2", title: "Classify", desc: "Document type ID" },
              { step: "3", title: "Extract", desc: "Field-level capture" },
              { step: "4", title: "Normalize", desc: "Standardize data" },
              { step: "5", title: "Deliver", desc: "TMS integration" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{item.step}</div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Accelerate shipping in {cityName}</h2>
          <p className="text-slate-400 mb-6">Process ocean and air freight documents with 99.5% accuracy.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-700 transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
