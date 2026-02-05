"use client"

import type { ProcessBlock } from "@/lib/pseo/types"
import { FileText } from "lucide-react"

interface TechnicalProcessProps {
  process?: ProcessBlock
}

export function TechnicalProcess({ process }: TechnicalProcessProps) {
  if (!process) return null
  const steps = (process.steps || []).slice(0, 3)
  if (steps.length === 0) return null

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">The DocStandard Approach</h2>
               <p className="text-lg text-slate-600 mb-10">
                 DocStandard acts as the "Intelligent Filter" between operational chaos and your financial ledger. We
                 prioritize normalization before ingestion.
               </p>
               
               <div className="space-y-8">
                 {steps.map((step, idx) => (
                   <div key={`${process.id}-${idx}`} className="flex gap-6 relative">
                     {idx !== steps.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-100"></div>}
                     <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-600/30 flex-shrink-0 z-10">
                       {String(idx + 1).padStart(2, "0")}
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-slate-900 mb-2">{step.name}</h4>
                       <p className="text-slate-600">{step.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="relative">
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
  )
}
