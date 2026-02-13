interface HeadProps {
  params: {
    vertical: string
  }
}

const SYSTEM_SLUGS = [
  "cargowise",
  "magaya",
  "sap",
  "oracle",
  "motive",
  "descartes",
  "mercurygate",
  "flexport",
  "freightos",
  "kuebix",
  "roserocket",
  "manhattan",
  "blueyonder",
  "3pl-central",
  "shipstation",
] as const

const SYSTEM_PATTERN = SYSTEM_SLUGS.join("|")
const CITY_SYSTEM_SLUG_REGEX = new RegExp(
  `^[a-z0-9-]+-(?:${SYSTEM_PATTERN})-(?:${SYSTEM_PATTERN})-[a-z0-9-]+$`,
  "i"
)

export default function Head({ params }: HeadProps) {
  // Noindex removed - city-system pages now redirect to new V2 URLs
  // New URLs: /integration/[city]/[systemA]/[systemB]/
  return null
}
