import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  FileInvoice,
  ScanLine,
  Mail,
  AlertTriangle,
  Clock,
  TrendingDown,
  FileText,
  BarChart3,
  Database,
  Shield,
  Zap,
  CheckCircle,
  Building2
} from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  if (!cityData) return { title: "Not Found" }

  return {
    title: `Invoice Processing in ${cityData.name} | DocStandard`,
    description: `Automate invoice data extraction and processing in ${cityData.name}. Transform PDF and paper invoices into structured AP-ready data with 99%+ accuracy.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function InvoiceCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, region } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-400 mb-4">{cityName} AP Operations</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Invoice Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Transform vendor invoices from any format — PDF, email, scan, or paper — into 
            structured, AP-ready data. Eliminate manual entry and accelerate payment cycles 
            for your {cityName} operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
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
                AP Bottleneck Alert
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Manual Invoice Processing Is Paralyzing Your AP Team
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {cityName} businesses drown in vendor invoices. Manual data entry creates errors, 
                delays payments, strains vendor relationships, and hides cash flow insights in 
                paper piles and PDF attachments.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">12 min</div>
                  <p className="text-slate-400 text-sm">Avg manual invoice entry time</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">3.6%</div>
                  <p className="text-slate-400 text-sm">Data entry error rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">14 days</div>
                  <p className="text-slate-400 text-sm">Average processing cycle</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$18</div>
                  <p className="text-slate-400 text-sm">Cost per manual invoice</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The Manual Invoice Trap
                </h3>
                <div className="space-y-4">
                  {[
                    "Invoice arrives via email, mail, or vendor portal",
                    "AP clerk opens PDF, reads and rekeys data into ERP",
                    "Vendor name lookup and coding assignment",
                    "Line item entry for every product/service",
                    "Math verification (often skipped when busy)",
                    "Routing for approval via email/paper"
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
              The Invoice Processing Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} AP teams battle document chaos that slows payments and damages vendor relationships
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Format Chaos</h3>
              <p className="text-slate-600">
                Every vendor sends invoices differently — PDF layouts, email bodies, scanned paper, 
                portal downloads. Your AP team adapts to hundreds of unique formats daily.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email Overload</h3>
              <p className="text-slate-600">
                Vendor invoices buried in crowded inboxes. Attachments downloaded, renamed, 
                lost. No tracking of what arrived when or where it is in the process.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Blind Spot</h3>
              <p className="text-slate-600">
                Without digitized invoice data, you can't analyze spend patterns, track vendor 
                performance, or optimize payment timing for cash flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL GUIDE */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Master Mapping Blueprint
            </h2>
            <p className="text-slate-600 text-lg">
              How DocStandard extracts and validates invoice fields for {cityName} accounts payable
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-950 p-4 text-sm font-semibold text-slate-400 border-b border-slate-800">
              <div>Source Field</div>
              <div>Document Location</div>
              <div>Validation Rule</div>
              <div>Output Format</div>
            </div>
            {[
              ["Invoice Number", "Header", "Unique identifier", "String"],
              ["Vendor Name", "From/supplier block", "Match vendor master", "Validated vendor ID"],
              ["Invoice Date", "Date field", "Valid date, not future", "ISO date"],
              ["Due Date", "Terms/payment block", "Valid date > invoice date", "ISO date"],
              ["PO Number", "Reference field", "Match against PO system", "Cross-referenced PO"],
              ["Subtotal", "Amount block", "Sum of line items", "Decimal(10,2)"],
              ["Tax Amount", "Tax line", "Valid tax calculation", "Decimal(10,2), verified"],
              ["Total Amount", "Invoice total", "Subtotal + tax", "Decimal(10,2), verified"],
              ["Currency", "Currency indicator", "Valid ISO code", "3-letter code"],
              ["Payment Terms", "Terms field", "Net days or specific date", "Normalized terms"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 text-sm border-b border-slate-800 hover:bg-slate-800/50">
                <div className="text-violet-400 font-medium">{row[0]}</div>
                <div className="text-slate-300">{row[1]}</div>
                <div className="text-slate-400">{row[2]}</div>
                <div className="text-slate-300">{row[3]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Multi-Format Support</h4>
              <p className="text-sm text-slate-600">Handles structured PDFs, scanned images, email bodies, and even handwritten annotations. No template setup required.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">PO Matching</h4>
              <p className="text-sm text-slate-600">Automatically match invoices to purchase orders. Flag quantity and price variances for approval routing.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Duplicate Detection</h4>
              <p className="text-sm text-slate-600">Identify duplicate submissions by invoice number, vendor, amount, and date combinations before payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL PROCESS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The DocStandard Engine
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From document receipt to ERP posting — automated invoice processing pipeline
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { 
                  num: "01", 
                  title: "Document Capture", 
                  desc: "Receive invoices via email monitor, portal download, scan upload, or API. OCR extracts text from PDFs, images, and scanned documents regardless of layout.",
                  icon: FileText
                },
                { 
                  num: "02", 
                  title: "Intelligent Extraction", 
                  desc: "AI identifies header data, line items, totals, and terms. Extract 30+ fields including vendor details, amounts, dates, PO references, and payment instructions.",
                  icon: Database
                },
                { 
                  num: "03", 
                  title: "Validation & Matching", 
                  desc: "Verify math, check vendor master, match against POs, validate tax calculations. Exceptions route to AP specialists with context for quick resolution.",
                  icon: Shield
                },
                { 
                  num: "04", 
                  title: "ERP Integration", 
                  desc: "Post approved invoices to your ERP with GL coding, cost center allocation, and approval workflows pre-applied. Ready for payment scheduling.",
                  icon: Building2
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-violet-600 mb-1">STEP {step.num}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-3xl" />
              <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                      <FileInvoice className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Invoice Dashboard</div>
                      <div className="text-slate-400 text-sm">{cityName} AP</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Active</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Invoices Today</span>
                    <span className="text-white font-medium">127 processed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Processing Time</span>
                    <span className="text-white font-medium">2.1 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">PO Match Rate</span>
                    <span className="text-white font-medium">94%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Accuracy Rate</span>
                    <span className="text-white font-medium">99.7%</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">98</div>
                      <div className="text-xs text-slate-400">Posted</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-400">24</div>
                      <div className="text-xs text-slate-400">Pending</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-violet-400">5</div>
                      <div className="text-xs text-slate-400">Exception</div>
                    </div>
                  </div>
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
              Operational Impact
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings for {cityName} AP operations processing 1,000+ invoices monthly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">12 min</div>
              <p className="text-slate-400 text-sm mb-2">Manual entry time</p>
              <div className="text-red-400 text-sm">Per invoice</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">45 sec</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">94% faster</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-violet-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$145K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-violet-400 text-sm">Labor + errors</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.7%</div>
              <p className="text-slate-400 text-sm mb-2">Accuracy rate</p>
              <div className="text-purple-400 text-sm">Near zero errors</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {cityName} AP Teams Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100">
              <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <ScanLine className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">No-Template Extraction</h3>
              <p className="text-slate-600">
                Our AI reads any invoice format without setup. New vendor? New layout? 
                No problem — extraction works immediately with no configuration.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100">
              <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email Automation</h3>
              <p className="text-slate-600">
                Monitor AP inboxes automatically. Extract invoice attachments, process 
                email body invoices, and archive everything with full audit trails.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-white border border-violet-100">
              <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AP Analytics</h3>
              <p className="text-slate-600">
                Real-time visibility into invoice volumes, processing times, vendor spend, 
                and approval bottlenecks. Make data-driven decisions to optimize AP.
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
                q: `Can you process invoices from our vendors in ${cityName}?`,
                a: `Yes. We process invoices from any vendor regardless of format. PDFs, scanned images, email attachments, and portal downloads all work. No need to ask vendors to change how they send invoices.`
              },
              {
                q: "How does the PO matching work?",
                a: "We extract PO numbers from invoices and match against your purchase order system. Flag quantity mismatches, price variances, and line item discrepancies for approval routing."
              },
              {
                q: "Can you handle invoices without PO numbers?",
                a: "Absolutely. Non-PO invoices route through configured approval workflows based on vendor, amount, and GL account. All the same extraction accuracy, with flexible routing rules."
              },
              {
                q: "Does this integrate with our ERP?",
                a: "We integrate with SAP, Oracle, NetSuite, Microsoft Dynamics, QuickBooks, and custom ERP systems. Processed invoices post with full coding, ready for payment scheduling."
              },
              {
                q: "What about duplicate invoice detection?",
                a: "AI identifies duplicates by invoice number, vendor, amount, and date. Even subtle variations like 'INV-001' vs 'INV001' get flagged. Never pay the same invoice twice."
              },
            ].map((faq, i) => (
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
              What AP Teams Say
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
                "We went from 3 days processing time to same-day posting. Vendors are happier, 
                we capture early pay discounts, and the team focuses on analysis instead of data entry."
              </p>
              <div>
                <div className="font-semibold text-slate-900">AP Manager</div>
                <div className="text-sm text-slate-500">Manufacturer, {region}</div>
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
                "The PO matching is incredible. It catches discrepancies we'd never find manually, 
                and our buyers get alerted immediately when vendors invoice wrong quantities."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Controller</div>
                <div className="text-sm text-slate-500">Distributor, {country}</div>
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
                "We process 5,000 invoices monthly with a team of 3. Before DocStandard we 
                needed 8 people and still had a backlog. Game changer for our department."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Director of Finance</div>
                <div className="text-sm text-slate-500">Retail Chain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transform Your {cityName} AP Operations
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join organizations processing millions of invoices with 99%+ accuracy. 
            Get your first batch processed and see the difference immediately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
