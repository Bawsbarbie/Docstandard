import React, { useState, useEffect } from 'react';
import { 
  Database, 
  FileJson, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Server, 
  FileText, 
  RefreshCw, 
  Menu, 
  X,
  ChevronDown,
  ChevronUp,
  BarChart,
  Layers,
  Globe,
  Clock
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-900 bg-slate-50 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileJson className="text-white w-5 h-5" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>DocStandard</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#why-us" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Why Us</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 shadow-xl flex flex-col gap-4">
             <a href="#how-it-works" className="text-sm font-medium text-slate-600">How It Works</a>
             <a href="#services" className="text-sm font-medium text-slate-600">Services</a>
             <a href="#why-us" className="text-sm font-medium text-slate-600">Why Us</a>
             <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium w-full">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <main>
        <RiskSection />
        <ProblemSection />
        <BlueprintSection />
        <SolutionSection />
        <ROISection />
        <WorkflowTabs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// --- Sub Components ---

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Zero-latency data extraction enabled
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]">
            Clean <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CargoWise Data</span> for Accounting
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Operational bottlenecks in logistics are often caused by unstructured data files. DocStandard cleans, validates, and re-structures these batches for immediate system ingestion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              How It Works
            </button>
          </div>
        </div>

        {/* Hero Visual - Abstract Representation of Data Cleaning */}
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">ingestion_log_v2.json</div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 opacity-75">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <div>
                                <div className="h-2 w-24 bg-red-200 rounded mb-1"></div>
                                <div className="h-2 w-16 bg-red-100 rounded"></div>
                            </div>
                        </div>
                        <span className="text-xs text-red-600 font-medium">Schema Mismatch</span>
                    </div>
                     <div className="flex justify-center my-2">
                        <ArrowRight className="w-5 h-5 text-slate-300 transform rotate-90" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                                <div className="h-2 w-24 bg-green-200 rounded mb-1"></div>
                                <div className="h-2 w-32 bg-green-100 rounded"></div>
                            </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Normalized</span>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                                <div className="h-2 w-20 bg-green-200 rounded mb-1"></div>
                                <div className="h-2 w-28 bg-green-100 rounded"></div>
                            </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Validated</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const RiskSection = () => {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              Industry Risk Report
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              The High-Stakes Reality of Processing Failures
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              "Audit risk from 'Dirty Data': Unstructured reference numbers and mismatched dates in Clean CargoWise Data batches create downstream reconciliation errors."
            </p>
            <button className="text-white border-b border-red-500 pb-1 hover:text-red-400 transition-colors flex items-center gap-2">
              Mitigate Risk Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
             <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl">40%</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">Direct Sync Failure Rate</h4>
                        <p className="text-sm text-slate-400">Direct TMS-to-ERP syncs fail 40% of the time due to 'Data Friction'—unstructured, inconsistent, or invalid data.</p>
                    </div>
                </div>
                <div className="h-px bg-slate-700 w-full"></div>
                <div className="flex gap-4">
                     <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <AlertTriangle className="text-yellow-500 w-6 h-6" />
                    </div>
                    <div>
                         <h4 className="font-semibold text-lg">The "Penny-Gap"</h4>
                         <p className="text-sm text-slate-400">Rounding differences at the line-item level lead to persistent audit failures.</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      title: "XML Encoding Mismatches",
      description: "CargoWise eAdapter exports often contain character sets or nested XML structures that rigid ERP schemas like SAP S/4HANA cannot parse without custom middleware.",
      icon: <FileJson className="w-6 h-6 text-blue-600" />
    },
    {
      title: "UOM Desync",
      description: "A TMS might record a shipment in 'PLT' (Pallets), while the ERP requires 'EA' (Each). Without normalization, these invoices trigger manual reconciliation alerts.",
      icon: <RefreshCw className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Rounding Errors",
      description: "When processing international freight across 50+ documents, rounding differences at the line-item level between TMS accruals and ERP actuals lead to failures.",
      icon: <BarChart className="w-6 h-6 text-teal-600" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Direct TMS-to-ERP Syncs Fail</h2>
          <p className="text-slate-600">Most logistics providers assume APIs are 'plug-and-play'. In reality, operational chaos ensues without an intelligent filter.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {prob.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{prob.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{prob.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlueprintSection = () => {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Master Mapping Blueprint</h2>
          <p className="text-slate-600 max-w-2xl">To achieve high-integrity data bridging, DocStandard normalizes critical field pairs across major systems.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-semibold text-sm">TMS System</th>
                  <th className="p-4 font-semibold text-sm">ERP System</th>
                  <th className="p-4 font-semibold text-sm">TMS Field</th>
                  <th className="p-4 font-semibold text-sm">Normalization Logic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">CargoWise One</td>
                  <td className="p-4 text-slate-600">SAP S/4HANA</td>
                  <td className="p-4 font-mono text-blue-600 bg-slate-50 rounded">FSD_ChargeAmount</td>
                  <td className="p-4 text-slate-600">Convert currency to ISO 4217; Validate vs Credit Note total.</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">MercuryGate TMS</td>
                  <td className="p-4 text-slate-600">Oracle NetSuite</td>
                  <td className="p-4 font-mono text-blue-600 bg-slate-50 rounded">Voucher_Financial_Total</td>
                  <td className="p-4 text-slate-600">Extract GL segments; Map to NetSuite Dept/Class.</td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Blue Yonder</td>
                  <td className="p-4 text-slate-600">Dynamics 365</td>
                  <td className="p-4 font-mono text-blue-600 bg-slate-50 rounded">Trans_Invoice_Detail</td>
                  <td className="p-4 text-slate-600">Standardize date (YYYY-MM-DD); Resolve sub-ledger IDs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const steps = [
    { num: "01", title: "Extraction & Validation", text: "Engine extracts every line item from TMS PDF/XML, identifying missing refs or invalid HS codes immediately." },
    { num: "02", title: "Cross-System Alignment", text: "We apply your specific business logic (e.g., 'If Carrier = X, then GL Code = Y') to every record." },
    { num: "03", title: "System-Ready Output", text: "We deliver a clean, validated CSV or JSON payload that is guaranteed to clear validation rules." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">The DocStandard Approach</h2>
               <p className="text-lg text-slate-600 mb-10">DocStandard acts as the 'Intelligent Filter' between operational chaos and your financial ledger. We prioritize normalization before ingestion.</p>
               
               <div className="space-y-8">
                 {steps.map((step, idx) => (
                   <div key={idx} className="flex gap-6 relative">
                     {idx !== steps.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-100"></div>}
                     <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-600/30 flex-shrink-0 z-10">
                       {step.num}
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                       <p className="text-slate-600">{step.text}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="relative">
                {/* Visual Representation of Filter */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                    
                    <div className="text-center mb-8">
                        <div className="text-slate-400 text-sm mb-2">INPUT: Chaos</div>
                        <div className="flex justify-center gap-2 opacity-50 mb-4">
                            <FileText size={20} /> <FileText size={20} className="rotate-12" /> <FileText size={20} className="-rotate-6" />
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent w-full"></div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8 text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">DocStandard Engine</div>
                        <div className="animate-pulse space-y-2">
                            <div className="h-2 bg-slate-600 rounded w-3/4 mx-auto"></div>
                            <div className="h-2 bg-slate-600 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>

                    <div className="text-center">
                         <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent w-full mb-4"></div>
                         <div className="text-green-400 text-sm font-bold mb-2">OUTPUT: Structure</div>
                         <div className="bg-white text-slate-900 rounded-lg p-3 font-mono text-xs text-left shadow-lg">
                            <span className="text-blue-600">{"{"}</span><br/>
                            &nbsp;&nbsp;"status": <span className="text-green-600">"validated"</span>,<br/>
                            &nbsp;&nbsp;"erp_ready": <span className="text-blue-600">true</span><br/>
                            <span className="text-blue-600">{"}"}</span>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

const ROISection = () => {
  return (
    <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ROI Analysis: The Cost of Manual Cleanup</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">Based on a mid-sized 3PL processing 100 multi-page invoices per day.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-extrabold mb-2">13.3h</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Manual Effort / Day</div>
                <div className="text-xs text-blue-200/60 mt-2">8 mins per invoice</div>
            </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-extrabold mb-2 text-green-300">5m</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">With DocStandard</div>
                <div className="text-xs text-blue-200/60 mt-2">30 secs per batch</div>
            </div>
             <div className="bg-white rounded-2xl p-6 border border-white shadow-xl transform md:-translate-y-4">
                <div className="text-4xl font-extrabold mb-2 text-blue-600">$120k</div>
                <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">Annual Savings</div>
                <div className="text-xs text-slate-400 mt-2">Reclaimed Capacity</div>
            </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-extrabold mb-2">100%</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Error Reduction</div>
                <div className="text-xs text-blue-200/60 mt-2">Audit Value</div>
            </div>
          </div>
       </div>
    </section>
  );
};

const WorkflowTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const steps = [
        { id: "01", title: "Batch Ingestion", desc: "We ingest PDF or scanned BOLs, AWBs, and Packing Lists in bulk." },
        { id: "02", title: "Structural Mapping", desc: "Carrier-specific layouts are normalized into a single, carrier-neutral schema." },
        { id: "03", title: "Field Validation", desc: "Automated verification of Container IDs, Seal numbers, and Equipment types." },
        { id: "04", title: "TMS Formatting", desc: "Data is structured specifically for CargoWise, Magaya, or proprietary TMS ingestion." },
        { id: "05", title: "System Delivery", desc: "Final files are delivered in your choice of JSON, CSV, or XML for direct import." }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Logistics Normalization Workflow</h2>
                
                <div className="grid md:grid-cols-12 gap-8 bg-white rounded-3xl p-2 shadow-xl border border-slate-100">
                    {/* Navigation */}
                    <div className="md:col-span-4 flex flex-col gap-2 p-4">
                        {steps.map((step, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${activeTab === idx ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-50 text-slate-600'}`}
                            >
                                <span className={`font-mono text-sm ${activeTab === idx ? 'text-blue-200' : 'text-slate-400'}`}>{step.id}</span>
                                <span className="font-semibold">{step.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="md:col-span-8 bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center min-h-[300px]">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                {steps[activeTab].id}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{steps[activeTab].title}</h3>
                        </div>
                        <p className="text-lg text-slate-600 leading-relaxed">{steps[activeTab].desc}</p>
                        
                        <div className="mt-8 flex gap-2">
                             <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                                <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((activeTab + 1) / steps.length) * 100}%` }}></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Validated by Industry Leaders</h2>
                    <p className="text-slate-600">Real feedback from teams who have delegated their document complexity.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { quote: "Airway bill digitization went from a bottleneck to a same-day workflow.", author: "Grace Patel", role: "Import Ops, Vantage Air" },
                        { quote: "BOL and AWB fields are finally consistent across carriers. Our TMS ingest is reliable.", author: "Evan Morales", role: "Ops Manager, HarborLink" },
                        { quote: "We stopped rekeying packing lists. DocStandard standardized everything for our WMS.", author: "Lena Brooks", role: "Warehouse Lead, BluePeak" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg relative">
                             <div className="text-blue-200 absolute top-4 left-6 text-6xl font-serif">"</div>
                             <p className="text-slate-700 italic relative z-10 mb-6 mt-4">
                                {item.quote}
                             </p>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900">{item.author}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">{item.role}</div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        { q: "How do you protect sensitive documents?", a: "Files are processed in private storage with role-based access controls. We never expose customer documents publicly and restrict internal access to active batches only." },
        { q: "Do you delete files after processing?", a: "Yes, we adhere to strict retention policies. Source documents can be purged immediately after successful validation and delivery confirmation." },
        { q: "Do you handle data validation before ERP import?", a: "Absolutely. Our engine validates data types, mandatory fields, and logical constraints (like date formats and currency codes) before generating the output file." },
        { q: "Can you align TMS fields to SAP or NetSuite?", a: "Yes. We have pre-built mapping blueprints for major ERPs including SAP S/4HANA, NetSuite, and Dynamics 365, ensuring seamless field alignment." }
    ];

    return (
        <section className="py-24 bg-slate-50" id="faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-semibold text-slate-800 pr-8">{faq.q}</span>
                                {openIndex === idx ? <ChevronUp className="text-blue-600 flex-shrink-0" /> : <ChevronDown className="text-slate-400 flex-shrink-0" />}
                            </button>
                            <div className={`px-6 text-slate-600 overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTA = () => {
    return (
        <section className="py-24 bg-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
                    Stop Managing Documents.<br/>
                    <span className="text-blue-600">Start Using Data.</span>
                </h2>
                <p className="text-xl text-slate-600 mb-10">Get standardized, clean data delivered to you today.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-colors shadow-lg">
                        Upload Documents
                    </button>
                    <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors">
                        Get Started for $799
                    </button>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <FileJson className="text-blue-500" />
                            <span className="text-xl font-bold text-white">DocStandard</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6">
                            Turns unstructured business documents into clean, structured, usable data delivered as a service.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-6">Service</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                            <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#security" className="hover:text-blue-400 transition-colors">Security</a></li>
                            <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="/blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
                            <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    <div>
                         <h4 className="text-white font-bold mb-6">Connect</h4>
                         <div className="text-sm">
                             Registered in the EU.<br/>
                             Operated by DocStandard.
                         </div>
                    </div>
                </div>
                
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>© 2026 DocStandard. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                         <Globe size={16} />
                         <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default App;// ... existing components ...

const BlueprintSection = ({ title, tableTitle, rows }) => {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600 max-w-2xl">To achieve high-integrity data bridging, DocStandard normalizes critical field pairs across major systems.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-semibold text-sm">SOURCE</th>
                  <th className="p-4 font-semibold text-sm">SYSTEM TARGET</th>
                  <th className="p-4 font-semibold text-sm">FIELD</th>
                  <th className="p-4 font-semibold text-sm">ERP FIELD</th>
                  <th className="p-4 font-semibold text-sm">NORMALIZATION LOGIC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{row.source}</td>
                    <td className="p-4 text-slate-600">{row.target}</td>
                    <td className="p-4 font-mono text-blue-600 bg-slate-50 rounded">{row.field}</td>
                    <td className="p-4 text-slate-600">{row.erpField}</td>
                    <td className="p-4 text-slate-600">{row.logic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
