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
  Server,
  Plug,
  Settings,
  Cloud,
  FileSpreadsheet
} from "lucide-react"

export const metadata: Metadata = {
  title: "EDI vs API Integration (2026): Logistics Data Exchange | DocStandard",
  description:
    "Compare EDI and API integration for logistics. Understand when to use traditional EDI vs modern REST APIs for freight data exchange.",
  alternates: {
    canonical: "https://docstandard.co/comparison/edi-vs-api-integration",
  },
}

// Comparison data
const comparisonFeatures = [
  { feature: "Technology Age", "edi": "40+ years old", api: "Modern (10+ years)" },
  { feature: "Data Format", "edi": "X12, EDIFACT (structured)", api: "JSON, XML (flexible)" },
  { feature: "Real-time Capability", "edi": "Batch processing", api: "Real-time streaming" },
  { feature: "Setup Complexity", "edi": "High - requires VAN", api: "Low - direct connection" },
  { feature: "Implementation Time", "edi": "3-6 months", api: "2-6 weeks" },
  { feature: "Error Handling", "edi": "Manual resolution", api: "Automated retry logic" },
  { feature: "Scalability", "edi": "Limited by VAN capacity", api: "Cloud-native scaling" },
  { feature: "Trading Partner Required", "edi": "Both must use EDI", api: "One can adopt gradually" },
  { feature: "Transaction Cost", "edi": "$0.05-0.15 per segment", api: "Flat or usage-based" },
  { feature: "Security Standard", "edi": "VAN-encrypted", api: "OAuth 2.0, TLS 1.3" },
  { feature: "Industry Adoption", "edi": "✓ Universal in freight", api: "✓ Growing rapidly" },
  { feature: "Integration Flexibility", "edi": "Rigid standards", api: "Custom endpoints" },
]

export default function EdiVsApiPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* HERO - WHITE BACKGROUND WITH SVG VISUAL */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">
                Integration Comparison
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                EDI <span className="text-indigo-500">vs</span> API
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Traditional EDI meets modern API integration. Compare the two dominant 
                data exchange methods in logistics and discover which fits your 
                freight operation&apos;s needs.
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
                  Which is Right for You?
                </Link>
              </div>
            </div>

            {/* Right: Visual SVG */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-amber-100/50 rounded-3xl blur-3xl" />
              
              {/* Comparison Visual */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  {/* EDI Box */}
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#4f46e5"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">EDI</text>
                  
                  {/* EDI File Icons */}
                  <rect x="45" y="105" width="100" height="30" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <text x="95" y="124" textAnchor="middle" fill="#4f46e5" fontSize="10">X12_856.edi</text>
                  
                  <rect x="45" y="145" width="100" height="30" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <text x="95" y="164" textAnchor="middle" fill="#4f46e5" fontSize="10">EDIFACT.edi</text>
                  
                  <rect x="45" y="185" width="100" height="30" rx="4" fill="#4f46e5" opacity="0.2"/>
                  <text x="95" y="204" textAnchor="middle" fill="#4f46e5" fontSize="10">VAN_BATCH.edi</text>
                  
                  {/* VS Circle */}
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  
                  {/* API Box */}
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#f59e0b"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">API</text>
                  
                  {/* API Code Blocks */}
                  <rect x="255" y="105" width="100" height="30" rx="4" fill="#f59e0b" opacity="0.2"/>
                  <text x="305" y="124" textAnchor="middle" fill="#d97706" fontSize="10">POST /shipments</text>
                  
                  <rect x="255" y="145" width="100" height="30" rx="4" fill="#f59e0b" opacity="0.2"/>
                  <text x="305" y="164" textAnchor="middle" fill="#d97706" fontSize="10">JSON Payload</text>
                  
                  <rect x="255" y="185" width="100" height="30" rx="4" fill="#f59e0b" opacity="0.2"/>
                  <text x="305" y="204" textAnchor="middle" fill="#d97706" fontSize="10">200 OK</text>
                  
                  {/* Connection Lines */}
                  <line x1="95" y1="100" x2="95" y2="220" stroke="#4f46e5" strokeWidth="1" strokeDasharray="4"/>
                  <line x1="305" y1="100" x2="305" y2="220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
                </svg>

                {/* Labels below SVG */}
                <div className="flex justify-between mt-4 px-4">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Batch</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-1"></div>
                    <span className="text-sm font-semibold text-slate-700">Real-time</span>
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
                Your Integration Is a Bottleneck
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you use EDI or API, you&apos;re facing the same challenge: 
                translating complex logistics data into a format your accounting 
                system understands. Both methods require expertise to implement correctly 
                and maintain over time.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$15K+</div>
                  <p className="text-slate-400 text-sm">Annual EDI VAN costs</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
                  <p className="text-slate-400 text-sm">API integration failures</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">6 mo</div>
                  <p className="text-slate-400 text-sm">Average EDI setup time</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">3+ vendors</div>
                  <p className="text-slate-400 text-sm">Required for full stack</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-amber-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The Translation Trap
                </h3>
                <div className="space-y-4">
                  {[
                    "Extract data from TMS via EDI/API",
                    "Transform to match ERP field structure", 
                    "Validate against business rules",
                    "Handle rejected transactions",
                    "Map error codes to human-readable format",
                    "Reconcile failed batches manually"
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
              The Data Standardization Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Both EDI and API formats create the same problem: data doesn&apos;t match your ERP
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileJson className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Format Fragmentation</h3>
              <p className="text-slate-600">
                EDI X12, EDIFACT, and various REST APIs all use different field naming 
                and structure. Mapping each requires deep expertise.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Version Management</h3>
              <p className="text-slate-600">
                EDI standards update periodically (4010, 5010, 6020). APIs version too. 
                Keeping mappings current is a full-time job.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Validation Gaps</h3>
              <p className="text-slate-600">
                Bad data passes through to your ERP, causing failed imports and 
                requiring manual cleanup that eats up operations time.
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
              Side-by-side breakdown of EDI and API capabilities
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-semibold text-slate-700">Feature</div>
              <div className="px-6 py-4 font-bold text-center text-indigo-700 bg-indigo-50">EDI (Traditional)</div>
              <div className="px-6 py-4 font-bold text-center text-amber-700 bg-amber-50">API (Modern)</div>
            </div>
            
            {/* Table Rows */}
            {comparisonFeatures.map((row, index) => (
              <div 
                key={row.feature} 
                className={`grid grid-cols-3 ${index !== comparisonFeatures.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="px-6 py-4 font-medium text-slate-900">{row.feature}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row["edi"]}</div>
                <div className="px-6 py-4 text-center text-slate-600">{row.api}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">EDI Strengths</h4>
              <p className="text-sm text-slate-600">
                Universal adoption, strict standards, trusted by major carriers and shippers. 
                Required for many enterprise trading partners.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">API Advantages</h4>
              <p className="text-sm text-slate-600">
                Real-time data, easier implementation, modern tooling, better error handling. 
                Preferred for new integrations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">DocStandard Solution</h4>
              <p className="text-sm text-slate-600">
                We handle both. EDI or API input, standardized output to your ERP. 
                Same flat fee regardless of source.
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
                Which Integration Fits Your Operation?
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Match your business requirements to the right data exchange method.
              </p>
              
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Industry Trend
                </h3>                
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <Server className="w-4 h-4" />
                    EDI Market
                  </div>
                  <p className="text-slate-600">$6.1B market, 9% CAGR. Still dominant in legacy logistics.</p>
                </div>                
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                    <Plug className="w-4 h-4" />
                    API Growth
                  </div>
                  <p className="text-slate-600">23% CAGR in logistics APIs. Preferred by tech-forward operators.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose EDI If...</h3>
                  <p className="text-slate-600">
                    Your trading partners require it, you need strict compliance (pharma, food), 
                    or you operate with legacy systems. Budget 3-6 months for implementation.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose API If...</h3>
                  <p className="text-slate-600">
                    You need real-time visibility, have modern tech stack, want faster 
                    implementation (2-6 weeks), or work with partners who offer REST endpoints.
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
                    Standardized data delivery to your ERP. DocStandard normalizes both 
                    EDI and API inputs into clean, import-ready formats.
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
              The Standardization ROI
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings when you automate data transformation — regardless of integration type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">40+ hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual mapping weekly</p>
              <div className="text-red-400 text-sm">Per integration</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">2 hrs</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">95% faster</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$95K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-indigo-400 text-sm">Labor + VAN costs</div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.8%</div>
              <p className="text-slate-400 text-sm mb-2">Mapping accuracy</p>
              <div className="text-purple-400 text-sm">Zero manual errors</div>
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">Format-Agnostic</h3>
              <p className="text-slate-600">
                Accept EDI, API, CSV, or XML input. We normalize everything into 
                a standard schema regardless of source format.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Native Output</h3>
              <p className="text-slate-600">
                Data delivered in NetSuite, QuickBooks, or SAP format. Import directly 
                without additional transformation.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3>
              <p className="text-slate-600">
                $799 per batch. No per-segment EDI fees, no API call charges. 
                Same price whether EDI or API source.
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
                q: "We're stuck with EDI from some carriers but want APIs from others. Can DocStandard handle both simultaneously?",
                a: "Yes. DocStandard normalizes both EDI (X12/EDIFACT) and API (REST/JSON) inputs into a single format for your ERP. This lets you migrate trading partners gradually without disrupting operations—saving the $95K+ cost of maintaining separate integration stacks."
              },
              {
                q: "Our EDI VAN charges per-segment fees that are unpredictable. How does DocStandard pricing compare?",
                a: "DocStandard charges a flat $799 per batch—no per-segment EDI fees, no API call charges. For high-volume operations, this eliminates the billing unpredictability of VANs and typically reduces integration costs by 60-80%."
              },
              {
                q: "We need to map EDI 856 and API data to our ERP but lack the technical resources. How does DocStandard help?",
                a: "DocStandard handles all mapping and transformation. We parse EDI X12 856s, poll API endpoints, and deliver data in your ERP's native format. This eliminates the need for dedicated integration teams and 40+ hours weekly of manual mapping work."
              },
              {
                q: "Our trading partners use different EDI versions (4010, 5010, 6020). Can DocStandard handle this fragmentation?",
                a: "Absolutely. DocStandard automatically detects and parses all EDI versions, normalizing them to a consistent schema. This eliminates version compatibility issues and ensures your ERP receives uniform data regardless of partner technical capabilities."
              },
              {
                q: "How does DocStandard reduce the time and cost of EDI/API integration projects?",
                a: "DocStandard eliminates the 3-6 month implementation timeline and $15K+ VAN setup costs. Most clients are live within 48 hours, processing documents immediately. This accelerates trading partner onboarding and ROI realization by months."
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
                &quot;We were stuck between upgrading our EDI infrastructure or moving to APIs. 
                DocStandard handles both, so we didn&apos;t have to choose. Saved us months of debate.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Integration Lead</div>
                <div className="text-sm text-slate-500">Freight Forwarder, Chicago</div>
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
                &quot;Half our carriers use EDI, half use APIs. DocStandard normalizes everything 
                into one format for NetSuite. No more maintaining two separate integration stacks.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Systems Manager</div>
                <div className="text-sm text-slate-500">3PL Provider, Netherlands</div>
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
                &quot;The flat fee is a game-changer. Our old EDI setup had per-segment charges 
                that were impossible to predict. Now we know exactly what each batch costs.&quot;
              </p>
              <div>
                <div className="font-semibold text-slate-900">Finance Director</div>
                <div className="text-sm text-slate-500">Logistics Company, USA</div>
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
            <Link href="/comparison/excel-vs-tms-automation" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Excel vs TMS Automation</h3>
              <p className="text-sm text-slate-600">Workflow comparison for freight operations</p>
            </Link>
            <Link href="/comparison/manual-processing-vs-automated-extraction" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Manual vs Automated</h3>
              <p className="text-sm text-slate-600">Processing methods compared for logistics</p>
            </Link>
            <Link href="/services/document-processing" className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-sm text-slate-600">Normalize EDI and API data for any ERP</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
