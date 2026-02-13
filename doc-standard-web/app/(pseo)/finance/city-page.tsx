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
    title: `Freight Bill Processing in ${cityData.name} | DocStandard`,
    description: `Automate freight bill auditing and payment processing in ${cityData.name}. Catch billing errors, validate charges, and streamline AP workflows.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function FinanceCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country } = cityData

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400 mb-4">{cityName} Finance</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Freight Bill Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Automate freight bill auditing, catch billing errors, and streamline accounts payable 
            workflows for your {cityName} logistics operations. Process carrier invoices faster 
            with validated, structured data.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/integration" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              View Finance Integrations <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/comparison" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition">
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { metric: "15-20%", label: "Average billing errors caught" },
            { metric: "3x", label: "Faster processing time" },
            { metric: "99.5%", label: "Data accuracy rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.metric}</div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-4">Finance Document Processing</h2>
              <p className="text-lg text-slate-600 mb-6">
                Transform freight invoices and billing documents into structured data for your 
                {cityName} finance operations. Catch duplicate charges, validate rates, and 
                accelerate payment cycles.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Freight invoices and bills",
                  "Accessorial charge validation",
                  "Fuel surcharge calculations",
                  "Rate compliance checking",
                  "General Ledger coding",
                  "Payment reconciliation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4">Common Billing Errors We Catch</h3>
              <ul className="space-y-3 text-slate-600">
                <li>• Duplicate invoice submissions</li>
                <li>• Incorrect rate applications</li>
                <li>• Wrong weight or class charges</li>
                <li>• Unapproved accessorial fees</li>
                <li>• Invalid fuel surcharge calculations</li>
                <li>• Mismatched PO references</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Streamline freight payments in {cityName}</h2>
          <p className="text-slate-400 mb-6">Reduce processing costs and catch billing errors before payment.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition">
            Start Processing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
