import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("logistics")
}

export default async function LogisticsHubPage() {
  return <VerticalHub vertical="logistics" />
}
