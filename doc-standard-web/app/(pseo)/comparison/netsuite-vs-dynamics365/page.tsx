import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, Users, DollarSign, Clock, Database } from "lucide-react"

export const metadata: Metadata = {
  title: "NetSuite vs Dynamics 365 (2026): ERP Comparison | DocStandard",
  description: "Compare NetSuite and Microsoft Dynamics 365 for logistics. Cloud-native vs ecosystem integration, pricing, and best fit analysis.",
  alternates: { canonical: "https://docstandard.co/comparison/netsuite-vs-dynamics365" }
}

const comparisonFeatures = [
  { feature: "Deployment", "netsuite": "100% Cloud", dynamics: "Cloud + On-prem" },
  { feature: "Starting Price", "netsuite": "$999/mo base", dynamics: "$210/mo/user" },
  { feature: "Implementation", "netsuite": "3-6 months", dynamics: "6-12 months" },
  { feature: "Customization", "netsuite": "SuiteScript (JS)", dynamics: "Power Platform" },
  { feature: "Microsoft Integration", "netsuite": "Connector-based", dynamics: "Native (Teams, Outlook)" },
  { feature: "Multi-subsidiary", "netsuite": "Built-in", dynamics: "Requires config" },
  { feature: "E-commerce", "netsuite": "SuiteCommerce", dynamics: "Dynamics Commerce" },
  { feature: "CRM", "netsuite": "Built-in", dynamics: "Dynamics 365 Sales" },
  { feature: "Logistics Fit", "netsuite": "Strong", dynamics: "Moderate" },
  { feature: "Global Tax", "netsuite": "OneTax engine", dynamics: "Avalara integration" },
  { feature: "Reporting", "netsuite": "SuiteAnalytics", dynamics: "Power BI native" },
  { feature: "Mobile App", "netsuite": "SuitePhone", dynamics: "Power Apps" }
]

export default function NetSuiteVsDynamicsPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">ERP Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                NetSuite <span className="text-indigo-500">vs</span> Dynamics 365
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">Cloud-native ERP powerhouse meets Microsoft ecosystem integration. Which platform fits your logistics business?</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-blue-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#4f46e5"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">NetSuite</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#3b82f6" opacity="0.1" stroke="#3b82f6" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#3b82f6"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Dynamics 365</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="#3b82f6" opacity="0.3"/>
                </svg>
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-indigo-600 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Oracle Cloud</span></div>
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Microsoft</span></div>
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
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Integration Challenge</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your ERP Choice Determines Your Stack</h2>
              <p className="text-slate-400 text-lg mb-8">NetSuite and Dynamics 365 both require logistics data, but neither connects to TMS systems out of the box. Getting CargoWise, Magaya, or SAP TM data into your ERP is where teams get stuck.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">6 mo</div><p className="text-slate-400 text-sm">Avg integration project</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$80K</div><p className="text-slate-400 text-sm">Custom dev cost</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The ERP Integration Trap</h3>
                <div className="space-y-4">
                  {["Choose your ERP","Realize TMS doesn't integrate","Hire integration consultants","Build custom middleware","Maintain as APIs change","Pay for ongoing support"].map((item, i) => (
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
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Comparison</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Database, title: "Data Silos", desc: "Both ERPs create data silos. TMS exports do not match ERP import formats without transformation." },
              { icon: AlertTriangle, title: "Real-time Gap", desc: "Batch imports create lag. Your ERP shows yesterday's shipment data when you need today's." },
              { icon: Clock, title: "IT Dependency", desc: "Every TMS change requires IT involvement. Custom mappings break when systems update." }
            ].map((pain, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><pain.icon className="w-8 h-8 text-indigo-600" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pain.title}</h3>
                <p className="text-slate-600">{pain.desc}</p>
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
              <div className="px-6 py-4 font-bold text-center text-indigo-700 bg-indigo-50">NetSuite</div>
              <div className="px-6 py-4 font-bold text-center text-blue-700 bg-blue-50">Dynamics 365</div>
            </div>
            {comparisonFeatures.map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["netsuite"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.dynamics}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">NetSuite Advantage</h4><p className="text-sm text-slate-600">Purpose-built for growing logistics companies. Strong multi-subsidiary support out of the box.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Dynamics Advantage</h4><p className="text-sm text-slate-600">If you live in Microsoft 365, the integration is unmatched. Power BI reporting is superior.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Same Integration Need</h4><p className="text-sm text-slate-600">Both need help connecting to TMS. DocStandard normalizes data for either ERP.</p></div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which ERP Fits Your Business?</h2>
              <p className="text-slate-600 text-lg mb-6">Your existing software ecosystem is the key deciding factor.</p>
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6"><h3 className="font-semibold text-indigo-900 mb-4">Ecosystem Fit</h3>
                <div className="mb-4"><div className="text-indigo-700 font-medium mb-2">NetSuite Strengths</div><p className="text-slate-600">Fast-growing companies, multi-entity operations, companies wanting all-in-one cloud ERP.</p></div>
                <div><div className="text-indigo-700 font-medium mb-2">Dynamics Strengths</div><p className="text-slate-600">Microsoft-heavy environments, complex manufacturing, enterprises wanting on-premise options.</p></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose NetSuite If...</h3><p className="text-slate-600">You want true cloud, need multi-subsidiary consolidation, prefer faster implementation, and want logistics-focused features.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose Dynamics If...</h3><p className="text-slate-600">You live in Microsoft 365, need advanced manufacturing, want Power BI analytics, or require on-premise deployment.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3><p className="text-slate-600">TMS data integration. DocStandard connects CargoWise/Magaya/SAP to both NetSuite and Dynamics.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Integration ROI</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">6 mo</div><p className="text-slate-400 text-sm mb-2">Custom integration</p><div className="text-red-400 text-sm">Dev time</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">24h</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">Setup time</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$80K</div><p className="text-slate-400 text-sm mb-2">Dev cost saved</p><div className="text-indigo-400 text-sm">vs custom build</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">99%</div><p className="text-slate-400 text-sm mb-2">Data accuracy</p><div className="text-purple-400 text-sm">Guaranteed</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Finance Teams Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Agnostic</h3><p className="text-slate-600">NetSuite, Dynamics 365, SAP, or QuickBooks. We normalize data for any ERP.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Journal-Ready</h3><p className="text-slate-600">Data arrives formatted for your Chart of Accounts. No reformatting or manual mapping.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Close Faster</h3><p className="text-slate-600">Month-end reconciliation drops from days to hours. Automated data means clean books.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2></div>
          <div className="space-y-4">
            {[
              { q: "We run NetSuite but our TMS doesn't integrate natively. Can DocStandard bridge this gap?", a: "Yes. DocStandard extracts shipment data from any TMS—CargoWise, Magaya, SAP TM—and delivers it in NetSuite-native format via CSV or SuiteTalk API. This eliminates 6+ months of custom development and $80K+ in integration costs, with setup completed in 24 hours." },
              { q: "Our Dynamics 365 system needs freight data from multiple sources. How does DocStandard handle this?", a: "DocStandard normalizes data from mixed sources—EDI from carriers, APIs from 3PLs, PDFs from brokers—and delivers consistent OData payloads to Dynamics 365. This provides unified visibility without maintaining multiple custom connectors." },
              { q: "We're migrating from Dynamics to NetSuite. Can DocStandard help with the data transfer?", a: "Absolutely. DocStandard maintains consistent data formatting during ERP transitions, ensuring your TMS integrations continue working seamlessly. This reduces migration risk and prevents the 3-4 week integration downtime typically seen during ERP switches." },
              { q: "How does DocStandard reduce month-end close time for NetSuite/Dynamics users?", a: "DocStandard automates the flow of freight invoices, customs entries, and shipment costs into your ERP daily—not just at month-end. This eliminates the 5-day reconciliation crunch, reducing close time to 2 days and improving cash flow visibility." },
              { q: "Can DocStandard handle multi-entity freight data for our global NetSuite/Dynamics deployment?", a: "Yes. DocStandard routes documents to the correct subsidiary based on origin, destination, or business unit rules. This ensures proper GL allocation across entities and eliminates manual sorting—saving 15+ hours weekly for shared services teams." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3><p className="text-slate-600">{faq.a}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Finance Teams Say</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;We chose NetSuite but our TMS didn&apos;t integrate. DocStandard bridged the gap, and now journal entries flow automatically.&quot;</p><div><div className="font-semibold text-slate-900">Controller</div><div className="text-sm text-slate-500">Freight Forwarder</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Dynamics 365 works great with our Office setup, but logistics data was a nightmare. DocStandard normalized everything for import.&quot;</p><div><div className="font-semibold text-slate-900">IT Director</div><div className="text-sm text-slate-500">3PL Provider</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Month-end used to take 5 days. With automated data from DocStandard, we close in 2 days regardless of ERP choice.&quot;</p><div><div className="font-semibold text-slate-900">VP Finance</div><div className="text-sm text-slate-500">Logistics Company</div></div></div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE - INTERNAL LINKS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/quickbooks-vs-sage" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">QuickBooks vs Sage</h3>
              <p className="text-sm text-slate-600">SMB accounting solutions for logistics businesses</p>
            </Link>
            <Link href="/comparison/sap-tm-vs-oracle-otm" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">SAP TM vs Oracle OTM</h3>
              <p className="text-sm text-slate-600">Enterprise TMS platforms for large operations</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Integrate any TMS with NetSuite or Dynamics 365</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
