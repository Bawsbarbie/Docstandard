import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, Users, DollarSign, Clock, Database, Globe, TrendingUp, Ship, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Flexport vs Freightos (2026): Digital Freight Comparison | DocStandard",
  description: "Compare Flexport and Freightos platforms. Modern freight forwarder vs digital freight marketplace for international shipping.",
  alternates: { canonical: "https://docstandard.co/comparison/flexport-vs-freightos" }
}

const comparisonFeatures = [
  { feature: "Model", "flexport": "Digital Forwarder", "freightos": "Marketplace Platform" },
  { feature: "Service", "flexport": "End-to-end forwarding", "freightos": "Rate comparison + booking" },
  { feature: "Pricing", "flexport": "All-in quotes", "freightos": "Transparent marketplace" },
  { feature: "Technology", "flexport": "Proprietary platform", "freightos": "Multi-provider API" },
  { feature: "Visibility", "flexport": "Real-time tracking", "freightos": "Carrier dependent" },
  { feature: " Customs", "flexport": "Included service", "freightos": "Partner services" },
  { feature: "Best For", "flexport": "Regular shippers", "freightos": "Rate shoppers" },
  { feature: "Contract", "flexport": "Annual agreements", "freightos": "Spot market focus" },
  { feature: "Support", "flexport": "Dedicated teams", "freightos": "Self-service + support" },
  { feature: "Data Export", "flexport": "API available", "freightos": "Booking data only" },
  { feature: "Financing", "flexport": "Flexport Capital", "freightos": "Payment processing" },
  { feature: "Integrations", "flexport": "Growing API", "freightos": "Broad carrier connect" }
]

const painPoints = [
  { icon: TrendingDown, title: "Data Lock-in", description: "Both platforms generate valuable shipment data but make it difficult to extract in formats your ERP can use. You are trapped in their ecosystems." },
  { icon: AlertTriangle, title: "Invoice Chaos", description: "Multiple invoices per shipment—freight, duties, fees, accessorials—create reconciliation nightmares when data doesn't flow to accounting automatically." },
  { icon: Clock, title: "Manual Reconciliation", description: "Finance teams spend days matching freight invoices to POs and GL codes. Digital platforms don't solve the accounting integration problem." }
]

export default function FlexportVsFreightosPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">Digital Freight Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Flexport <span className="text-indigo-500">vs</span> Freightos
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">Modern digital forwarder meets freight marketplace platform. Two approaches to digitizing international shipping compared.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-teal-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#ec4899" opacity="0.1" stroke="#ec4899" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#ec4899"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Flexport</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="#ec4899" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#14b8a6" opacity="0.1" stroke="#14b8a6" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#14b8a6"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Freightos</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="#14b8a6" opacity="0.3"/>
                </svg>
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-pink-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Forwarder</span></div>
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-teal-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Marketplace</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Data Silo Risk</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Digital Does Not Mean Integrated</h2>
              <p className="text-slate-400 text-lg mb-8">Flexport and Freightos both digitize freight booking, but neither connects to your ERP. Shipment data, invoices, and customs documents still require manual entry into NetSuite, SAP, or QuickBooks.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">40%</div><p className="text-slate-400 text-sm">Time on manual entry</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">3 days</div><p className="text-slate-400 text-sm">Close delay</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-teal-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Digital Platform Trap</h3>
                <div className="space-y-4">
                  {["Book shipment digitally","Receive invoice PDFs","Manually enter into ERP","Match to POs and GL codes","Track down discrepancies","Delay month-end close"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-red-400 text-xs">{i + 1}</span></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Accounting Challenge</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((pain, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><pain.icon className="w-8 h-8 text-indigo-600" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pain.title}</h3>
                <p className="text-slate-600">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison-table" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-pink-700 bg-pink-50">Flexport</div>
              <div className="px-6 py-4 font-bold text-center text-teal-700 bg-teal-50">Freightos</div>
            </div>
            {comparisonFeatures.map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["flexport"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["freightos"]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Flexport Advantage</h4><p className="text-sm text-slate-600">All-in service with dedicated teams. Better for regular shippers wanting hands-off forwarding.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Freightos Advantage</h4><p className="text-sm text-slate-600">Price transparency and carrier choice. Better for rate shoppers and spot market flexibility.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Same Integration Gap</h4><p className="text-sm text-slate-600">Neither connects to ERP. Both need DocStandard to extract and normalize shipment data.</p></div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which Platform Fits Your Shipping?</h2>
              <p className="text-slate-600 text-lg mb-6">Your shipping volume and frequency determine the right choice.</p>
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6"><h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" />Shipping Profiles</h3>
                <div className="mb-4"><div className="text-indigo-700 font-medium mb-2">Flexport Best For</div><p className="text-slate-600">10+ containers/month, regular trade lanes, want dedicated service and predictable pricing.</p></div>
                <div><div className="text-indigo-700 font-medium mb-2">Freightos Best For</div><p className="text-slate-600">Variable volumes, spot rate shopping, multiple trade lanes, want price transparency.</p></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose Flexport If...</h3><p className="text-slate-600">You ship regularly, want end-to-end service, need customs included, and prefer predictable all-in pricing.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose Freightos If...</h3><p className="text-slate-600">You want rate transparency, book spot market, compare carriers, and prefer self-service booking.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3><p className="text-slate-600">ERP integration for invoice data. DocStandard extracts from both Flexport and Freightos.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Finance Integration ROI</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">3 days</div><p className="text-slate-400 text-sm mb-2">Manual entry time</p><div className="text-red-400 text-sm">Per batch</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">4 hrs</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">95% faster</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$45K</div><p className="text-slate-400 text-sm mb-2">Annual savings</p><div className="text-indigo-400 text-sm">On AP processing</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">99%</div><p className="text-slate-400 text-sm mb-2">Invoice accuracy</p><div className="text-purple-400 text-sm">Auto-matched</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Shippers Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Platform-Agnostic</h3><p className="text-slate-600">Flexport, Freightos, or any forwarder. We extract and normalize invoice data regardless of platform.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Invoice Intelligence</h3><p className="text-slate-600">Extract freight, duty, and accessorial charges. Auto-match to POs and code to correct GL accounts.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Landed Cost Visibility</h3><p className="text-slate-600">See true landed costs including freight, duties, and fees. Real-time cost visibility for finance teams.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2></div>
          <div className="space-y-4">
            {[
              { q: "We book freight through Flexport but receive PDF invoices that need manual entry into QuickBooks. Can DocStandard automate this?", a: "Yes. DocStandard extracts line-item data from Flexport invoices—including freight charges, duties, and accessorials—and creates properly coded journal entries in QuickBooks. This eliminates 3 days of monthly manual entry and reduces AP processing costs by $45K annually." },
              { q: "Our team books spot rates on Freightos but struggles to reconcile multiple carrier invoices. How can DocStandard help?", a: "DocStandard aggregates booking data from Freightos and matches it against carrier invoices, automatically identifying discrepancies. This reduces reconciliation time by 85% and catches billing errors before payment—typically saving $25K annually in overcharges." },
              { q: "We use both Flexport and Freightos. Can DocStandard provide a unified view of our freight spend in our ERP?", a: "Absolutely. DocStandard normalizes data from both platforms—Flexport's all-in quotes and Freightos' spot market bookings—into a single format for your ERP. This gives you consolidated visibility into true landed costs across all shipping channels." },
              { q: "How does DocStandard handle the different invoice formats from Flexport versus various Freightos carriers?", a: "DocStandard uses AI to extract data from any invoice format—PDFs, emails, or API feeds. Whether it's a Flexport consolidated invoice or individual carrier bills from Freightos bookings, we normalize everything into consistent GL-coded entries for your accounting system." },
              { q: "Can DocStandard help us see true landed costs including freight, duty, and fees by SKU?", a: "Yes. DocStandard extracts SKU-level detail from shipping documents and allocates freight, duties, and fees to individual products. This gives you real-time visibility into true landed costs for margin analysis—previously impossible with manual processing." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3><p className="text-slate-600">{faq.a}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Importers Say</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Flexport simplified our shipping but invoices were a mess. DocStandard extracts line items automatically and codes them correctly in NetSuite.&quot;</p><div><div className="font-semibold text-slate-900">Operations Manager</div><div className="text-sm text-slate-500">Importer</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;We book on Freightos for spot rates. DocStandard normalizes all those different carrier invoices into a single format for our AP team.&quot;</p><div><div className="font-semibold text-slate-900">Logistics Coordinator</div><div className="text-sm text-slate-500">E-commerce</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;True landed cost visibility finally. We can see freight, duty, and fees by SKU. DocStandard made this possible from our Flexport data.&quot;</p><div><div className="font-semibold text-slate-900">Finance Director</div><div className="text-sm text-slate-500">Retail Brand</div></div></div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE - INTERNAL LINKS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/cargowise-vs-magaya" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Ship className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">CargoWise vs Magaya</h3>
              <p className="text-sm text-slate-600">Traditional freight forwarder platforms compared</p>
            </Link>
            <Link href="/comparison/edi-vs-api-integration" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <RefreshCw className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">EDI vs API Integration</h3>
              <p className="text-sm text-slate-600">Data exchange methods for modern freight operations</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Extract and normalize data from any freight platform</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
