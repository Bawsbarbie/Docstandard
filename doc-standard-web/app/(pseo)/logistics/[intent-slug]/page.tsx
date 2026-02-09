import type { Metadata } from "next"
import BasePage, {
  generateMetadata as baseGenerateMetadata,
} from "../../[vertical]/[intent-slug]/page"
import { getIntentsByKind } from "@/lib/pseo/intents"

const VERTICAL = "logistics"

interface PageProps {
  params: {
    "intent-slug": string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return baseGenerateMetadata({
    params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] },
  })
}

export async function generateStaticParams() {
  const intents = await getIntentsByKind("shipping")
  return intents
    .sort((a, b) => a.priority - b.priority)
    .map((intent) => ({ "intent-slug": intent.slug }))
}

export default async function LogisticsIntentPage({ params }: PageProps) {
  return BasePage({ params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] } })
}
