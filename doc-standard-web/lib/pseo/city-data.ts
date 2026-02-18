// City data for vertical pages
export interface CityData {
  slug: string
  name: string
  country: string
  region: string
  logisticsHub: boolean
  customsPort: boolean
  majorPorts?: string[]
  airports?: string[]
  priority: number
}

const CUSTOMS_SYSTEMS_BY_COUNTRY: Record<string, string[]> = {
  USA: ["ACE", "AMS", "ABI"],
  Canada: ["CARM", "ACI", "eManifest"],
  Belgium: ["PLDA", "NCTS", "ICS2"],
  Germany: ["ATLAS", "NCTS", "ICS2"],
  Netherlands: ["AGS", "NCTS", "ICS2"],
  "United Kingdom": ["CDS", "GVMS", "NCTS"],
  Singapore: ["TradeNet", "UEN", "NTP"],
  "Hong Kong": ["TDEC", "ROCARS", "ACE"],
  China: ["China Single Window", "E-Port", "ICS2"],
  India: ["ICEGATE", "SWIFT", "NCTS"],
  Indonesia: ["INSW", "CEISA", "NLE"],
  Malaysia: ["uCustoms", "Dagang Net", "ePermit"],
  UAE: ["Mirsal 2", "Bayan", "Dubai Trade"],
  Qatar: ["Al Nadeeb", "QCC", "Bayan"],
  "South Korea": ["UNI-PASS", "KTNET", "NACCS"],
  Brazil: ["Siscomex", "Portal Único", "DU-E"],
}

const CUSTOMS_SYSTEMS_BY_REGION: Record<string, string[]> = {
  Europe: ["PLDA", "NCTS", "ICS2"],
  "North America": ["ACE", "ACI", "ABI"],
  Asia: ["TradeNet", "Single Window", "E-Customs"],
  "Middle East": ["Mirsal 2", "Bayan", "Single Window"],
  "South America": ["Siscomex", "VUCE", "SIGAD"],
}

export const cities: CityData[] = [
  // Europe
  { slug: "antwerp", name: "Antwerp", country: "Belgium", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Antwerp"], priority: 95 },
  { slug: "hamburg", name: "Hamburg", country: "Germany", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Hamburg"], airports: ["Hamburg Airport"], priority: 95 },
  { slug: "london", name: "London", country: "United Kingdom", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of London"], airports: ["Heathrow"], priority: 94 },
  { slug: "rotterdam", name: "Rotterdam", country: "Netherlands", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Rotterdam"], priority: 95 },
  { slug: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Amsterdam"], airports: ["AMS"], priority: 90 },
  { slug: "felixstowe", name: "Felixstowe", country: "United Kingdom", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Felixstowe"], priority: 88 },
  { slug: "southampton", name: "Southampton", country: "United Kingdom", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Southampton"], priority: 86 },
  
  // US - East Coast
  { slug: "new-york", name: "New York", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of New York/New Jersey"], airports: ["JFK", "Newark"], priority: 98 },
  { slug: "savannah", name: "Savannah", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Savannah"], priority: 90 },
  { slug: "charleston", name: "Charleston", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Charleston"], priority: 88 },
  { slug: "miami", name: "Miami", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port Miami"], airports: ["MIA"], priority: 92 },
  
  // US - Gulf
  { slug: "houston", name: "Houston", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Houston"], priority: 93 },
  { slug: "dallas", name: "Dallas", country: "USA", region: "North America", logisticsHub: true, customsPort: false, airports: ["DFW"], priority: 90 },
  { slug: "san-antonio", name: "San Antonio", country: "USA", region: "North America", logisticsHub: true, customsPort: false, priority: 85 },
  
  // US - West Coast
  { slug: "los-angeles", name: "Los Angeles", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of LA", "Port of Long Beach"], airports: ["LAX"], priority: 98 },
  { slug: "long-beach", name: "Long Beach", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Long Beach"], priority: 93 },
  { slug: "oakland", name: "Oakland", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Oakland"], priority: 87 },
  
  // US - Midwest
  { slug: "chicago", name: "Chicago", country: "USA", region: "North America", logisticsHub: true, customsPort: false, airports: ["ORD"], priority: 94 },
  { slug: "memphis", name: "Memphis", country: "USA", region: "North America", logisticsHub: true, customsPort: false, priority: 85 },
  { slug: "detroit", name: "Detroit", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Detroit"], priority: 86 },
  { slug: "milwaukee", name: "Milwaukee", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Milwaukee"], priority: 84 },
  { slug: "newark", name: "Newark", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port Newark"], airports: ["EWR"], priority: 92 },
  { slug: "philadelphia", name: "Philadelphia", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Philadelphia"], priority: 90 },
  
  // Asia
  { slug: "singapore", name: "Singapore", country: "Singapore", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Singapore"], airports: ["Changi"], priority: 97 },
  { slug: "hong-kong", name: "Hong Kong", country: "Hong Kong", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Hong Kong"], airports: ["HKG"], priority: 95 },
  { slug: "shanghai", name: "Shanghai", country: "China", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Shanghai"], airports: ["PVG"], priority: 96 },
  { slug: "shenzhen", name: "Shenzhen", country: "China", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Shenzhen"], airports: ["SZX"], priority: 92 },
  { slug: "mumbai", name: "Mumbai", country: "India", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Jawaharlal Nehru Port"], airports: ["BOM"], priority: 91 },
  { slug: "jakarta", name: "Jakarta", country: "Indonesia", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Tanjung Priok"], airports: ["CGK"], priority: 88 },
  { slug: "port-klang", name: "Port Klang", country: "Malaysia", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port Klang"], priority: 89 },
  { slug: "dubai", name: "Dubai", country: "UAE", region: "Middle East", logisticsHub: true, customsPort: true, majorPorts: ["Jebel Ali"], airports: ["DXB"], priority: 94 },
  { slug: "abu-dhabi", name: "Abu Dhabi", country: "UAE", region: "Middle East", logisticsHub: true, customsPort: true, majorPorts: ["Khalifa Port"], airports: ["AUH"], priority: 87 },
  { slug: "doha", name: "Doha", country: "Qatar", region: "Middle East", logisticsHub: true, customsPort: true, majorPorts: ["Hamad Port"], airports: ["DOH"], priority: 86 },
  { slug: "busan", name: "Busan", country: "South Korea", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Busan"], priority: 90 },
  { slug: "santos", name: "Santos", country: "Brazil", region: "South America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Santos"], priority: 89 },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug)
}

export function getAllCities(): CityData[] {
  return cities
}

export function getCustomsSystemsForCity(city: Pick<CityData, "country" | "region">): string[] {
  return (
    CUSTOMS_SYSTEMS_BY_COUNTRY[city.country] ??
    CUSTOMS_SYSTEMS_BY_REGION[city.region] ??
    ["ACE", "PLDA", "NCTS"]
  )
}
