import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, Users, DollarSign, Clock, Database, Calculator, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "QuickBooks vs Sage (2026): Accounting Software Comparison | DocStandard",
  description: "Compare QuickBooks and Sage for logistics businesses. Cloud simplicity vs robust accounting for freight and supply chain operations.",
  alternates: { canonical: "https://docstandard.co/comparison/quickbooks-vs-sage" }
}

const comparisonFeatures = [
  { feature: "Best For", "quickbooks": "SMB &lt;100 employees", "sage": "Mid-market 100-500" },
  { feature: "Starting Price", "quickbooks": "$30/mo", "sage": "$200/mo" },
  { feature: "Cloud/Online", "quickbooks": "Native cloud", "sage": "Cloud + Desktop" },
  { feature: "Multi-entity", "quickbooks": "Limited", "sage": "Strong" },
  { feature: "Inventory", "quickbooks": "Basic", "sage": "Advanced" },
  { feature: "Multi-currency", "quickbooks": "Essentials+", "sage": "Built-in" },
  { feature: "Job Costing", "quickbooks": "Simple", "sage": "Detailed" },
  { feature: "Reporting", "quickbooks": "Standard", "sage": "Customizable" },
  { feature: "App Ecosystem", "quickbooks": "700+ apps", "sage": "Smaller" },
  { feature: "Ease of Use", "quickbooks": "Very easy", "sage": "Moderate" },
  { feature: "Logistics Fit", "quickbooks": "Good for small", "sage": "Better for complex" },
  { feature: "Scalability", "quickbooks": "Limited", "sage": "High" }
]

const painPoints = [
  { icon: TrendingDown, title: "Data Entry Bottleneck", description: "Both systems require manual entry of logistics invoices, freight bills, and customs entries. Neither connects natively to TMS or freight platforms." },
  { icon: AlertTriangle, title: "Cost Allocation Complexity", description: "Freight costs need allocation by job, SKU, or shipment. Manual allocation in either system is error-prone and time-consuming." },
  { icon: Clock, title: "Reconciliation Delays", description: "Matching freight invoices to POs and receipts manually delays month-end close and obscures true landed costs." }
]

export default function QuickbooksVsSagePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">Accounting Software Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                QuickBooks <span className="text-indigo-500">vs</span> Sage
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">Cloud accounting simplicity meets robust financial management. Which platform fits your logistics business?</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-purple-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#22c55e"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">QuickBooks</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="#22c55e" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#8b5cf6"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Sage</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                </svg>
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">SMB</span></div>
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-violet-500 mx-auto mb-1"/><span className="text-sm font-semibold text-slate-700">Mid-Market</span></div>
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
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Manual Entry Burden</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Neither Connects to Your Freight Data</h2>
              <p className="text-slate-400 text-lg mb-8">QuickBooks and Sage both require manual entry of freight invoices, customs duties, and logistics costs. Your TMS does not talk to either one without expensive middleware.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">20 hrs</div><p className="text-slate-400 text-sm">Weekly data entry</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">15%</div><p className="text-slate-400 text-sm">Error rate</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Accounting Gap</h3>
                <div className="space-y-4">
                  {["Ship via TMS","Receive freight invoice","Manually enter in QB/Sage","Code to wrong GL account","Lose landed cost visibility","Delay month-end close"].map((item, i) => (
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
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Logistics Accounting Challenge</h2></div>
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
              <div className="px-6 py-4 font-bold text-center text-green-700 bg-green-50">QuickBooks</div>
              <div className="px-6 py-4 font-bold text-center text-violet-700 bg-violet-50">Sage</div>
            </div>
            {comparisonFeatures.map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["quickbooks"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["sage"]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">QuickBooks Advantage</h4><p className="text-sm text-slate-600">Easiest setup, best app ecosystem, perfect for small logistics businesses and 3PLs just starting out.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Sage Advantage</h4><p className="text-sm text-slate-600">Better for complex multi-entity operations, advanced job costing, and businesses planning rapid growth.</p></div>
            <div className="bg-white p-6 rounded-xl border border-slate-200"><h4 className="font-semibold text-slate-900 mb-2">Same Integration Solution</h4><p className="text-sm text-slate-600">DocStandard delivers formatted data to both QuickBooks and Sage. Same flat fee regardless of platform.</p></div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which Platform Fits Your Business?</h2>
              <p className="text-slate-600 text-lg mb-6">Your business size and complexity determine the right choice.</p>
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6"><h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5" />Business Size</h3>
                <div className="mb-4"><div className="text-indigo-700 font-medium mb-2">QuickBooks Sweet Spot</div><p className="text-slate-600">1-50 employees, simple operations, prioritizing ease of use over advanced features.</p></div>
                <div><div className="text-indigo-700 font-medium mb-2">Sage Sweet Spot</div><p className="text-slate-600">50-500 employees, multi-location, complex job costing, international operations.</p></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose QuickBooks If...</h3><p className="text-slate-600">You want easy setup, need basic accounting, rely on app integrations, and have under 50 employees. Prioritize speed over complexity.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Choose Sage If...</h3><p className="text-slate-600">You need multi-entity consolidation, advanced job costing, have complex inventory, or plan to scale rapidly beyond 50 employees.</p></div></div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div><div><h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3><p className="text-slate-600">Automated freight data import. DocStandard prepares journal entries for both QuickBooks and Sage from any TMS.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Freight Integration ROI</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">20 hrs</div><p className="text-slate-400 text-sm mb-2">Weekly manual entry</p><div className="text-red-400 text-sm">Without automation</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">2 hrs</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">90% reduction</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$35K</div><p className="text-slate-400 text-sm mb-2">Annual savings</p><div className="text-indigo-400 text-sm">Labor + accuracy</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">99%</div><p className="text-slate-400 text-sm mb-2">Coding accuracy</p><div className="text-purple-400 text-sm">Auto-categorized</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Logistics Accountants Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Journal-Ready Output</h3><p className="text-slate-600">Data formatted for QuickBooks or Sage import. Properly coded to your chart of accounts with correct GL mappings.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><FileText className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Job Costing Support</h3><p className="text-slate-600">Allocate freight costs by shipment, SKU, or job. Get true landed cost visibility in your accounting system.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Close Faster</h3><p className="text-slate-600">Automated data means books close in days, not weeks. Real-time freight cost visibility for better decisions.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2></div>
          <div className="space-y-4">
            {[
              { q: "We use QuickBooks but receive freight invoices that need manual entry. Can DocStandard automate this?", a: "Yes. DocStandard extracts data from freight invoices—whether PDFs, emails, or carrier portals—and delivers QuickBooks-ready IIF/CSV files with proper GL coding. This cuts 20 hours of weekly manual entry to 2 hours, saving $35K annually in labor costs." },
              { q: "Our Sage system needs landed cost data from customs entries. How does DocStandard handle this?", a: "DocStandard extracts duties, taxes, and freight charges from customs documents and allocates them by SKU for true landed cost visibility in Sage. This eliminates spreadsheet tracking and provides accurate margin analysis for imports." },
              { q: "We're a 3PL using QuickBooks. Can DocStandard handle job costing for multiple clients?", a: "Absolutely. DocStandard tags all transactions with job or client identifiers from your TMS, enabling accurate job costing in QuickBooks without manual allocation. This improves billing accuracy and client profitability reporting." },
              { q: "How does DocStandard handle the different import formats between QuickBooks and Sage?", a: "DocStandard automatically generates the correct format for your system—QuickBooks IIF/CSV or Sage import templates. Same extraction and validation process, platform-specific output. This flexibility lets you switch accounting systems without changing your document processing workflow." },
              { q: "Can DocStandard help us see real-time freight costs instead of waiting for month-end?", a: "Yes. DocStandard processes documents daily and delivers data to QuickBooks or Sage automatically. This gives you real-time visibility into freight spend, enabling proactive cost management instead of reactive month-end analysis." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3><p className="text-slate-600">{faq.a}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Accounting Teams Say</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;QuickBooks is easy but freight entries were killing us. DocStandard now imports directly from our TMS, properly coded and ready to go.&quot;</p><div><div className="font-semibold text-slate-900">Bookkeeper</div><div className="text-sm text-slate-500">Small 3PL</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Sage handles our complexity but freight data was manual. DocStandard bridges the gap, importing to Sage with job costing intact.&quot;</p><div><div className="font-semibold text-slate-900">Controller</div><div className="text-sm text-slate-500">Freight Forwarder</div></div></div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;We can finally see true landed costs by SKU. DocStandard allocates freight, duty, and fees correctly whether we use QB or Sage.&quot;</p><div><div className="font-semibold text-slate-900">Finance Manager</div><div className="text-sm text-slate-500">Importer</div></div></div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE - INTERNAL LINKS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/netsuite-vs-dynamics365" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">NetSuite vs Dynamics 365</h3>
              <p className="text-sm text-slate-600">Enterprise ERP comparison for growing logistics companies</p>
            </Link>
            <Link href="/comparison/manual-processing-vs-automated-extraction" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Manual vs Automated</h3>
              <p className="text-sm text-slate-600">ROI analysis of document processing automation</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Automated freight data import for QuickBooks and Sage</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
