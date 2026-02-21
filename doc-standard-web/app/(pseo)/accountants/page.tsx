import type { Metadata } from "next"
import { VerticalHubTemplate } from "@/components/pseo/VerticalHubTemplate"
import softwareSystems from "@/data/software-systems.json"
import documents from "@/data/documents.json"

export const metadata: Metadata = {
  title: "Accounting Document Processing Hub | DocStandard",
  description:
    "Normalize client documents, tax filings, and financial statements into clean structured data for your accounting software. Built for CPA firms, bookkeepers, and tax practices.",
  alternates: { canonical: "https://docstandard.co/accountants" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Accounting Document Processing Hub | DocStandard",
    description:
      "Normalize client documents, tax filings, and financial statements into clean structured data for your accounting software.",
    url: "https://docstandard.co/accountants",
    type: "website",
  },
}

export default function AccountantsHubPage() {
  const sys = (softwareSystems as Record<string, { source: Array<{ slug: string; name: string }>; destination: Array<{ slug: string; name: string }> }>)["accountants"]
  const docs = (documents as Record<string, Array<{ slug: string; name: string; abbr?: string }>>)["accountants"]

  return (
    <VerticalHubTemplate
      config={{
        id: "accountants",
        name: "Accountants",
        hubTitle: "Accounting Document Processing Hub",
        hubDescription:
          "Normalize client documents, tax filings, and financial statements into clean structured data for your accounting software. Built for CPA firms, bookkeepers, and tax practices.",
        canonical: "https://docstandard.co/accountants",
        color: "emerald",
        industries: ["CPA firms", "bookkeeping", "tax preparation", "audit", "payroll"],
        sources: sys.source,
        destinations: sys.destination,
        documents: docs,
      }}
    />
  )
}
