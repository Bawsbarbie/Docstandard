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

  // Helper: Get related cities with working URLs (/{vertical}/{city-slug})
  const getRelatedCityLinks = (
    currentCitySlug: string,
    currentVertical: string,
    maxResults: number = 2
  ): Array<{ name: string; href: string }> => {
    const cityClusters: Record<string, Array<{ name: string; slug: string }>> = {
      "los-angeles": [
        { name: "Long Beach", slug: "long-beach" },
        { name: "Oakland", slug: "oakland" },
      ],
      "long-beach": [
        { name: "Los Angeles", slug: "los-angeles" },
        { name: "Oakland", slug: "oakland" },
      ],
      "new-york": [
        { name: "Newark", slug: "newark" },
        { name: "Philadelphia", slug: "philadelphia" },
      ],
      chicago: [
        { name: "Detroit", slug: "detroit" },
        { name: "Milwaukee", slug: "milwaukee" },
      ],
      houston: [
        { name: "Dallas", slug: "dallas" },
        { name: "San Antonio", slug: "san-antonio" },
      ],
      antwerp: [
        { name: "Rotterdam", slug: "rotterdam" },
        { name: "Hamburg", slug: "hamburg" },
      ],
      rotterdam: [
        { name: "Antwerp", slug: "antwerp" },
        { name: "Amsterdam", slug: "amsterdam" },
      ],
      hamburg: [
        { name: "Rotterdam", slug: "rotterdam" },
        { name: "Antwerp", slug: "antwerp" },
      ],
      singapore: [
        { name: "Port Klang", slug: "port-klang" },
        { name: "Jakarta", slug: "jakarta" },
      ],
      dubai: [
        { name: "Abu Dhabi", slug: "abu-dhabi" },
        { name: "Doha", slug: "doha" },
      ],
      london: [
        { name: "Felixstowe", slug: "felixstowe" },
        { name: "Southampton", slug: "southampton" },
      ],
    }

    return (cityClusters[currentCitySlug.toLowerCase()] || [])
      .slice(0, maxResults)
      .map((cityLink) => ({
        name: cityLink.name,
        href: `/${currentVertical}/${cityLink.slug}`,
      }))
  }

  // Helper: Get related vertical links for same city (/{vertical}/{city-slug})
  const getRelatedVerticalLinks = (
    currentCitySlug: string,
    currentVertical: string,
    maxResults: number = 2
  ): Array<{ name: string; label: string; href: string }> => {
    const verticals = [
      { slug: "shipping", label: "Shipping" },
      { slug: "customs", label: "Customs" },
      { slug: "compliance", label: "Compliance" },
      { slug: "finance", label: "Finance" },
      { slug: "logistics", label: "Logistics" },
    ]

    return verticals
      .filter((verticalLink) => verticalLink.slug !== currentVertical)
      .slice(0, maxResults)
      .map((verticalLink) => ({
        name: verticalLink.slug,
        label: verticalLink.label,
        href: `/${verticalLink.slug}/${currentCitySlug}`,
      }))
  }

  // Helper: Get relevant integration links (already in working route format)
  const getRelatedIntegrationLinks = (
    verticalKind: string
  ): Array<{ label: string; href: string }> => {
    const integrationMap: Record<string, Array<{ slug: string; label: string }>> = {
      shipping: [
        { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise -> NetSuite" },
        { slug: "magaya-to-quickbooks-bridge", label: "Magaya -> QuickBooks" },
      ],
      customs: [
        { slug: "descartes-to-netsuite-customs-bridge", label: "Descartes -> NetSuite" },
        { slug: "sap-tm-to-oracle-otm-bridge", label: "SAP TM -> Oracle" },
      ],
      compliance: [
        { slug: "cargowise-to-sap-s4hana-bridge", label: "CargoWise -> SAP" },
        { slug: "edi-document-normalization-services", label: "EDI Normalization" },
      ],
      finance: [
        { slug: "magaya-to-quickbooks-bridge", label: "Magaya -> QuickBooks" },
        { slug: "flexport-to-netsuite-bridge", label: "Flexport -> NetSuite" },
      ],
      logistics: [
        { slug: "cargowise-to-netsuite-data-bridge", label: "CargoWise -> NetSuite" },
        { slug: "motive-to-sap-ifta-normalization", label: "Motive -> SAP" },
      ],
    }

    return (integrationMap[verticalKind] || integrationMap.logistics || [])
      .slice(0, 2)
      .map((integration) => ({
        label: integration.label,
        href: `/integration/${integration.slug}`,
      }))
  }

  const relatedCityLinks = getRelatedCityLinks(city.slug, intent.kind, 2)
  const relatedVerticalLinks = getRelatedVerticalLinks(city.slug, intent.kind, 2)
  const relatedIntegrationLinks = getRelatedIntegrationLinks(intent.kind).slice(0, 2)

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
            Related services and locations
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Other Locations
              </h3>
              <ul className="space-y-3">
                {relatedCityLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#2563eb] hover:underline flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      {link.name}
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
                {relatedVerticalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#2563eb] hover:underline flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">System Integrations</h3>
            <div className="flex flex-wrap gap-3">
              {relatedIntegrationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
                >
                  {link.label} ->
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
