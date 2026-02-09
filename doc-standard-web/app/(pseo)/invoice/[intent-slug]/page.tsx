import type { Metadata } from "next"
import BasePage, {
  generateMetadata as baseGenerateMetadata,
} from "../../[vertical]/[intent-slug]/page"
import { getIntentsByKind } from "@/lib/pseo/intents"

const VERTICAL = "invoice"

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
  const intents = await getIntentsByKind(VERTICAL)
  return intents
    .sort((a, b) => a.priority - b.priority)
    .map((intent) => ({ "intent-slug": intent.slug }))
}

export default async function InvoiceIntentPage({ params }: PageProps) {
  return BasePage({ params: { vertical: VERTICAL, "intent-slug": params["intent-slug"] } })
}
