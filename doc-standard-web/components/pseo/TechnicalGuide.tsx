"use client"

import type {
  TmsErpGuide,
  CustomsGuide,
  FinanceGuide,
  ShippingGuide,
  InventoryGuide,
  ComplianceGuide,
  MotiveGuide,
  HSCodeGuide,
  InvoiceGuide,
} from "@/lib/pseo/types"

interface IntegrationGuide {
  systemA: string
  systemB: string
  friction: string
  solution: string
  technicalData?: string
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

type MappingRow = Record<string, string>

const toLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

const getTableConfig = (rows: MappingRow[]) => {
  const sample = rows[0] || {}

  if ("source" in sample && "system_target" in sample && "field" in sample) {
    return {
      headers: ["SOURCE", "SYSTEM TARGET", "FIELD", "ERP FIELD", "NORMALIZATION LOGIC"],
      getRow: (row: MappingRow) => [
        row.source || row.source_system || "",
        row.system_target || row.erp_system || row.system_field || "",
        row.field || row.source_field || "",
        row.erp_field || row.system_field || "",
        row.normalization_logic || "",
      ],
    }
  }

  if ("bol_field" in sample) {
    return {
      headers: ["SOURCE", "SYSTEM TARGET", "BOL FIELD", "ERP FIELD", "NORMALIZATION LOGIC"],
      getRow: (row: MappingRow) => [
        row.tms_system || row.source_system || "",
        row.erp_system || row.system_target || row.system_field || "",
        row.bol_field || "",
        row.erp_field || row.system_field || "",
        row.normalization_logic || "",
      ],
    }
  }

  if ("packing_list_field" in sample) {
    return {
      headers: ["SOURCE", "SYSTEM TARGET", "PACKING LIST FIELD", "ERP FIELD", "NORMALIZATION LOGIC"],
      getRow: (row: MappingRow) => [
        row.tms_system || row.source_system || "",
        row.erp_system || row.system_target || row.system_field || "",
        row.packing_list_field || "",
        row.erp_field || row.system_field || "",
        row.normalization_logic || "",
      ],
    }
  }

  if ("source_field" in sample && "cbp_field" in sample) {
    return {
      headers: ["SOURCE", "SYSTEM TARGET", "SOURCE FIELD", "ERP FIELD", "NORMALIZATION LOGIC"],
      getRow: (row: MappingRow) => [
        row.source_system || "",
        row.cbp_field || "",
        row.source_field || "",
        row.erp_field || "",
        row.normalization_logic || "",
      ],
    }
  }

  if ("document_type" in sample) {
    return {
      headers: ["SOURCE", "SYSTEM TARGET", "DOCUMENT TYPE", "ERP FIELD", "NORMALIZATION LOGIC"],
      getRow: (row: MappingRow) => [
        row.tms_system || row.source_system || "",
        row.erp_system || row.system_target || "",
        row.document_type || "",
        row.erp_field || "",
        row.normalization_logic || "",
      ],
    }
  }

  const keys = Object.keys(sample)
  const inferredHeaders = keys.map((key) => toLabel(key))
  const rowValues = (row: MappingRow) => keys.map((key) => row[key] || "")

  return {
    headers: inferredHeaders,
    getRow: rowValues,
  }
}

const stripMarkdown = (value: string) => value.replace(/(\*\*|__|\*|_)/g, "").trim()
const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()

type BulletParseResult =
  | { type: "table"; rows: Array<{ left: string; right: string }> }
  | { type: "checklist"; items: string[] }
  | { type: "none" }

const parseBulletsToTable = (content: string): BulletParseResult => {
  if (!content) return { type: "none" }
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => /^([-*•]|\d+\.)\s+/.test(line))

  if (lines.length === 0) return { type: "none" }

  const cleanedLines = lines.map((line) =>
    stripMarkdown(line.replace(/^([-*•]|\d+\.)\s+/, ""))
  )

  const hasSeparator = cleanedLines.some((line) => /:\s+/.test(line) || /\s+[–—-]\s+/.test(line))
  const hasOnlySeparated = cleanedLines.every((line) => /:\s+/.test(line) || /\s+[–—-]\s+/.test(line))

  if (!hasSeparator || !hasOnlySeparated) {
    return { type: "checklist", items: cleanedLines.filter(Boolean) }
  }

  const rows = cleanedLines.map((line) => {
    const boldMatch = line.match(/^(.+?)\s*:\s*(.+)$/)
    if (boldMatch) {
      return { left: stripMarkdown(boldMatch[1]), right: stripMarkdown(boldMatch[2]) }
    }
    const dashMatch = line.match(/^(.+?)\s*[–—-]\s*(.+)$/)
    if (dashMatch) {
      return { left: stripMarkdown(dashMatch[1]), right: stripMarkdown(dashMatch[2]) }
    }
    return { left: "•", right: stripMarkdown(line) }
  })

  return { type: "table", rows }
}

const parseIntegrationTable = (html?: string): MappingRow[] => {
  if (!html) return []
  const rowMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || []
  const rows = rowMatches
    .filter((row) => !/<th[\s\S]*?>/i.test(row))
    .map((row) => {
      const cellMatches = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []
      return cellMatches.map((cell) => stripHtml(cell))
    })
    .filter((row) => row.length > 0)

  return rows.map((row) => {
    const padded = [...row]
    while (padded.length < 5) padded.push("")
    const [source, systemTarget, field, erpField, normalizationLogic] = padded
    return {
      source,
      system_target: systemTarget,
      field,
      erp_field: erpField,
      normalization_logic: normalizationLogic,
    }
  })
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
}: TechnicalGuideProps) {
  const integrationSections = integrationGuide
    ? [
        {
          id: "integration_blueprint",
          title: "The Master Mapping Blueprint",
          content:
            "To achieve high-integrity data bridging, DocStandard normalizes critical field pairs across major systems.",
          mapping_data: parseIntegrationTable(integrationGuide.technicalData),
        },
      ]
    : null

  const sections =
    integrationSections ||
    guide?.expert_sections ||
    customsGuide?.expert_sections ||
    financeGuide?.expert_sections ||
    shippingGuide?.expert_sections ||
    inventoryGuide?.expert_sections ||
    complianceGuide?.expert_sections ||
    motiveGuide?.expert_sections ||
    hsCodeGuide?.expert_sections ||
    invoiceGuide?.expert_sections

  if (!sections || sections.length === 0) return null

  return (
    <div>
      {sections.map((section) => {
        if (section.id === "operational_roi" || section.id === "doc_standard_solution") {
          return null
        }
        const mappingData = section.mapping_data || []
        const tableConfig = mappingData.length > 0 ? getTableConfig(mappingData as MappingRow[]) : null
        const tableRows = tableConfig ? mappingData.map((row) => tableConfig.getRow(row as MappingRow)) : []
        const parsedBullets: BulletParseResult = tableConfig
          ? { type: "none" }
          : parseBulletsToTable(section.content)
        const bulletRows =
          parsedBullets.type === "table" ? parsedBullets.rows.map((item) => [item.left, item.right]) : []
        const headers = tableConfig
          ? tableConfig.headers
          : bulletRows.length > 0
            ? ["ITEM", "DETAIL"]
            : []
        const showContent = bulletRows.length === 0 && parsedBullets.type !== "checklist"
        const isTextOnly = !tableConfig && parsedBullets.type === "none"
        const rawRows = tableConfig ? tableRows : bulletRows
        const normalizedRows =
          headers.length > 0
            ? rawRows.map((row) => headers.map((_, idx) => row[idx] ?? ""))
            : rawRows

        return (
          <section key={section.id} className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {isTextOnly ? (
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{section.title}</h2>
                  <p className="text-slate-600">{section.content}</p>
                </div>
              ) : (
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{section.title}</h2>
                  {showContent && <p className="text-slate-600">{section.content}</p>}
                </div>
              )}

              {parsedBullets.type === "checklist" ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedBullets.items.map((item, index) => (
                      <div key={`${section.id}-check-${index}`} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : headers.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      {(() => {
                        const keepColumn = headers.map((_, colIndex) =>
                          normalizedRows.some((row) => (row[colIndex] ?? "").trim().length > 0)
                        )
                        const filteredHeaders = headers.filter((_, idx) => keepColumn[idx])
                        const filteredRows = normalizedRows.map((row) =>
                          row.filter((_, idx) => keepColumn[idx])
                        )

                        if (filteredHeaders.length === 0) return null

                        return (
                          <>
                            <thead>
                              <tr className="bg-slate-900 text-white">
                                {filteredHeaders.map((header) => (
                                  <th
                                    key={header}
                                    className={`p-4 font-semibold text-sm ${
                                      header === "NORMALIZATION LOGIC"
                                        ? "w-[50%]"
                                        : header === "SYSTEM TARGET" || header === "SOURCE FIELD"
                                          ? "w-[25%]"
                                          : ""
                                    }`}
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm">
                              {filteredRows.map((row, index) => {
                                if (row.every((cell) => !cell.trim())) return null
                                return (
                                  <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-50 transition-colors`}
                                  >
                                    {row.map((cell, cellIndex) => {
                                      const header = filteredHeaders[cellIndex] || ""
                                      const widthClass =
                                        header === "NORMALIZATION LOGIC"
                                          ? "w-[50%] max-w-sm whitespace-normal"
                                          : header === "SYSTEM TARGET" || header === "SOURCE FIELD"
                                            ? "w-[25%]"
                                            : ""
                                      return (
                                        <td
                                          key={`${index}-${cellIndex}`}
                                          className={`p-4 ${widthClass} ${
                                            cellIndex === 0 ? "font-medium text-slate-900" : "text-slate-600"
                                          }`}
                                        >
                                        {cell && cell.trim().length > 0 ? cell : "\u00A0"}
                                        </td>
                                      )
                                    })}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </>
                        )
                      })()}
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )
      })}
    </div>
  )
}
