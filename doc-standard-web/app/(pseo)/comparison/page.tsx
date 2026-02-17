import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "TMS & ERP Comparisons | DocStandard",
  description:
    "Compare logistics and freight management systems. Side-by-side analysis of CargoWise, Magaya, SAP, Oracle, and more to find the right platform for your operations.",
  alternates: {
    canonical: "https://docstandard.co/comparison",
  },
}

interface Comparison {
  slug: string
  systemA: string
  systemB: string
  category: string
  description: string
  status: "live" | "coming-soon"
}

const comparisons: Comparison[] = [
  {
    slug: "cargowise-vs-magaya",
    systemA: "CargoWise",
    systemB: "Magaya",
    category: "TMS",
    description: "Enterprise forwarder platform vs flexible SMB solution. Compare features, EDI capabilities, and data processing workflows.",
    status: "live",
  },
  {
    slug: "sap-tm-vs-oracle-otm",
    systemA: "SAP TM",
    systemB: "Oracle OTM",
    category: "Enterprise TMS",
    description: "Two enterprise-grade transportation management powerhouses head-to-head.",
    status: "coming-soon",
  },
  {
    slug: "manual-processing-vs-automated-extraction",
    systemA: "Manual Processing",
    systemB: "DocStandard Automation",
    category: "Processing Method",
    description: "The true cost of manual data entry vs AI-powered document extraction.",
    status: "coming-soon",
  },
  {
    slug: "netsuite-vs-dynamics365",
    systemA: "NetSuite",
    systemB: "Dynamics 365",
    category: "ERP",
    description: "Cloud-native ERP vs Microsoft's business platform for logistics operations.",
    status: "coming-soon",
  },
  {
    slug: "descartes-vs-mercurygate",
    systemA: "Descartes",
    systemB: "MercuryGate",
    category: "TMS",
    description: "Global logistics network vs SaaS TMS for freight execution.",
    status: "coming-soon",
  },
  {
    slug: "flexport-vs-freightos",
    systemA: "Flexport",
    systemB: "Freightos",
    category: "Digital Freight",
    description: "Modern freight forwarder vs digital freight marketplace platform.",
    status: "coming-soon",
  },
]

export default function ComparisonsIndexPage() {
  const liveComparisons = comparisons.filter((c) => c.status === "live")
  const comingSoon = comparisons.filter((c) => c.status === "coming-soon")

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-4">Consideration Stage</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform Comparisons
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choosing between logistics systems? Our side-by-side comparisons help you find 
            the right fit for your freight operations.
          </p>
        </div>
      </section>

      {/* Live Comparisons */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Available Comparisons</h2>
        
        <div className="grid gap-6">
          {liveComparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/comparison/${comparison.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {comparison.category}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    Live
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
                  {comparison.systemA} vs {comparison.systemB}
                </h3>
                <p className="text-slate-600">{comparison.description}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                Read Comparison <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Coming Soon</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {comingSoon.map((comparison) => (
              <div
                key={comparison.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 opacity-75"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded">
                    {comparison.category}
                  </span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {comparison.systemA} vs {comparison.systemB}
                </h3>
                <p className="text-slate-600 text-sm">{comparison.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help Deciding?</h2>
        <p className="text-slate-600 mb-8">
          DocStandard works with both platforms. Upload a sample document to see how we can 
          normalize data for your chosen system.
        </p>
        <Link
          href="/integration"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          View All Integrations
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
