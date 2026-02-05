import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

export async function generateMetadata() {
  return generateMetadataForVertical("compliance")
}

export default async function ComplianceHubPage() {
  return <VerticalHub vertical="compliance" />
}
