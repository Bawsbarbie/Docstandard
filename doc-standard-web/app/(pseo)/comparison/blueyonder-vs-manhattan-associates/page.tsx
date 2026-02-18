import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, DollarSign, Clock, Database } from "lucide-react"

export const metadata: Metadata = {
  title: "Blue Yonder vs Manhattan Associates (2026): TMS Comparison | DocStandard",
  description: "Compare Blue Yonder and Manhattan Associates side-by-side. Features, pricing, integrations, and use cases for logistics operations.",
  alternates: { canonical: "https://docstandard.co/comparison/blueyonder-vs-manhattan-associates" },
  robots: { index: false, follow: false }
}

export default function Page() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">TMS Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">Blue Yonder <span className="text-indigo-500">vs</span> Manhattan Associates</h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">Compare Blue Yonder and Manhattan Associates for logistics operations. Side-by-side analysis of features, pricing, and capabilities to find your best fit.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-indigo-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#8b5cf6"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Blue Yonder</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="#8b5cf6" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#6366f1" opacity="0.1" stroke="#6366f1" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#6366f1"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Manhattan Associates</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="#6366f1" opacity="0.3"/>
                </svg>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Data Is Trapped Between Systems</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">Whether you choose Blue Yonder or Manhattan Associates, you are facing the same problem: getting clean data into your accounting system. Both platforms excel at their core function, but neither connects seamlessly to ERPs out of the box.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div><p className="text-slate-400 text-sm">Daily manual exports</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">35%</div><p className="text-slate-400 text-sm">Data re-keying error rate</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$45K</div><p className="text-slate-400 text-sm">Annual error costs</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div><p className="text-slate-400 text-sm">Reconciliation delay</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Manual Data Trap</h3>
                <div className="space-y-4">
                  {["Export data from Blue Yonder","Reformat to match target system requirements","Manually validate field mappings","Import and troubleshoot errors","Reconcile mismatches and re-process","Repeat for every batch - 2-3x daily"].map((item, i) => (
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

      <section id="comparison-table" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Feature Comparison</h2>
            <p className="text-slate-600 text-lg">Side-by-side breakdown of capabilities and differences</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-violet-700 bg-violet-50">Blue Yonder</div>
              <div className="px-6 py-4 font-bold text-center text-indigo-700 bg-indigo-50">Manhattan Associates</div>
            </div>
            
            <div className="grid grid-cols-3 border-b border-slate-100">
              <div className="px-6 py-4 font-medium text-slate-900">Category</div>
              <div className="px-6 py-4 text-center text-slate-600">TMS</div>
              <div className="px-6 py-4 text-center text-slate-600">TMS</div>
            </div>
            <div className="grid grid-cols-3 border-b border-slate-100">
              <div className="px-6 py-4 font-medium text-slate-900">Starting Price</div>
              <div className="px-6 py-4 text-center text-slate-600">Custom pricing</div>
              <div className="px-6 py-4 text-center text-slate-600">Custom pricing</div>
            </div>
            <div className="grid grid-cols-3 ">
              <div className="px-6 py-4 font-medium text-slate-900">Target Market</div>
              <div className="px-6 py-4 text-center text-slate-600">Enterprise</div>
              <div className="px-6 py-4 text-center text-slate-600">Enterprise</div>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which Platform Fits Your Operation?</h2>
              <p className="text-slate-600 text-lg mb-6">Match your business profile to the right solution.</p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose Blue Yonder If...</h3>
                  <p className="text-slate-600">You are enterprise, need tms functionality, and your budget aligns with Custom pricing pricing.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose Manhattan Associates If...</h3>
                  <p className="text-slate-600">You are enterprise, need tms functionality, and your budget aligns with Custom pricing pricing.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3>
                  <p className="text-slate-600">Clean data integration to your ERP. DocStandard bridges Blue Yonder and Manhattan Associates to NetSuite, QuickBooks, SAP, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Integration ROI</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Real savings when you automate data flow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">4-6 hrs</div><p className="text-slate-400 text-sm mb-2">Manual daily sync</p><div className="text-red-400 text-sm">Per day</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">15 min</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">96% faster</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$180K</div><p className="text-slate-400 text-sm mb-2">Annual savings</p><div className="text-indigo-400 text-sm">Labor + errors</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">99.5%</div><p className="text-slate-400 text-sm mb-2">Data accuracy</p><div className="text-purple-400 text-sm">Zero re-keying</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Operations Teams Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Platform-Agnostic</h3><p className="text-slate-600">Works with Blue Yonder, Manhattan Associates, or any platform. We normalize data regardless of your system choice.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Ready Output</h3><p className="text-slate-600">Data delivered in NetSuite, QuickBooks, or SAP-native format. Import directly without transformation.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3><p className="text-slate-600">$799 per batch. No per-record fees, no hidden costs. Same price whether you use Blue Yonder or Manhattan Associates.</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/cargowise-vs-magaya" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"><div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors"><BarChart3 className="w-6 h-6 text-indigo-600" /></div><h3 className="font-bold text-slate-900 mb-2">CargoWise vs Magaya</h3><p className="text-sm text-slate-600">Compare the two freight forwarding giants</p></Link>
            <Link href="/comparison/netsuite-vs-dynamics365" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"><div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors"><Building2 className="w-6 h-6 text-indigo-600" /></div><h3 className="font-bold text-slate-900 mb-2">NetSuite vs Dynamics 365</h3><p className="text-sm text-slate-600">Enterprise ERP comparison</p></Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"><div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors"><Database className="w-6 h-6 text-indigo-600" /></div><h3 className="font-bold text-slate-900 mb-2">Document Processing</h3><p className="text-sm text-slate-600">How DocStandard handles data from any platform</p></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
