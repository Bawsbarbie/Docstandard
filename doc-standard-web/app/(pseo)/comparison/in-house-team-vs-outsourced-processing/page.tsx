import type { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Shield,
  Zap,
  Building2,
  Users,
  Globe,
  DollarSign,
  Clock,
  Database,
  FileJson,
  RefreshCw,
  Briefcase,
  UserCheck,
  GraduationCap,
  Headphones
} from "lucide-react"

export const metadata: Metadata = {
  title: "In-House vs Outsourced Processing (2026): Freight Operations | DocStandard",
  description:
    "Compare in-house document processing teams with outsourced solutions for freight forwarders. Cost, quality, and scalability analysis.",
  alternates: {
    canonical: "https://docstandard.co/comparison/in-house-team-vs-outsourced-processing",
  },
}

// Comparison data
const comparisonFeatures = [
  { feature: "Monthly Cost (3 FTE)", inhouse: "$18,000-24,000", outsourced: "$5,000-8,000" },
  { feature: "Setup Time", inhouse: "2-3 months hiring", outsourced: "1-2 weeks onboarding" },
  { feature: "Scalability", inhouse: "Slow (hire/train)", outsourced: "Instant (elastic)" },
  { feature: "24/7 Coverage", inhouse: "3 shifts or overtime", outsourced: "Built-in" },
  { feature: "Error Rate", inhouse: "5-12% (varies)", outsourced: "&lt;3% (specialized)" },
  { feature: "Domain Expertise", inhouse: "Requires training", outsourced: "Freight specialists" },
  { feature: "Technology Investment", inhouse: "$50K-100K tools", outsourced: "Included" },
  { feature: "Management Overhead", inhouse: "High (supervision)", outsourced: "Low (account manager)" },
  { feature: "Peak Season Handling", inhouse: "Hire temps/struggle", outsourced: "Seamless scaling" },
  { feature: "Staff Turnover Risk", inhouse: "High (retraining)", outsourced: "Provider absorbs" },
  { feature: "Process Standardization", inhouse: "Self-managed", outsourced: "ISO certified" },
  { feature: "Multi-language Support", inhouse: "Hire specialists", outsourced: "Native teams" },
]

export default function InHouseVsOutsourcedPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO - WHITE BACKGROUND WITH SVG VISUAL */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">
                Operations Model Comparison
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                In-House <span className="text-indigo-500">vs</span> Outsourced
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Build your team or partner with specialists. Compare the true costs, 
                risks, and benefits of internal document processing versus outsourcing 
                to freight-focused operations teams.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#comparison-table"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  See Comparison
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#use-cases"
                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Which Model Fits?
                </Link>
              </div>
            </div>

            {/* Right: Visual SVG */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-rose-100/50 rounded-3xl blur-3xl" />
              
              {/* Comparison Visual */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  {/* In-House Box */}
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#0891b2" opacity="0.1" stroke="#0891b2" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#0891b2"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">In-House</text>
                  
                  {/* In-House Team Icons */}
                  <circle cx="60" cy="125" r="18" fill="#0891b2" opacity="0.3"/>
                  <circle cx="60" cy="125" r="10" fill="#0891b2"/>
                  <text x="95" y="130" fill="#0891b2" fontSize="11">Hire & Train</text>
                  
                  <circle cx="60" cy="170" r="18" fill="#0891b2" opacity="0.3"/>
                  <circle cx="60" cy="170" r="10" fill="#0891b2"/>
                  <text x="95" y="175" fill="#0891b2" fontSize="11">Manage</text>
                  
                  <circle cx="60" cy="215" r="18" fill="#0891b2" opacity="0.3"/>
                  <circle cx="60" cy="215" r="10" fill="#0891b2"/>
                  <text x="95" y="220" fill="#0891b2" fontSize="11">Retain</text>
                  
                  {/* VS Circle */}
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  
                  {/* Outsourced Box */}
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#e11d48" opacity="0.1" stroke="#e11d48" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#e11d48"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Outsourced</text>
                  
                  {/* Outsourced Icons */}
                  <rect x="255" y="110" width="100" height="30" rx="4" fill="#e11d48" opacity="0.2"/>
                  <text x="305" y="130" textAnchor="middle" fill="#e11d48" fontSize="10">Specialized Team</text>
                  
                  <rect x="255" y="150" width="100" height="30" rx="4" fill="#e11d48" opacity="0.2"/>
                  <text x="305" y="170" textAnchor="middle" fill="#e11d48" fontSize="10">24/7 Coverage</text>
                  
                  <rect x="255" y="190" width="100" height="30" rx="4" fill="#e11d48" opacity="0.2"/>
                  <text x="305" y="210" textAnchor="middle" fill="#e11d48" fontSize="10">Elastic Scale</text>
                  
                  {/* Connection Arrows */}
                  <path d="M175 140 L225 140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"/>
                  <polygon points="220,135 225,140 220,145" fill="#cbd5e1"/>
                  <polygon points="180,135 175,140 180,145" fill="#cbd5e1"/>
                </svg>

                {/* Labels below SVG */}
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Control</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Scale</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RISK SECTION */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                The Hidden Cost
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Processing Team Is a Money Pit
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                In-house teams seem cheaper on paper, but the true costs add up: recruitment, 
                training, benefits, management overhead, turnover, and technology. For document 
                processing — a non-core function — these costs often exceed outsourcing by 2-3x.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$75K</div>
                  <p className="text-slate-400 text-sm">Cost per hire (loaded)</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">6 mo</div>
                  <p className="text-slate-400 text-sm">Time to productivity</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">25%</div>
                  <p className="text-slate-400 text-sm">Annual turnover rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
                  <p className="text-slate-400 text-sm">Management overhead</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-rose-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The In-House Trap
                </h3>
                <div className="space-y-4">
                  {[
                    "Post job, sift through 200+ resumes",
                    "Interview, background checks, onboarding", 
                    "3-month training on freight processes",
                    "Productivity peaks at month 6-12",
                    "Top performer leaves for better offer",
                    "Repeat the cycle, lose institutional knowledge"
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

      {/* PAIN SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Scalability Ceiling
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Whether you build a team or outsource, you hit the same wall: getting clean data into your ERP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileJson className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Format Inconsistency</h3>
              <p className="text-slate-600">
                Different processors use different templates. In-house teams create 
                variations; outsourced teams need strict standardization.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Drift</h3>
              <p className="text-slate-600">
                Error rates spike during busy periods. In-house: burnout. Outsourced: 
                context switching between clients. Both need oversight.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ERP Integration Gap</h3>
              <p className="text-slate-600">
                Processed documents still need manual upload to your accounting system. 
                Neither model solves the last-mile problem without help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL GUIDE - Comparison Table */}
      <section id="comparison-table" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Feature Comparison
            </h2>
            <p className="text-slate-600 text-lg">
              Side-by-side breakdown of In-House vs Outsourced processing
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-cyan-700 bg-cyan-50">In-House Team</div>
              <div className="px-6 py-4 font-bold text-center text-rose-700 bg-rose-50">Outsourced</div>
            </div>
            
            {/* Table Rows */}
            {comparisonFeatures.map((row, index) => (
              <div 
                key={row.feature} 
                className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.inhouse}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.outsourced}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">In-House Strengths</h4>
              <p className="text-sm text-slate-600">
                Direct control, deep company knowledge, cultural fit, immediate availability 
                for urgent issues. Best for highly specialized or confidential work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Outsourced Advantages</h4>
              <p className="text-sm text-slate-600">
                Cost efficiency, instant scale, specialized expertise, 24/7 coverage, 
                no HR overhead. Ideal for commoditized document processing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">DocStandard Solution</h4>
              <p className="text-sm text-slate-600">
                We complement both models. Whether in-house or outsourced, we handle 
                the ERP integration layer with consistent quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM CONTEXT - Use Cases */}
      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Which Model Fits Your Operation?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Match your volume, complexity, and control needs to the right approach.
              </p>
              
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Decision Framework
                </h3>                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <UserCheck className="w-4 h-4" />
                    Keep In-House
                  </div>
                  <p className="text-slate-600">High-complexity customs, confidential data, strategic relationships</p>
                </div>                
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <Users className="w-4 h-4" />
                    Outsource
                  </div>
                  <p className="text-slate-600">High-volume commoditized work, seasonal spikes, cost sensitivity</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Keep In-House If...</h3>
                  <p className="text-slate-600">
                    You handle complex customs entries requiring deep trade knowledge, 
                    process sensitive client data, or have highly variable requirements 
                    that need constant adaptation.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Outsource If...</h3>
                  <p className="text-slate-600">
                    You process 500+ standard documents monthly, have seasonal volume spikes, 
                    need 24/7 coverage, or want to reduce fixed costs by 50-70%.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3>
                  <p className="text-slate-600">
                    Seamless ERP integration. DocStandard works with both models, 
                    delivering processed documents directly to NetSuite/QuickBooks 
                    without manual upload.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Integration ROI
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings when you automate the handoff — regardless of processing model
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">12 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual ERP upload weekly</p>
              <div className="text-red-400 text-sm">Per team</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">30 min</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">96% faster</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$65K</div>
              <p className="text-slate-400 text-sm mb-2">Annual labor savings</p>
              <div className="text-indigo-400 text-sm">Upload + verification</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.5%</div>
              <p className="text-slate-400 text-sm mb-2">Upload accuracy</p>
              <div className="text-purple-400 text-sm">Zero re-keying</div>
            </div>
          </div>        
        </div>
      </section>

      {/* BENEFITS - V1 Template Element */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Forwarders Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Model-Agnostic</h3>
              <p className="text-slate-600">
                Works with in-house teams, outsourced processors, or hybrid models. 
                We integrate the output regardless of who produces it.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Gate</h3>
              <p className="text-slate-600">
                Built-in validation catches errors before they hit your ERP. Acts as 
                a quality checkpoint for both in-house and outsourced work.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3>
              <p className="text-slate-600">
                $799 per batch. Same price whether processed in-house or outsourced. 
                No per-document fees regardless of source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
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
                q: "We have an in-house document processing team but they're overwhelmed. Can DocStandard help without replacing them?",
                a: "Yes. DocStandard handles the ERP integration layer—taking processed documents from your team and delivering them to NetSuite/QuickBooks automatically. This eliminates the 12 hours weekly your team spends on manual uploads, letting them focus on extraction quality instead."
              },
              {
                q: "We outsourced processing but quality is inconsistent and ERP uploads are still manual. How does DocStandard fix this?",
                a: "DocStandard acts as a quality gate and integration bridge. We validate outsourced output against business rules before ERP import, catching 99.5% of errors automatically. This gives you oversight without micromanagement and eliminates manual upload bottlenecks."
              },
              {
                q: "We're considering outsourcing but worried about data format inconsistencies. Can DocStandard standardize output from multiple teams?",
                a: "Absolutely. Whether documents come from your in-house team in Dallas or outsourced partners in Manila, DocStandard normalizes everything into consistent ERP-ready formats. This enforces quality standards across all sources and eliminates format-related integration failures."
              },
              {
                q: "How does DocStandard help us transition from in-house to outsourced processing without disrupting ERP data flow?",
                a: "DocStandard works with both models simultaneously. As you transition work to outsourced teams, your ERP continues receiving consistent data imports. This eliminates the integration downtime typically seen during operational changes and reduces transition risk."
              },
              {
                q: "Can DocStandard reduce the costs of our document processing operation, whether in-house or outsourced?",
                a: "Yes. By automating the ERP integration layer, DocStandard eliminates 12+ hours of weekly manual upload work—saving $65K annually in labor costs. The flat $799/batch pricing is the same regardless of processing source, providing predictable costs as you scale."
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

      {/* TESTIMONIALS - V1 Template Element */}
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
                &quot;We outsourced our data entry but kept customs clearance in-house. DocStandard 
                    handles both — our offshore team&apos;s output and our specialists&apos; work both flow 
                    cleanly into NetSuite.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">COO</div>
                <div className="text-sm text-slate-500">Freight Forwarder, New York</div>
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
                &quot;Went from 5 in-house processors to 2 specialists plus outsourced overflow. 
                    DocStandard made the transition seamless — same ERP output regardless of who 
                    processed the document.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Manager</div>
                <div className="text-sm text-slate-500">3PL Provider, Georgia</div>
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
                &quot;The quality validation caught errors from our outsourced team that would have 
                    hit QuickBooks. Saved us weeks of reconciliation. Worth every penny.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Finance Controller</div>
                <div className="text-sm text-slate-500">Logistics Company, Washington</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE - INTERNAL LINKS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparison/manual-processing-vs-automated-extraction" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Manual vs Automated</h3>
              <p className="text-sm text-slate-600">Processing method ROI analysis</p>
            </Link>
            <Link href="/comparison/excel-vs-tms-automation" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Excel vs TMS</h3>
              <p className="text-sm text-slate-600">Workflow tools for freight operations</p>
            </Link>
            <Link href="/pricing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">DocStandard Pricing</h3>
              <p className="text-sm text-slate-600">Flat-fee integration for any processing model</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
