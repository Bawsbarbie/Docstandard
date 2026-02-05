import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("shipping")
}

export default async function ShippingHubPage() {
  return <VerticalHub vertical="shipping" />
}
