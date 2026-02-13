import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
    title: `Compliance Document Processing in ${cityName} | DocStandard`,
    description: `Streamline import/export compliance documentation in ${cityName}, ${country}. Automate license verification, regulatory filings, and audit-ready record keeping.`,
    openGraph: {
      title: `Compliance Document Processing in ${cityName}`,
      description: `Streamline import/export compliance documentation in ${cityName}, ${country}.`,
    },
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
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-4">
            {cityName} Operations
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Compliance Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Import and export operations in {cityName} demand precise compliance documentation. 
            From license verification to regulatory filings, DocStandard automates the extraction 
            and normalization of compliance records for {country}-based trade operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/integration"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Compliance Integrations
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/comparison"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* Local Context */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Compliance Challenges in {cityName}
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              {cityData.customsPort 
                ? `${cityName} is a major customs port with high volumes of import/export documentation requiring precise compliance handling.`
                : `${cityName} serves as a key logistics hub where compliance documentation flows between inland operations and port facilities.`}
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
      </section>

      {/* Processing Pipeline */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compliance Processing Pipeline
          </h2>

          <div className="grid gap-6 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Ingest",
                desc: "Multi-channel capture of compliance documents via API, email, or upload",
              },
              {
                step: "02",
                title: "Extract",
                desc: "AI-powered field extraction with 99.5% accuracy for typed documents",
              },
              {
                step: "03",
                title: "Validate",
                desc: "Regulatory compliance checks and license verification",
              },
              {
                step: "04",
                title: "Deliver",
                desc: "Structured data delivery to your compliance management system",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl bg-white border border-slate-200 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-3">{item.step}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          {cityName} Compliance System Integrations
        </h2>
        
        <p className="text-lg text-slate-600 mb-8">
          Connect your compliance documentation directly to the platforms managing your 
          {cityName} trade operations. DocStandard integrates with leading compliance 
          and trade management systems.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { name: "Amber Road", desc: "Trade compliance and global trade management" },
            { name: "Livingston", desc: "Customs brokerage and trade consulting" },
            { name: "Integration Point", desc: "Global trade and supply chain solutions" },
            { name: "Expeditors", desc: "Customs and compliance management" },
          ].map((system) => (
            <div key={system.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold mb-2">{system.name}</h3>
              <p className="text-slate-600 text-sm">{system.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/integration"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            View All Compliance Integrations →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline compliance in {cityName}?
          </h2>
          <p className="text-slate-400 mb-8">
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
