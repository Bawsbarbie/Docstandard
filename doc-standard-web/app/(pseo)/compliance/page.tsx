import Link from "next/link"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("compliance")
}

export default async function ComplianceHubPage() {
  return (
    <>
      <VerticalHub vertical="compliance" />
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">
            Logistics compliance requires accurate BOL and packing list data. {" "}
            <Link href="/logistics" className="text-blue-600 font-semibold hover:underline">
              See logistics processing capabilities
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
