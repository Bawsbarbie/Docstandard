import type { Metadata } from "next"
import { VerticalHubTemplate } from "@/components/pseo/VerticalHubTemplate"
import softwareSystems from "@/data/software-systems.json"
import documents from "@/data/documents.json"

export const metadata: Metadata = {
  title: "Warehousing Document Processing Hub | DocStandard",
  description:
    "Convert pick tickets, packing slips, receiving reports, and inventory documents into system-ready data for your WMS and ERP. Built for 3PLs, distributors, and fulfillment centers.",
  alternates: { canonical: "https://docstandard.co/warehousing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Warehousing Document Processing Hub | DocStandard",
    description:
      "Convert pick tickets, packing slips, and receiving reports into system-ready data for your WMS and ERP.",
    url: "https://docstandard.co/warehousing",
    type: "website",
  },
}

export default function WarehousingHubPage() {
  const sys = (softwareSystems as Record<string, { source: Array<{ slug: string; name: string }>; destination: Array<{ slug: string; name: string }> }>)["warehousing"]
  const docs = (documents as Record<string, Array<{ slug: string; name: string; abbr?: string }>>)["warehousing"]

  return (
    <VerticalHubTemplate
      config={{
        id: "warehousing",
        name: "Warehousing",
        hubTitle: "Warehousing Document Processing Hub",
        hubDescription:
          "Convert pick tickets, packing slips, receiving reports, and inventory documents into system-ready data for your WMS and ERP. Built for 3PLs, distributors, and fulfillment centers.",
        canonical: "https://docstandard.co/warehousing",
        color: "slate",
        industries: ["3PL warehousing", "distribution", "fulfillment", "manufacturing", "e-commerce"],
        sources: sys.source,
        destinations: sys.destination,
        documents: docs,
      }}
    />
  )
}
