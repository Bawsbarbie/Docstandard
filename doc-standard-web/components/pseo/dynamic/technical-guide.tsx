import { promises as fs } from "fs"
import path from "path"
import { TechnicalGuide } from "@/components/pseo/TechnicalGuide"

interface IntegrationGuide {
  systemA: string
  systemB: string
  friction: string
  solution: string
}

interface TechnicalGuideSectionProps {
  vertical: string
  integrationGuide?: IntegrationGuide
}

const loadJson = async <T,>(fileName: string, fallback: T): Promise<T> => {
  const filePath = path.join(process.cwd(), "data", "content", fileName)
  try {
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

export async function TechnicalGuideSection({
  vertical,
  integrationGuide,
}: TechnicalGuideSectionProps) {
  // If integration guide is provided, use it directly (common for integration pages)
  if (integrationGuide) {
    return <TechnicalGuide integrationGuide={integrationGuide} />
  }

  const normalized = vertical.toLowerCase()

  // Load guide data based on vertical
  let guideData = null
  let guideType = ""

  if (normalized === "finance" || normalized === "audit") {
    const data = await loadJson("finance-guide.json", { finance_operations_guide: null })
    guideData = data.finance_operations_guide
    guideType = "finance"
  } else if (normalized === "invoice") {
    const data = await loadJson("invoice-guide.json", { invoice_digitization_guide: null })
    guideData = data.invoice_digitization_guide
    guideType = "invoice"
  } else if (normalized === "customs") {
    const data = await loadJson("customs-guide.json", { customs_clearance_guide: null })
    guideData = data.customs_clearance_guide
    guideType = "customs"
  } else if (normalized === "compliance") {
    const data = await loadJson("compliance-guide.json", { compliance_extraction_guide: null })
    guideData = data.compliance_extraction_guide
    guideType = "compliance"
  } else if (normalized === "shipping" || normalized === "logistics") {
    const data = await loadJson("shipping-guide.json", { shipping_documentation_guide: null })
    guideData = data.shipping_documentation_guide
    guideType = "shipping"
  } else if (normalized === "tms" || normalized === "integration") {
    const data = await loadJson("tms-erp-guide.json", { tms_erp_bridging_guide: null })
    guideData = data.tms_erp_bridging_guide
    guideType = "tms"
  } else if (normalized === "inventory") {
    const data = await loadJson("inventory-guide.json", { inventory_management_guide: null })
    guideData = data.inventory_management_guide
    guideType = "inventory"
  } else if (normalized === "hs-code" || normalized === "classification") {
    const data = await loadJson("hscode-guide.json", { hscode_extraction_guide: null })
    guideData = data.hscode_extraction_guide
    guideType = "hscode"
  }

  // Pass the loaded guide data to the TechnicalGuide component
  // We use specific props for type safety, but the component handles the unified layout
  if (!guideData) return null

  switch (guideType) {
    case "finance": return <TechnicalGuide financeGuide={guideData as any} />
    case "invoice": return <TechnicalGuide invoiceGuide={guideData as any} />
    case "customs": return <TechnicalGuide customsGuide={guideData as any} />
    case "compliance": return <TechnicalGuide complianceGuide={guideData as any} />
    case "shipping": return <TechnicalGuide shippingGuide={guideData as any} />
    case "tms": return <TechnicalGuide guide={guideData as any} />
    case "inventory": return <TechnicalGuide inventoryGuide={guideData as any} />
    case "hscode": return <TechnicalGuide hsCodeGuide={guideData as any} />
    default: return null
  }
}
