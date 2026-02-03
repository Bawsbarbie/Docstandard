import type { TmsErpGuide, CustomsGuide } from "@/lib/pseo/types"

interface TechnicalGuideProps {
  guide?: TmsErpGuide
  customsGuide?: CustomsGuide
}

export function TechnicalGuide({ guide, customsGuide }: TechnicalGuideProps) {
  // Use customs guide if available, otherwise fall back to TMS-ERP guide
  const activeGuide = customsGuide || guide
  
  if (!activeGuide || !activeGuide.expert_sections || activeGuide.expert_sections.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          {activeGuide.expert_sections.map((section) => {
            // Special handling for CBP Entry Field Mapping (customs guide)
            if (section.id === "cbp_entry_field_mapping" && customsGuide) {
              return (
                <div key={section.id} className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
                  {section.mapping_data && section.mapping_data.length > 0 && (
                    <div className="overflow-x-auto mt-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Source Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              CBP Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Normalization Logic
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.mapping_data.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                                {row.source_field}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                                {row.cbp_field}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {row.normalization_logic}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            }

            // Special handling for field_mapping_table (TMS-ERP guide)
            if (section.id === "field_mapping_table" && guide) {
              return (
                <div key={section.id} className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
                  {section.mapping_data && section.mapping_data.length > 0 && (
                    <div className="overflow-x-auto mt-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              TMS System
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              ERP System
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              TMS Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              ERP Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Normalization Logic
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.mapping_data.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                                {row.tms_system}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                                {row.erp_system}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-300">
                                {row.tms_field}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700 border-r border-gray-300">
                                {row.erp_field}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {row.normalization_logic}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            }

            // Special handling for operational_roi
            if (section.id === "operational_roi") {
              return (
                <div key={section.id} className="mb-12">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
                  </div>
                </div>
              )
            }

            // Default rendering for other sections
            return (
              <div key={section.id} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
