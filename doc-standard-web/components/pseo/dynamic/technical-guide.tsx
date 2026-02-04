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
  if (integrationGuide) {
    return <TechnicalGuide integrationGuide={integrationGuide} />
  }

  const normalized = vertical.toLowerCase()

  if (normalized === "finance" || normalized === "audit") {
    const data = await loadJson("finance-guide.json", { finance_operations_guide: null })
    return <TechnicalGuide financeGuide={data.finance_operations_guide || undefined} />
  }

  if (normalized === "invoice") {
    const data = await loadJson("invoice-guide.json", { invoice_digitization_guide: null })
    return <TechnicalGuide invoiceGuide={data.invoice_digitization_guide || undefined} />
  }

  if (normalized === "customs") {
    const data = await loadJson("customs-guide.json", { customs_clearance_guide: null })
    return <TechnicalGuide customsGuide={data.customs_clearance_guide || undefined} />
  }

  if (normalized === "compliance") {
    const data = await loadJson("compliance-guide.json", { compliance_extraction_guide: null })
    return <TechnicalGuide complianceGuide={data.compliance_extraction_guide || undefined} />
  }

  if (normalized === "shipping" || normalized === "logistics") {
    const data = await loadJson("shipping-guide.json", { shipping_documentation_guide: null })
    return <TechnicalGuide shippingGuide={data.shipping_documentation_guide || undefined} />
  }

  if (normalized === "tms" || normalized === "integration") {
    const data = await loadJson("tms-erp-guide.json", { tms_erp_bridging_guide: null })
    return <TechnicalGuide guide={data.tms_erp_bridging_guide || undefined} />
  }

  if (normalized === "inventory") {
    const data = await loadJson("inventory-guide.json", { inventory_management_guide: null })
    return <TechnicalGuide inventoryGuide={data.inventory_management_guide || undefined} />
  }

  if (normalized === "hs-code" || normalized === "classification") {
    const data = await loadJson("hscode-guide.json", { hscode_extraction_guide: null })
    return <TechnicalGuide hsCodeGuide={data.hscode_extraction_guide || undefined} />
  }

  return null
}
