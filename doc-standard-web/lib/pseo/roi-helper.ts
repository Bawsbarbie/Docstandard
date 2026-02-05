import type { PageModel } from "./content-factory"

interface DynamicROI {
  manualEffort: string
  withDocStandard: string
  annualSavings: string
  errorReduction: string
  manualEffortNote?: string
  withDocStandardNote?: string
  annualSavingsNote?: string
  errorReductionNote?: string
}

/**
 * Extract ROI value from text using regex patterns
 */
export function extractROIValue(
  text: string,
  type: "manualEffort" | "withDocStandard" | "annualSavings" | "errorReduction"
): string | null {
  if (!text) return null

  switch (type) {
    case "manualEffort": {
      // Match patterns like "13.3 hours/day", "42 hours/month", "8 minutes per invoice", "8m", "4h"
      const timeMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:m|min|minute|hour|h|hr)s?/i)
      if (timeMatch) {
        const value = timeMatch[1]
        const unitText = timeMatch[0].toLowerCase()
        const isHour =
          unitText.includes("hour") ||
          unitText.includes("hr") ||
          /\bh\b/.test(unitText)
        return `${value}${isHour ? "h" : "m"}`
      }

      // Fallback: look for any time pattern
      const fallbackMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h|minutes?|mins?|m)/i)
      if (fallbackMatch) {
        const value = fallbackMatch[1]
        const unit = fallbackMatch[0].toLowerCase().includes("hour") ||
          fallbackMatch[0].toLowerCase().includes("hr") ||
          fallbackMatch[0].toLowerCase().includes("h")
          ? "h"
          : "m"
        return `${value}${unit}`
      }
      return null
    }

    case "withDocStandard": {
      // Match patterns like "<5 minutes/day", "30 seconds per batch", "2 hours/month"
      const minuteMatch = text.match(/(?:<|less than|under)?\s*(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)\s*(?:\/|per|for)/i)
      if (minuteMatch) return `${minuteMatch[1]}m`

      const secondMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:seconds?|secs?|s)\s*(?:per|for)/i)
      if (secondMatch) {
        const seconds = parseFloat(secondMatch[1])
        if (seconds < 60) return `${seconds}s`
        const minutes = Math.round(seconds / 60)
        return `${minutes}m`
      }

      const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\s*(?:\/|per|for)/i)
      if (hourMatch) return `${hourMatch[1]}h`
      return null
    }

    case "annualSavings": {
      // Match patterns like "$120,000 annually", "$25,000+", "$120k", "$300k"
      const dollarMatch =
        text.match(/~\s*\$([\d,.]+)/i) ||
        text.match(/[\$]\s?([\d,.]+)\s?(?:k|thousand|annually|year)?/i)
      if (dollarMatch) {
        let value = dollarMatch[1].replace(/,/g, "")
        const numValue = parseFloat(value)
        if (numValue >= 1000) {
          const kValue = Math.round(numValue / 1000)
          return `$${kValue}k`
        }
        return `$${value}`
      }

      // Match "$120k" directly
      const kMatch = text.match(/\$(\d+)k/i)
      if (kMatch) return `$${kMatch[1]}k`
      return null
    }

    case "errorReduction": {
      // Match patterns like "100% reduction", "99.5%+", "2-4%"
      const percentMatch = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:reduction|accuracy|error|rate)?/i)
      if (percentMatch) {
        const value = parseFloat(percentMatch[1])
        if (value >= 90) return "100%"
        return `${Math.round(value)}%`
      }

      // Match "99.5%+" pattern
      const plusMatch = text.match(/(\d+(?:\.\d+)?)\s*%\s*\+/i)
      if (plusMatch) {
        const value = parseFloat(plusMatch[1])
        if (value >= 99) return "100%"
        return `${Math.round(value)}%`
      }
      return null
    }

    default:
      return null
  }
}

function extractManualEffortNote(text: string): string | null {
  if (!text) return null

  const match = text.match(/(\d+(?:\.\d+)?)\s*(minutes?|mins?|m|hours?|hrs?|h)\s*per\s*([a-z][a-z\s-]{2,30})/i)
  if (!match) return null

  const value = match[1]
  const unitRaw = match[2].toLowerCase()
  const unit = unitRaw.startsWith("h") ? "hrs" : "mins"
  const subject = match[3].trim().replace(/\s+/g, " ")

  return `${value} ${unit} per ${subject}`
}

/**
 * Get dynamic ROI data from pageModel technical guides
 * Falls back to design2.md defaults if no data is found
 */
export function getDynamicROI(pageModel: PageModel): DynamicROI {
  const { technical } = pageModel

  // Extract ROI text from all possible sources
  const integrationText = technical?.integrationDetails as { solution?: string; friction?: string } | undefined
  const roiText =
    integrationText?.solution ||
    integrationText?.friction ||
    technical?.motiveGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.tmsErpGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.customsGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.financeGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.shippingGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.inventoryGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.complianceGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.hsCodeGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.invoiceGuide?.expert_sections?.find((section) => section.id === "operational_roi")?.content ||
    technical?.integrationDetails?.value_logic ||
    technical?.serviceDetails?.value_logic ||
    undefined

  // Extract individual ROI values
  const extractedManualEffort = roiText ? extractROIValue(roiText, "manualEffort") : null
  const extractedWithDocStandard = roiText ? extractROIValue(roiText, "withDocStandard") : null
  const extractedAnnualSavings = roiText ? extractROIValue(roiText, "annualSavings") : null
  const extractedErrorReduction = roiText ? extractROIValue(roiText, "errorReduction") : null

  console.log(`ROI Raw Text: ${roiText}`)
  console.log(`Extracted: ${extractedAnnualSavings}`)

  const extractedManualEffortNote = roiText ? extractManualEffortNote(roiText) : null
  const isIntegration = technical?.isIntegration || pageModel.intent?.kind === "integration"
  const isCustoms = pageModel.intent?.kind === "customs"
  const manualEffortNoteFallback = isIntegration
    ? "Per processing batch"
    : isCustoms
      ? "Per entry summary"
      : "Calculated"
  const annualSavingsNoteFallback = isIntegration
    ? "Operational Value"
    : isCustoms
      ? "Compliance Value"
      : "Calculated"
  const withDocStandardNoteFallback = isIntegration
    ? "Per processing batch"
    : isCustoms
      ? "Per entry summary"
      : "Calculated"
  const errorReductionNoteFallback = isIntegration
    ? "Operational Value"
    : isCustoms
      ? "Compliance Value"
      : "Calculated"

  // Use extracted values only (avoid mock defaults)
  return {
    manualEffort: extractedManualEffort ?? "Calculated",
    withDocStandard: extractedWithDocStandard ?? "Calculated",
    annualSavings: extractedAnnualSavings ?? "Calculated",
    errorReduction: extractedErrorReduction ?? "Calculated",
    manualEffortNote: extractedManualEffortNote ?? manualEffortNoteFallback,
    withDocStandardNote: withDocStandardNoteFallback,
    annualSavingsNote: annualSavingsNoteFallback,
    errorReductionNote: errorReductionNoteFallback,
  }
}
