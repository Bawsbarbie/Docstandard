import type { Metadata } from "next"
import { buildMeta } from "@/lib/pseo/metadata"

export const metadata: Metadata = buildMeta({
  title: "Get a Quote",
  description: "Submit your document processing requirements and get a custom quote. DocStandard normalizes logistics, accounting, real estate, and warehousing documents — fast.",
  canonicalPath: "/contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
