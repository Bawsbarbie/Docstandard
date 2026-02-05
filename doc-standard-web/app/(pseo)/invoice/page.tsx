import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("invoice")
}

export default async function InvoiceHubPage() {
  return <VerticalHub vertical="invoice" />
}
