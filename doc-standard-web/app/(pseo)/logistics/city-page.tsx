import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  FileText, 
  AlertTriangle, 
  Clock, 
  TrendingDown,
  Ship,
  Truck,
  Package,
  Database,
  CheckCircle,
  BarChart3,
  Zap,
  Shield,
  Workflow
} from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  if (!cityData) return { title: "Not Found", robots: { index: false } }

  const title = `Logistics Document Processing in ${cityData.name} | DocStandard`
  const description = `Streamline logistics document processing in ${cityData.name}. Transform BOLs, packing lists, and freight documents into clean, structured data. Eliminate manual data entry delays.`
  const canonical = `https://docstandard.co/logistics/city/${params.city}`

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "DocStandard",
    },
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function LogisticsCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, region, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 mb-4">{cityName} Logistics Operations</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Logistics Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Transform bills of lading, packing lists, and freight documents into structured, 
            system-ready data for your {cityName} supply chain. Eliminate manual bottlenecks 
            and accelerate shipment processing from hours to minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/upload" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-700 transition shadow-lg shadow-cyan-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
          </div>
        </div>
      </section>

      {/* RISK SECTION */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                Critical Risk Factor
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Manual Document Processing Is Costing You Shipments
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                In {cityName}'s competitive logistics market, document delays don't just slow operations — 
                they cost contracts. Carriers miss SLAs. Customers switch providers. Revenue walks out the door.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
                  <p className="text-slate-400 text-sm">Of shipment delays originate from document errors</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">6-12 hrs</div>
                  <p className="text-slate-400 text-sm">Average manual BOL processing time</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$50-200</div>
                  <p className="text-slate-400 text-sm">Cost per document correction</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">23%</div>
                  <p className="text-slate-400 text-sm">Customer churn due to delays</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  What Happens Without Automation
                </h3>
                <div className="space-y-4">
                  {[
                    "BOL data manually re-keyed into TMS (45 min)",
                    "Weight discrepancy caught at destination ($150 fee)",
                    "Customer calls for status update (no visibility)",
                    "Proof of delivery lost, payment delayed 30 days",
                    "Peak season backlog: 3-day processing queue"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">{i + 1}</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Logistics Document Problem
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} logistics teams waste thousands of hours on document tasks that should be instant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Data Chaos</h3>
              <p className="text-slate-600">
                Every carrier uses different BOL formats. Extracting consistent data fields 
                across PDFs, scans, and faxes creates endless manual work for your {cityName} team.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Processing Delays</h3>
              <p className="text-slate-600">
                Documents sit in queues waiting for manual review. Meanwhile trucks wait at docks, 
                appointments slip, and detention fees accumulate by the hour.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visibility Gaps</h3>
              <p className="text-slate-600">
                When documents aren't connected to systems, you can't track shipment status, 
                predict delays, or answer customer questions without making phone calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL GUIDE */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Master Mapping Blueprint
            </h2>
            <p className="text-slate-600 text-lg">
              How DocStandard extracts and normalizes logistics document fields for {cityName} operations
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-950 p-4 text-sm font-semibold text-slate-400 border-b border-slate-800">
              <div>Source Field</div>
              <div>Document Location</div>
              <div>Validation Rule</div>
              <div>Output Format</div>
            </div>
            {[
              ["BOL Number", "Top-right header", "12-20 alphanumeric", "String"],
              ["Shipper Name", "Shipper block", "Non-empty, max 100 chars", "Normalized string"],
              ["Consignee", "Consignee block", "Match customer master", "Customer ID lookup"],
              ["Origin", "Route origin", "Valid UN/LOCODE", "{cityName} port/airport code"],
              ["Destination", "Route destination", "Valid UN/LOCODE", "Port/airport code"],
              ["Container Number", "Equipment section", "ISO 6346 format", "Validated container ID"],
              ["Weight (KG)", "Cargo details", "Numeric, >0, <100,000", "Decimal(10,2)"],
              ["Piece Count", "Package count", "Integer, >0", "Integer"],
              ["Freight Terms", "Terms box", "Prepaid/Collect/3rd Party", "Enum mapping"],
              ["Declared Value", "Value field", "Numeric, currency", "Decimal + currency code"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 text-sm border-b border-slate-800 hover:bg-slate-800/50">
                <div className="text-cyan-400 font-medium">{row[0]}</div>
                <div className="text-slate-300">{row[1]}</div>
                <div className="text-slate-400">{row[2]}</div>
                <div className="text-slate-300">{row[3]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Multi-Format Support</h4>
              <p className="text-sm text-slate-600">VICS BOL, uniform straight, ocean B/L, airway bills, and custom carrier formats</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Data Normalization</h4>
              <p className="text-sm text-slate-600">Standardizes units, dates, addresses, and commodity descriptions across all sources</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Exception Handling</h4>
              <p className="text-sm text-slate-600">Flagged documents route to human review with suggested corrections</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL PROCESS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The DocStandard Engine
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From document receipt to system delivery — automated processing pipeline for {cityName} logistics
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { 
                  num: "01", 
                  title: "Document Ingestion", 
                  desc: "Receive BOLs, PODs, and freight docs via email, EDI, API, or upload. OCR extracts text from any format including scanned images and mobile photos.",
                  icon: FileText
                },
                { 
                  num: "02", 
                  title: "Intelligent Extraction", 
                  desc: "AI identifies document type and locates key fields — shipper, consignee, reference numbers, weights, commodities. No templates to configure.",
                  icon: Database
                },
                { 
                  num: "03", 
                  title: "Validation & Enrichment", 
                  desc: "Cross-check against rate contracts, validate addresses, verify container numbers against ISO standards. Enrich with carrier SCAC codes.",
                  icon: Shield
                },
                { 
                  num: "04", 
                  title: "System Integration", 
                  desc: "Push structured data to your TMS, WMS, or ERP. Update shipment status, trigger invoicing, notify customers — all automated.",
                  icon: Workflow
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cyan-600 mb-1">STEP {step.num}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl" />
              <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Ship className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">BOL Processing</div>
                      <div className="text-slate-400 text-sm">{cityName} Origin</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Live</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Documents Today</span>
                    <span className="text-white font-medium">247 processed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Processing Time</span>
                    <span className="text-white font-medium">2.3 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Accuracy Rate</span>
                    <span className="text-white font-medium">99.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">System Uptime</span>
                    <span className="text-white font-medium">99.9%</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-cyan-400">12</div>
                      <div className="text-xs text-slate-400">In Queue</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">235</div>
                      <div className="text-xs text-slate-400">Completed</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-400">3</div>
                      <div className="text-xs text-slate-400">Review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Operational Impact
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings for {cityName} logistics operations processing 500+ documents monthly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">6-12 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual processing time</p>
              <div className="text-red-400 text-sm">Per batch of 50 BOLs</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">15 min</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">96% time reduction</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$180K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-cyan-400 text-sm">Labor + error costs</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">94%</div>
              <p className="text-slate-400 text-sm mb-2">Error reduction</p>
              <div className="text-purple-400 text-sm">Fewer corrections</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {cityName} Logistics Teams Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
              <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Ship className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Modal Support</h3>
              <p className="text-slate-600">
                Process documents for ocean, air, rail, and truck shipments. Handle BOLs, 
                AWBs, delivery orders, and customs filings through one platform.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
              <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Carrier Integrations</h3>
              <p className="text-slate-600">
                Connect with major carriers serving {cityName}. Pull tracking data, 
                auto-validate SCAC codes, and reconcile freight bills automatically.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
              <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Shipment Visibility</h3>
              <p className="text-slate-600">
                Link documents to live shipment data. Give customers self-service tracking 
                and eliminate "where's my shipment" calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: `Can DocStandard handle BOLs from carriers serving ${cityName}?`,
                a: `Yes. Our system processes standard VICS BOLs, uniform straight bills of lading, ocean bills, and carrier-specific formats from major freight companies operating in ${cityName} and ${country}. No template configuration required.`
              },
              {
                q: `How quickly can we process documents during peak season?`,
                a: `DocStandard scales automatically. Whether you're processing 50 documents or 5,000 per day, extraction completes in under 3 minutes per batch. No additional staff required during volume spikes.`
              },
              {
                q: `Does this integrate with our existing TMS?`,
                a: `We integrate with major transportation management systems including MercuryGate, BluJay, 3G-TM, and custom platforms. Data flows via API, EDI, or flat file — whatever your TMS accepts.`
              },
              {
                q: `What about proof of delivery documents?`,
                a: `We process signed PODs, delivery receipts, and exception notices. Extract delivery timestamps, signatures, and condition notes to accelerate billing and dispute resolution.`
              },
              {
                q: `How do you handle weight and quantity discrepancies?`,
                a: `Our validation engine flags discrepancies between BOL declarations and actual weights. Exceptions route to your team with suggested corrections based on historical patterns and carrier data.`
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Logistics Teams Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                "We cut BOL processing from 4 hours to 20 minutes. Our dock supervisors 
                now spend time managing shipments instead of typing data."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Director</div>
                <div className="text-sm text-slate-500">Regional 3PL, {region}</div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                "The accuracy is incredible. We used to have 3-4 data entry errors per day. 
                Now it's maybe one per week. That's real money saved on corrections."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Logistics Manager</div>
                <div className="text-sm text-slate-500">Freight Forwarder, {country}</div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                "During peak season we process 3x normal volume without adding staff. 
                DocStandard handles the surge while we focus on customer service."
              </p>
              <div>
                <div className="font-semibold text-slate-900">VP Operations</div>
                <div className="text-sm text-slate-500">Asset-Based Carrier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate {cityName} Logistics?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join logistics teams processing thousands of documents daily with 99%+ accuracy. 
            Get your first batch processed within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/upload" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-700 transition shadow-lg shadow-cyan-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
          </div>
          {(majorPorts.length > 0 || airports.length > 0) && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                Serving logistics operations near {majorPorts.concat(airports).join(", ") || `${cityName} transport hubs`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
