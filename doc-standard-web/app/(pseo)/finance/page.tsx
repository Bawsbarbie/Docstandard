import Link from "next/link"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("finance")
}

export default async function FinanceHubPage() {
  return (
    <>
      <VerticalHub vertical="finance" />
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">
            Logistics cost data flows directly into freight bill auditing workflows. {" "}
            <Link href="/logistics" className="text-blue-600 font-semibold hover:underline">
              Learn about our logistics document processing
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
