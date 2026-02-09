import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"
import { resolveDataPath } from "@/lib/pseo/data-path"

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  readingTime: string
  publishedAt: string
  clusterId?: string
}

export interface BlogPostContent extends BlogPostMeta {
  updatedAt?: string
  content: string
}

const BLOG_DIR = resolveDataPath("content", "blog")

const ensureYearTag = (title: string) => {
  return /\b2026\b/.test(title) ? title : `${title} (2026)`
}

const extractTitle = (content: string) => {
  const match = content.match(/^#\s+(.+)$/m)
  if (match && match[1]) return match[1].trim()
  return "DocStandard Authority Guide"
}

const extractDescription = (content: string) => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const firstParagraph = lines.find((line) => !line.startsWith("#") && !line.startsWith("[Internal Link to:"))
  return firstParagraph || "DocStandard technical authority notes."
}

const extractClusterId = (data: Record<string, unknown>) => {
  if (typeof data.cluster === "string") return data.cluster
  if (typeof data.cluster_id === "string") return data.cluster_id
  if (typeof data.clusterId === "string") return data.clusterId
  return undefined
}

const estimateReadingTime = (content: string) => {
  const words = content.replace(/\[Internal Link to:[^\]]+\]/g, "").split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.round(words / 200))
  return `${minutes} min read`
}

const normalizeInternalHref = (href: string) => {
  const trimmed = href.trim()
  if (!trimmed.startsWith("/")) return trimmed
  const isSingleSegment = trimmed.slice(1).split("/").length === 1
  if (isSingleSegment) {
    return `/blog${trimmed}`
  }
  return trimmed
}

const transformInternalLinks = (content: string) => {
  return content.replace(/^\[Internal Link to:\s*(.+?)\s*\]$/gm, (_match, link) => {
    const normalized = normalizeInternalHref(link)
    return `- [${link.trim()}](${normalized})`
  })
}

export async function getBlogSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""))
}

export async function getBlogPost(slug: string): Promise<BlogPostContent | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const { content, data } = matter(raw)
    const normalizedContent = transformInternalLinks(content)
    const title = ensureYearTag(extractTitle(content))
    const description = extractDescription(content)
    const clusterId = extractClusterId(data)
    return {
      slug,
      title,
      description,
      readingTime: estimateReadingTime(content),
      publishedAt: "2026-02-04",
      clusterId,
      content: normalizedContent,
    }
  } catch {
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const slugs = await getBlogSlugs()
  const posts = await Promise.all(slugs.map((slug) => getBlogPost(slug)))
  return posts
    .filter((post): post is BlogPostContent => Boolean(post))
    .map(({ slug, title, description, readingTime, publishedAt }) => ({
      slug,
      title,
      description,
      readingTime,
      publishedAt,
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}
