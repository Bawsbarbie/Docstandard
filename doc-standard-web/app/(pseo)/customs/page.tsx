import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("customs")
}

export default async function CustomsHubPage() {
  return <VerticalHub vertical="customs" />
}
