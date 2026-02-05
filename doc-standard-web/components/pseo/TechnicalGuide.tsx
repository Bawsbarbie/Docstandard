"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { TmsErpGuide, CustomsGuide, CustomsGuideSection, ExpertSection, FinanceGuide, FinanceGuideSection, ShippingGuide, ShippingGuideSection, InventoryGuide, InventoryGuideSection, ComplianceGuide, ComplianceGuideSection, MotiveGuide, MotiveGuideSection, HSCodeGuide, HSCodeGuideSection, InvoiceGuide, InvoiceGuideSection } from "@/lib/pseo/types"

interface IntegrationGuide {
  systemA: string
  systemB: string
  friction: string
  solution: string
}

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
  integrationGuide?: IntegrationGuide
  systemA?: string
  systemB?: string
}

export function TechnicalGuide({
  guide,
  customsGuide,
  financeGuide,
  shippingGuide,
  inventoryGuide,
  complianceGuide,
  motiveGuide,
  hsCodeGuide,
  invoiceGuide,
  integrationGuide,
  systemA,
  systemB,
}: TechnicalGuideProps) {
  const sectionHeaderClass =
    "text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6"

  const tableShellClass =
    "overflow-x-auto"
  const tableClass = "w-full text-left border-collapse"
  const tableHeadClass = "bg-slate-900 text-white"
  const tableRowClass =
    "hover:bg-blue-50/50 transition-colors border-b border-slate-100"
  const thClass =
    "p-4 font-semibold text-sm"
  const tdClass = "p-4 text-sm text-slate-600"
  const systemALabel = systemA || "TMS System"
  const systemBLabel = systemB || "ERP System"

  const resolveMappingConfig = (rows: Array<Record<string, string>>) => {
    const sample = rows[0] || {}
    const hasKeys = (keys: string[]) => keys.every((key) => key in sample)

    if (hasKeys(["packing_list_field", "system_field"])) {
      return {
        headers: ["FIELD", "SYSTEM FIELD", "NORMALIZATION LOGIC"],
        getRow: (row: any) => [row.packing_list_field || "", row.system_field || "", row.normalization_logic || ""],
      }
    }

    if (hasKeys(["bol_field", "system_field"])) {
      return {
        headers: ["FIELD", "SYSTEM FIELD", "NORMALIZATION LOGIC"],
        getRow: (row: any) => [row.bol_field || "", row.system_field || "", row.normalization_logic || ""],
      }
    }

    if (hasKeys(["source_field", "cbp_field"])) {
      return {
        headers: ["SOURCE FIELD", "CBP FIELD", "NORMALIZATION LOGIC"],
        getRow: (row: any) => [row.source_field || "", row.cbp_field || "", row.normalization_logic || ""],
      }
    }

    if (hasKeys(["document_type", "source_field", "erp_field"])) {
      return {
        headers: ["DOCUMENT TYPE", "SOURCE FIELD", "ERP FIELD", "NORMALIZATION LOGIC"],
        getRow: (row: any) => [
          row.document_type || "",
          row.source_field || "",
          row.erp_field || "",
          row.normalization_logic || "",
        ],
      }
    }

    if ("tms_system" in sample || "erp_system" in sample) {
      const hasErpField = "erp_field" in sample
      return {
        headers: hasErpField
          ? ["SOURCE", "SYSTEM TARGET", "FIELD", "ERP FIELD", "NORMALIZATION LOGIC"]
          : ["SOURCE", "SYSTEM TARGET", "FIELD", "NORMALIZATION LOGIC"],
        getRow: (row: any) => {
          const base = [
            systemA || row.tms_system || "",
            systemB || row.erp_system || "",
            row.tms_field || row.source_field || "",
          ]
          if (hasErpField) {
            return [...base, row.erp_field || "", row.normalization_logic || ""]
          }
          return [...base, row.normalization_logic || ""]
        },
      }
    }

    return {
      headers: ["PROCESS", "SOLUTION"],
      getRow: (row: any) => [row.field || row.source_field || "", row.normalization_logic || row.solution || row.logic || ""],
    }
  }


  const renderTable = (headers: string[], rows: string[][]) => (
    <div className={tableShellClass}>
      <table className={tableClass}>
        <thead className={tableHeadClass}>
          <tr>
            {headers.map((header) => (
              <th key={header} className={thClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={index} className={tableRowClass}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${index}-${cellIndex}`}
                  className={`${tdClass} ${cellIndex === 0 ? "font-medium text-slate-900" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderMappingSection = (
    sectionKey: string,
    title: string,
    mappingData: Array<Record<string, string>>
  ) => {
    const { headers, getRow } = resolveMappingConfig(mappingData)
    return (
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div>
          <div>
            <h2 className={sectionHeaderClass}>{title}</h2>
            <div className="h-1 w-16 rounded-full bg-brand-600/80 mb-6" />
          </div>
          {renderTable(headers, mappingData.map((row) => getRow(row)))}
        </div>
      </motion.div>
    )
  }

  if (integrationGuide) {
    return null
  }

  // Render inventory guide sections if available (takes highest priority)
  if (inventoryGuide && inventoryGuide.expert_sections && inventoryGuide.expert_sections.length > 0) {
    const mappingSections = inventoryGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: InventoryGuideSection) => {
              const sectionKey = `inventory-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render shipping guide sections if available
  if (shippingGuide && shippingGuide.expert_sections && shippingGuide.expert_sections.length > 0) {
    const mappingSections = shippingGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: ShippingGuideSection) => {
              const sectionKey = `shipping-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render compliance guide sections if available
  if (complianceGuide && complianceGuide.expert_sections && complianceGuide.expert_sections.length > 0) {
    const mappingSections = complianceGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: ComplianceGuideSection) => {
              const sectionKey = `compliance-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  if (motiveGuide && motiveGuide.expert_sections && motiveGuide.expert_sections.length > 0) {
    const mappingSections = motiveGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: MotiveGuideSection) => {
              const sectionKey = `motive-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  if (hsCodeGuide && hsCodeGuide.expert_sections && hsCodeGuide.expert_sections.length > 0) {
    const mappingSections = hsCodeGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: HSCodeGuideSection) => {
              const sectionKey = `hscode-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  if (invoiceGuide && invoiceGuide.expert_sections && invoiceGuide.expert_sections.length > 0) {
    const mappingSections = invoiceGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: InvoiceGuideSection) => {
              const sectionKey = `invoice-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render finance guide sections if available
  if (financeGuide && financeGuide.expert_sections && financeGuide.expert_sections.length > 0) {
    const mappingSections = financeGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: FinanceGuideSection) => {
              const sectionKey = `finance-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render customs guide sections if available
  if (customsGuide && customsGuide.expert_sections && customsGuide.expert_sections.length > 0) {
    const mappingSections = customsGuide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: CustomsGuideSection) => {
              const sectionKey = `customs-${section.id}`
              return renderMappingSection(sectionKey, section.title, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  // Render TMS-ERP guide sections if available
  if (guide && guide.expert_sections && guide.expert_sections.length > 0) {
    const mappingSections = guide.expert_sections.filter(
      (section) => section.mapping_data && section.mapping_data.length > 0
    )
    if (mappingSections.length === 0) return null
    return (
      <section className="py-24 bg-gradient-to-b from-white via-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-10">
            {mappingSections.map((section: ExpertSection) => {
              const sectionKey = `tms-erp-${section.id}`
              const sectionTitle =
                section.id === "field_mapping_table"
                  ? "The Master Mapping Blueprint"
                  : section.title
              return renderMappingSection(sectionKey, sectionTitle, section.mapping_data || [])
            })}
          </div>
        </div>
      </section>
    )
  }

  return null
}
