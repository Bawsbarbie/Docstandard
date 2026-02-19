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
  MapPin,
  Ship,
  Plane,
  FileText
} from "lucide-react"

export const metadata: Metadata = {
  title: "Magaya vs Motive (2026): TMS Comparison | DocStandard",
  description:
    "Compare Magaya and Motive side-by-side. Features, pricing, integrations, and use cases for logistics operations.",
  alternates: {
    canonical: "https://docstandard.co/comparison/magaya-vs-motive",
  },
  robots: {
    index: false,
    follow: false,
  }
}

// Comparison data
const comparisonFeatures = [
  { feature: "Category", "magaya": "TMS", "motive": "Fleet" },
  { feature: "Starting Price", "magaya": "$500/month", "motive": "$25/vehicle/month" },
  { feature: "Target Market", "magaya": "SMB (&lt;$50M)", "motive": "Fleet operators" },
  { feature: "Best For", "magaya": "Freight forwarding", "motive": "Vehicle management" },
  { feature: "Implementation", "magaya": "2-6 weeks", "motive": "2-6 weeks" },
  { feature: "Integration Type", "magaya": "REST API / Custom", "motive": "REST API / Custom" },
  { feature: "Cloud/On-prem", "magaya": "Cloud-native", "motive": "Cloud-native" },
  { feature: "Mobile Support", "magaya": "✓ Limited to Full", "motive": "✓ Native apps" },
  { feature: "API Available", "magaya": "✓ Yes", "motive": "✓ Yes" },
  { feature: "DocStandard Compatible", "magaya": "✓ Yes", "motive": "✓ Yes" },
  { feature: "Data Extraction", "magaya": "PDF, Email, API, EDI", "motive": "PDF, Email, API, EDI" },
  { feature: "Common Pain Point", "magaya": "ERP integration gaps", "motive": "Maintenance tracking" },
]

const painPoints = [
  {
    title: "Data Format Mismatch",
    description: "Magaya and Motive use different data formats. Getting data between them requires manual reformatting or expensive custom integration."
  },
  {
    title: "Manual Entry Bottleneck",
    description: "Neither platform automatically shares data with the other. Teams spend hours manually copying information, creating errors and delays."
  },
  {
    title: "Integration Complexity",
    description: "Building custom integration between Magaya and Motive requires expensive developers and ongoing maintenance."
  }
]

const faqs = [
  {
    q: "We use Magaya but receive documents that need manual entry. Can DocStandard help automate this?",
    a: "Yes. DocStandard extracts structured data from any document format—PDFs, emails, EDI—and delivers it in Magaya-compatible format via API or direct import. This eliminates 4-6 hours of daily manual entry, reduces errors by 95%, and saves $45K+ annually in labor costs."
  },
  {
    q: "We're migrating from Magaya to Motive. How can DocStandard simplify the data transfer?",
    a: "DocStandard normalizes and transforms records between Magaya and Motive during migration. We handle complex field mapping and data validation, saving 3-4 weeks of migration time and ensuring data integrity across systems."
  },
  {
    q: "Our team uses Magaya but our accounting department needs the data in a different format. What's the solution?",
    a: "DocStandard bridges Magaya with any ERP or accounting system by extracting data, normalizing formats, and delivering journal-ready imports. This eliminates manual CSV exports and reduces month-end close from 5 days to 2 days."
  },
  {
    q: "We have clients using both Magaya and Motive. Can DocStandard normalize data from both platforms?",
    a: "Absolutely. DocStandard accepts data from both Magaya and Motive, normalizes it to a standard schema, and delivers consistent output to your ERP—regardless of which platforms your partners use."
  },
  {
    q: "How quickly can DocStandard integrate with our existing Magaya or Motive setup?",
    a: "Most integrations are live within 24-72 hours. DocStandard connects via standard APIs and requires no IT infrastructure changes. You start seeing ROI immediately—saving 20+ hours weekly on data entry and reconciliation."
  }
]

export default function MagayaVsMotivePage() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO - WHITE BACKGROUND WITH SVG VISUAL */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">
                TMS Comparison
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Magaya <span className="text-indigo-500">vs</span> Motive
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Compare Magaya and Motive for logistics operations. 
                Side-by-side analysis of features, pricing, and capabilities to find your best fit.
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
                  Which Fits You?
                </Link>
              </div>
            </div>

            {/* Right: Visual SVG */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-orange-100/50 rounded-3xl blur-3xl" />
              
              {/* Comparison Visual */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  {/* Magaya Box */}
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#059669" opacity="0.1" stroke="#059669" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#059669"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Magaya</text>
                  
                  {/* Magaya Features */}
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="#059669" opacity="0.3"/>
                  
                  {/* VS Circle */}
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  
                  {/* Motive Box */}
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#f97316" opacity="0.1" stroke="#f97316" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#f97316"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Motive</text>
                  
                  {/* Motive Features */}
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="#f97316" opacity="0.3"/>
                  
                  {/* Arrows indicating comparison */}
                  <path d="M175 100 L185 100 L180 95 M185 100 L180 105" stroke="#64748b" strokeWidth="2" fill="none"/>
                  <path d="M225 100 L215 100 L220 95 M215 100 L220 105" stroke="#64748b" strokeWidth="2" fill="none"/>
                  
                  <path d="M175 140 L185 140 L180 135 M185 140 L180 145" stroke="#64748b" strokeWidth="2" fill="none"/>
                  <path d="M225 140 L215 140 L220 135 M215 140 L220 145" stroke="#64748b" strokeWidth="2" fill="none"/>
                  
                  <path d="M175 180 L185 180 L180 175 M185 180 L180 185" stroke="#64748b" strokeWidth="2" fill="none"/>
                  <path d="M225 180 L215 180 L220 175 M215 180 L220 185" stroke="#64748b" strokeWidth="2" fill="none"/>
                </svg>

                {/* Labels below SVG */}
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">TMS</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-orange-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Fleet</span>
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
                Integration Challenge
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Data Is Trapped Between Systems
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you choose Magaya or Motive, you are facing the same problem: 
                getting clean data into your accounting system. Both platforms excel at their core function, 
                but neither connects seamlessly to ERPs out of the box.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div>
                  <p className="text-slate-400 text-sm">Daily manual exports</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">35%</div>
                  <p className="text-slate-400 text-sm">Data re-keying error rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$45K</div>
                  <p className="text-slate-400 text-sm">Annual error costs</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div>
                  <p className="text-slate-400 text-sm">Reconciliation delay</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The Manual Data Trap
                </h3>
                <div className="space-y-4">
                  {[
                    "Export data from Magaya",
                    "Reformat to match target system requirements", 
                    "Manually validate field mappings",
                    "Import and troubleshoot errors",
                    "Reconcile mismatches and re-process",
                    "Repeat for every batch - 2-3x daily"
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
              The Integration Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Both platforms create the same bottleneck: data does not flow to your accounting system automatically
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((pain, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {index === 0 ? <FileJson className="w-8 h-8 text-indigo-600" /> : 
                   index === 1 ? <RefreshCw className="w-8 h-8 text-indigo-600" /> : 
                   <BarChart3 className="w-8 h-8 text-indigo-600" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pain.title}</h3>
                <p className="text-slate-600">{pain.description}</p>
              </div>
            ))}
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
              Side-by-side breakdown of capabilities and differences
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-emerald-700 bg-emerald-50">Magaya</div>
              <div className="px-6 py-4 font-bold text-center text-orange-700 bg-orange-50">Motive</div>
            </div>
            
            {/* Table Rows */}
            {comparisonFeatures.map((row, index) => (
              <div 
                key={row.feature} 
                className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["magaya"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["motive"]}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Magaya Advantage</h4>
              <p className="text-sm text-slate-600">
                Best suited for SMB (&lt;$50M) operations with tms focus.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Motive Advantage</h4>
              <p className="text-sm text-slate-600">
                Best suited for Fleet operators operations with fleet focus.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Same Integration Solution</h4>
              <p className="text-sm text-slate-600">
                Both need DocStandard to bridge the ERP gap. Works with either platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM CONTEXT */}
      <section id="use-cases" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Which Platform Fits Your Operation?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Match your business profile to the right solution.
              </p>
              
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Platform Fit
                </h3>                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <CheckCircle className="w-4 h-4" />
                    Magaya Best For
                  </div>
                  <p className="text-slate-600">SMB (&lt;$50M) businesses needing tms capabilities.</p>
                </div>                
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <CheckCircle className="w-4 h-4" />
                    Motive Best For
                  </div>
                  <p className="text-slate-600">Fleet operators businesses needing fleet capabilities.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose Magaya If...</h3>
                  <p className="text-slate-600">
                    You are smb (&lt;$50m), need tms functionality, 
                    and your budget aligns with $500/month pricing.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose Motive If...</h3>
                  <p className="text-slate-600">
                    You are fleet operators, need fleet functionality, 
                    and your budget aligns with $25/vehicle/month pricing.
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
                    Clean data integration to your ERP. DocStandard bridges Magaya and Motive 
                    to NetSuite, QuickBooks, SAP, and more.
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
              Real savings when you automate data flow — regardless of your platform choice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4-6 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual daily sync</p>
              <div className="text-red-400 text-sm">Per day</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">15 min</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">96% faster</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$180K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-indigo-400 text-sm">Labor + errors</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.5%</div>
              <p className="text-slate-400 text-sm mb-2">Data accuracy</p>
              <div className="text-purple-400 text-sm">Zero re-keying</div>
            </div>
          </div>        
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Operations Teams Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Platform-Agnostic</h3>
              <p className="text-slate-600">
                Works with Magaya, Motive, or any platform. We normalize data 
                regardless of your system choice.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Ready Output</h3>
              <p className="text-slate-600">
                Data delivered in NetSuite, QuickBooks, or SAP-native format. 
                Import directly without transformation.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3>
              <p className="text-slate-600">
                $799 per batch. No per-record fees, no hidden costs. Same price 
                whether you use Magaya or Motive.
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
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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
                &quot;We evaluated both Magaya and Motive. DocStandard made the data 
                integration piece a non-issue, letting us focus on choosing the right platform.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Manager</div>
                <div className="text-sm text-slate-500">Logistics Provider</div>
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
                &quot;The integration between our tms and ERP used to take days. 
                DocStandard reduced it to minutes with perfect accuracy.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Systems Analyst</div>
                <div className="text-sm text-slate-500">Freight Forwarder</div>
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
                &quot;No matter which platform our clients use, we can integrate with DocStandard. 
                It is become our standard solution for data normalization.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">IT Director</div>
                <div className="text-sm text-slate-500">3PL Consulting Firm</div>
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
            <Link href="/comparison/cargowise-vs-magaya" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">CargoWise vs Magaya</h3>
              <p className="text-sm text-slate-600">Compare the two freight forwarding giants head-to-head</p>
            </Link>
            <Link href="/comparison/netsuite-vs-dynamics365" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">NetSuite vs Dynamics 365</h3>
              <p className="text-sm text-slate-600">Enterprise ERP comparison for logistics businesses</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">How DocStandard handles data from any platform</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function toPascalCase(str) {
  return str.replace(/(?:^|-)([a-z])/g, (_, char) => char.toUpperCase()).replace(/-/g, '');
}
