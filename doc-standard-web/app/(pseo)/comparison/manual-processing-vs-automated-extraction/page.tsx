import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Users, Clock, Database, FileJson, RefreshCw, FileSpreadsheet, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Manual Processing vs Automated Extraction | DocStandard",
  description: "Compare manual data entry vs AI-powered document extraction. Cost, speed, accuracy, and ROI analysis for logistics operations.",
  alternates: { canonical: "https://docstandard.co/comparison/manual-processing-vs-automated-extraction" }
}

const comparisonFeatures = [
  { feature: "Processing Speed", manual: "2-5 min/document", automated: "15 sec/document" },
  { feature: "Error Rate", manual: "15-35%", automated: "0.5-2%" },
  { feature: "Scalability", manual: "Linear (hire more)", automated: "Instant (unlimited)" },
  { feature: "Cost per Document", manual: "$2.50-5.00", automated: "$0.15-0.50" },
  { feature: "24/7 Availability", manual: "Limited", automated: "Always on" },
  { feature: "Integration", manual: "Manual export/import", automated: "API/SFTP direct" },
  { feature: "Peak Handling", manual: "Backlogs", automated: "Instant scaling" },
  { feature: "Audit Trail", manual: "Paper logs", automated: "Digital timestamps" }
]

const painPoints = [
  { icon: TrendingDown, title: "Human Error", description: "Manual data entry averages 15-35% error rate. In logistics, one wrong digit means customs delays, incorrect billing, or compliance violations." },
  { icon: AlertTriangle, title: "Hidden Labor Costs", description: "At $25/hour, processing 500 documents/day costs $4,800/month. Automation cuts this to $300 for the same volume." },
  { icon: Clock, title: "Time Bottlenecks", description: "Manual processing creates queues during peak periods. Automated systems handle volume spikes without delays." }
]

export default function ManualVsAutomatedPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">Processing Method Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Manual <span className="text-indigo-500">vs</span> Automation
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                The true cost of manual data entry revealed. Compare speed, accuracy, and ROI 
                of traditional processing against AI-powered document automation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                  See Comparison<ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#roi" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Calculate ROI</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-green-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#ef4444"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Manual</text>
                  <g><circle cx="55" cy="120" r="8" fill="#ef4444"/><rect x="70" y="115" width="80" height="10" rx="5" fill="#ef4444" opacity="0.3"/></g>
                  <g><circle cx="55" cy="145" r="8" fill="#ef4444"/><rect x="70" y="140" width="70" height="10" rx="5" fill="#ef4444" opacity="0.3"/></g>
                  <g><circle cx="55" cy="170" r="8" fill="#ef4444"/><rect x="70" y="165" width="85" height="10" rx="5" fill="#ef4444" opacity="0.3"/></g>
                  <g><circle cx="55" cy="195" r="8" fill="#ef4444"/><rect x="70" y="190" width="65" height="10" rx="5" fill="#ef4444" opacity="0.3"/></g>
                  <g><circle cx="55" cy="220" r="8" fill="#ef4444"/><rect x="70" y="215" width="75" height="10" rx="5" fill="#ef4444" opacity="0.3"/></g>
                  
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#22c55e"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Automated</text>
                  <g><rect x="250" y="110" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                  <g><rect x="250" y="130" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                  <g><rect x="250" y="150" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                  <g><rect x="250" y="170" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                  <g><rect x="250" y="190" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                  <g><rect x="250" y="210" width="110" height="12" rx="6" fill="#22c55e" opacity="0.4"/></g>
                </svg>
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div><span className="text-sm font-semibold text-slate-700">Slow</span></div>
                  <div className="text-center"><div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div><span className="text-sm font-semibold text-slate-700">Fast</span></div>
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
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />The Hidden Cost</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Manual Processing Is Bleeding You Dry</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">Every document processed manually costs $2.50-5.00 in labor. With 500 documents daily, you are spending $60,000+ annually on data entry alone.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">25%</div><p className="text-slate-400 text-sm">Average error rate</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$60K</div><p className="text-slate-400 text-sm">Annual labor cost</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Manual Trap</h3>
                <div className="space-y-4">
                  {["Receive document via email/fax","Manually type data into system","Double-check for errors","Correct inevitable mistakes","Reprocess rejected documents"].map((item, i) => (
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
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Manual Processing Fails</h2></div>
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
              <div className="px-6 py-4 font-bold text-center text-red-700 bg-red-50">Manual</div>
              <div className="px-6 py-4 font-bold text-center text-green-700 bg-green-50">Automated</div>
            </div>
            {comparisonFeatures.map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.manual}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.automated}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roi" className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">ROI: The Numbers Do Not Lie</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">2-5 min</div><p className="text-slate-400 text-sm mb-2">Manual per doc</p><div className="text-red-400 text-sm">Per document</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">15 sec</div><p className="text-slate-400 text-sm mb-2">Automated per doc</p><div className="text-green-400 text-sm">90% faster</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">$57K</div><p className="text-slate-400 text-sm mb-2">Annual savings</p><div className="text-indigo-400 text-sm">At 500 docs/day</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">10x</div><p className="text-slate-400 text-sm mb-2">Accuracy improvement</p><div className="text-purple-400 text-sm">0.5% vs 25% errors</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Teams Switch to DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Accuracy</h3><p className="text-slate-600">Machine learning models trained on millions of logistics documents. Continuously improving accuracy.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Zap className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Instant Scaling</h3><p className="text-slate-600">Process 10 or 10,000 documents with same speed. No hiring, training, or overtime required.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Shield className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Zero-Error Guarantee</h3><p className="text-slate-600">Built-in validation catches errors before they reach your systems. Review queue for exceptions.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2></div>
          <div className="space-y-4">
            {[
              { q: "We're spending 20+ hours weekly on manual document entry. How quickly can DocStandard automate this?", a: "DocStandard processes documents within 24 hours of setup—no IT projects required. Upload your documents and start immediately. Most clients see 90% time reduction in week one, saving $57K annually at 500 documents/day." },
              { q: "Our manual process has a 25% error rate that's costing us in delayed shipments and billing disputes. How does DocStandard improve accuracy?", a: "DocStandard's AI-powered extraction achieves 99.5% accuracy with built-in validation that catches errors before they reach your systems. This eliminates the $45K+ annual cost of error correction and improves customer satisfaction." },
              { q: "We process documents in batches during peak shipping periods. Can DocStandard handle volume spikes without hiring temps?", a: "Yes. DocStandard scales instantly from 10 to 10,000 documents without hiring or training. During peak season, you'll process 3x volume at the same flat rate—no overtime, no temp agencies, no delays." },
              { q: "Will switching to DocStandard eliminate our data entry positions?", a: "Most teams redeploy staff to higher-value work—customer service, exception handling, and analysis. DocStandard handles repetitive extraction; your team focuses on complex decisions and client relationships that grow revenue." },
              { q: "How does DocStandard handle complex or unusual shipping documents that don't fit standard templates?", a: "Our AI handles 95%+ of documents automatically. Complex or unclear items route to a review queue with context, allowing quick human verification. You maintain quality control while eliminating routine work—best of both worlds." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200"><h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3><p className="text-slate-600">{faq.a}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;We cut document processing time from 4 hours daily to 20 minutes. The accuracy improvement alone saved us $30K in error corrections.&quot;</p><div><div className="font-semibold text-slate-900">Operations Director</div><div className="text-sm text-slate-500">Freight Forwarder</div></div></div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;During peak season we processed 3x normal volume without hiring temps. DocStandard scaled instantly while maintaining accuracy.&quot;</p><div><div className="font-semibold text-slate-900">Logistics Manager</div><div className="text-sm text-slate-500">3PL Provider</div></div></div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div><p className="text-slate-700 mb-6">&quot;Our team used to dread month-end. Now reconciliation takes hours, not days. We have actually caught up on 6 months of backlog.&quot;</p><div><div className="font-semibold text-slate-900">Controller</div><div className="text-sm text-slate-500">Customs Broker</div></div></div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE - INTERNAL LINKS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/excel-vs-tms-automation" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Excel vs TMS Automation</h3>
              <p className="text-sm text-slate-600">When to move from spreadsheets to transport management systems</p>
            </Link>
            <Link href="/comparison/in-house-team-vs-outsourced-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">In-House vs Outsourced</h3>
              <p className="text-sm text-slate-600">Compare processing models for freight operations</p>
            </Link>
            <Link href="/pricing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">DocStandard Pricing</h3>
              <p className="text-sm text-slate-600">Flat-fee automation with no per-document charges</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}