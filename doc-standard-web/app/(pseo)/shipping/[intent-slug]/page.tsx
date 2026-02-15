import type { Metadata } from "next"
import BasePage, {
  generateMetadata as baseGenerateMetadata,
} from "../../[vertical]/[intent-slug]/page"
import { getIntentsByKind } from "@/lib/pseo/intents"
import { getCityBySlug } from "@/lib/pseo/city-data"
import CityPage from "../city-page"

const VERTICAL = "shipping"

interface PageProps {
  params: {
    "intent-slug": string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Check if this is a city slug
  const cityData = getCityBySlug(params["intent-slug"])
  const canonicalUrl = `https://docstandard.co/${VERTICAL}/${params["intent-slug"]}`
  if (cityData) {
    return {
      title: `Shipping Document Processing in ${cityData.name} | DocStandard`,
      description: `Process ocean and air freight documents in ${cityData.name}. Extract BOLs, AWBs, and manifests for faster shipping operations.`,
      alternates: {
        canonical: canonicalUrl,
      },
    }
  }

  const metadata = await baseGenerateMetadata({
    params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] },
  })
  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export async function generateStaticParams() {
  const [intents, { cities }] = await Promise.all([
    getIntentsByKind(VERTICAL),
    import("@/lib/pseo/city-data"),
  ])

  const intentParams = intents
    .sort((a, b) => a.priority - b.priority)
    .map((intent) => ({ "intent-slug": intent.slug }))

  const cityParams = cities.map((city) => ({ "intent-slug": city.slug }))

  return [...intentParams, ...cityParams]
}

export default async function ShippingIntentPage({ params }: PageProps) {
  // Check if this is a city slug - if so, render city page
  const cityData = getCityBySlug(params["intent-slug"])
  if (cityData) {
    return CityPage({ params: { city: params["intent-slug"] } })
  }

  // Otherwise, render intent page
  return BasePage({ params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] } })
}
