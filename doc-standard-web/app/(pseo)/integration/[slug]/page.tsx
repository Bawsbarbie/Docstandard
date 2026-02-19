import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Clock3, 
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
  Search
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

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
                <RefreshCw className="w-4 h-4" /> Technical Integration Layer
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-[1.1]">
                {model.sourceSystem} to {model.destinationSystem}: <span className="text-indigo-600">{model.hurdleName}</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Automate your financial data pipeline. DocStandard solves the technical friction of <strong>{model.hurdleName.toLowerCase()}</strong>, 
                moving operational records from {model.sourceSystem} into clean, audit-ready {model.destinationSystem} entries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#expert-analysis" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200">
                  Read Expert Analysis <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition">
                  ROI Calculator
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl">
                 <div className="flex flex-col gap-6">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200"><Database className="w-6 h-6 text-slate-400" /></div>
                        <span className="font-bold text-lg text-slate-900">{model.sourceSystem}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source TMS</span>
                    </div>
                    <div className="flex justify-center text-indigo-500"><TrendingDown className="rotate-[-90deg] w-10 h-10 animate-pulse" /></div>
                    <div className="p-5 bg-indigo-600 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-indigo-200 ring-4 ring-indigo-50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><RefreshCw className="w-6 h-6" /></div>
                        <span className="font-bold text-lg">DocStandard Normalization</span>
                      </div>
                      <ShieldCheck className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div className="flex justify-center text-indigo-500"><TrendingDown className="rotate-[-90deg] w-10 h-10 animate-pulse" /></div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200"><BarChart3 className="w-6 h-6 text-slate-400" /></div>
                        <span className="font-bold text-lg text-slate-900">{model.destinationSystem}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Financial ERP</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Technical Analysis Section */}
      <section id="expert-analysis" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Expert Analysis: Solving the {model.hurdleName} Gap</h2>
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {(model as any).expertAnalysis}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Operational Impact & Revenue Protection</h3>
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                {(model as any).operationalImpact}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100">
                <Zap className="text-indigo-600 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Efficiency Gain</h3>
                <p className="text-slate-600 leading-relaxed">Automating the link between {model.sourceSystem} and {model.destinationSystem} reduces technical debt by consolidating messy operational strings into structured financial keys.</p>
             </div>
             <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100">
                <Shield className="text-emerald-600 w-10 h-10 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">Audit Readiness</h3>
                <p className="text-slate-600 leading-relaxed">Every record processed through DocStandard maintains a bi-directional link between the operational event and the financial record, ensuring 100% audit transparency.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Eliminate the {model.sourceSystem} Data Silo</h2>
            <p className="text-slate-400 text-lg">Your operational team moves the freight, but your finance team shouldn't have to manually bridge the gap. We solve the core friction points in {model.hurdleName.toLowerCase()}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <AlertTriangle className="text-red-400" />, title: "Manual Data Entry", desc: `Accounts Payable teams spend hours daily re-keying records from ${model.sourceSystem} operational dashboards into ${model.destinationSystem}.` },
              { icon: <FileJson className="text-indigo-400" />, title: "Incompatible Schema", desc: `Logistics fields (Carrier Codes, BOL numbers) don't naturally map to ${model.destinationSystem} Chart of Accounts without normalization.` },
              { icon: <Clock3 className="text-amber-400" />, title: "Validation Lag", desc: "Unstructured operational data causes massive reconciliation backlogs that delay month-end financial closing." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Implementation Section */}
      <section id="expert-guide" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Technical Strategy</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {(model as any).technicalGuide?.overview}
              </p>
              <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Engineering Standard</h4>
                <p className="text-sm text-slate-700 italic">All {model.sourceSystem} to {model.destinationSystem} connectors follow our proprietary Zero-Loss Data Protocol.</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {(model as any).technicalGuide?.steps.map((step: any, i: number) => (
                  <div key={i} className="relative pl-12 border-l-2 border-slate-100">
                    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-100">{i + 1}</div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{step.name}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-indigo-600 rounded-[2.5rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-4">{model.roi.manualHours}</div>
              <div className="text-indigo-100 opacity-90 uppercase tracking-[0.2em] text-xs font-black">Reduction in Labor</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-4">{model.roi.accuracy}</div>
              <div className="text-indigo-100 opacity-90 uppercase tracking-[0.2em] text-xs font-black">Data Integrity</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-4">{model.roi.savings}</div>
              <div className="text-indigo-100 opacity-90 uppercase tracking-[0.2em] text-xs font-black">Annual Savings</div>
            </div>
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
