import type { Metadata } from "next"
import Link from "next/link"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata(): Promise<Metadata> {
  const base = generateMetadataForVertical("customs")
  return {
    ...base,
    alternates: {
      canonical: "https://docstandard.co/customs",
    },
  }
}

export default async function CustomsHubPage() {
  return (
    <>
      <VerticalHub vertical="customs" />
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">
            Shipping documents provide the foundation for customs declarations. {" "}
            <Link href="/logistics" className="text-blue-600 font-semibold hover:underline">
              Explore logistics data extraction
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
