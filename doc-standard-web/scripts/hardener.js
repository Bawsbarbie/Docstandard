const fs = require("fs")
const path = require("path")

const DATA_PATH = path.join(process.cwd(), "data", "content", "integration-details.json")

const TECH_MAP = {
  "cargowise-to-netsuite-data-bridge": [
    {
      anchor: "UniversalShipment XML",
      mapping: "Maps to Transaction.SalesOrder",
      logic: "Parses XML header for OrderDate and CustomerID; validates against NetSuite Entity list.",
    },
    {
      anchor: "InterimReceipt",
      mapping: "Maps to ItemReceipt.LineItem",
      logic: "Extracts received quantities and matches against open PO lines; flags over-receipts.",
    },
    {
      anchor: "VGM_Submission",
      mapping: "Maps to CustomRecord.VGM",
      logic: "Normalizes weight fields and verifies carrier reference IDs before posting.",
    },
    {
      anchor: "ARInvoice Mapping",
      mapping: "Maps to Transaction.Invoice",
      logic: "Validates invoice totals and currency codes; enforces GL segment mapping.",
    },
    {
      anchor: "SuiteTalk SOAP",
      mapping: "Maps to SOAP.RecordRef",
      logic: "Resolves internal IDs for Customer and Subsidiary; enforces role permissions.",
    },
    {
      anchor: "RESTlet JSON",
      mapping: "Maps to RESTlet.Payload",
      logic: "Transforms JSON keys to NetSuite field IDs; validates required fields.",
    },
    {
      anchor: "InternalID Mapping",
      mapping: "Maps to InternalID",
      logic: "Crosswalks external reference IDs to NetSuite internal IDs; de-duplicates records.",
    },
  ],
  "magaya-to-quickbooks-bridge": [
    {
      anchor: "Magaya XML",
      mapping: "Maps to Invoice.LineItem",
      logic: "Extracts charge codes and maps to QB Item Service list; splits tax lines automatically.",
    },
    {
      anchor: "WarehouseReceipt",
      mapping: "Maps to Bill.LineItem",
      logic: "Normalizes vendor IDs and receipt dates; validates SKU against QuickBooks items.",
    },
    {
      anchor: "CargoRelease",
      mapping: "Maps to SalesReceipt",
      logic: "Converts release charges into QB sales receipts; validates currency and customer.",
    },
    {
      anchor: "PackingList Mapping",
      mapping: "Maps to ItemReceipt",
      logic: "Aggregates quantities by SKU; enforces unit-of-measure consistency.",
    },
  ],
}

const stripTags = (value) => value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()

const extractAnchors = (html) => {
  if (!html) return []
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || []
  return rows
    .map((row) => {
      const cells = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []
      if (cells.length === 0) return ""
      return stripTags(cells[0])
    })
    .filter(Boolean)
}

const buildTable = (entry, rows) => {
  const header =
    "<table><thead><tr><th>SOURCE</th><th>SYSTEM TARGET</th><th>FIELD</th><th>ERP FIELD</th><th>NORMALIZATION LOGIC</th></tr></thead><tbody>"
  const body = rows
    .map((row) => {
      const source = row.source || entry.systemA || "Source System"
      const target = row.target || entry.systemB || "System Target"
      const field = row.field || "Source Field"
      const erpField = row.erpField || `Maps to ${entry.systemB || "ERP"} Record`
      const logic =
        row.logic ||
        `Normalizes ${field} values and validates against ${entry.systemB || "ERP"} master data.`
      return `<tr><td>${source}</td><td>${target}</td><td>${field}</td><td>${erpField}</td><td>${logic}</td></tr>`
    })
    .join("")
  return `${header}${body}</tbody></table>`
}

const buildRowsForEntry = (entry) => {
  const mapped = TECH_MAP[entry.slug]
  if (mapped && mapped.length > 0) {
    return mapped.map((row) => ({
      source: entry.systemA,
      target: entry.systemB,
      field: row.anchor,
      erpField: row.mapping,
      logic: row.logic,
    }))
  }

  const anchors = extractAnchors(entry.technicalData || "")
  if (anchors.length > 0) {
    return anchors.map((anchor) => ({
      source: entry.systemA,
      target: entry.systemB,
      field: anchor,
      erpField: `Maps to ${entry.systemB || "ERP"} Record`,
      logic: `Normalizes ${anchor} fields; validates required identifiers before import.`,
    }))
  }

  return [
    {
      source: entry.systemA,
      target: entry.systemB,
      field: `${entry.systemA || "Source"} Export`,
      erpField: `Maps to ${entry.systemB || "ERP"} Record`,
      logic: `Normalizes identifiers and validates required fields before ingestion.`,
    },
  ]
}

const run = () => {
  const raw = fs.readFileSync(DATA_PATH, "utf-8")
  const entries = JSON.parse(raw)

  const updated = entries.map((entry) => {
    if (!entry || typeof entry !== "object") return entry
    const rows = buildRowsForEntry(entry)
    return {
      ...entry,
      technicalData: buildTable(entry, rows),
    }
  })

  fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2) + "\n")
  console.log(`Updated ${updated.length} integration entries with technical mappings.`)
}

run()
