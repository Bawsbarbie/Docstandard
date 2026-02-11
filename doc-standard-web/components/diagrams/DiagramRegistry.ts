// components/diagrams/DiagramRegistry.ts
// Central registry for all diagram types and their configurations.

export type DiagramType =
  | "data-flow"
  | "port-map"
  | "timeline"
  | "checklist"
  | "pipeline"

export type VerticalColorScheme =
  | "finance"
  | "customs"
  | "compliance"
  | "invoice"
  | "shipping"
  | "logistics"

export interface DiagramConfig {
  type: DiagramType
  colorScheme: VerticalColorScheme
  width: number
  height: number
  data: Record<string, unknown>
}

export interface DiagramColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export const PageToDiagramMap: Record<string, DiagramConfig> = {
  "integration/cargowise-to-netsuite": {
    type: "data-flow",
    colorScheme: "finance",
    width: 800,
    height: 200,
    data: {
      source: { name: "CargoWise", icon: "cargowise" },
      target: { name: "NetSuite", icon: "netsuite" },
      transformation: "Data Bridge",
      fields: ["Shipments", "Invoices", "Charges"],
    },
  },
  "compliance/antwerp": {
    type: "port-map",
    colorScheme: "compliance",
    width: 600,
    height: 300,
    data: {
      city: "Antwerp",
      port: "Port of Antwerp-Bruges",
      documents: ["Customs Declaration", "EUR.1 Certificate", "Packing List"],
    },
  },
  "urgent-customs-processing": {
    type: "timeline",
    colorScheme: "customs",
    width: 700,
    height: 150,
    data: {
      sla: "24H",
      steps: ["Receive", "Extract", "Validate", "Deliver"],
      urgency: "emergency",
    },
  },
  logistics: {
    type: "pipeline",
    colorScheme: "logistics",
    width: 800,
    height: 120,
    data: {
      steps: ["Ingest", "Classify", "Extract", "Normalize", "Deliver"],
    },
  },
}

export const ColorPalettes: Record<VerticalColorScheme, DiagramColorPalette> = {
  finance: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    accent: "#1D4ED8",
    background: "#EFF6FF",
    text: "#1E3A5F",
  },
  customs: {
    primary: "#14B8A6",
    secondary: "#2DD4BF",
    accent: "#0F766E",
    background: "#F0FDFA",
    text: "#134E4A",
  },
  compliance: {
    primary: "#22C55E",
    secondary: "#4ADE80",
    accent: "#15803D",
    background: "#F0FDF4",
    text: "#14532D",
  },
  invoice: {
    primary: "#A855F7",
    secondary: "#C084FC",
    accent: "#7C3AED",
    background: "#FAF5FF",
    text: "#581C87",
  },
  shipping: {
    primary: "#F97316",
    secondary: "#FB923C",
    accent: "#EA580C",
    background: "#FFF7ED",
    text: "#7C2D12",
  },
  logistics: {
    primary: "#64748B",
    secondary: "#94A3B8",
    accent: "#475569",
    background: "#F8FAFC",
    text: "#334155",
  },
}

export type LayoutDirection = "horizontal" | "vertical" | "circular"

export const getRandomVariant = (baseConfig: DiagramConfig): DiagramConfig => {
  const layoutOptions: LayoutDirection[] = ["horizontal", "vertical"]

  return {
    ...baseConfig,
    data: {
      ...baseConfig.data,
      layout: layoutOptions[Math.floor(Math.random() * layoutOptions.length)],
      variant: Math.floor(Math.random() * 3),
    },
  }
}
