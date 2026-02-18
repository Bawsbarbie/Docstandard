#!/usr/bin/env node
/**
 * DocStandard Comparison Page Generator
 * Generates 1,225 unique comparison pages for all system pairs
 * SKIPS existing pages to preserve Cursor's fixes
 */

const fs = require('fs');
const path = require('path');

// All 50 systems with their data
const systems = [
  { id: "cargowise", name: "cargowise", displayName: "CargoWise", category: "TMS", price: "$50K/year", market: "Enterprise ($50M+)", color: "#4f46e5", bgColor: "indigo" },
  { id: "magaya", name: "magaya", displayName: "Magaya", category: "TMS", price: "$500/month", market: "SMB (<$50M)", color: "#059669", bgColor: "emerald" },
  { id: "sap-tm", name: "sap-tm", displayName: "SAP TM", category: "TMS", price: "$250K/year", market: "Large enterprises", color: "#4f46e5", bgColor: "indigo" },
  { id: "oracle-otm", name: "oracle-otm", displayName: "Oracle OTM", category: "TMS", price: "$200K/year", market: "Large enterprises", color: "#f59e0b", bgColor: "amber" },
  { id: "descartes", name: "descartes", displayName: "Descartes", category: "TMS", price: "Custom pricing", market: "Mid to enterprise", color: "#3b82f6", bgColor: "blue" },
  { id: "mercurygate", name: "mercurygate", displayName: "MercuryGate", category: "TMS", price: "Custom pricing", market: "Mid to enterprise", color: "#0ea5e9", bgColor: "sky" },
  { id: "blueyonder", name: "blueyonder", displayName: "Blue Yonder", category: "TMS", price: "Custom pricing", market: "Enterprise", color: "#8b5cf6", bgColor: "violet" },
  { id: "manhattan-associates", name: "manhattan-associates", displayName: "Manhattan Associates", category: "TMS", price: "Custom pricing", market: "Enterprise", color: "#6366f1", bgColor: "indigo" },
  { id: "freightpop", name: "freightpop", displayName: "FreightPOP", category: "TMS", price: "$500/month", market: "Mid-market", color: "#06b6d4", bgColor: "cyan" },
  { id: "kuebix", name: "kuebix", displayName: "Kuebix", category: "TMS", price: "Freemium available", market: "SMB to mid-market", color: "#14b8a6", bgColor: "teal" },
  { id: "rose-rocket", name: "rose-rocket", displayName: "Rose Rocket", category: "TMS", price: "$300/month", market: "SMB trucking/brokerage", color: "#f97316", bgColor: "orange" },
  { id: "alpega", name: "alpega", displayName: "Alpega", category: "TMS", price: "Custom pricing", market: "Mid to enterprise", color: "#10b981", bgColor: "emerald" },
  { id: "transporeon", name: "transporeon", displayName: "Transporeon", category: "TMS", price: "Custom pricing", market: "Enterprise", color: "#3b82f6", bgColor: "blue" },
  { id: "flexport", name: "flexport", displayName: "Flexport", category: "Forwarder", price: "Per-shipment", market: "Regular shippers", color: "#ec4899", bgColor: "pink" },
  { id: "freightos", name: "freightos", displayName: "Freightos", category: "Forwarder", price: "Free to compare", market: "Rate shoppers", color: "#14b8a6", bgColor: "teal" },
  { id: "3pl-central", name: "3pl-central", displayName: "3PL Central", category: "WMS", price: "$500/month", market: "3PLs and warehouses", color: "#f59e0b", bgColor: "amber" },
  { id: "shipstation", name: "shipstation", displayName: "ShipStation", category: "Shipping", price: "$29/month", market: "E-commerce SMB", color: "#8b5cf6", bgColor: "violet" },
  { id: "project44", name: "project44", displayName: "project44", category: "Visibility", price: "Custom pricing", market: "Enterprise", color: "#ef4444", bgColor: "red" },
  { id: "fourkites", name: "fourkites", displayName: "FourKites", category: "Visibility", price: "Custom pricing", market: "Enterprise", color: "#22c55e", bgColor: "green" },
  { id: "samsara", name: "samsara", displayName: "Samsara", category: "Fleet", price: "$33/vehicle/month", market: "Fleet operators", color: "#06b6d4", bgColor: "cyan" },
  { id: "motive", name: "motive", displayName: "Motive", category: "Fleet", price: "$25/vehicle/month", market: "Fleet operators", color: "#f97316", bgColor: "orange" },
  { id: "geotab", name: "geotab", displayName: "Geotab", category: "Fleet", price: "$39/vehicle/month", market: "Enterprise fleets", color: "#3b82f6", bgColor: "blue" },
  { id: "verizon-connect", name: "verizon-connect", displayName: "Verizon Connect", category: "Fleet", price: "$35/vehicle/month", market: "Mid to enterprise fleets", color: "#ef4444", bgColor: "red" },
  { id: "trimble", name: "trimble", displayName: "Trimble", category: "Fleet", price: "Custom pricing", market: "Enterprise transportation", color: "#f59e0b", bgColor: "amber" },
  { id: "omnitracs", name: "omnitracs", displayName: "Omnitracs", category: "Fleet", price: "Custom pricing", market: "Enterprise fleets", color: "#6366f1", bgColor: "indigo" },
  { id: "netsuite", name: "netsuite", displayName: "NetSuite", category: "ERP", price: "$999/month", market: "Mid-market ($10M-$500M)", color: "#f59e0b", bgColor: "amber" },
  { id: "sap-s4hana", name: "sap-s4hana", displayName: "SAP S/4HANA", category: "ERP", price: "Custom (enterprise)", market: "Large enterprises", color: "#3b82f6", bgColor: "blue" },
  { id: "oracle-erp-cloud", name: "oracle-erp-cloud", displayName: "Oracle ERP Cloud", category: "ERP", price: "Custom (enterprise)", market: "Large enterprises", color: "#ef4444", bgColor: "red" },
  { id: "dynamics-365", name: "dynamics-365", displayName: "Dynamics 365", category: "ERP", price: "$210/user/month", market: "Mid to enterprise", color: "#3b82f6", bgColor: "blue" },
  { id: "dynamics-bc", name: "dynamics-bc", displayName: "Dynamics Business Central", category: "ERP", price: "$70/user/month", market: "SMB to mid-market", color: "#0ea5e9", bgColor: "sky" },
  { id: "acumatica", name: "acumatica", displayName: "Acumatica", category: "ERP", price: "$1,800/month", market: "Mid-market", color: "#f97316", bgColor: "orange" },
  { id: "epicor", name: "epicor", displayName: "Epicor", category: "ERP", price: "Custom pricing", market: "Mid-market manufacturing", color: "#ef4444", bgColor: "red" },
  { id: "infor-cloudsuite", name: "infor-cloudsuite", displayName: "Infor CloudSuite", category: "ERP", price: "Custom pricing", market: "Mid to enterprise", color: "#8b5cf6", bgColor: "violet" },
  { id: "workday", name: "workday", displayName: "Workday", category: "ERP", price: "Custom (enterprise)", market: "Large enterprises", color: "#f97316", bgColor: "orange" },
  { id: "financialforce", name: "financialforce", displayName: "FinancialForce", category: "ERP", price: "Custom pricing", market: "Services businesses", color: "#22c55e", bgColor: "green" },
  { id: "quickbooks-online", name: "quickbooks-online", displayName: "QuickBooks Online", category: "Accounting", price: "$30/month", market: "SMB <100 employees", color: "#22c55e", bgColor: "green" },
  { id: "quickbooks-desktop", name: "quickbooks-desktop", displayName: "QuickBooks Desktop", category: "Accounting", price: "$349/year", market: "SMB with on-prem needs", color: "#10b981", bgColor: "emerald" },
  { id: "sage-intacct", name: "sage-intacct", displayName: "Sage Intacct", category: "Accounting", price: "$400/month", market: "Mid-market 100-500", color: "#8b5cf6", bgColor: "violet" },
  { id: "sage-300", name: "sage-300", displayName: "Sage 300", category: "Accounting", price: "$200/user/month", market: "SMB to mid-market", color: "#6366f1", bgColor: "indigo" },
  { id: "xero", name: "xero", displayName: "Xero", category: "Accounting", price: "$15/month", market: "Small business", color: "#3b82f6", bgColor: "blue" },
  { id: "zoho-books", name: "zoho-books", displayName: "Zoho Books", category: "Accounting", price: "$15/month", market: "SMB", color: "#f59e0b", bgColor: "amber" },
  { id: "freshbooks", name: "freshbooks", displayName: "FreshBooks", category: "Accounting", price: "$17/month", market: "Service SMBs", color: "#22c55e", bgColor: "green" },
  { id: "wave", name: "wave", displayName: "Wave", category: "Accounting", price: "Free", market: "Micro businesses", color: "#06b6d4", bgColor: "cyan" },
  { id: "excel", name: "excel", displayName: "Excel", category: "Tools", price: "$6.99/month", market: "All sizes", color: "#22c55e", bgColor: "green" },
  { id: "edi", name: "edi", displayName: "EDI", category: "Tools", price: "Varies by provider", market: "Enterprise trading partners", color: "#6366f1", bgColor: "indigo" },
  { id: "api-integration", name: "api-integration", displayName: "API Integration", category: "Tools", price: "Development cost varies", market: "Tech-savvy organizations", color: "#3b82f6", bgColor: "blue" },
  { id: "manual-processing", name: "manual-processing", displayName: "Manual Processing", category: "Tools", price: "$25-35/hour labor", market: "Low volume operations", color: "#ef4444", bgColor: "red" },
  { id: "automated-extraction", name: "automated-extraction", displayName: "Automated Extraction", category: "Tools", price: "$0.15-0.50/document", market: "All sizes with volume", color: "#22c55e", bgColor: "green" },
  { id: "in-house-team", name: "in-house-team", displayName: "In-House Team", category: "Tools", price: "$45-65K/year", market: "Organizations with steady volume", color: "#f59e0b", bgColor: "amber" },
  { id: "outsourced-processing", name: "outsourced-processing", displayName: "Outsourced Processing", category: "Tools", price: "$2-5/document", market: "Variable volume operations", color: "#8b5cf6", bgColor: "violet" },
];

// EXISTING PAGES - DO NOT OVERWRITE
const existingPages = [
  "cargowise-vs-magaya",
  "sap-tm-vs-oracle-otm",
  "descartes-vs-mercurygate",
  "flexport-vs-freightos",
  "netsuite-vs-dynamics365",
  "quickbooks-vs-sage",
  "manual-processing-vs-automated-extraction",
  "edi-vs-api-integration",
  "excel-vs-tms-automation",
  "in-house-team-vs-outsourced-processing"
];

// Generate all comparison pairs
function generatePairs() {
  const pairs = [];
  for (let i = 0; i < systems.length; i++) {
    for (let j = i + 1; j < systems.length; j++) {
      const slug = `${systems[i].name}-vs-${systems[j].name}`;
      // Skip existing pages
      if (!existingPages.includes(slug)) {
        pairs.push([systems[i], systems[j], slug]);
      }
    }
  }
  return pairs;
}

// Generate comparison features based on system categories
function generateComparisonFeatures(a, b) {
  return [
    { feature: "Category", a: a.category, b: b.category },
    { feature: "Starting Price", a: a.price, b: b.price },
    { feature: "Target Market", a: a.market, b: b.market },
  ];
}

// Generate page content
function generatePage(a, b) {
  const features = generateComparisonFeatures(a, b);
  const slug = `${a.name}-vs-${b.name}`;
  
  return `import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, TrendingDown, BarChart3, Shield, Zap, Building2, DollarSign, Clock, Database } from "lucide-react"

export const metadata: Metadata = {
  title: "${a.displayName} vs ${b.displayName} (2026): ${a.category} Comparison | DocStandard",
  description: "Compare ${a.displayName} and ${b.displayName} side-by-side. Features, pricing, integrations, and use cases for logistics operations.",
  alternates: { canonical: "https://docstandard.co/comparison/${slug}" },
  robots: { index: false, follow: false }
}

export default function Page() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">${a.category} Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">${a.displayName} <span className="text-indigo-500">vs</span> ${b.displayName}</h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">Compare ${a.displayName} and ${b.displayName} for logistics operations. Side-by-side analysis of features, pricing, and capabilities to find your best fit.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">See Comparison<ArrowRight className="w-5 h-5" /></Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">Which Fits You?</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-${a.bgColor}-100/50 to-${b.bgColor}-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="${a.color}" opacity="0.1" stroke="${a.color}" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="${a.color}"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">${a.displayName}</text>
                  <rect x="45" y="105" width="100" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <rect x="45" y="125" width="80" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <rect x="45" y="145" width="90" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <rect x="45" y="165" width="70" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <rect x="45" y="185" width="85" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <rect x="45" y="205" width="60" height="12" rx="6" fill="${a.color}" opacity="0.3"/>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="${b.color}" opacity="0.1" stroke="${b.color}" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="${b.color}"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">${b.displayName}</text>
                  <rect x="255" y="105" width="100" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
                  <rect x="255" y="125" width="80" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
                  <rect x="255" y="145" width="90" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
                  <rect x="255" y="165" width="70" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
                  <rect x="255" y="185" width="85" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
                  <rect x="255" y="205" width="60" height="12" rx="6" fill="${b.color}" opacity="0.3"/>
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
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">Whether you choose ${a.displayName} or ${b.displayName}, you are facing the same problem: getting clean data into your accounting system. Both platforms excel at their core function, but neither connects seamlessly to ERPs out of the box.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div><p className="text-slate-400 text-sm">Daily manual exports</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">35%</div><p className="text-slate-400 text-sm">Data re-keying error rate</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$45K</div><p className="text-slate-400 text-sm">Annual error costs</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div><p className="text-slate-400 text-sm">Reconciliation delay</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-${a.bgColor}-500/20 to-${b.bgColor}-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Manual Data Trap</h3>
                <div className="space-y-4">
                  {["Export data from ${a.displayName}","Reformat to match target system requirements","Manually validate field mappings","Import and troubleshoot errors","Reconcile mismatches and re-process","Repeat for every batch - 2-3x daily"].map((item, i) => (
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
              <div className="px-6 py-4 font-bold text-center text-${a.bgColor}-700 bg-${a.bgColor}-50">${a.displayName}</div>
              <div className="px-6 py-4 font-bold text-center text-${b.bgColor}-700 bg-${b.bgColor}-50">${b.displayName}</div>
            </div>
            \${features.map((row, index) => String.fromCharCode(96) + '            <div className="grid grid-cols-3 ${index !== features.length - 1 ? 'border-b border-slate-100' : ''}">
              <div className="px-6 py-4 font-medium text-slate-900">${row.feature}</div>
              <div className="px-6 py-4 text-center text-slate-600">${row.a}</div>
              <div className="px-6 py-4 text-center text-slate-600">${row.b}</div>
            </div>\` + String.fromCharCode(96)).join('')}
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
                <div className="w-12 h-12 bg-${a.bgColor}-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose ${a.displayName} If...</h3>
                  <p className="text-slate-600">You are ${a.market.toLowerCase()}, need ${a.category.toLowerCase()} functionality, and your budget aligns with ${a.price} pricing.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-${b.bgColor}-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Choose ${b.displayName} If...</h3>
                  <p className="text-slate-600">You are ${b.market.toLowerCase()}, need ${b.category.toLowerCase()} functionality, and your budget aligns with ${b.price} pricing.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Either Way, You Need...</h3>
                  <p className="text-slate-600">Clean data integration to your ERP. DocStandard bridges ${a.displayName} and ${b.displayName} to NetSuite, QuickBooks, SAP, and more.</p>
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
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Database className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Platform-Agnostic</h3><p className="text-slate-600">Works with ${a.displayName}, ${b.displayName}, or any platform. We normalize data regardless of your system choice.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><Building2 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">ERP-Ready Output</h3><p className="text-slate-600">Data delivered in NetSuite, QuickBooks, or SAP-native format. Import directly without transformation.</p></div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"><div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-slate-900 mb-3">Flat-Fee Pricing</h3><p className="text-slate-600">$799 per batch. No per-record fees, no hidden costs. Same price whether you use ${a.displayName} or ${b.displayName}.</p></div>
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
`;
}

// Main execution
function main() {
  const pairs = generatePairs();
  const total = pairs.length;
  
  console.log(`Total NEW pages to generate (excluding existing 10): ${total}`);
  console.log(`Existing pages being preserved: ${existingPages.length}`);
  
  // Get batch parameters from environment
  const batchIndex = parseInt(process.env.BATCH_INDEX || '0');
  const batchSize = parseInt(process.env.BATCH_SIZE || '100');
  const startIdx = batchIndex * batchSize;
  const endIdx = Math.min(startIdx + batchSize, total);
  
  console.log(`\\nGenerating batch ${batchIndex + 1}: pages ${startIdx + 1} to ${endIdx} of ${total}`);
  
  const baseDir = path.join(__dirname, '..', 'app', '(pseo)', 'comparison');
  
  let generated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (let i = startIdx; i < endIdx; i++) {
    const [a, b, slug] = pairs[i];
    const dir = path.join(baseDir, slug);
    const file = path.join(dir, 'page.tsx');
    
    try {
      // Check if already exists - SKIP to preserve Cursor's fixes
      if (fs.existsSync(dir)) {
        console.log(`  SKIP (exists): ${slug}`);
        skipped++;
        continue;
      }
      
      // Create directory
      fs.mkdirSync(dir, { recursive: true });
      
      // Generate and write page
      const content = generatePage(a, b);
      fs.writeFileSync(file, content, 'utf8');
      generated++;
      
      if (generated % 10 === 0) {
        console.log(`  Generated: ${generated} in this batch`);
      }
    } catch (err) {
      console.error(`  ERROR: ${slug}:`, err.message);
      errors++;
    }
  }
  
  console.log(`\\nBatch ${batchIndex + 1} complete:`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped (existing): ${skipped}`);
  console.log(`  Errors: ${errors}`);
  
  // Report progress
  const progress = Math.round((endIdx / total) * 100);
  console.log(`\\nOverall progress: ${progress}% (${endIdx}/${total} new pages)`);
}

main();
