import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, Users, DollarSign, Clock, Database, Globe, MapPin, Ship } from "lucide-react"

export const metadata: Metadata = {
  title: "Descartes vs MercuryGate (2026): TMS Comparison | DocStandard",
  description: "Compare Descartes and MercuryGate TMS platforms. Global logistics network vs SaaS freight execution for supply chain operations.",
  alternates: { canonical: "https://docstandard.co/comparison/descartes-vs-mercurygate" }
}

const comparisonFeatures = [
  { feature: "Core Strength", "descartes": "Global trade & customs", mercury: "Transportation execution" },
  { feature: "Deployment", "descartes": "Cloud + On-premise", mercury: "SaaS Cloud" },
  { feature: "Global Network", "descartes": "Extensive (Customs)", mercury: "Strong (Carriers)" },
  { feature: "Customs/Tariff", "descartes": "Market leader", mercury: "Partner integration" },
  { feature: "Starting Price", "descartes": "Enterprise pricing", mercury: "$2,500/mo" },
  { feature: "Implementation", "descartes": "6-12 months", mercury: "2-4 months" },
  { feature: "Carrier Connectivity", "descartes": "Good", mercury: "Excellent" },
  { feature: "Visibility", "descartes": "Global trade focus", mercury: "Multi-modal" },
  { feature: "Trade Compliance", "descartes": "Best-in-class", mercury: "Good" },
  { feature: "SMB Friendly", "descartes": "Enterprise focus", mercury: "Mid-market+" },
  { feature: "API/Integration", "descartes": "Comprehensive", mercury: "REST API" },
  { feature: "Mobile", "descartes": "Limited", mercury: "Full app" }
]

const painPoints = [
  { icon: TrendingDown, title: "Data Fragmentation", description: "Both platforms excel in different areas—Descartes for global trade, MercuryGate for execution—creating data silos that do not talk to your ERP without expensive integration work." },
  { icon: AlertTriangle, title: "Export Complexity", description: "Getting shipment data out in a format your accounting system can use requires manual transformation or custom middleware development." },
  { icon: Clock, title: "Delayed Visibility", description: "Without integration, finance teams wait days for shipment cost data, delaying month-end close and financial reporting." }
]

export default function DescartesVsMercurygatePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">TMS Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Descartes <span className="text-indigo-500">vs</span> MercuryGate
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">Global trade compliance powerhouse meets SaaS transportation execution. Two different approaches to logistics management compared.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-orange-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#06b6d4" opacity="0.1" stroke="#06b6d4" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#06b6d4"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Descartes</text>
                  <circle cx="70" cy="120" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="110" cy="120" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="70" cy="160" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="110" cy="160" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="70" cy="200" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="110" cy="200" r="15" fill="#06b6d4" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#f97316" opacity="0.1" stroke="#f97316" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#f97316"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MercuryGate</text>
                  <rect x="250" y="105" width="110" height="15" rx="7" fill="#f97316" opacity="0.3"/>
                  <rect x="250" y="130" width="110" height="15" rx="7" fill="#f97316" opacity="0.3"/>
                  <rect x="250" y="155" width="110" height="15" rx="7" fill="#f97316" opacity="0.3"/>
                  <rect x="250" y="180" width="110" height="15" rx="7" fill="#f97316" opacity="0.3"/>
                  <rect x="250" y="205" width="110" height="15" rx="7" fill="#f97316" opacity="0.3"/>
                </svg>
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-cyan-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Global Trade</span></div>
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Execution</span></div>
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
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Integration Gap</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your TMS Does Not Connect to Finance</h2>
              <p className="text-slate-400 text-lg mb-8">Whether you choose Descartes for global trade or MercuryGate for execution, you will face the same problem: shipment data trapped in your TMS while finance needs it in the ERP.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">5-7 days</div><p className="text-slate-400 text-sm">Delay to close</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">40%</div><p className="text-slate-400 text-sm">Time on data prep</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Visibility Trap</h3>
                <div className="space-y-4">
                  {["Ship via TMS","Data stays siloed","Finance requests reports","Manual export to Excel","Reformat for ERP","Delayed visibility"].map((item, i) => (
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
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Integration Challenge</h2></div>
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
              <div className="px-6 py-4 font-bold text-center text-cyan-700 bg-cyan-50">Descartes</div>
              <div className="px-6 py-4 font-bold text-center text-orange-700 bg-orange-50">MercuryGate</div>
            </div>
            {comparisonFeatures.map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["descartes"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.mercury}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Descartes Strength</h4><p className="text-sm text-slate-600">Unmatched global trade compliance and customs capabilities. Best for complex international operations.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">MercuryGate Strength</h4><p className="text-sm text-slate-600">Superior transportation execution and carrier connectivity. Faster deployment and modern UX.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Same Integration Need</h4><p className="text-sm text-slate-600">Both need help connecting to ERP. DocStandard normalizes data from either TMS platform.</p></div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which Platform Fits Your Operation?</h2>
              <p className="text-slate-600 text-lg mb-6">Your trade complexity determines the right choice.</p>
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6"><h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2"><Globe className="w-5 h-5" />Global Coverage</h3>
                <div className="mb-4"><div className="text-indigo-700 font-medium mb-2">Descartes Reach</div><p className="text-slate-600">200+ countries, customs in 80+ nations, leading denied party screening.</p></div>
                <div><div className="text-indigo-700 font-medium mb-2">MercuryGate Reach</div><p className="text-slate-600">Strong North America and Europe, expanding global carrier network.</p></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose Descartes If...</h3><p className="text-slate-600">You manage complex international trade, need customs/tariff management, operate in 10+ countries, and compliance is critical.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose MercuryGate If...</h3><p className="text-slate-600">You need transportation execution, want faster deployment, prefer modern SaaS, and carrier connectivity is priority.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3><p className="text-slate-600">ERP integration for shipment data. DocStandard connects both Descartes and MercuryGate to your accounting system.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Finance Integration ROI</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">5-7 days</div><p className="text-slate-400 text-sm mb-2">Month-end delay</p><div className="text-red-400 text-sm">Without integration</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">2 days</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">70% faster</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$120K</div><p className="text-slate-400 text-sm mb-2">Annual savings</p><div className="text-indigo-400 text-sm">Labor + penalties</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">Zero</div><p className="text-slate-400 text-sm mb-2">Compliance penalties</p><div className="text-purple-400 text-sm">Accurate data</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Logistics Teams Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">TMS-Agnostic</h3><p className="text-slate-600">Works with Descartes, MercuryGate, or any TMS. Normalizes data regardless of platform.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Global Trade Ready</h3><p className="text-slate-600">Handles multi-currency, landed cost, and compliance data. Perfect for international logistics.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Visibility</h3><p className="text-slate-600">Finance sees shipment costs as they happen. No more waiting for month-end reports.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2></div>
          <div className="space-y-4">
            {[
              { q: "We use Descartes for customs but finance never sees the landed cost data. Can DocStandard help?", a: "Yes. DocStandard extracts customs entries, duty calculations, and landed costs from Descartes and delivers them directly to your ERP's GL. This eliminates the 5-7 day delay for month-end close and provides real-time visibility into true landed costs by SKU." },
              { q: "Our MercuryGate system generates shipment data but accounting needs it in NetSuite. How does DocStandard bridge this?", a: "DocStandard polls MercuryGate via API, extracts shipment and billing data, transforms it to NetSuite's format, and delivers journal-ready imports. This cuts reconciliation time from 3 days to 4 hours and eliminates manual CSV handling." },
              { q: "We're using both Descartes and MercuryGate for different regions. Can DocStandard normalize data from both?", a: "Absolutely. DocStandard accepts data from both platforms—Descartes for global trade and MercuryGate for transportation—and normalizes them into a single, consistent format for your ERP. This unified view eliminates data silos and provides global visibility." },
              { q: "How does DocStandard handle the mix of EDI and API connections from these TMS platforms?", a: "DocStandard is format-agnostic. Whether your Descartes data arrives via EDI X12, XML, or API, and your MercuryGate data via REST API, we normalize everything into a standard schema. This saves $95K annually compared to maintaining separate integration stacks." },
              { q: "Can DocStandard reduce the errors we see when manually exporting from Descartes/MercuryGate to our ERP?", a: "Yes. DocStandard's built-in validation catches 99.8% of data errors before they reach your ERP. This eliminates the need for re-imports, reduces reconciliation time by 70%, and prevents compliance issues from incorrect customs data." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3><p className="text-slate-600">{faq.a}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Operations Teams Say</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Descartes handles our customs but finance never saw the data. DocStandard now feeds landed costs directly to NetSuite automatically.&quot;</p><div><div className="font-semibold text-slate-900">Trade Compliance Manager</div><div className="text-sm text-slate-500">Importer/Exporter</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;MercuryGate improved our carrier management but reconciliation was a nightmare. DocStandard eliminated the manual export/import cycle.&quot;</p><div><div className="font-semibold text-slate-900">Transportation Director</div><div className="text-sm text-slate-500">3PL Provider</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;We use both platforms for different regions. DocStandard normalizes data from both into a single format for our global ERP.&quot;</p><div><div className="font-semibold text-slate-900">Global Logistics Manager</div><div className="text-sm text-slate-500">Manufacturer</div></div></div>
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
              <p className="text-sm text-slate-600">Enterprise power meets SMB agility in TMS comparison</p>
            </Link>
            <Link href="/comparison/sap-tm-vs-oracle-otm" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">SAP TM vs Oracle OTM</h3>
              <p className="text-sm text-slate-600">Enterprise transportation management titans compared</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Automated extraction and normalization for logistics</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
