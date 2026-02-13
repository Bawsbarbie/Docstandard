import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BasePage, {
  generateMetadata as baseGenerateMetadata,
} from "../../[vertical]/[intent-slug]/page"
import { getIntentsByKind } from "@/lib/pseo/intents"
import { getCityBySlug } from "@/lib/pseo/city-data"
import CityPage from "../[city]/page"

const VERTICAL = "logistics"

interface PageProps {
  params: {
    "intent-slug": string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params["intent-slug"])
  if (cityData) {
    return {
      title: `Logistics Document Processing in ${cityData.name} | DocStandard`,
      description: `Streamline logistics document processing in ${cityData.name}. Automate BOLs, packing lists, and delivery documents for faster supply chain operations.`,
    }
  }

  return baseGenerateMetadata({
    params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] },
  })
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

export default async function LogisticsIntentPage({ params }: PageProps) {
  const cityData = getCityBySlug(params["intent-slug"])
  if (cityData) {
    return CityPage({ params: { city: params["intent-slug"] } })
  }

  return BasePage({ params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] } })
}
