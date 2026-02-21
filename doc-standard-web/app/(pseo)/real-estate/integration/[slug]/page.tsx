/**
 * CANONICAL URL: /real-estate/integration/[slug]
 *
 * Slug format: {source-slug}-to-{destination-slug}
 * Examples:
 *   /real-estate/integration/appfolio-to-quickbooks-online
 *   /real-estate/integration/yardi-to-netsuite
 *   /real-estate/integration/buildium-to-xero
 *
 * All valid pairs are pre-rendered at build time.
 */
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IntegrationPageTemplate } from "@/components/pseo/IntegrationPageTemplate"
import {
  getVerticalIntegrationModel,
  getVerticalIntegrationSlugs,
} from "@/lib/pseo/vertical-integration-factory"

const VERTICAL_ID = "real-estate"

export const dynamicParams = false
export const revalidate = 86400

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const model = getVerticalIntegrationModel(VERTICAL_ID, params.slug)
  if (!model) return { robots: { index: false } }

  return {
    title: model.title,
    description: model.description,
    alternates: { canonical: model.canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: model.title,
      description: model.description,
      type: "website",
      url: model.canonicalUrl,
    },
  }
}

export async function generateStaticParams() {
  const slugs = getVerticalIntegrationSlugs(VERTICAL_ID)
  return slugs.map((slug) => ({ slug }))
}

export default function RealEstateIntegrationPage({ params }: PageProps) {
  const model = getVerticalIntegrationModel(VERTICAL_ID, params.slug)
  if (!model) notFound()

  return <IntegrationPageTemplate model={model} />
}
