import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { PseoPageTemplate } from "@/components/pseo/PseoPageTemplate"
import { getContentFactory } from "@/lib/pseo/content-factory"
import {
  getCityBySlug,
  getStateBySlug,
  getCountryByCode,
  getStateFromCity,
  loadCities,
} from "@/lib/pseo/geo"
import { getIntentBySlug, getTopIntents } from "@/lib/pseo/intents"

interface PageProps {
  params: {
    slug: string[]
  }
}

/**
 * Parse slug to determine route type
 */
function parseSlug(slug: string[]): {
  type: "canonical" | "alias" | "invalid"
  country: string
  state?: string
  city: string
  intent: string
} {
  // Canonical: [country, state, city, intent] (4 segments)
  if (slug.length === 4) {
    return {
      type: "canonical",
      country: slug[0],
      state: slug[1],
      city: slug[2],
      intent: slug[3],
    }
  }

  // Alias: [country, city, intent] (3 segments)
  if (slug.length === 3) {
    return {
      type: "alias",
      country: slug[0],
      city: slug[1],
      intent: slug[2],
    }
  }

  return {
    type: "invalid",
    country: "",
    city: "",
    intent: "",
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const parsed = parseSlug(params.slug)

  if (parsed.type === "invalid" || parsed.type === "alias") {
    return { title: "Redirecting..." }
  }

  const { country, state, city, intent } = parsed

  // Load data
  const cityData = await getCityBySlug(country, state!, city)
  const stateData = await getStateBySlug(country, state!)
  const intentData = await getIntentBySlug(intent)

  if (!cityData || !stateData || !intentData) {
    return { title: "Not Found" }
  }

  // Assemble page to get metadata
  const factory = getContentFactory()
  const pageModel = await factory.assemblePage(cityData, intentData, stateData)

  // Set robots based on index gating
  const robots = pageModel.meta.shouldIndex
    ? { index: true, follow: true }
    : { index: false, follow: false }

  return {
    title: pageModel.meta.title,
    description: pageModel.meta.description,
    robots,
    alternates: {
      canonical: pageModel.meta.canonical,
    },
    openGraph: {
      title: pageModel.meta.title,
      description: pageModel.meta.description,
      type: "website",
    },
  }
}

/**
 * Generate static params for top pages
 * Limited to top 100 for development speed
 */
export async function generateStaticParams() {
  try {
    const cities = await loadCities()
    const topIntents = await getTopIntents(15)

    // Filter high-priority cities
    const topCities = cities
      .filter((c) => c.priority >= 90)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 20)

    const params: Array<{ slug: string[] }> = []

    for (const city of topCities) {
      for (const intent of topIntents) {
        // Only generate canonical routes
        params.push({
          slug: [
            city.countryCode,
            city.stateCode.toLowerCase(),
            city.slug,
            intent.slug,
          ],
        })

        if (params.length >= 100) {
          return params
        }
      }
    }

    return params
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

/**
 * pSEO Page - Handles both Canonical and Alias routes
 */
export default async function PseoPage({ params }: PageProps) {
  const parsed = parseSlug(params.slug)

  // Handle invalid routes
  if (parsed.type === "invalid") {
    notFound()
  }

  // Handle alias route - 308 redirect to canonical
  if (parsed.type === "alias") {
    const { country, city, intent } = parsed

    // Look up state for this city
    const stateCode = await getStateFromCity(country, city)

    if (!stateCode) {
      notFound()
    }

    // Verify intent exists
    const intentData = await getIntentBySlug(intent)
    if (!intentData) {
      notFound()
    }

    // Build canonical URL and redirect with 308
    const canonicalUrl = `/${country}/${stateCode.toLowerCase()}/${city}/${intent}`
    redirect(canonicalUrl)
  }

  // Handle canonical route
  const { country, state, city, intent } = parsed

  // Load all required data
  const [cityData, stateData, countryData, intentData] = await Promise.all([
    getCityBySlug(country, state!, city),
    getStateBySlug(country, state!),
    getCountryByCode(country),
    getIntentBySlug(intent),
  ])

  // Return 404 if any data is missing
  if (!cityData || !stateData || !countryData || !intentData) {
    notFound()
  }

  // Assemble page content
  const factory = getContentFactory()
  const pageModel = await factory.assemblePage(cityData, intentData, stateData)

  // Render page
  return <PseoPageTemplate pageModel={pageModel} />
}
