import type { TmsErpGuide, CustomsGuide, CustomsGuideSection, ExpertSection, FinanceGuide, FinanceGuideSection, ShippingGuide, ShippingGuideSection, InventoryGuide, InventoryGuideSection } from "@/lib/pseo/types"

interface TechnicalGuideProps {
  guide?: TmsErpGuide
  customsGuide?: CustomsGuide
  financeGuide?: FinanceGuide
  shippingGuide?: ShippingGuide
  inventoryGuide?: InventoryGuide
}

export function TechnicalGuide({ guide, customsGuide, financeGuide, shippingGuide, inventoryGuide }: TechnicalGuideProps) {
  // Render inventory guide sections if available (takes highest priority)
  if (inventoryGuide && inventoryGuide.expert_sections && inventoryGuide.expert_sections.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {inventoryGuide.expert_sections.map((section: InventoryGuideSection) => {
              // Special handling for Packing List Mapping table
              if (section.id === "packing_list_mapping" && section.mapping_data) {
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
                    <div className="overflow-x-auto mt-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Packing List Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              System Field
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
                                {row.packing_list_field}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                                {row.system_field}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {row.normalization_logic}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              }

              // Special handling for operational_roi (inventory version)
              if (section.id === "operational_roi") {
                return (
                  <div key={section.id} className="mb-12">
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
                    </div>
                  </div>
                )
              }

              // Default rendering for other inventory sections
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

  // Render shipping guide sections if available
  if (shippingGuide && shippingGuide.expert_sections && shippingGuide.expert_sections.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {shippingGuide.expert_sections.map((section: ShippingGuideSection) => {
              // Special handling for BOL Field Mapping table
              if (section.id === "bol_field_mapping" && section.mapping_data) {
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
                    <div className="overflow-x-auto mt-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              BOL Field
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              System Field
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
                                {row.bol_field}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                                {row.system_field}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {row.normalization_logic}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              }

              // Special handling for operational_roi (shipping version)
              if (section.id === "operational_roi") {
                return (
                  <div key={section.id} className="mb-12">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
                    </div>
                  </div>
                )
              }

              // Default rendering for other shipping sections
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

  // Render finance guide sections if available
  if (financeGuide && financeGuide.expert_sections && financeGuide.expert_sections.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {financeGuide.expert_sections.map((section: FinanceGuideSection) => {
              // Special handling for GL Code Mapping table
              if (section.id === "gl_coding_mapping" && section.mapping_data) {
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
                    <div className="overflow-x-auto mt-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Document Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">
                              Source Field
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                                {row.document_type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                                {row.source_field}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
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
                  </div>
                )
              }

              // Special handling for operational_roi (finance version)
              if (section.id === "operational_roi") {
                return (
                  <div key={section.id} className="mb-12">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
                    </div>
                  </div>
                )
              }

              // Default rendering for other finance sections
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

  // Render customs guide sections if available
  if (customsGuide && customsGuide.expert_sections && customsGuide.expert_sections.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {customsGuide.expert_sections.map((section: CustomsGuideSection) => {
              // Special handling for CBP Entry Field Mapping
              if (section.id === "cbp_entry_field_mapping" && section.mapping_data) {
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
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
                  </div>
                )
              }

              // Default rendering for other customs sections
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

  // Render TMS-ERP guide sections if available
  if (guide && guide.expert_sections && guide.expert_sections.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {guide.expert_sections.map((section: ExpertSection) => {
              // Special handling for field_mapping_table
              if (section.id === "field_mapping_table" && section.mapping_data) {
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{section.content}</p>
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

              // Default rendering for other TMS-ERP sections
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

  return null
}
