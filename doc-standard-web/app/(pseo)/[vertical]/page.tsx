import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"
import { generatedPageImports } from "@/generated/page-map"
import { blogSlugSet } from "@/generated/blog-slugs"
import { getCityBySlug } from "@/lib/pseo/city-data"

const SYSTEM_SLUGS = [
  "cargowise",
  "magaya",
  "sap",
  "oracle",
  "motive",
  "descartes",
  "mercurygate",
  "flexport",
  "freightos",
  "kuebix",
  "roserocket",
  "manhattan",
  "blueyonder",
  "3pl-central",
  "shipstation",
] as const

const SYSTEM_PATTERN = SYSTEM_SLUGS.join("|")
const CITY_SYSTEM_SLUG_REGEX = new RegExp(
  `^[a-z0-9-]+-(?:${SYSTEM_PATTERN})-(?:${SYSTEM_PATTERN})-[a-z0-9-]+$`,
  "i"
)
const PRIMARY_CITY_VERTICAL = "shipping"

interface PageProps {
  params: {
    vertical: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.vertical.toLowerCase())
  if (cityData) {
    return {
      title: `Redirecting to ${cityData.name} Shipping | DocStandard`,
      description: `Redirecting to the ${cityData.name} shipping city page.`,
    }
  }

  const importer = (generatedPageImports as Record<string, (() => Promise<any>) | undefined>)[
    params.vertical
  ]
  if (importer) {
    const title = params.vertical
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
    if (CITY_SYSTEM_SLUG_REGEX.test(params.vertical)) {
      return {
        title,
        robots: {
          index: false,
          follow: false,
        },
      }
    }
    return { title }
  }
  if (blogSlugSet.has(params.vertical)) {
    return { title: "Redirecting..." }
  }
  return generateMetadataForVertical(params.vertical)
}

export async function generateStaticParams() {
  return Object.keys(generatedPageImports).map((vertical) => ({ vertical }))
}

export default async function VerticalHubPage({ params }: PageProps) {
  const importer = (generatedPageImports as Record<string, (() => Promise<any>) | undefined>)[
    params.vertical
  ]
  if (importer) {
    const mod = await importer()
    const Page = mod.default
    return <Page />
  }
  if (blogSlugSet.has(params.vertical)) {
    redirect(`/blog/${params.vertical}`)
  }
  const cityData = getCityBySlug(params.vertical.toLowerCase())
  if (cityData) {
    // Avoid future route collisions by canonically routing city slugs to the city-intent page namespace.
    redirect(`/${PRIMARY_CITY_VERTICAL}/${cityData.slug}`)
  }
  if (!params.vertical) {
    notFound()
  }
  return <VerticalHub vertical={params.vertical} />
}
