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
  FileSpreadsheet,
  Calculator,
  Lock,
  Workflow
} from "lucide-react"

export const metadata: Metadata = {
  title: "Excel vs TMS Automation (2026): Freight Operations | DocStandard",
  description:
    "Compare Excel spreadsheets with modern TMS automation for freight forwarding. See why forwarders are moving from manual to automated workflows.",
  alternates: {
    canonical: "https://docstandard.co/comparison/excel-vs-tms-automation",
  },
}

// Comparison data
const comparisonFeatures = [
  { feature: "Data Entry", "excel": "100% manual", tms: "Automated capture" },
  { feature: "Error Rate", "excel": "15-25% typical", tms: "&lt;2% with validation" },
  { feature: "Setup Time", "excel": "Immediate", tms: "2-8 weeks implementation" },
  { feature: "Monthly Cost", "excel": "$0-50 (licenses)", tms: "$500-5,000+" },
  { feature: "Real-time Visibility", "excel": "None", tms: "Full tracking" },
  { feature: "Multi-user Access", "excel": "File locking conflicts", tms: "Concurrent users" },
  { feature: "Audit Trail", "excel": "Limited/None", tms: "Complete history" },
  { feature: "Integration Capability", "excel": "Manual exports only", tms: "API/EDI native" },
  { feature: "Scalability", "excel": "Breaks at ~1,000 rows", tms: "Unlimited" },
  { feature: "Reporting", "excel": "Manual creation", tms: "Built-in dashboards" },
  { feature: "Document Storage", "excel": "Separate folders", tms: "Centralized" },
  { feature: "Compliance Support", "excel": "Self-managed", tms: "Built-in tools" },
]

export default function ExcelVsTmsPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO - WHITE BACKGROUND WITH SVG VISUAL */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">
                Workflow Comparison
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Excel <span className="text-indigo-500">vs</span> TMS
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Spreadsheets meet automation. Compare manual Excel workflows with 
                modern TMS platforms to understand when it&apos;s time to make the leap 
                to automated freight operations.
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
                  When to Automate?
                </Link>
              </div>
            </div>

            {/* Right: Visual SVG */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-indigo-100/50 rounded-3xl blur-3xl" />
              
              {/* Comparison Visual */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  {/* Excel Box */}
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#059669" opacity="0.1" stroke="#059669" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#059669"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Excel</text>
                  
                  {/* Excel Grid */}
                  <rect x="40" y="105" width="110" height="12" fill="#059669" opacity="0.3"/>
                  <rect x="40" y="122" width="110" height="12" fill="#059669" opacity="0.15"/>
                  <rect x="40" y="139" width="110" height="12" fill="#059669" opacity="0.3"/>
                  <rect x="40" y="156" width="110" height="12" fill="#059669" opacity="0.15"/>
                  <rect x="40" y="173" width="110" height="12" fill="#059669" opacity="0.3"/>
                  <rect x="40" y="190" width="110" height="12" fill="#059669" opacity="0.15"/>
                  <rect x="40" y="207" width="110" height="12" fill="#059669" opacity="0.3"/>
                  
                  {/* Column Headers */}
                  <rect x="40" y="105" width="25" height="114" fill="#059669" opacity="0.5"/>
                  
                  {/* VS Circle */}
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  
                  {/* TMS Box */}
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#4f46e5"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">TMS</text>
                  
                  {/* TMS Interface Elements */}
                  <rect x="250" y="105" width="110" height="25" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <rect x="255" y="112" width="40" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  <rect x="300" y="112" width="55" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  
                  <rect x="250" y="138" width="110" height="25" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <rect x="255" y="145" width="40" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  <rect x="300" y="145" width="55" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  
                  <rect x="250" y="171" width="110" height="25" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <rect x="255" y="178" width="40" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  <rect x="300" y="178" width="55" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  
                  <rect x="250" y="204" width="110" height="25" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <rect x="255" y="211" width="40" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  <rect x="300" y="211" width="55" height="12" rx="2" fill="#4f46e5" opacity="0.4"/>
                  
                  {/* Status Indicators */}
                  <circle cx="355" cy="118" r="4" fill="#10b981"/>
                  <circle cx="355" cy="151" r="4" fill="#f59e0b"/>
                  <circle cx="355" cy="184" r="4" fill="#10b981"/>
                  <circle cx="355" cy="217" r="4" fill="#ef4444"/>
                </svg>

                {/* Labels below SVG */}
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Manual</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Automated</span>
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
                Excel Is Costing You More Than You Think
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Spreadsheets feel free, but the hidden costs add up fast. Data entry errors, 
                version conflicts, and reconciliation delays cost forwarders thousands monthly. 
                When you factor in error correction and opportunity cost, Excel isn&apos;t as cheap as it looks.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">20%</div>
                  <p className="text-slate-400 text-sm">Average error rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">15 hrs</div>
                  <p className="text-slate-400 text-sm">Weekly reconciliation</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$85K</div>
                  <p className="text-slate-400 text-sm">Annual hidden costs</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">0%</div>
                  <p className="text-slate-400 text-sm">Audit trail coverage</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The Spreadsheet Death Spiral
                </h3>
                <div className="space-y-4">
                  {[
                    "Create master shipment tracking sheet",
                    "Email to team, create version conflicts", 
                    "Manual data entry introduces errors",
                    "Spend hours reconciling discrepancies",
                    "Rebuild reports from scratch monthly",
                    "Lose data when files get corrupted"
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
              The Growth Ceiling Problem
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Whether you stay with Excel or move to TMS, you hit the same wall: data doesn&apos;t reach your ERP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileJson className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Format Chaos</h3>
              <p className="text-slate-600">
                Excel exports don&apos;t match your ERP import templates. Manual reformatting 
                creates bottlenecks and introduces errors.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sync Nightmares</h3>
              <p className="text-slate-600">
                Multiple team members updating files creates conflicts. By the time 
                data is consolidated, it&apos;s already outdated.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reporting Burden</h3>
              <p className="text-slate-600">
                Building reports from scratch takes hours. Manual chart creation 
                delays decision-making and hides trends.
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
              Side-by-side breakdown of Excel vs TMS capabilities
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-emerald-700 bg-emerald-50">Excel (Manual)</div>
              <div className="px-6 py-4 font-bold text-center text-indigo-700 bg-indigo-50">TMS (Automated)</div>
            </div>
            
            {/* Table Rows */}
            {comparisonFeatures.map((row, index) => (
              <div 
                key={row.feature} 
                className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["excel"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.tms}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Excel Strengths</h4>
              <p className="text-sm text-slate-600">
                Zero setup, universal familiarity, immediate availability. Perfect for 
                startups and operations under 50 shipments/month.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">TMS Advantages</h4>
              <p className="text-sm text-slate-600">
                Automation, validation, scalability, audit trails. Essential for 
                operations over 200 shipments/month or multi-user teams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">DocStandard Solution</h4>
              <p className="text-sm text-slate-600">
                We bridge both worlds. Accept Excel uploads or TMS exports, deliver 
                clean data to your ERP either way.
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
                Which Approach Fits Your Operation?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Match your shipment volume and team size to the right solution.
              </p>
              
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <Workflow className="w-5 h-5" />
                  Break-Even Analysis
                </h3>                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel Sweet Spot
                  </div>
                  <p className="text-slate-600">&lt;50 shipments/month, 1-2 users, simple workflows</p>
                </div>                
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <Database className="w-4 h-4" />
                    TMS Justified
                  </div>
                  <p className="text-slate-600">200+ shipments/month, 3+ users, complex routing</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Stick with Excel If...</h3>
                  <p className="text-slate-600">
                    You&apos;re under 50 shipments/month, have 1-2 people handling operations, 
                    and simple lanes. Budget $0, but expect 15-20% error rates.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Move to TMS If...</h3>
                  <p className="text-slate-600">
                    You&apos;re 200+ shipments/month, have 3+ team members, need real-time visibility, 
                    or handle complex multi-modal routing.
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
                    Clean data delivery to your ERP. DocStandard accepts Excel files or 
                    TMS exports and standardizes both for NetSuite/QuickBooks.
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
              The Automation ROI
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings when you standardize data flow — regardless of your workflow choice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">20 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Weekly manual work</p>
              <div className="text-red-400 text-sm">Data entry + fixes</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1 hr</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">95% reduction</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$75K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-indigo-400 text-sm">Labor + errors</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.7%</div>
              <p className="text-slate-400 text-sm mb-2">Data accuracy</p>
              <div className="text-purple-400 text-sm">Zero typos</div>
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
                <FileSpreadsheet className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Source-Agnostic</h3>
              <p className="text-slate-600">
                Accept Excel uploads, CSV exports, or TMS outputs. We normalize everything 
                regardless of how your data originates.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Validation Included</h3>
              <p className="text-slate-600">
                Built-in field validation catches errors before they hit your ERP. 
                No more failed imports due to formatting issues.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3>
              <p className="text-slate-600">
                $799 per batch. Same price whether you upload Excel files or connect 
                your TMS. No per-row or per-shipment fees.
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
                q: "We're stuck with Excel for shipment tracking but need this data in our ERP. Can DocStandard help without changing our workflow?",
                a: "Yes. DocStandard accepts your existing Excel tracking sheets—no reformatting required—and transforms the data for direct ERP import. Your team keeps their familiar workflow while you get automated data flow, saving 20+ hours weekly on manual uploads."
              },
              {
                q: "Our TMS exports don't match our ERP import format, so we're stuck doing manual reformatting. How does DocStandard solve this?",
                a: "DocStandard acts as a translation layer—accepting any TMS export format and delivering data in your ERP's native schema. This eliminates the 15+ hours weekly spent on CSV reformatting and validation, with 99.7% accuracy guaranteed."
              },
              {
                q: "We have 6 months of shipment data trapped in Excel files. Can DocStandard help us migrate this to our new TMS?",
                a: "Absolutely. DocStandard extracts historical data from Excel files, normalizes inconsistent formats, and delivers clean imports for your new TMS. This bulk migration capability saves 4-6 weeks of manual data entry and ensures no historical records are lost."
              },
              {
                q: "How does DocStandard help us decide when to move from Excel to a proper TMS?",
                a: "DocStandard provides a bridge solution—automating your Excel-based workflow while you evaluate TMS options. This reduces immediate pain (20-hour weeks → 2-hour weeks) and gives you clean data to compare TMS outputs against when you're ready to migrate."
              },
              {
                q: "Can DocStandard handle the transition period where some team members use Excel and others use the new TMS?",
                a: "Yes. DocStandard accepts data from both sources simultaneously—Excel uploads from legacy users and API feeds from the new TMS—and normalizes everything into consistent ERP imports. This hybrid approach supports gradual rollouts without data silos."
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
                &quot;We ran everything on Excel for 3 years. At 300 shipments/month, the wheels fell off. 
                    DocStandard let us keep Excel while they handled the NetSuite integration. Perfect bridge solution.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Director</div>
                <div className="text-sm text-slate-500">Freight Forwarder, Texas</div>
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
                &quot;The team didn&apos;t want to learn a TMS yet. DocStandard takes our Excel tracking sheet 
                    every morning and puts clean data into QuickBooks. Best of both worlds.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Owner</div>
                <div className="text-sm text-slate-500">Small Forwarder, Florida</div>
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
                &quot;We tried to build Excel macros to push to NetSuite. Spent $18K and it broke every month. 
                    DocStandard just works. Should have done this from day one.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">IT Manager</div>
                <div className="text-sm text-slate-500">Mid-size 3PL, California</div>
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
              <p className="text-sm text-slate-600">Processing speed and accuracy comparison</p>
            </Link>
            <Link href="/comparison/in-house-team-vs-outsourced-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">In-House vs Outsourced</h3>
              <p className="text-sm text-slate-600">Processing model analysis for logistics</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Works with Excel files or TMS exports</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
