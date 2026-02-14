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
              <p className="text-red-200">{cityName} Support</p>
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

      {/* PAIN SECTION - 3 Column Icons */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The {document.singular} Processing Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} operations face critical bottlenecks that {urgency.label.toLowerCase()} processing eliminates
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Manual Data Chaos</h3>
              <p className="text-slate-600">
                Every {document.singular.toLowerCase()} requires manual extraction, reformatting, and validation. 
                Errors compound with volume, creating {cityName} processing backlogs.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Deadline Pressure</h3>
              <p className="text-slate-600">
                {cityName} port cutoffs and carrier deadlines don't wait. Manual processing 
                creates last-minute rushes and missed vessels.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cost Escalation</h3>
              <p className="text-slate-600">
                Every hour of delay in {cityName} multiplies costs — demurrage, detention, 
                expedited freight, and customer penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL GUIDE - Master Mapping Blueprint */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Master Field Mapping Blueprint
            </h2>
            <p className="text-slate-600 text-lg">
              How DocStandard extracts and validates {document.singular.toLowerCase()} fields for {cityName} {urgency.label.toLowerCase()} processing
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
              ["Document Number", "Header/Top-right", "Unique alphanumeric", "String, validated"],
              ["Date Issued", "Date field", "Valid date, not future", "ISO date"],
              ["Reference ID", "Reference block", "Cross-reference check", "Linked record ID"],
              ["Party Name", "Shipper/Consignee", "Non-empty, max 100 chars", "Normalized string"],
              ["Location", "Origin/Destination", "Valid UN/LOCODE", "Port/Airport code"],
              ["Line Items", "Detail section", "Array of valid items", "Structured array"],
              ["Quantities", "Quantity fields", "Numeric, positive", "Decimal(10,2)"],
              ["Amounts", "Cost/Value fields", "Numeric, currency", "Decimal + currency"],
              ["Tax/Duty", "Tax section", "Valid calculation", "Validated amount"],
              ["Signatures", "Signature block", "Required if applicable", "Boolean + name"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 text-sm border-b border-slate-800 hover:bg-slate-800/50">
                <div className="text-red-400 font-medium">{row[0]}</div>
                <div className="text-slate-300">{row[1]}</div>
                <div className="text-slate-400">{row[2]}</div>
                <div className="text-slate-300">{row[3]}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Multi-Format Support</h4>
              <p className="text-sm text-slate-600">
                Handles PDF, scanned images, photos, and digital exports. OCR extracts from any quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Data Normalization</h4>
              <p className="text-sm text-slate-600">
                Standardizes dates, currencies, addresses, and commodity descriptions across all sources.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Exception Handling</h4>
              <p className="text-sm text-slate-600">
                Flagged documents route to rush review queue with context for {urgency.timeframe} resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI SECTION - 4 Cards */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {urgency.label} Processing Impact for {cityName}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings when deadlines matter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4-6 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Standard processing</p>
              <div className="text-red-400 text-sm">Without rush</div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{urgency.timeframe}</div>
              <p className="text-slate-400 text-sm mb-2">With {urgency.label}</p>
              <div className="text-green-400 text-sm">Guaranteed</div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$5K+</div>
              <p className="text-slate-400 text-sm mb-2">Demurrage avoided</p>
              <div className="text-red-400 text-sm">Per shipment</div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <p className="text-slate-400 text-sm mb-2">Deadline met</p>
              <div className="text-purple-400 text-sm">Or refund</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID - 3 Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {cityName} Teams Choose {urgency.label} Processing
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100">
              <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{urgency.timeframe} Guarantee</h3>
              <p className="text-slate-600">
                Fixed turnaround time with deadline guarantee. If we miss it, you don't pay. 
                Designed for {cityName} operations that can't wait.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100">
              <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accuracy Under Pressure</h3>
              <p className="text-slate-600">
                99.5% accuracy even at rush speed. Dual verification on all {document.plural.toLowerCase()} 
                ensures quality doesn't suffer for speed.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-red-100">
              <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 {cityName} Support</h3>
              <p className="text-slate-600">
                Direct line to processing team. Real humans available around the clock 
                for urgent questions and status updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - 4+ Questions */}
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
                q: `How does ${urgency.label.toLowerCase()} ${document.singular.toLowerCase()} ${action.label.toLowerCase()} work in ${cityName}?`,
                a: `We prioritize your ${document.plural.toLowerCase()} in our processing queue the moment they're received. For ${cityName} operations, this means ${urgency.timeframe.toLowerCase()} turnaround from upload to delivery, with real-time status updates throughout.`
              },
              {
                q: `What if my ${document.singular.toLowerCase()} is complex or low quality?`,
                a: `Even damaged scans or handwritten sections are handled. If OCR can't extract data automatically, our team manually processes it within the same ${urgency.timeframe.toLowerCase()} window. No extra charge for complexity.`
              },
              {
                q: `Can you meet ${cityName} port and carrier cutoff times?`,
                a: `Yes. We track major ${cityName} port schedules and carrier deadlines. Submit your ${document.plural.toLowerCase()} with cutoff time noted, and we'll prioritize to ensure you make it.`
              },
              {
                q: `What output formats do you deliver?`,
                a: `Excel, CSV, JSON, or direct API integration. Data is structured and validated according to your target system requirements — ready for immediate use.`
              },
              {
                q: `Is there a deadline guarantee?`,
                a: `Absolutely. If we don't deliver within ${urgency.timeframe.toLowerCase()}, the processing is free. That's our commitment to ${cityName} operations that depend on speed.`
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - 3 Quotes */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Operations Teams Say
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
                "We had a vessel departing in 6 hours and our BOLs were a mess. DocStandard had them processed in 2 hours. Saved us $8,000 in demurrage."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Manager</div>
                <div className="text-sm text-slate-500">Freight Forwarder, Europe</div>
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
                "The 4-hour guarantee is real. We've used rush processing 20+ times and they've never missed a deadline. Accuracy is always spot-on."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Logistics Director</div>
                <div className="text-sm text-slate-500">Import/Export Company, Asia</div>
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
                "During peak season, we process 200+ rush documents weekly. DocStandard scales with us without quality drop. They're our safety net."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Supply Chain VP</div>
                <div className="text-sm text-slate-500">3PL Provider, North America</div>
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
