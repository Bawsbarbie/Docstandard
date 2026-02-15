import type { PageModel } from "@/lib/pseo/content-factory"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { getDynamicROI } from "@/lib/pseo/roi-helper"
import { IntroBlock } from "./IntroBlock"
import { RiskSection } from "./RiskSection"
import { PainSection } from "./PainSection"
import { TechnicalGuide } from "./TechnicalGuide"
import { BenefitsGrid } from "./BenefitsGrid"
import { TechnicalProcess } from "./TechnicalProcess"
import { FAQSection } from "./FAQSection"
import { ROISection } from "./ROISection"
import { MiddleCTA } from "./MiddleCTA"
import { TestimonialsSection } from "./TestimonialsSection"

interface PseoPageTemplateProps {
  pageModel: PageModel
}

export function PseoPageTemplate({ pageModel }: PseoPageTemplateProps) {
  const { city, intent, content, meta, technical } = pageModel

  // Extract technical details for different sections
  const isIntegration = technical?.isIntegration ?? false
  const integrationDetails = technical?.integrationDetails
  const serviceDetails = technical?.serviceDetails
  const tmsErpGuide = technical?.tmsErpGuide
  const customsGuide = technical?.customsGuide
  const financeGuide = technical?.financeGuide
  const shippingGuide = technical?.shippingGuide
  const inventoryGuide = technical?.inventoryGuide
  const complianceGuide = technical?.complianceGuide
  const motiveGuide = technical?.motiveGuide
  const hsCodeGuide = technical?.hsCodeGuide
  const invoiceGuide = technical?.invoiceGuide
  const painPoints =
    serviceDetails?.pain_points ||
    integrationDetails?.pain_points ||
    undefined
  const valueLogic =
    serviceDetails?.value_logic ||
    integrationDetails?.value_logic ||
    undefined
  const derivedPainPoints = (() => {
    if (painPoints && painPoints.length > 0) return painPoints

    const extractListPoints = (text?: string): string[] => {
      if (!text) return []
      return text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^(\d+\.\s+|[-*•–]\s+)/.test(line))
        .map((line) =>
          line
            .replace(/^(\d+\.\s+|[-*•–]\s+)/, "")
            .replace(/\*\*/g, "")
            .trim()
        )
        .filter(Boolean)
    }

    const extractSectionTitles = (sections?: Array<{ title: string }>) => {
      if (!sections) return []
      return sections.map((s) => s.title).filter(Boolean)
    }

    const sources = [
      tmsErpGuide?.expert_sections,
      customsGuide?.expert_sections,
      financeGuide?.expert_sections,
      shippingGuide?.expert_sections,
      inventoryGuide?.expert_sections,
      complianceGuide?.expert_sections,
      motiveGuide?.expert_sections,
      hsCodeGuide?.expert_sections,
      invoiceGuide?.expert_sections,
    ]

    const collected: string[] = []
    for (const sections of sources) {
      if (collected.length >= 4) break
      sections?.forEach((section) => {
        if (collected.length >= 4) return
        const points = extractListPoints(section.content)
        collected.push(...points)
      })
    }

    if (collected.length < 3) {
      for (const sections of sources) {
        if (collected.length >= 4) break
        const titles = extractSectionTitles(sections)
        collected.push(...titles)
      }
    }

    const unique = Array.from(new Set(collected)).slice(0, 4)
    return unique.length > 0 ? unique : undefined
  })()

  const parseIntegrationPair = (pair?: string) => {
    if (!pair) return { systemA: undefined, systemB: undefined }
    const parts = pair.split(/\s*(?:↔️?|<->|->|→)\s*/).map((part) => part.trim()).filter(Boolean)
    if (parts.length >= 2) {
      return { systemA: parts[0], systemB: parts.slice(1).join(" ") }
    }
    return { systemA: undefined, systemB: undefined }
  }

  const { systemA: integrationSystemA, systemB: integrationSystemB } = parseIntegrationPair(integrationDetails?.pair)
  
  // Extract systemA and systemB from integration pair when available
  const systemA = integrationSystemA
  const systemB = integrationSystemB

  // Get dynamic ROI data from technical guides
  const roiData = getDynamicROI(pageModel)

  // Helper: Get related cities for same intent (major logistics clusters)
  const getRelatedCities = (
    currentCitySlug: string,
    maxResults: number = 2
  ): Array<{ slug: string; name: string }> => {
    const cityClusters: Record<string, Array<{ slug: string; name: string }>> = {
      "los-angeles": [
        { slug: "long-beach", name: "Long Beach" },
        { slug: "oakland", name: "Oakland" },
        { slug: "seattle", name: "Seattle" },
      ],
      "long-beach": [
        { slug: "los-angeles", name: "Los Angeles" },
        { slug: "oakland", name: "Oakland" },
        { slug: "san-diego", name: "San Diego" },
      ],
      "new-york": [
        { slug: "newark", name: "Newark" },
        { slug: "philadelphia", name: "Philadelphia" },
        { slug: "boston", name: "Boston" },
      ],
      chicago: [
        { slug: "detroit", name: "Detroit" },
        { slug: "milwaukee", name: "Milwaukee" },
        { slug: "indianapolis", name: "Indianapolis" },
      ],
      houston: [
        { slug: "dallas", name: "Dallas" },
        { slug: "new-orleans", name: "New Orleans" },
        { slug: "miami", name: "Miami" },
      ],
      antwerp: [
        { slug: "rotterdam", name: "Rotterdam" },
        { slug: "hamburg", name: "Hamburg" },
        { slug: "singapore", name: "Singapore" },
      ],
      rotterdam: [
        { slug: "antwerp", name: "Antwerp" },
        { slug: "hamburg", name: "Hamburg" },
        { slug: "singapore", name: "Singapore" },
      ],
      hamburg: [
        { slug: "rotterdam", name: "Rotterdam" },
        { slug: "antwerp", name: "Antwerp" },
        { slug: "dubai", name: "Dubai" },
      ],
      singapore: [
        { slug: "hong-kong", name: "Hong Kong" },
        { slug: "shanghai", name: "Shanghai" },
        { slug: "busan", name: "Busan" },
      ],
      dubai: [
        { slug: "singapore", name: "Singapore" },
        { slug: "rotterdam", name: "Rotterdam" },
        { slug: "hamburg", name: "Hamburg" },
      ],
    }

    return (cityClusters[currentCitySlug.toLowerCase()] || []).slice(0, maxResults)
  }

  // Helper: Get related intents for same city by vertical category
  const getRelatedIntents = (
    currentIntentSlug: string,
    currentKind: string,
    maxResults: number = 2
  ): Array<{ slug: string; name: string }> => {
    const intentMap: Record<string, Array<{ slug: string; name: string }>> = {
      shipping: [
        { slug: "customs-document-data-extraction", name: "Customs Document Data Extraction" },
        { slug: "commercial-invoice-data-digitization", name: "Commercial Invoice Data Digitization" },
        { slug: "bill-of-lading-data-processing", name: "Bill of Lading Data Processing" },
      ],
      customs: [
        { slug: "shipping-documentation-processing", name: "Shipping Documentation Processing" },
        { slug: "import-export-license-data-extraction", name: "Import/Export License Data Extraction" },
        { slug: "hs-code-validation-from-docs", name: "HS Code Validation from Docs" },
      ],
      compliance: [
        { slug: "customs-document-data-extraction", name: "Customs Document Data Extraction" },
        { slug: "import-export-license-data-extraction", name: "Import/Export License Data Extraction" },
        { slug: "bill-of-lading-data-processing", name: "Bill of Lading Data Processing" },
      ],
      finance: [
        { slug: "prepare-magaya-data-for-quickbooks", name: "Prepare Magaya Data for QuickBooks" },
        { slug: "freight-bill-audit-data-preparation", name: "Freight Bill Audit Data Preparation" },
        { slug: "commercial-invoice-data-digitization", name: "Commercial Invoice Data Digitization" },
      ],
      logistics: [
        { slug: "clean-cargowise-data-for-accounting", name: "Clean CargoWise Data for Accounting" },
        { slug: "clean-logistics-data-for-sap-s4hana", name: "Clean Logistics Data for SAP S/4HANA" },
        { slug: "shipment-data-prep-for-netsuite-landed-cost", name: "Shipment Data Prep for NetSuite Landed Cost" },
      ],
      invoice: [
        { slug: "commercial-invoice-data-digitization", name: "Commercial Invoice Data Digitization" },
        { slug: "prepare-magaya-data-for-quickbooks", name: "Prepare Magaya Data for QuickBooks" },
        { slug: "freight-bill-audit-data-preparation", name: "Freight Bill Audit Data Preparation" },
      ],
    }

    return (intentMap[currentKind] || intentMap.logistics || [])
      .filter((item) => item.slug !== currentIntentSlug)
      .slice(0, maxResults)
  }

  // Helper: Get relevant integrations for this vertical
  const getRelatedIntegrationsForCity = (
    verticalKind: string
  ): Array<{ slug: string; label: string }> => {
    const integrationMap: Record<string, Array<{ slug: string; label: string }>> = {
      shipping: [
        { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise to NetSuite" },
        { slug: "magaya-to-quickbooks-bridge", label: "Magaya to QuickBooks" },
      ],
      customs: [
        { slug: "descartes-to-netsuite-customs-bridge", label: "Descartes to NetSuite" },
        { slug: "sap-tm-to-oracle-otm-bridge", label: "SAP TM to Oracle OTM" },
      ],
      compliance: [
        { slug: "cargowise-to-sap-s4hana-bridge", label: "CargoWise to SAP S/4HANA" },
        { slug: "oracle-to-magaya-bridge", label: "Oracle to Magaya" },
      ],
      finance: [
        { slug: "magaya-to-quickbooks-bridge", label: "Magaya to QuickBooks" },
        { slug: "flexport-to-netsuite-bridge", label: "Flexport to NetSuite" },
      ],
      logistics: [
        { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise to NetSuite" },
        { slug: "motive-to-sap-ifta-normalization", label: "Motive to SAP" },
      ],
      invoice: [
        { slug: "magaya-to-quickbooks-bridge", label: "Magaya to QuickBooks" },
        { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise to NetSuite" },
      ],
    }

    return integrationMap[verticalKind] || integrationMap.logistics || []
  }

  const relatedCities = getRelatedCities(city.slug, 2)
  const relatedIntents = getRelatedIntents(intent.slug, intent.kind, 2)
  const relatedIntegrations = getRelatedIntegrationsForCity(intent.kind).slice(0, 2)
  const hubCandidates = [
    { slug: "shipping", label: "Shipping" },
    { slug: "customs", label: "Customs" },
    { slug: "compliance", label: "Compliance" },
    { slug: "finance", label: "Finance" },
    { slug: "logistics", label: "Logistics" },
    { slug: "invoice", label: "Invoice" },
  ].filter((vertical) => vertical.slug !== intent.kind)

  // Quality cap: keep total interlinks in the 6-7 range.
  const linkBudget = 7
  const nonHubLinksCount = relatedCities.length + relatedIntents.length + relatedIntegrations.length
  const hubLinksToShow = Math.max(0, Math.min(5, linkBudget - nonHubLinksCount))
  const hubLinks = hubCandidates.slice(0, hubLinksToShow)
  const countryCode = city.countryCode.toLowerCase()
  const stateCode = city.stateCode.toLowerCase()

  return (
    <main className="min-h-screen">
      <IntroBlock
        content={content.intro}
        cityName={city.name}
        serviceName={intent.name}
        imageUrl={meta.imageUrl}
        // Pass integration-specific data
        integrationPair={integrationDetails?.pair}
        useCase={integrationDetails?.use_case}
        technicalSpecs={integrationDetails?.technical_specs}
        // Pass service-specific data
        operationalRequirements={serviceDetails?.operational_requirements}
      />

      <RiskSection quote={content.pain?.text} painPoints={derivedPainPoints} />

      <PainSection
        content={content.pain}
        // Service-specific pain points (high-stakes problems)
        painPoints={derivedPainPoints}
        valueLogic={valueLogic}
        intentName={intent.name}
        vertical={intent.kind}
        kind={intent.kind}
        systemA={systemA}
        systemB={systemB}
      />

      <TechnicalGuide
        guide={tmsErpGuide}
        customsGuide={customsGuide}
        financeGuide={financeGuide}
        shippingGuide={shippingGuide}
        inventoryGuide={inventoryGuide}
        complianceGuide={complianceGuide}
        motiveGuide={motiveGuide}
        hsCodeGuide={hsCodeGuide}
        invoiceGuide={invoiceGuide}
      />

      <TechnicalProcess process={content.process} />

      <ROISection
        manualEffort={roiData.manualEffort}
        manualEffortNote={roiData.manualEffortNote}
        withDocStandard={roiData.withDocStandard}
        withDocStandardNote={roiData.withDocStandardNote}
        annualSavings={roiData.annualSavings}
        annualSavingsNote={roiData.annualSavingsNote}
        errorReduction={roiData.errorReduction}
        errorReductionNote={roiData.errorReductionNote}
      />

      <MiddleCTA />

      <BenefitsGrid
        benefits={content.benefits}
        // Integration-specific data flow
        dataFlow={integrationDetails?.data_flow}
        prerequisites={integrationDetails?.prerequisites}
        isIntegration={isIntegration}
      />

      <FAQSection faqs={content.faq} />

      <TestimonialsSection kind={intent.kind} testimonials={content.testimonials} />

      {/* RELATED LOCATIONS & SERVICES - Internal Linking */}
      <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore More</h2>
          <p className="text-slate-600 mb-8">
            Related services and locations for {intent.name.toLowerCase()}.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                {intent.name} in Other Cities
              </h3>
              <ul className="space-y-3">
                {relatedCities.map((relatedCity) => (
                  <li key={relatedCity.slug}>
                    <Link
                      href={`/${countryCode}/${stateCode}/${relatedCity.slug}/${intent.slug}`}
                      className="text-[#2563eb] hover:underline flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      {intent.name} in {relatedCity.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Other Services in {city.name}
              </h3>
              <ul className="space-y-3">
                {relatedIntents.map((relatedIntent) => (
                  <li key={relatedIntent.slug}>
                    <Link
                      href={`/${countryCode}/${stateCode}/${city.slug}/${relatedIntent.slug}`}
                      className="text-[#2563eb] hover:underline flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {relatedIntent.name} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">
              System Integrations for {city.name}
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Connect your {intent.name.toLowerCase()} workflows to your TMS or ERP.
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedIntegrations.map((integration) => (
                <Link
                  key={integration.slug}
                  href={`/integration/${integration.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
                >
                  {integration.label} ->
                </Link>
              ))}
            </div>
          </div>

          {hubLinks.length > 0 ? (
            <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Browse All Services</h3>
              <div className="flex flex-wrap gap-3">
                {hubLinks.map((vertical) => (
                  <Link
                    key={vertical.slug}
                    href={`/${vertical.slug}`}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
                  >
                    {vertical.label} ->
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
