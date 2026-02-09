import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { VerticalHub, generateMetadataForVertical } from "@/components/pseo/VerticalHub"
import { generatedPageImports } from "@/generated/page-map"
import { blogSlugSet } from "@/generated/blog-slugs"

interface PageProps {
  params: {
    vertical: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const importer = (generatedPageImports as Record<string, (() => Promise<any>) | undefined>)[
    params.vertical
  ]
  if (importer) {
    const title = params.vertical
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
    return { title }
  }
  if (blogSlugSet.has(params.vertical)) {
    return { title: "Redirecting..." }
  }
  return generateMetadataForVertical(params.vertical)
}

export async function generateStaticParams() {
  return Object.keys(generatedPageImports).map((vertical) => ({ vertical }))
}

export default async function VerticalHubPage({ params }: PageProps) {
  const importer = (generatedPageImports as Record<string, (() => Promise<any>) | undefined>)[
    params.vertical
  ]
  if (importer) {
    const mod = await importer()
    const Page = mod.default
    return <Page />
  }
  if (blogSlugSet.has(params.vertical)) {
    redirect(`/blog/${params.vertical}`)
  }
  if (!params.vertical) {
    notFound()
  }
  return <VerticalHub vertical={params.vertical} />
}
