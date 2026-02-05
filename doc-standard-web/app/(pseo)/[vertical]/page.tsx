import type { Metadata } from "next"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"

interface PageProps {
  params: {
    vertical: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generateMetadataForVertical(params.vertical)
}

export default async function VerticalHubPage({ params }: PageProps) {
  return <VerticalHub vertical={params.vertical} />
}
