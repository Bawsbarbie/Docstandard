export interface ROISectionProps {
  manualEffort?: string
  manualEffortNote?: string
  withDocStandard?: string
  withDocStandardNote?: string
  annualSavings?: string
  annualSavingsNote?: string
  errorReduction?: string
  errorReductionNote?: string
}

export function ROISection({
  manualEffort,
  manualEffortNote,
  withDocStandard,
  withDocStandardNote,
  annualSavings,
  annualSavingsNote,
  errorReduction,
  errorReductionNote,
}: ROISectionProps) {
  const manualEffortValue = manualEffort ?? "13.3h"
  const withDocStandardValue = withDocStandard ?? "5m"
  const annualSavingsValue = annualSavings ?? "$120k"
  const errorReductionValue = errorReduction ?? "100%"

  const manualEffortNoteValue = manualEffortNote ?? "8 mins per invoice"
  const withDocStandardNoteValue = withDocStandardNote ?? "30 secs per batch"
  const annualSavingsNoteValue = annualSavingsNote ?? "Reclaimed Capacity"
  const errorReductionNoteValue = errorReductionNote ?? "Audit Value"

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
                <div className="text-4xl font-extrabold mb-2">{manualEffortValue}</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Manual Effort / Day</div>
                <div className="text-xs text-blue-200/60 mt-2">{manualEffortNoteValue}</div>
            </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-extrabold mb-2 text-green-300">{withDocStandardValue}</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">With DocStandard</div>
                <div className="text-xs text-blue-200/60 mt-2">{withDocStandardNoteValue}</div>
            </div>
             <div className="bg-white rounded-2xl p-6 border border-white shadow-xl transform md:-translate-y-4">
                <div className="text-4xl font-extrabold mb-2 text-blue-600">{annualSavingsValue}</div>
                <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">Annual Savings</div>
                <div className="text-xs text-slate-400 mt-2">{annualSavingsNoteValue}</div>
            </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-extrabold mb-2">{errorReductionValue}</div>
                <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Error Reduction</div>
                <div className="text-xs text-blue-200/60 mt-2">{errorReductionNoteValue}</div>
            </div>
          </div>
       </div>
    </section>
  )
}
