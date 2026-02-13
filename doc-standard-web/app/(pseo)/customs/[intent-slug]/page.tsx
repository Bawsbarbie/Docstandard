import type { Metadata } from "next"
import BasePage, {
  generateMetadata as baseGenerateMetadata,
} from "../../[vertical]/[intent-slug]/page"
import { getIntentsByKind } from "@/lib/pseo/intents"
import { getCityBySlug } from "@/lib/pseo/city-data"
import CityPage from "../city-page"

const VERTICAL = "customs"

interface PageProps {
  params: {
    "intent-slug": string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params["intent-slug"])
  if (cityData) {
    return {
      title: `Customs Document Processing in ${cityData.name} | DocStandard`,
      description: `Accelerate customs clearance in ${cityData.name}. Automate customs declarations, duty calculations, and entry documentation for faster port processing.`,
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

export default async function CustomsIntentPage({ params }: PageProps) {
  const cityData = getCityBySlug(params["intent-slug"])
  if (cityData) {
    return CityPage({ params: { city: params["intent-slug"] } })
  }

  return BasePage({ params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] } })
}
