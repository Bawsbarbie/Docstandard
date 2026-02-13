import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "CargoWise vs Magaya: Logistics Data Processing Comparison | DocStandard",
  description:
    "Compare CargoWise and Magaya for freight document processing. See which TMS fits your data workflow and how DocStandard integrates with both.",
}

interface ComparisonPoint {
  feature: string
  cargowise: string
  magaya: string
  winner: "cargowise" | "magaya" | "tie" | null
}

const comparisonData: ComparisonPoint[] = [
  {
    feature: "Document Types Supported",
    cargowise: "BOL, AWB, manifests, customs entries (40+ types)",
    magaya: "BOL, AWB, invoices, customs docs (30+ types)",
    winner: "cargowise",
  },
  {
    feature: "EDI Capabilities",
    cargowise: "Native X12/EDIFACT support, carrier integrations",
    magaya: "EDI via third-party, XML/CSV focused",
    winner: "cargowise",
  },
  {
    feature: "API Availability",
    cargowise: "eHub API, extensive endpoints",
    magaya: "REST API, growing endpoint library",
    winner: "tie",
  },
  {
    feature: "Data Export Formats",
    cargowise: "XML, JSON, CSV, EDI",
    magaya: "XML, CSV, Excel, PDF",
    winner: "tie",
  },
  {
    feature: "Best For",
    cargowise: "Large forwarders, NVOCCs, global operations",
    magaya: "SMB freight forwarders, 3PLs, warehouse ops",
    winner: null,
  },
]

const dataProcessingComparison = [
  {
    aspect: "Field Extraction",
    withoutDocStandard: "Manual re-keying or basic OCR with 60-70% accuracy",
    withDocStandard: "AI-powered extraction with 99.5% field-level accuracy",
  },
  {
    aspect: "Schema Normalization",
    withoutDocStandard: "Custom scripts per carrier format, constant maintenance",
    withDocStandard: "Automatic normalization to TMS-ready formats",
  },
  {
    aspect: "Integration Time",
    withoutDocStandard: "2-4 weeks per new document type",
    withDocStandard: "Same-day processing for new formats",
  },
  {
    aspect: "Error Handling",
    withoutDocStandard: "Manual QA, delayed error discovery",
    withDocStandard: "Real-time confidence scoring, flagged for review",
  },
]

export default function CargoWiseVsMagayaPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-4">TMS Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            CargoWise vs Magaya
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Choosing between two leading logistics platforms? Compare features, data capabilities, 
            and integration pathways to find the right fit for your freight operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#comparison-table"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              See Comparison
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#integrations"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View Integrations
            </a>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* CargoWise Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">CW</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">CargoWise</h2>
                <p className="text-slate-600">Wisetech Global</p>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              Enterprise-grade logistics platform built for global freight forwarders and NVOCCs. 
              Deep customs capabilities, extensive carrier integrations, and robust EDI support.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Global deployment with localized compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Comprehensive customs and regulatory modules</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Native EDI for all major carriers</span>
              </li>
            </ul>
          </div>

          {/* Magaya Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">Mg</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Magaya</h2>
                <p className="text-slate-600">Magaya Corporation</p>
              </div>
            </div>
            <p className="text-slate-600 mb-6">
              Flexible TMS designed for growing freight forwarders and 3PLs. Strong warehouse 
              management capabilities and easier implementation for mid-market operations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Faster setup and onboarding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Integrated WMS for warehouse ops</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-slate-700">Cost-effective for SMB forwarders</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
            <p className="text-slate-600">
              Side-by-side comparison of key capabilities for freight document processing
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-sm border border-slate-200">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-blue-600">CargoWise</th>
                  <th className="px-6 py-4 text-center font-semibold text-indigo-600">Magaya</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.cargowise}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.magaya}</td>
                    <td className="px-6 py-4 text-center">
                      {row.winner === "cargowise" && (
                        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
                          <CheckCircle className="w-4 h-4" /> CargoWise
                        </span>
                      )}
                      {row.winner === "magaya" && (
                        <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                          <CheckCircle className="w-4 h-4" /> Magaya
                        </span>
                      )}
                      {row.winner === "tie" && (
                        <span className="text-slate-500 font-medium">Tie</span>
                      )}
                      {row.winner === null && (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Case Fit */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Which Platform Fits Your Operation?</h2>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Choose CargoWise If...</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">You operate across multiple countries with complex customs requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">You need deep EDI integration with major ocean carriers and airlines</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">Your team is ready for a longer implementation (6-12 months)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">You process 1,000+ shipments per month</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">Choose Magaya If...</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                <span className="text-slate-700">You are a growing forwarder needing quick deployment (4-8 weeks)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                <span className="text-slate-700">Warehouse management is a core part of your operations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                <span className="text-slate-700">You prioritize cost-effectiveness over enterprise features</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                <span className="text-slate-700">You process 100-800 shipments per month</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Processing Section */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Document Processing: With vs Without DocStandard</h2>
            <p className="text-slate-400">
              Regardless of your TMS choice, DocStandard eliminates the manual data bottleneck
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800 rounded-2xl border border-slate-700">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-300">Aspect</th>
                  <th className="px-6 py-4 text-left font-semibold text-red-400">Without DocStandard</th>
                  <th className="px-6 py-4 text-left font-semibold text-green-400">With DocStandard</th>
                </tr>
              </thead>
              <tbody>
                {dataProcessingComparison.map((row, index) => (
                  <tr key={index} className="border-b border-slate-700/50 last:border-b-0">
                    <td className="px-6 py-4 font-medium text-white">{row.aspect}</td>
                    <td className="px-6 py-4 text-slate-400">{row.withoutDocStandard}</td>
                    <td className="px-6 py-4 text-green-300">{row.withDocStandard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Integration CTAs */}
      <section id="integrations" className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect Your TMS?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            DocStandard integrates with both CargoWise and Magaya. Clean, structured data delivered 
            directly to your system — no matter which platform you choose.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            href="/integration/cargowise-to-dynamics-bc-bridge"
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-300 transition text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-2xl">CW</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">CargoWise Integration</h3>
            <p className="text-slate-600 mb-4">
              Normalize freight data from CargoWise into clean, system-ready exports
            </p>
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
              View Integration <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center opacity-75">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 font-bold text-2xl">Mg</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Magaya Integration</h3>
            <p className="text-slate-600 mb-4">
              Coming soon. Join the waitlist for Magaya data normalization.
            </p>
            <span className="inline-flex items-center gap-2 text-slate-500 font-semibold">
              Notify Me When Available
            </span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Deciding?</h2>
          <p className="text-slate-600 mb-8">
            Both platforms work with DocStandard. Upload a sample document and see how we can 
            normalize data for either CargoWise or Magaya — no commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              Try DocStandard Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/integration"
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition"
            >
              Browse All Integrations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
