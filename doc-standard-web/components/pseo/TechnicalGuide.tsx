"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { TmsErpGuide, CustomsGuide, CustomsGuideSection, ExpertSection, FinanceGuide, FinanceGuideSection, ShippingGuide, ShippingGuideSection, InventoryGuide, InventoryGuideSection, ComplianceGuide, ComplianceGuideSection, MotiveGuide, MotiveGuideSection, HSCodeGuide, HSCodeGuideSection, InvoiceGuide, InvoiceGuideSection } from "@/lib/pseo/types"

interface TechnicalGuideProps {
  guide?: TmsErpGuide
  customsGuide?: CustomsGuide
  financeGuide?: FinanceGuide
  shippingGuide?: ShippingGuide
  inventoryGuide?: InventoryGuide
  complianceGuide?: ComplianceGuide
  motiveGuide?: MotiveGuide
  hsCodeGuide?: HSCodeGuide
  invoiceGuide?: InvoiceGuide
}

export function TechnicalGuide({ guide, customsGuide, financeGuide, shippingGuide, inventoryGuide, complianceGuide, motiveGuide, hsCodeGuide, invoiceGuide }: TechnicalGuideProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !(prev[key] ?? true) }))
  }

  const getOpenState = (key: string) => openSections[key] ?? true

  const sectionShellClass =
    "relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
  const sectionHeaderClass =
    "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6"
  const sectionBodyClass = "text-slate-700 leading-relaxed whitespace-pre-line"

  const tableShellClass =
    "mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
  const tableClass = "min-w-full text-sm"
  const tableHeadClass = "bg-slate-100/80 text-slate-600"
  const tableRowClass =
    "border-b border-slate-200/70 even:bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
  const thClass =
    "px-5 py-3 text-left text-[0.7rem] font-bold uppercase tracking-[0.18em]"
  const tdClass = "px-5 py-4 text-slate-700"

  const renderSectionChrome = (
    sectionKey: string,
    title: string,
    content: ReactNode,
    extra?: ReactNode
  ) => {
    const isOpen = getOpenState(sectionKey)
    return (
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className={`${sectionShellClass} p-8 md:p-10`}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className={sectionHeaderClass}>{title}</h2>
              <div className="h-1 w-16 rounded-full bg-brand-600/80 mb-6" />
            </div>
            <button
              type="button"
              onClick={() => toggleSection(sectionKey)}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors"
              aria-expanded={isOpen}
            >
              {isOpen ? "Collapse" : "Expand"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="pt-2">
                  <div className={sectionBodyClass}>{content}</div>
                  {extra}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl" />
        </div>
      </motion.div>
    )
  }

  // Render inventory guide sections if available (takes highest priority)
  if (inventoryGuide && inventoryGuide.expert_sections && inventoryGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {inventoryGuide.expert_sections.map((section: InventoryGuideSection) => {
              const sectionKey = `inventory-${section.id}`

              // Special handling for Packing List Mapping table
              if (section.id === "packing_list_mapping" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Mapping Table</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Packing List Field</th>
                          <th className={thClass}>System Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.packing_list_field}</td>
                            <td className={tdClass}>{row.system_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              // Special handling for operational_roi (inventory version)
              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50 via-white to-violet-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              // Default rendering for other inventory sections
              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render shipping guide sections if available
  if (shippingGuide && shippingGuide.expert_sections && shippingGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {shippingGuide.expert_sections.map((section: ShippingGuideSection) => {
              const sectionKey = `shipping-${section.id}`

              // Special handling for BOL Field Mapping table
              if (section.id === "bol_field_mapping" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Mapping Table</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>BOL Field</th>
                          <th className={thClass}>System Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.bol_field}</td>
                            <td className={tdClass}>{row.system_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              // Special handling for operational_roi (shipping version)
              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              // Default rendering for other shipping sections
              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render compliance guide sections if available
  if (complianceGuide && complianceGuide.expert_sections && complianceGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {complianceGuide.expert_sections.map((section: ComplianceGuideSection) => {
              const sectionKey = `compliance-${section.id}`

              if (section.id === "field_mapping_table" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Compliance Blueprint</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Source</th>
                          <th className={thClass}>System Target</th>
                          <th className={thClass}>Field</th>
                          <th className={thClass}>ERP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.tms_system}</td>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.erp_system}</td>
                            <td className={tdClass}>{row.tms_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  if (motiveGuide && motiveGuide.expert_sections && motiveGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {motiveGuide.expert_sections.map((section: MotiveGuideSection) => {
              const sectionKey = `motive-${section.id}`

              if (section.id === "field_mapping_table" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Motive IFTA Blueprint</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Source</th>
                          <th className={thClass}>System Target</th>
                          <th className={thClass}>Field</th>
                          <th className={thClass}>ERP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.tms_system}</td>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.erp_system}</td>
                            <td className={tdClass}>{row.tms_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  if (hsCodeGuide && hsCodeGuide.expert_sections && hsCodeGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {hsCodeGuide.expert_sections.map((section: HSCodeGuideSection) => {
              const sectionKey = `hscode-${section.id}`

              if (section.id === "field_mapping_table" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Section Note Logic Table</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Product</th>
                          <th className={thClass}>HTS Chapter</th>
                          <th className={thClass}>Field</th>
                          <th className={thClass}>Heading</th>
                          <th className={thClass}>Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.tms_system}</td>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.erp_system}</td>
                            <td className={tdClass}>{row.tms_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  if (invoiceGuide && invoiceGuide.expert_sections && invoiceGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {invoiceGuide.expert_sections.map((section: InvoiceGuideSection) => {
              const sectionKey = `invoice-${section.id}`

              if (section.id === "field_mapping_table" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">AP Extraction Blueprint</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Source</th>
                          <th className={thClass}>System Target</th>
                          <th className={thClass}>Field</th>
                          <th className={thClass}>ERP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.tms_system}</td>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.erp_system}</td>
                            <td className={tdClass}>{row.tms_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50 via-white to-slate-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render finance guide sections if available
  if (financeGuide && financeGuide.expert_sections && financeGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {financeGuide.expert_sections.map((section: FinanceGuideSection) => {
              const sectionKey = `finance-${section.id}`

              // Special handling for GL Code Mapping table
              if (section.id === "gl_coding_mapping" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Mapping Table</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Document Type</th>
                          <th className={thClass}>Source Field</th>
                          <th className={thClass}>ERP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.document_type}</td>
                            <td className={tdClass}>{row.source_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              // Special handling for operational_roi (finance version)
              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              // Default rendering for other finance sections
              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render customs guide sections if available
  if (customsGuide && customsGuide.expert_sections && customsGuide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {customsGuide.expert_sections.map((section: CustomsGuideSection) => {
              const sectionKey = `customs-${section.id}`

              // Special handling for CBP Entry Field Mapping
              if (section.id === "cbp_entry_field_mapping" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Mapping Table</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>Source Field</th>
                          <th className={thClass}>CBP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.source_field}</td>
                            <td className={tdClass}>{row.cbp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              // Default rendering for other customs sections
              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render TMS-ERP guide sections if available
  if (guide && guide.expert_sections && guide.expert_sections.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {guide.expert_sections.map((section: ExpertSection) => {
              const sectionKey = `tms-erp-${section.id}`

              // Special handling for field_mapping_table
              if (section.id === "field_mapping_table" && section.mapping_data) {
                const table = (
                  <div className={tableShellClass}>
                    <div className="px-5 pt-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">Master Mapping Blueprint</h3>
                    </div>
                    <table className={tableClass}>
                      <thead className={tableHeadClass}>
                        <tr>
                          <th className={thClass}>TMS System</th>
                          <th className={thClass}>ERP System</th>
                          <th className={thClass}>TMS Field</th>
                          <th className={thClass}>ERP Field</th>
                          <th className={thClass}>Normalization Logic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.mapping_data.map((row, index) => (
                          <tr key={index} className={tableRowClass}>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.tms_system}</td>
                            <td className={`${tdClass} font-semibold text-slate-900`}>{row.erp_system}</td>
                            <td className={tdClass}>{row.tms_field}</td>
                            <td className={tdClass}>{row.erp_field}</td>
                            <td className={tdClass}>{row.normalization_logic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, section.content, table)
              }

              // Special handling for operational_roi
              if (section.id === "operational_roi") {
                const callout = (
                  <div className="mt-6 rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-6 text-slate-700">
                    {section.content}
                  </div>
                )
                return renderSectionChrome(sectionKey, section.title, "", callout)
              }

              // Default rendering for other TMS-ERP sections
              return renderSectionChrome(sectionKey, section.title, section.content)
            })}
          </div>
        </div>
      </section>
    )
  }

  return null
}
