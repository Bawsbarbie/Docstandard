import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Database, 
  AlertTriangle, 
  RefreshCw, 
  FileJson,
  CheckCircle2,
  TrendingDown,
  ChevronRight,
  Code2,
  Zap,
  Shield,
  Building2,
  DollarSign
} from "lucide-react"
import { getIntegrationModel } from "@/lib/pseo/integration-factory"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const model = await getIntegrationModel(params.slug)
  if (!model) return { robots: { index: false } }

  return {
    title: `${model.title} | DocStandard Technical Bridge`,
    description: model.description,
    alternates: { canonical: `https://docstandard.co/integration/${params.slug}` },
    robots: { index: true, follow: true }
  }
}

export default async function IntegrationFactoryPage({ params }: PageProps) {
  const model = await getIntegrationModel(params.slug)
  if (!model) notFound()

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (model as any).faqs?.map((faq: any) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="bg-white text-slate-900 leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section - V1 Alignment */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">Accounting Vertical Integration</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {model.sourceSystem} <span className="text-indigo-500">to</span> {model.destinationSystem}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Automate {model.hurdleName.toLowerCase()} and bridge the gap between logistics operations and finance. 
                Seamlessly sync {model.sourceSystem} data into audit-ready {model.destinationSystem} entries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#expert-analysis" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                  Read Expert Analysis <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">
                  ROI Calculator
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#f59e0b"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{model.sourceSystem}</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#f59e0b" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#f59e0b" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#f59e0b" opacity="0.3"/>
                  
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">SYNC</text>
                  
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#4f46e5"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{model.destinationSystem}</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#4f46e5" opacity="0.3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Challenge - V1 Style */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Integration Challenge</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Data Is Trapped in {model.sourceSystem}</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">Your operational team moves the freight, but your finance team shouldn't have to manually bridge the gap. {model.hurdleFocus}. Without DocStandard, your team is doing the heavy lifting of mapping inconsistent operational fields to your general ledger.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div><p className="text-slate-400 text-sm">Daily manual exports</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">35%</div><p className="text-slate-400 text-sm">Data re-keying error rate</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$45K</div><p className="text-slate-400 text-sm">Annual error costs</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div><p className="text-slate-400 text-sm">Reconciliation delay</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Manual Data Trap</h3>
                <div className="space-y-4">
                  {[`Export data from ${model.sourceSystem}`,`Reformat to match ${model.destinationSystem} requirements`,"Manually validate field mappings","Import and troubleshoot errors","Reconcile mismatches and re-process","Repeat for every batch - 2-3x daily"].map((item, i) => (
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

      {/* Expert Analysis Section - Authority Booster */}
      <section id="expert-analysis" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Expert Analysis: Solving the {model.hurdleName} Gap</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-12" />
          </div>
          <div className="prose prose-lg prose-slate max-w-none mb-16">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {(model as any).expertAnalysis}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Operational Impact & Revenue Protection</h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              {(model as any).operationalImpact}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100">
                <Zap className="text-indigo-600 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Efficiency Gain</h3>
                <p className="text-slate-600 leading-relaxed">Automating the link between {model.sourceSystem} and {model.destinationSystem} reduces technical debt by consolidating messy operational strings into structured financial keys.</p>
             </div>
             <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100">
                <Shield className="text-emerald-600 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Audit Readiness</h3>
                <p className="text-slate-600 leading-relaxed">Every record processed through DocStandard maintains a bi-directional link between the operational event and the financial record, ensuring 100% transparency.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Choice / Decision Section - V1 Style */}
      <section id="use-cases" className="py-20 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Which Architecture Fits Your Operation?</h2>
              <p className="text-slate-600 text-lg mb-6">Match your business profile to the right synchronization method.</p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Direct API Injection</h3>
                  <p className="text-slate-600">Best for high-volume {model.sourceSystem} users requiring real-time updates in {model.destinationSystem}.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Verified Batch Normalization</h3>
                  <p className="text-slate-600">Standard DocStandard workflow: 99%+ AI extraction with secondary human audit for 100% accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration ROI - V1 Style */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The {model.hurdleName} ROI</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Real savings when you automate the {model.sourceSystem} to {model.destinationSystem} pipeline</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-red-400" /></div><div className="text-3xl font-bold text-white mb-2">{model.roi.manualHours}</div><p className="text-slate-400 text-sm mb-2">Manual effort removed</p><div className="text-red-400 text-sm">Per week</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-green-400" /></div><div className="text-3xl font-bold text-white mb-2">15 min</div><p className="text-slate-400 text-sm mb-2">With DocStandard</p><div className="text-green-400 text-sm">96% faster sync</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4"><DollarSign className="w-6 h-6 text-indigo-400" /></div><div className="text-3xl font-bold text-white mb-2">{model.roi.savings}</div><p className="text-slate-400 text-sm mb-2">Operational savings</p><div className="text-indigo-400 text-sm">Labor + error cost</div></div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-purple-400" /></div><div className="text-3xl font-bold text-white mb-2">{model.roi.accuracy}</div><p className="text-slate-400 text-sm mb-2">Data accuracy</p><div className="text-purple-400 text-sm">Verified 100%</div></div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - V1 Style */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Operations Teams Choose DocStandard</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Platform-Agnostic</h3><p className="text-slate-600">Works with {model.sourceSystem}, {model.destinationSystem}, or any platform. We normalize data regardless of your system choice.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Ready Output</h3><p className="text-slate-600">Data delivered in {model.destinationSystem}-native format. Import directly without manual field transformation.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3><p className="text-slate-600">$799 per batch. No per-record fees, no hidden costs. Scalable for any volume of {model.sourceSystem} data.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">Technical FAQ</h2>
          <div className="space-y-6">
            {(model as any).faqs?.map((faq: any, i: number) => (
              <div key={i} className="p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-start gap-4">
                   <ChevronRight className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                   {faq.q}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed pl-10 border-l-4 border-indigo-50">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interlinking Footer */}
      <section className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
               <Code2 className="w-7 h-7 text-indigo-600" /> Engineering Resources
            </h3>
            <Link href="/integration" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
              View All Integrations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {model.internalLinks.map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-slate-700 group-hover:text-indigo-600">{link.label}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
