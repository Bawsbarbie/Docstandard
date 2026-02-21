import type { Metadata } from "next"
import { VerticalHubTemplate } from "@/components/pseo/VerticalHubTemplate"
import softwareSystems from "@/data/software-systems.json"
import documents from "@/data/documents.json"

export const metadata: Metadata = {
  title: "Real Estate Document Processing Hub | DocStandard",
  description:
    "Extract and normalize lease agreements, rent rolls, tenant applications, and property records into clean structured data for your property management stack.",
  alternates: { canonical: "https://docstandard.co/real-estate" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Real Estate Document Processing Hub | DocStandard",
    description:
      "Extract and normalize lease agreements, rent rolls, and property records into clean structured data for your property management stack.",
    url: "https://docstandard.co/real-estate",
    type: "website",
  },
}

export default function RealEstateHubPage() {
  const sys = (softwareSystems as Record<string, { source: Array<{ slug: string; name: string }>; destination: Array<{ slug: string; name: string }> }>)["real-estate"]
  const docs = (documents as Record<string, Array<{ slug: string; name: string; abbr?: string }>>)["real-estate"]

  return (
    <VerticalHubTemplate
      config={{
        id: "real-estate",
        name: "Real Estate",
        hubTitle: "Real Estate Document Processing Hub",
        hubDescription:
          "Extract and normalize lease agreements, rent rolls, tenant applications, and property records into clean structured data for your property management stack.",
        canonical: "https://docstandard.co/real-estate",
        color: "amber",
        industries: ["property management", "commercial real estate", "residential brokerage", "HOA management", "title companies"],
        sources: sys.source,
        destinations: sys.destination,
        documents: docs,
      }}
    />
  )
}
