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

export const cities: CityData[] = [
  // Europe
  { slug: "antwerp", name: "Antwerp", country: "Belgium", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Antwerp"], priority: 95 },
  { slug: "hamburg", name: "Hamburg", country: "Germany", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Hamburg"], airports: ["Hamburg Airport"], priority: 95 },
  { slug: "london", name: "London", country: "United Kingdom", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of London"], airports: ["Heathrow"], priority: 94 },
  { slug: "rotterdam", name: "Rotterdam", country: "Netherlands", region: "Europe", logisticsHub: true, customsPort: true, majorPorts: ["Port of Rotterdam"], priority: 95 },
  
  // US - East Coast
  { slug: "new-york", name: "New York", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of New York/New Jersey"], airports: ["JFK", "Newark"], priority: 98 },
  { slug: "savannah", name: "Savannah", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Savannah"], priority: 90 },
  { slug: "charleston", name: "Charleston", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Charleston"], priority: 88 },
  { slug: "miami", name: "Miami", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port Miami"], airports: ["MIA"], priority: 92 },
  
  // US - Gulf
  { slug: "houston", name: "Houston", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Houston"], priority: 93 },
  
  // US - West Coast
  { slug: "los-angeles", name: "Los Angeles", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of LA", "Port of Long Beach"], airports: ["LAX"], priority: 98 },
  { slug: "long-beach", name: "Long Beach", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Long Beach"], priority: 93 },
  { slug: "oakland", name: "Oakland", country: "USA", region: "North America", logisticsHub: true, customsPort: true, majorPorts: ["Port of Oakland"], priority: 87 },
  
  // US - Midwest
  { slug: "chicago", name: "Chicago", country: "USA", region: "North America", logisticsHub: true, customsPort: false, airports: ["ORD"], priority: 94 },
  { slug: "memphis", name: "Memphis", country: "USA", region: "North America", logisticsHub: true, customsPort: false, priority: 85 },
  
  // Asia
  { slug: "singapore", name: "Singapore", country: "Singapore", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Singapore"], airports: ["Changi"], priority: 97 },
  { slug: "hong-kong", name: "Hong Kong", country: "Hong Kong", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Hong Kong"], airports: ["HKG"], priority: 95 },
  { slug: "shanghai", name: "Shanghai", country: "China", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Shanghai"], airports: ["PVG"], priority: 96 },
  { slug: "dubai", name: "Dubai", country: "UAE", region: "Middle East", logisticsHub: true, customsPort: true, majorPorts: ["Jebel Ali"], airports: ["DXB"], priority: 94 },
  { slug: "busan", name: "Busan", country: "South Korea", region: "Asia", logisticsHub: true, customsPort: true, majorPorts: ["Port of Busan"], priority: 90 },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug)
}

export function getAllCities(): CityData[] {
  return cities
}
