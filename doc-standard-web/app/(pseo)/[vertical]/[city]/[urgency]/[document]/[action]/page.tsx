import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  AlertTriangle,
  Clock,
  Zap,
  Shield,
  CheckCircle,
  FileText,
  TrendingDown,
  BarChart3,
  Timer,
  Truck,
  Phone,
  Mail
} from "lucide-react"

interface PageProps {
  params: {
    vertical: string
    city: string
    urgency: string
    document: string
    action: string
  }
}

// Urgency modifiers and their display names
const urgencyConfig: Record<string, { label: string; timeframe: string; badge: string }> = {
  urgent: { label: "Urgent", timeframe: "2-4 hours", badge: "⚡" },
  "same-day": { label: "Same-Day", timeframe: "Same day", badge: "🔥" },
  emergency: { label: "Emergency", timeframe: "1-2 hours", badge: "🚨" },
  rush: { label: "Rush", timeframe: "4-8 hours", badge: "⚡" },
  priority: { label: "Priority", timeframe: "Next day", badge: "⭐" },
  express: { label: "Express", timeframe: "6-12 hours", badge: "🚀" },
  immediate: { label: "Immediate", timeframe: "1 hour", badge: "🔴" },
  "time-sensitive": { label: "Time-Sensitive", timeframe: "2-6 hours", badge: "⏰" }
}

// Document types and their display names
const documentConfig: Record<string, { singular: string; plural: string; icon: string }> = {
  "customs-declaration": { singular: "Customs Declaration", plural: "Customs Declarations", icon: "📋" },
  "bill-of-lading": { singular: "Bill of Lading", plural: "Bills of Lading", icon: "📄" },
  "invoice": { singular: "Invoice", plural: "Invoices", icon: "💰" },
  "freight-document": { singular: "Freight Document", plural: "Freight Documents", icon: "📦" },
  "certificate-of-origin": { singular: "Certificate of Origin", plural: "Certificates of Origin", icon: "🌍" },
  "packing-list": { singular: "Packing List", plural: "Packing Lists", icon: "📦" },
  "shipping-label": { singular: "Shipping Label", plural: "Shipping Labels", icon: "🏷️" },
  "delivery-receipt": { singular: "Delivery Receipt", plural: "Delivery Receipts", icon: "✅" },
  "commercial-invoice": { singular: "Commercial Invoice", plural: "Commercial Invoices", icon: "💼" },
  "pro-forma-invoice": { singular: "Pro Forma Invoice", plural: "Pro Forma Invoices", icon: "📑" }
}

// Action types
const actionConfig: Record<string, { label: string; cta: string }> = {
  processing: { label: "Processing", cta: "Start Processing" },
  preparation: { label: "Preparation", cta: "Get Started" },
  verification: { label: "Verification", cta: "Verify Now" },
  cleaning: { label: "Cleaning", cta: "Clean Documents" },
  normalization: { label: "Normalization", cta: "Normalize Now" },
  extraction: { label: "Data Extraction", cta: "Extract Data" },
  validation: { label: "Validation", cta: "Validate Now" }
}

// Vertical display names
const verticalConfig: Record<string, { label: string; color: string }> = {
  compliance: { label: "Compliance", color: "blue" },
  customs: { label: "Customs", color: "indigo" },
  finance: { label: "Finance", color: "emerald" },
  invoice: { label: "Invoice", color: "violet" },
  logistics: { label: "Logistics", color: "cyan" },
  shipping: { label: "Shipping", color: "blue" }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  const urgency = urgencyConfig[params.urgency]
  const document = documentConfig[params.document]
  const action = actionConfig[params.action]
  const vertical = verticalConfig[params.vertical]
  
  if (!cityData || !urgency || !document || !action || !vertical) {
    return { title: "Not Found" }
  }
  
  return {
    title: `${urgency.label} ${document.singular} ${action.label} in ${cityData.name} | DocStandard`,
    description: `${urgency.timeframe} ${document.singular.toLowerCase()} ${action.label.toLowerCase()} in ${cityData.name}. Fast, accurate document processing when you need it most.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  const verticals = Object.keys(verticalConfig)
  const urgencies = Object.keys(urgencyConfig)
  const documents = Object.keys(documentConfig)
  const actions = Object.keys(actionConfig)
  
  const params = []
  
  for (const city of cities) {
    for (const vertical of verticals) {
      for (const urgency of urgencies) {
        for (const document of documents) {
          for (const action of actions) {
            params.push({
              vertical,
              city: city.slug,
              urgency,
              document,
              action
            })
          }
        }
      }
    }
  }
  
  console.log(`Generated ${params.length} urgency page params`)
  return params
}

export default async function UrgencyPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  const urgency = urgencyConfig[params.urgency]
  const document = documentConfig[params.document]
  const action = actionConfig[params.action]
  const vertical = verticalConfig[params.vertical]
  
  if (!cityData || !urgency || !document || !action || !vertical) {
    notFound()
  }
  
  const { name: cityName, country, majorPorts = [], airports = [] } = cityData
  const displayTitle = `${urgency.label} ${document.singular} ${action.label}`
  
  return (
    <div className="bg-white text-slate-900">
      {/* URGENCY HERO - Red/Danger Theme */}
      <section className="relative overflow-hidden py-20 px-6 bg-red-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-red-950 to-slate-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            {urgency.badge} {urgency.label} Service — {urgency.timeframe} Turnaround
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {displayTitle} in {cityName}
          </h1>
          
          <p className="text-xl text-red-100 max-w-3xl mb-8 leading-relaxed">
            When time is critical, {cityName} operations trust DocStandard for {urgency.timeframe.toLowerCase()} 
            {document.singular.toLowerCase()} {action.label.toLowerCase()}. Don't miss deadlines — get your documents 
            processed accurately and fast.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-900/50">
              {action.cta} <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+18001234567" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              <Phone className="w-5 h-5" /> Call for Rush Orders
            </a>
          </div>
        </div>
      </section>

      {/* URGENCY STATS */}
      <section className="bg-red-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{urgency.timeframe}</div>
              <p className="text-red-200">Guaranteed Turnaround</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.5%</div>
              <p className="text-red-200">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-red-200">{RcityName} Support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-red-200">Deadline Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* COST OF DELAY */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingDown className="w-4 h-4" />
                The Cost of Delay
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Late {document.plural} Cost More Than Money
              </h2>
              
              <p className="text-slate-400 text-lg mb-8">
                In {cityName}, missed deadlines mean missed opportunities. Every hour of delay 
                creates cascading problems for your supply chain.
              </p>
              
              <div className="space-y-4">
                {[
                  { stat: "$2,500+", label: "Average demurrage per day" },
                  { stat: "48-72 hrs", label: "Customs hold for errors" },
                  { stat: "15%", label: "Revenue loss from delays" },
                  { stat: "Contract", label: "Penalties for late filing" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-red-400">{item.stat}</div>
                    <div className="text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6">Real {cityName} Scenarios</h3>
                <div className="space-y-4">
                  {[
                    `${document.singular} errors delayed shipment → $3,200 demurrage`,
                    `Late ${document.singular.toLowerCase()} filing → 3-day customs hold`,
                    `Manual processing bottleneck → Missed vessel cutoff`,
                    `Data entry errors → Customer penalty clauses triggered`
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

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {urgency.label} {action.label} in {urgency.timeframe}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Streamlined process designed for speed without sacrificing accuracy
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", icon: FileText, title: "Upload", desc: `Submit your ${document.plural.toLowerCase()} via secure portal or email` },
              { step: "02", icon: Zap, title: "Rush Queue", desc: "Immediately flagged for priority processing" },
              { step: "03", icon: CheckCircle, title: "Processing", desc: "AI + human verification for accuracy" },
              { step: "04", icon: Truck, title: "Delivery", desc: `Clean data delivered in ${urgency.timeframe.toLowerCase()}` }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-sm font-bold text-red-600 mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITY CONTEXT */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {cityName} {vertical.label} Operations
              </h2>
              
              <p className="text-slate-600 text-lg mb-6">
                {cityName} is a critical logistics hub in {country}. Operations here 
                depend on fast, accurate document processing to maintain competitive advantage.
              </p>
              
              {(majorPorts.length > 0 || airports.length > 0) && (
                <div className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Local Infrastructure</h3>
                  
                  {majorPorts.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-500 mb-1">Major Ports</p>
                      <p className="text-slate-700">{majorPorts.join(", ")}</p>
                    </div>
                  )}
                  
                  {airports.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Air Cargo</p>
                      <p className="text-slate-700">{airports.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-slate-900">Cutoff Awareness</h3>
                </div>
                <p className="text-slate-600">
                  We track {cityName} port and carrier cutoff times to ensure your 
                  {document.plural.toLowerCase()} are processed before deadlines.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-slate-900">{country} Compliance</h3>
                </div>
                <p className="text-slate-600">
                  All processing adheres to {country} regulatory requirements and 
                  local {cityName} customs procedures.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Timer className="w-6 h-6 text-red-600" />
                  <h3 className="font-bold text-slate-900">Local Time Zone</h3>
                </div>
                <p className="text-slate-600">
                  Processing schedules aligned to {cityName} business hours. Rush orders 
                  accepted 24/7 with local support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't Miss Your Deadline
          </h2>
          
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Get your {document.plural.toLowerCase()} processed in {urgency.timeframe.toLowerCase()}. 
            {cityName} operations trust DocStandard when time is critical.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition">
              {action.cta} <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:rush@docstandard.co" className="inline-flex items-center gap-2 bg-red-700 text-white border border-red-500 px-8 py-4 rounded-xl font-semibold hover:bg-red-800 transition">
              <Mail className="w-5 h-5" /> Email Rush Request
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
