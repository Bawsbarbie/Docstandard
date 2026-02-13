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
    title: `Invoice Processing in ${cityData.name} | DocStandard`,
    description: `Automate commercial invoice extraction and processing in ${cityData.name}. Convert invoice PDFs into structured data for ERP and accounting systems.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function InvoiceCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country } = cityData

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400 mb-4">{cityName} Invoice Processing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Invoice Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Transform commercial invoices, vendor bills, and payment documents into structured data 
            for your {cityName} operations. Automate line-item extraction, GL coding, and ERP integration.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
              View Integrations <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl font-bold mb-4">Invoice Processing Capabilities</h2>
            <p className="text-lg text-slate-600 mb-6">
              Process invoices from any format — PDFs, scans, emails, or photos. Extract header 
              data, line items, and totals with high accuracy for your {cityName} finance operations.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Header Extraction", desc: "Vendor, invoice number, dates, PO references" },
                { title: "Line-Item Capture", desc: "SKU, description, quantity, unit price, total" },
                { title: "Tax Calculations", desc: "VAT, GST, sales tax by jurisdiction" },
                { title: "Multi-Currency", desc: "Auto-detect and normalize currencies" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-4">Supported Invoice Types</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Commercial invoices</li>
                <li>• Vendor bills</li>
                <li>• Freight invoices</li>
                <li>• Pro forma invoices</li>
                <li>• Credit memos</li>
                <li>• Debit notes</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-lg mb-4">ERP Integrations</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• SAP S/4HANA</li>
                <li>• Oracle NetSuite</li>
                <li>• Microsoft Dynamics</li>
                <li>• QuickBooks</li>
                <li>• Sage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Automate invoice processing in {cityName}</h2>
          <p className="text-slate-400 mb-6">Convert invoice documents into structured data for faster payment cycles.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-700 transition">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
