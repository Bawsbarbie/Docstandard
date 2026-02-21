import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"
import { generatedRouteImporters, generatedSlugs } from "@/generated/page-map"
import { blogSlugSet } from "@/generated/blog-slugs"
import { getCityBySlug } from "@/lib/pseo/city-data"
const PRIMARY_CITY_VERTICAL = "shipping"

interface PageProps {
  params: {
    vertical: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const canonicalUrl = `https://docstandard.co/${params.vertical}`
  const cityData = getCityBySlug(params.vertical.toLowerCase())
  if (cityData) {
    return {
      title: `Redirecting to ${cityData.name} Shipping | DocStandard`,
      description: `Redirecting to the ${cityData.name} shipping city page.`,
    }
  }

  const importer = (generatedRouteImporters as Record<string, (() => Promise<any>) | undefined>)[
    params.vertical
  ]
  if (importer) {
    const title = params.vertical
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
    return {
      title,
      alternates: {
        canonical: canonicalUrl,
      },
    }
  }
  if (blogSlugSet.has(params.vertical)) {
    return {
      title: "Redirecting...",
      alternates: {
        canonical: canonicalUrl,
      },
    }
  }
  return generateMetadataForVertical(params.vertical)
}

export async function generateStaticParams() {
  return generatedSlugs.map((vertical) => ({ vertical }))
}

export default async function VerticalHubPage({ params }: PageProps) {
  const importer = (generatedRouteImporters as Record<string, (() => Promise<any>) | undefined>)[
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
