import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("finance")
}

export default async function FinanceHubPage() {
  return <VerticalHub vertical="finance" />
}
