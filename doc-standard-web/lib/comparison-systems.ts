/**
 * DocStandard Comparison Systems Data
 * Contains metadata for all 50 logistics systems
 */

export interface SystemData {
  id: string
  name: string
  displayName: string
  category: SystemCategory
  description: string
  startingPrice: string
  targetMarket: string
  keyFeatures: string[]
  color: string
  bgColor: string
  advantages: string[]
  painPoints: string[]
}

export type SystemCategory = 
  | "TMS"
  | "Forwarder"
  | "WMS"
  | "Shipping"
  | "Visibility"
  | "Fleet"
  | "ERP"
  | "Accounting"
  | "Tools"

export const systems: SystemData[] = [
  // TMS Systems
  {
    id: "cargowise",
    name: "cargowise",
    displayName: "CargoWise",
    category: "TMS",
    description: "Enterprise freight forwarding and logistics platform by WiseTech Global",
    startingPrice: "$50K/year",
    targetMarket: "Enterprise ($50M+)",
    keyFeatures: ["eAdapter (XML)", "Global network", "Deep workflow automation", "Built-in compliance", "WisePartners"],
    color: "#4f46e5",
    bgColor: "indigo",
    advantages: ["Extensive global network", "Deep customization", "Built-in compliance for multi-country operations", "Strong for large forwarders"],
    painPoints: ["Complex implementation", "Expensive for SMBs", "Steep learning curve"]
  },
  {
    id: "magaya",
    name: "magaya",
    displayName: "Magaya",
    category: "TMS",
    description: "Freight forwarding and logistics software for SMBs",
    startingPrice: "$500/month",
    targetMarket: "SMB (<$50M)",
    keyFeatures: ["REST API", "Modern UI", "Mobile app", "Quick setup", "CRM integration"],
    color: "#059669",
    bgColor: "emerald",
    advantages: ["Fast implementation (2-4 weeks)", "Lower cost", "Modern, intuitive interface", "Strong mobile app"],
    painPoints: ["Limited for enterprise", "Smaller partner network", "Less customization depth"]
  },
  {
    id: "sap-tm",
    name: "sap-tm",
    displayName: "SAP TM",
    category: "TMS",
    description: "SAP Transportation Management for enterprise logistics",
    startingPrice: "$250K/year",
    targetMarket: "Large enterprises",
    keyFeatures: ["Native S/4HANA integration", "SAP AI Core", "Advanced optimization", "Global trade compliance"],
    color: "#4f46e5",
    bgColor: "indigo",
    advantages: ["Deep SAP ERP integration", "Strong in manufacturing", "Advanced AI/ML capabilities"],
    painPoints: ["12-18 month implementation", "Requires SAP ecosystem", "High cost"]
  },
  {
    id: "oracle-otm",
    name: "oracle-otm",
    displayName: "Oracle OTM",
    category: "TMS",
    description: "Oracle Transportation Management for global logistics",
    startingPrice: "$200K/year",
    targetMarket: "Large enterprises",
    keyFeatures: ["Oracle Cloud AI", "Multi-modal logistics", "Oracle GTM", "Global logistics network"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["Strong multi-modal support", "Oracle Cloud integration", "Excellent for retail/distribution"],
    painPoints: ["12-24 month implementation", "Oracle ecosystem lock-in", "Complex customization"]
  },
  {
    id: "descartes",
    name: "descartes",
    displayName: "Descartes",
    category: "TMS",
    description: "Global logistics and supply chain technology",
    startingPrice: "Custom pricing",
    targetMarket: "Mid to enterprise",
    keyFeatures: ["Global trade compliance", "Customs management", "Multi-modal tracking", "Security screening"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Strong compliance tools", "Global trade expertise", "Broad carrier network"],
    painPoints: ["Complex interface", "Multiple modules to configure", "Integration complexity"]
  },
  {
    id: "mercurygate",
    name: "mercurygate",
    displayName: "MercuryGate",
    category: "TMS",
    description: "Transportation management system for shippers and 3PLs",
    startingPrice: "Custom pricing",
    targetMarket: "Mid to enterprise",
    keyFeatures: ["Carrier optimization", "Freight audit", "Multi-modal", "Control tower"],
    color: "#0ea5e9",
    bgColor: "sky",
    advantages: ["Strong optimization engine", "Good for 3PLs", "Flexible deployment"],
    painPoints: ["UI complexity", "Training required", "Integration setup time"]
  },
  {
    id: "blueyonder",
    name: "blueyonder",
    displayName: "Blue Yonder",
    category: "TMS",
    description: "AI-driven supply chain and logistics platform",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise",
    keyFeatures: ["AI/ML optimization", "End-to-end visibility", "Demand forecasting", "Autonomous planning"],
    color: "#8b5cf6",
    bgColor: "violet",
    advantages: ["Advanced AI capabilities", "Strong forecasting", "Unified platform"],
    painPoints: ["Complex implementation", "High learning curve", "Enterprise focus"]
  },
  {
    id: "manhattan-associates",
    name: "manhattan-associates",
    displayName: "Manhattan Associates",
    category: "TMS",
    description: "Supply chain and omnichannel commerce solutions",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise",
    keyFeatures: ["Omnichannel fulfillment", "Warehouse integration", "Labor management", "Transportation"],
    color: "#6366f1",
    bgColor: "indigo",
    advantages: ["Strong WMS integration", "Omnichannel expertise", "Retail focus"],
    painPoints: ["Enterprise pricing", "Complex deployment", "Requires dedicated team"]
  },
  {
    id: "freightpop",
    name: "freightpop",
    displayName: "FreightPOP",
    category: "TMS",
    description: "Cloud-based transportation management for mid-market",
    startingPrice: "$500/month",
    targetMarket: "Mid-market",
    keyFeatures: ["Cloud-native", "Quick setup", "Carrier connectivity", "ERP integrations"],
    color: "#06b6d4",
    bgColor: "cyan",
    advantages: ["Fast deployment", "Modern interface", "Good value"],
    painPoints: ["Limited advanced features", "Smaller carrier network"]
  },
  {
    id: "kuebix",
    name: "kuebix",
    displayName: "Kuebix",
    category: "TMS",
    description: "Cloud TMS platform by Trimble (now part of Trimble)",
    startingPrice: "Freemium available",
    targetMarket: "SMB to mid-market",
    keyFeatures: ["Cloud-based", "Community network", "Freight intelligence", "ERP connectivity"],
    color: "#14b8a6",
    bgColor: "teal",
    advantages: ["Free tier available", "Easy onboarding", "Strong community"],
    painPoints: ["Limited for complex operations", "Trimble integration changes"]
  },
  {
    id: "rose-rocket",
    name: "rose-rocket",
    displayName: "Rose Rocket",
    category: "TMS",
    description: "Modern TMS for trucking and freight brokers",
    startingPrice: "$300/month",
    targetMarket: "SMB trucking/brokerage",
    keyFeatures: ["Modern UI", "Real-time visibility", "Driver app", "Quick setup"],
    color: "#f97316",
    bgColor: "orange",
    advantages: ["Excellent UX", "Fast implementation", "Driver-friendly mobile app"],
    painPoints: ["Trucking focused", "Limited international features"]
  },
  {
    id: "alpega",
    name: "alpega",
    displayName: "Alpega",
    category: "TMS",
    description: "Cloud-native TMS and freight exchange platform",
    startingPrice: "Custom pricing",
    targetMarket: "Mid to enterprise",
    keyFeatures: ["Cloud-native", "Freight exchange", "Real-time tendering", "Carrier network"],
    color: "#10b981",
    bgColor: "emerald",
    advantages: ["Strong European presence", "Real-time tendering", "Good carrier network"],
    painPoints: ["Europe-centric", "Learning curve"]
  },
  {
    id: "transporeon",
    name: "transporeon",
    displayName: "Transporeon",
    category: "TMS",
    description: "Cloud logistics platform for shippers and carriers",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise",
    keyFeatures: ["Time slot management", "Carrier collaboration", "Real-time visibility", "Yard management"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Strong yard management", "Time slot optimization", "Large carrier network"],
    painPoints: ["Complex for SMBs", "Europe focused"]
  },
  // Forwarder/Marketplace
  {
    id: "flexport",
    name: "flexport",
    displayName: "Flexport",
    category: "Forwarder",
    description: "Digital freight forwarder with end-to-end service",
    startingPrice: "Per-shipment pricing",
    targetMarket: "Regular shippers",
    keyFeatures: ["End-to-end forwarding", "Real-time tracking", "Customs included", "API access"],
    color: "#ec4899",
    bgColor: "pink",
    advantages: ["All-in service", "Dedicated support teams", "Predictable pricing"],
    painPoints: ["Data export limitations", "Platform lock-in"]
  },
  {
    id: "freightos",
    name: "freightos",
    displayName: "Freightos",
    category: "Forwarder",
    description: "Digital freight marketplace for rate comparison",
    startingPrice: "Free to compare",
    targetMarket: "Rate shoppers",
    keyFeatures: ["Rate marketplace", "Carrier comparison", "API connectivity", "Spot market focus"],
    color: "#14b8a6",
    bgColor: "teal",
    advantages: ["Price transparency", "Multiple carrier options", "Self-service booking"],
    painPoints: ["Carrier-dependent visibility", "Invoice complexity"]
  },
  // WMS
  {
    id: "3pl-central",
    name: "3pl-central",
    displayName: "3PL Central",
    category: "WMS",
    description: "Cloud WMS designed for third-party logistics providers",
    startingPrice: "$500/month",
    targetMarket: "3PLs and warehouses",
    keyFeatures: ["Multi-client support", "Billing automation", "E-commerce integrations", "Mobile scanning"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["Built for 3PLs", "Strong billing features", "E-commerce ready"],
    painPoints: ["3PL focused", "Limited manufacturing features"]
  },
  // Shipping
  {
    id: "shipstation",
    name: "shipstation",
    displayName: "ShipStation",
    category: "Shipping",
    description: "E-commerce shipping and order management platform",
    startingPrice: "$29/month",
    targetMarket: "E-commerce SMB",
    keyFeatures: ["Multi-carrier shipping", "E-commerce integrations", "Batch printing", "Branded labels"],
    color: "#8b5cf6",
    bgColor: "violet",
    advantages: ["E-commerce focused", "Easy to use", "Great integrations"],
    painPoints: ["Not for freight", "Limited B2B features"]
  },
  // Visibility
  {
    id: "project44",
    name: "project44",
    displayName: "project44",
    category: "Visibility",
    description: "Advanced supply chain visibility platform",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise",
    keyFeatures: ["Real-time visibility", "Predictive ETAs", "API-first", "Carrier network"],
    color: "#ef4444",
    bgColor: "red",
    advantages: ["Best-in-class visibility", "Strong API", "Predictive capabilities"],
    painPoints: ["Enterprise pricing", "Implementation complexity"]
  },
  {
    id: "fourkites",
    name: "fourkites",
    displayName: "FourKites",
    category: "Visibility",
    description: "Real-time supply chain visibility platform",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise",
    keyFeatures: ["Dynamic yard management", "Real-time tracking", "Predictive ETAs", "Sustainability tracking"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["Strong yard management", "Sustainability features", "Predictive ETAs"],
    painPoints: ["Enterprise focused", "Integration setup time"]
  },
  // Fleet
  {
    id: "samsara",
    name: "samsara",
    displayName: "Samsara",
    category: "Fleet",
    description: "Connected operations platform for fleet and equipment",
    startingPrice: "$33/vehicle/month",
    targetMarket: "Fleet operators",
    keyFeatures: ["GPS tracking", "ELD compliance", "Dash cams", "Asset tracking"],
    color: "#06b6d4",
    bgColor: "cyan",
    advantages: ["Easy setup", "Modern interface", "All-in-one platform"],
    painPoints: ["Per-vehicle pricing adds up", "Limited TMS features"]
  },
  {
    id: "motive",
    name: "motive",
    displayName: "Motive",
    category: "Fleet",
    description: "Fleet management and safety platform (formerly KeepTruckin)",
    startingPrice: "$25/vehicle/month",
    targetMarket: "Fleet operators",
    keyFeatures: ["AI dash cams", "ELD compliance", "Fleet tracking", "Maintenance"],
    color: "#f97316",
    bgColor: "orange",
    advantages: ["AI-powered safety", "Competitive pricing", "Strong ELD"],
    painPoints: ["Focused on trucking", "Limited freight features"]
  },
  {
    id: "geotab",
    name: "geotab",
    displayName: "Geotab",
    category: "Fleet",
    description: "Telematics and fleet management platform",
    startingPrice: "$39/vehicle/month",
    targetMarket: "Enterprise fleets",
    keyFeatures: ["Open platform", "Advanced analytics", "Custom reporting", "Extensive integrations"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Open platform", "Best-in-class analytics", "Highly customizable"],
    painPoints: ["Complex for small fleets", "Requires technical setup"]
  },
  {
    id: "verizon-connect",
    name: "verizon-connect",
    displayName: "Verizon Connect",
    category: "Fleet",
    description: "Fleet tracking and management by Verizon",
    startingPrice: "$35/vehicle/month",
    targetMarket: "Mid to enterprise fleets",
    keyFeatures: ["Reliable network", "Field service tools", "Route optimization", "Compliance"],
    color: "#ef4444",
    bgColor: "red",
    advantages: ["Reliable connectivity", "Field service features", "Strong support"],
    painPoints: ["Higher cost", "Contract requirements"]
  },
  {
    id: "trimble",
    name: "trimble",
    displayName: "Trimble",
    category: "Fleet",
    description: "Fleet and transportation management solutions",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise transportation",
    keyFeatures: ["Routing optimization", "Fleet maintenance", "Compliance", "Navigation"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["Industry veteran", "Navigation expertise", "Strong routing"],
    painPoints: ["Multiple products", "Complex ecosystem"]
  },
  {
    id: "omnitracs",
    name: "omnitracs",
    displayName: "Omnitracs",
    category: "Fleet",
    description: "Fleet management and compliance platform",
    startingPrice: "Custom pricing",
    targetMarket: "Enterprise fleets",
    keyFeatures: ["Compliance management", "Routing", "Safety", "Analytics"],
    color: "#6366f1",
    bgColor: "indigo",
    advantages: ["Compliance expertise", "Safety features", "Enterprise scale"],
    painPoints: ["Legacy interface", "Implementation time"]
  },
  // ERP
  {
    id: "netsuite",
    name: "netsuite",
    displayName: "NetSuite",
    category: "ERP",
    description: "Cloud ERP for fast-growing businesses",
    startingPrice: "$999/month",
    targetMarket: "Mid-market ($10M-$500M)",
    keyFeatures: ["100% cloud", "Multi-subsidiary", "SuiteScript customization", "SuiteAnalytics"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["True cloud", "Fast implementation", "Strong for logistics", "Multi-entity support"],
    painPoints: ["Oracle ownership concerns", "Customization complexity"]
  },
  {
    id: "sap-s4hana",
    name: "sap-s4hana",
    displayName: "SAP S/4HANA",
    category: "ERP",
    description: "SAP's next-generation intelligent ERP",
    startingPrice: "Custom (enterprise)",
    targetMarket: "Large enterprises",
    keyFeatures: ["In-memory database", "AI/ML embedded", "Industry solutions", "SAP ecosystem"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Enterprise power", "Industry depth", "Global compliance"],
    painPoints: ["Expensive", "Complex implementation", "Requires SAP expertise"]
  },
  {
    id: "oracle-erp-cloud",
    name: "oracle-erp-cloud",
    displayName: "Oracle ERP Cloud",
    category: "ERP",
    description: "Oracle's cloud ERP for large organizations",
    startingPrice: "Custom (enterprise)",
    targetMarket: "Large enterprises",
    keyFeatures: ["Oracle Cloud infrastructure", "AI/ML features", "Financials", "Risk management"],
    color: "#ef4444",
    bgColor: "red",
    advantages: ["Enterprise scale", "Oracle ecosystem", "Advanced analytics"],
    painPoints: ["High cost", "Complex deployment", "Oracle lock-in"]
  },
  {
    id: "dynamics-365",
    name: "dynamics-365",
    displayName: "Dynamics 365",
    category: "ERP",
    description: "Microsoft's cloud ERP and CRM suite",
    startingPrice: "$210/user/month",
    targetMarket: "Mid to enterprise",
    keyFeatures: ["Microsoft integration", "Power Platform", "AI capabilities", "Modular apps"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Microsoft ecosystem", "Power BI integration", "Flexible deployment"],
    painPoints: ["Complex licensing", "Implementation time", "Requires config for logistics"]
  },
  {
    id: "dynamics-bc",
    name: "dynamics-bc",
    displayName: "Dynamics Business Central",
    category: "ERP",
    description: "Microsoft's ERP for SMB to mid-market",
    startingPrice: "$70/user/month",
    targetMarket: "SMB to mid-market",
    keyFeatures: ["Microsoft integration", "Cloud + on-prem", "Power Platform", "Rapid deployment"],
    color: "#0ea5e9",
    bgColor: "sky",
    advantages: ["Affordable entry", "Microsoft stack", "Easy upgrade path"],
    painPoints: ["SMB focused", "Limited for complex operations"]
  },
  {
    id: "acumatica",
    name: "acumatica",
    displayName: "Acumatica",
    category: "ERP",
    description: "Cloud ERP with consumption-based pricing",
    startingPrice: "$1,800/month",
    targetMarket: "Mid-market",
    keyFeatures: ["Consumption pricing", "Unlimited users", "Industry editions", "Cloud-native"],
    color: "#f97316",
    bgColor: "orange",
    advantages: ["Unlimited users", "Transparent pricing", "Modern platform"],
    painPoints: ["Smaller ecosystem", "Fewer logistics integrations"]
  },
  {
    id: "epicor",
    name: "epicor",
    displayName: "Epicor",
    category: "ERP",
    description: "Industry-specific ERP for manufacturing and distribution",
    startingPrice: "Custom pricing",
    targetMarket: "Mid-market manufacturing",
    keyFeatures: ["Industry-specific", "Manufacturing focus", "Supply chain", "On-prem + cloud"],
    color: "#ef4444",
    bgColor: "red",
    advantages: ["Industry depth", "Manufacturing expertise", "Flexible deployment"],
    painPoints: ["Complex implementation", "Customization required"]
  },
  {
    id: "infor-cloudsuite",
    name: "infor-cloudsuite",
    displayName: "Infor CloudSuite",
    category: "ERP",
    description: "Industry-specific cloud ERP by Infor",
    startingPrice: "Custom pricing",
    targetMarket: "Mid to enterprise",
    keyFeatures: ["Industry micro-verticals", "Modern UX", "Cloud-native", "AI embedded"],
    color: "#8b5cf6",
    bgColor: "violet",
    advantages: ["Industry specialization", "Modern interface", "Strong analytics"],
    painPoints: ["Complex ecosystem", "Koch ownership concerns"]
  },
  {
    id: "workday",
    name: "workday",
    displayName: "Workday",
    category: "ERP",
    description: "Finance and HR cloud platform",
    startingPrice: "Custom (enterprise)",
    targetMarket: "Large enterprises",
    keyFeatures: ["Finance + HR unified", "Modern UX", "Real-time analytics", "Cloud-native"],
    color: "#f97316",
    bgColor: "orange",
    advantages: ["Best-in-class UX", "Finance/HR integration", "Real-time reporting"],
    painPoints: ["Limited logistics features", "Enterprise pricing"]
  },
  {
    id: "financialforce",
    name: "financialforce",
    displayName: "FinancialForce",
    category: "ERP",
    description: "ERP built on Salesforce platform",
    startingPrice: "Custom pricing",
    targetMarket: "Services businesses",
    keyFeatures: ["Salesforce native", "Services automation", "PSA + ERP", "Customer-centric"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["Salesforce integration", "Services focus", "360 customer view"],
    painPoints: ["Services focused", "Limited for freight"]
  },
  // Accounting
  {
    id: "quickbooks-online",
    name: "quickbooks-online",
    displayName: "QuickBooks Online",
    category: "Accounting",
    description: "Cloud accounting for small businesses",
    startingPrice: "$30/month",
    targetMarket: "SMB <100 employees",
    keyFeatures: ["Easy setup", "700+ apps", "Bank feeds", "Mobile app"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["Very easy to use", "Great app ecosystem", "Affordable"],
    painPoints: ["Limited for complex operations", "Not for multi-entity"]
  },
  {
    id: "quickbooks-desktop",
    name: "quickbooks-desktop",
    displayName: "QuickBooks Desktop",
    category: "Accounting",
    description: "On-premise accounting software",
    startingPrice: "$349/year",
    targetMarket: "SMB with on-prem needs",
    keyFeatures: ["One-time purchase option", "Advanced inventory", "Industry editions", "Local data"],
    color: "#10b981",
    bgColor: "emerald",
    advantages: ["One-time cost option", "Advanced features", "Local data control"],
    painPoints: ["Desktop limitations", "Limited cloud features"]
  },
  {
    id: "sage-intacct",
    name: "sage-intacct",
    displayName: "Sage Intacct",
    category: "Accounting",
    description: "Cloud financial management for growing businesses",
    startingPrice: "$400/month",
    targetMarket: "Mid-market 100-500",
    keyFeatures: ["Multi-entity", "Dimensional reporting", "Revenue recognition", "API-first"],
    color: "#8b5cf6",
    bgColor: "violet",
    advantages: ["Strong reporting", "Multi-entity support", "Modern platform"],
    painPoints: ["Higher cost", "Learning curve"]
  },
  {
    id: "sage-300",
    name: "sage-300",
    displayName: "Sage 300",
    category: "Accounting",
    description: "ERP and accounting for SMB",
    startingPrice: "$200/user/month",
    targetMarket: "SMB to mid-market",
    keyFeatures: ["Multi-currency", "Multi-company", "Inventory", "On-prem + cloud"],
    color: "#6366f1",
    bgColor: "indigo",
    advantages: ["Multi-company", "Proven platform", "Flexible deployment"],
    painPoints: ["Legacy interface", "Implementation time"]
  },
  {
    id: "xero",
    name: "xero",
    displayName: "Xero",
    category: "Accounting",
    description: "Beautiful cloud accounting software",
    startingPrice: "$15/month",
    targetMarket: "Small business",
    keyFeatures: ["Beautiful UI", "Unlimited users", "800+ apps", "Global coverage"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Best-in-class UX", "Unlimited users", "Great integrations"],
    painPoints: ["Limited US payroll", "Fewer logistics apps"]
  },
  {
    id: "zoho-books",
    name: "zoho-books",
    displayName: "Zoho Books",
    category: "Accounting",
    description: "Smart accounting for growing businesses",
    startingPrice: "$15/month",
    targetMarket: "SMB",
    keyFeatures: ["Zoho ecosystem", "Automation", "Multi-currency", "Client portal"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["Zoho integration", "Affordable", "Good automation"],
    painPoints: ["Smaller ecosystem", "US payroll limitations"]
  },
  {
    id: "freshbooks",
    name: "freshbooks",
    displayName: "FreshBooks",
    category: "Accounting",
    description: "Accounting for service-based businesses",
    startingPrice: "$17/month",
    targetMarket: "Service SMBs",
    keyFeatures: ["Time tracking", "Project accounting", "Invoicing", "Client management"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["Service focus", "Time tracking", "Easy invoicing"],
    painPoints: ["Not for inventory", "Service focused"]
  },
  {
    id: "wave",
    name: "wave",
    displayName: "Wave",
    category: "Accounting",
    description: "Free accounting software for small businesses",
    startingPrice: "Free",
    targetMarket: "Micro businesses",
    keyFeatures: ["Free accounting", "Invoicing", "Receipt scanning", "Bank connections"],
    color: "#06b6d4",
    bgColor: "cyan",
    advantages: ["Free tier", "Simple to use", "Good for startups"],
    painPoints: ["Limited features", "No inventory", "Payroll paid"]
  },
  // Tools/Methods
  {
    id: "excel",
    name: "excel",
    displayName: "Excel",
    category: "Tools",
    description: "Spreadsheet software for data management",
    startingPrice: "$6.99/month (Microsoft 365)",
    targetMarket: "All sizes",
    keyFeatures: ["Flexible", "Universal format", "Pivot tables", "Macros"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["Universal", "Flexible", "Low cost"],
    painPoints: ["Error-prone", "No integration", "Version control issues"]
  },
  {
    id: "edi",
    name: "edi",
    displayName: "EDI",
    category: "Tools",
    description: "Electronic Data Interchange for B2B communication",
    startingPrice: "Varies by provider",
    targetMarket: "Enterprise trading partners",
    keyFeatures: ["Standardized formats", "B2B automation", "Transaction sets", "VAN networks"],
    color: "#6366f1",
    bgColor: "indigo",
    advantages: ["Industry standard", "Reliable", "Widely supported"],
    painPoints: ["Complex setup", "Legacy format", "High cost"]
  },
  {
    id: "api-integration",
    name: "api-integration",
    displayName: "API Integration",
    category: "Tools",
    description: "Modern API-based system connections",
    startingPrice: "Development cost varies",
    targetMarket: "Tech-savvy organizations",
    keyFeatures: ["Real-time", "Flexible", "Modern protocols", "JSON/XML"],
    color: "#3b82f6",
    bgColor: "blue",
    advantages: ["Real-time data", "Flexible", "Modern"],
    painPoints: ["Requires development", "Maintenance overhead", "API differences"]
  },
  {
    id: "manual-processing",
    name: "manual-processing",
    displayName: "Manual Processing",
    category: "Tools",
    description: "Human data entry and document handling",
    startingPrice: "$25-35/hour labor",
    targetMarket: "Low volume operations",
    keyFeatures: ["Human judgment", "No setup", "Flexible", "Any format"],
    color: "#ef4444",
    bgColor: "red",
    advantages: ["Handles any format", "Human judgment", "No upfront cost"],
    painPoints: ["Error-prone (15-35%)", "Slow", "Expensive at scale"]
  },
  {
    id: "automated-extraction",
    name: "automated-extraction",
    displayName: "Automated Extraction",
    category: "Tools",
    description: "AI-powered document data extraction",
    startingPrice: "$0.15-0.50/document",
    targetMarket: "All sizes with document volume",
    keyFeatures: ["AI/ML powered", "High accuracy", "Fast processing", "Scalable"],
    color: "#22c55e",
    bgColor: "green",
    advantages: ["99.5% accuracy", "15 sec/document", "Scales instantly"],
    painPoints: ["Setup required", "AI training", "Exception handling"]
  },
  {
    id: "in-house-team",
    name: "in-house-team",
    displayName: "In-House Team",
    category: "Tools",
    description: "Internal staff for document processing",
    startingPrice: "$45-65K/year per person",
    targetMarket: "Organizations with steady volume",
    keyFeatures: ["Direct control", "Company knowledge", "Immediate availability", "Customizable"],
    color: "#f59e0b",
    bgColor: "amber",
    advantages: ["Direct oversight", "Company knowledge", "Cultural fit"],
    painPoints: ["Fixed costs", "Turnover risk", "Scaling challenges"]
  },
  {
    id: "outsourced-processing",
    name: "outsourced-processing",
    displayName: "Outsourced Processing",
    category: "Tools",
    description: "Third-party document processing services",
    startingPrice: "$2-5/document",
    targetMarket: "Variable volume operations",
    keyFeatures: ["Variable cost", "No hiring", "Scalable", "24/7 availability"],
    color: "#8b5cf6",
    bgColor: "violet",
    advantages: ["Variable costs", "No HR overhead", "Global coverage"],
    painPoints: ["Quality control", "Data security", "Communication delays"]
  }
]

// Helper function to get system by ID
export function getSystemById(id: string): SystemData | undefined {
  return systems.find(s => s.id === id)
}

// Helper function to generate comparison slug
export function generateComparisonSlug(systemA: string, systemB: string): string {
  return `${systemA}-vs-${systemB}`
}

// Generate all unique comparison pairs
export function generateAllComparisonPairs(): Array<[string, string]> {
  const pairs: Array<[string, string]> = []
  for (let i = 0; i < systems.length; i++) {
    for (let j = i + 1; j < systems.length; j++) {
      pairs.push([systems[i].id, systems[j].id])
    }
  }
  return pairs
}

// Total number of comparisons (should be 1,225 for 50 systems)
export const TOTAL_COMPARISONS = (50 * 49) / 2
