// components/diagrams/SVGDiagramGenerator.tsx
// Server-side SVG generation for zero-client-js diagrams.

import { ColorPalettes, type DiagramColorPalette, type DiagramConfig } from "./DiagramRegistry"

interface SVGDiagramProps {
  config: DiagramConfig
  className?: string
}

const URGENCY_COLORS: Record<string, string> = {
  emergency: "#EF4444",
  urgent: "#F97316",
  "same-day": "#22C55E",
}

function escapeSvgText(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function safeArray(values: unknown, fallback: string[]): string[] {
  if (!Array.isArray(values)) {
    return fallback
  }

  return values.filter((value): value is string => typeof value === "string")
}

function safeRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {}
}

function gradientAndShadowDefs(idPrefix: string, colors: DiagramColorPalette): string {
  return `
    <defs>
      <linearGradient id="${idPrefix}Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:0.35" />
        <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.65" />
      </linearGradient>
      <filter id="${idPrefix}Shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18"/>
      </filter>
    </defs>
  `
}

export function generateSVGDiagram(config: DiagramConfig): string {
  const { type, colorScheme, width, height, data } = config
  const colors = ColorPalettes[colorScheme]

  switch (type) {
    case "data-flow":
      return generateDataFlowSVG(width, height, colors, data)
    case "port-map":
      return generatePortMapSVG(width, height, colors, data)
    case "timeline":
      return generateTimelineSVG(width, height, colors, data)
    case "checklist":
      return generateChecklistSVG(width, height, colors, data)
    case "pipeline":
      return generatePipelineSVG(width, height, colors, data)
    default:
      return generatePlaceholderSVG(width, height, colors)
  }
}

function generateDataFlowSVG(
  width: number,
  height: number,
  colors: DiagramColorPalette,
  data: Record<string, unknown>
): string {
  const source = safeRecord(data.source)
  const target = safeRecord(data.target)
  const fields = safeArray(data.fields, [])
  const transformation = escapeSvgText(data.transformation ?? "Data Bridge")
  const boxWidth = 168
  const boxHeight = 80
  const arrowLength = Math.max(70, Math.floor(width * 0.12))

  const fieldPills = fields.slice(0, 3).map((field, index) => ({
    x: width / 2 - 80 + index * 56,
    y: height - 36,
    text: escapeSvgText(field),
  }))

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    ${gradientAndShadowDefs("df", colors)}

    <rect width="${width}" height="${height}" fill="${colors.background}" rx="12" />

    <g transform="translate(40, ${height / 2 - boxHeight / 2})">
      <rect width="${boxWidth}" height="${boxHeight}" fill="url(#dfGrad)"
            stroke="${colors.primary}" stroke-width="2" rx="10" filter="url(#dfShadow)" />
      <text x="${boxWidth / 2}" y="${boxHeight / 2 - 5}" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="${colors.text}">
        ${escapeSvgText(source.name ?? "Source System")}
      </text>
      <text x="${boxWidth / 2}" y="${boxHeight / 2 + 16}" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="11" fill="${colors.accent}">Input</text>
    </g>

    <g transform="translate(${40 + boxWidth + 18}, ${height / 2})">
      <rect x="0" y="-2" width="${arrowLength}" height="4" fill="${colors.primary}" />
      <polygon points="${arrowLength},-8 ${arrowLength},8 ${arrowLength + 12},0" fill="${colors.primary}" />
      <text x="${arrowLength / 2}" y="-12" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="10" fill="${colors.text}">${transformation}</text>
    </g>

    <g transform="translate(${width - 40 - boxWidth}, ${height / 2 - boxHeight / 2})">
      <rect width="${boxWidth}" height="${boxHeight}" fill="url(#dfGrad)"
            stroke="${colors.accent}" stroke-width="2" rx="10" filter="url(#dfShadow)" />
      <text x="${boxWidth / 2}" y="${boxHeight / 2 - 5}" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="${colors.text}">
        ${escapeSvgText(target.name ?? "Target System")}
      </text>
      <text x="${boxWidth / 2}" y="${boxHeight / 2 + 16}" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="11" fill="${colors.accent}">Output</text>
    </g>

    ${fieldPills
      .map(
        (pill) => `
      <rect x="${pill.x}" y="${pill.y}" width="52" height="22" fill="${colors.secondary}" opacity="0.22" rx="11" />
      <text x="${pill.x + 26}" y="${pill.y + 15}" text-anchor="middle"
            font-family="system-ui, sans-serif" font-size="9" fill="${colors.text}">${pill.text}</text>
    `
      )
      .join("")}
  </svg>`
}

function generatePortMapSVG(
  width: number,
  height: number,
  colors: DiagramColorPalette,
  data: Record<string, unknown>
): string {
  const documents = safeArray(data.documents, ["Bill of Lading", "Packing List", "Commercial Invoice"])
  const city = escapeSvgText(data.city ?? "Port City")
  const port = escapeSvgText(data.port ?? "Port Operations")

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    ${gradientAndShadowDefs("pm", colors)}

    <rect width="${width}" height="${height}" fill="url(#pmGrad)" rx="12" />

    <g transform="translate(${width / 2 - 36}, 38)">
      <rect x="8" y="20" width="56" height="34" fill="${colors.primary}" rx="5" filter="url(#pmShadow)" />
      <rect x="2" y="14" width="10" height="40" fill="${colors.accent}" rx="2" />
      <rect x="60" y="14" width="10" height="40" fill="${colors.accent}" rx="2" />
      <rect x="22" y="3" width="28" height="18" fill="${colors.secondary}" rx="3" />
      <text x="36" y="72" text-anchor="middle" font-family="system-ui, sans-serif"
            font-size="11" font-weight="600" fill="${colors.text}">${city}</text>
    </g>

    ${documents
      .slice(0, 4)
      .map((doc, index) => {
        const x = 50 + index * 128
        const shortLabel = escapeSvgText(doc.length > 14 ? `${doc.slice(0, 12)}...` : doc)
        return `
          <g transform="translate(${x}, 152)">
            <rect x="0" y="0" width="50" height="60" fill="white" stroke="${colors.primary}"
                  stroke-width="1.5" rx="4" filter="url(#pmShadow)" />
            <line x1="9" y1="14" x2="41" y2="14" stroke="${colors.secondary}" stroke-width="2" />
            <line x1="9" y1="24" x2="36" y2="24" stroke="${colors.secondary}" stroke-width="1.5" />
            <line x1="9" y1="34" x2="31" y2="34" stroke="${colors.secondary}" stroke-width="1.5" />
            <text x="25" y="78" text-anchor="middle" font-family="system-ui, sans-serif"
                  font-size="8" fill="${colors.text}">${shortLabel}</text>
          </g>
        `
      })
      .join("")}

    <text x="${width / 2}" y="${height - 16}" text-anchor="middle"
          font-family="system-ui, sans-serif" font-size="11" fill="${colors.text}">${port}</text>
  </svg>`
}

function generateTimelineSVG(
  width: number,
  height: number,
  colors: DiagramColorPalette,
  data: Record<string, unknown>
): string {
  const sla = escapeSvgText(data.sla ?? "24H")
  const urgency = typeof data.urgency === "string" ? data.urgency : "urgent"
  const steps = safeArray(data.steps, ["Receive", "Extract", "Validate", "Deliver"])
  const stepWidth = (width - 100) / Math.max(steps.length, 1)

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    ${gradientAndShadowDefs("tl", colors)}

    <rect width="${width}" height="${height}" fill="url(#tlGrad)" rx="12" />

    <g transform="translate(${width - 74}, 14)">
      <rect width="58" height="24" fill="${URGENCY_COLORS[urgency] ?? colors.accent}" rx="12" filter="url(#tlShadow)" />
      <text x="29" y="17" text-anchor="middle" font-family="system-ui, sans-serif"
            font-size="11" font-weight="700" fill="white">${sla}</text>
    </g>

    <line x1="50" y1="${height / 2}" x2="${width - 50}" y2="${height / 2}"
          stroke="${colors.secondary}" stroke-width="3" stroke-linecap="round" />

    ${steps
      .map((step, index) => {
        const x = 50 + index * stepWidth + stepWidth / 2
        const isLast = index === steps.length - 1
        return `
          <g transform="translate(${x}, ${height / 2})">
            <circle r="13" fill="${isLast ? colors.accent : colors.primary}" filter="url(#tlShadow)" />
            <text x="0" y="-21" text-anchor="middle" font-family="system-ui, sans-serif"
                  font-size="10" font-weight="500" fill="${colors.text}">${escapeSvgText(step)}</text>
            <text x="0" y="4" text-anchor="middle" font-family="system-ui, sans-serif"
                  font-size="10" font-weight="700" fill="white">${index + 1}</text>
          </g>
        `
      })
      .join("")}
  </svg>`
}

function generateChecklistSVG(
  width: number,
  height: number,
  colors: DiagramColorPalette,
  data: Record<string, unknown>
): string {
  const steps = safeArray(data.steps, ["Upload", "Extract", "Validate", "Deliver"])
  const stepHeight = 38
  const startY = 28

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    ${gradientAndShadowDefs("cl", colors)}

    <rect width="${width}" height="${height}" fill="url(#clGrad)" rx="12" />

    ${steps
      .slice(0, 6)
      .map((step, index) => {
        const y = startY + index * stepHeight
        const isComplete = index < steps.length - 1

        return `
          <g transform="translate(28, ${y})">
            <circle cx="12" cy="12" r="10" fill="${isComplete ? colors.primary : "white"}"
                    stroke="${colors.primary}" stroke-width="2" filter="url(#clShadow)" />
            ${
              isComplete
                ? '<path d="M7 12 L10 15 L17 8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />'
                : `<circle cx="12" cy="12" r="3" fill="${colors.primary}" />`
            }
            ${
              index < steps.length - 1
                ? `<line x1="12" y1="22" x2="12" y2="${stepHeight - 5}" stroke="${colors.secondary}" stroke-width="2" stroke-dasharray="4" />`
                : ""
            }
            <text x="36" y="17" font-family="system-ui, sans-serif" font-size="12" fill="${colors.text}">
              ${escapeSvgText(step)}
            </text>
          </g>
        `
      })
      .join("")}
  </svg>`
}

function generatePipelineSVG(
  width: number,
  height: number,
  colors: DiagramColorPalette,
  data: Record<string, unknown>
): string {
  const steps = safeArray(data.steps, ["Ingest", "Classify", "Extract", "Normalize", "Deliver"])
  const stepCount = steps.length
  const paddingX = 32
  const gap = 14
  const availableWidth = width - paddingX * 2 - gap * (stepCount - 1)
  const boxWidth = Math.max(90, Math.floor(availableWidth / stepCount))
  const boxHeight = 46
  const y = Math.round(height / 2 - boxHeight / 2)

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    ${gradientAndShadowDefs("pl", colors)}

    <rect width="${width}" height="${height}" fill="${colors.background}" rx="12" />

    ${steps
      .map((step, index) => {
        const x = paddingX + index * (boxWidth + gap)
        const isLast = index === stepCount - 1
        const arrowX = x + boxWidth
        return `
          <g>
            <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}" rx="10"
                  fill="url(#plGrad)" stroke="${colors.primary}" stroke-width="1.5"
                  filter="url(#plShadow)" />
            <text x="${x + boxWidth / 2}" y="${y + 28}" text-anchor="middle"
                  font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="${colors.text}">
              ${escapeSvgText(step)}
            </text>
            ${
              !isLast
                ? `<line x1="${arrowX + 2}" y1="${height / 2}" x2="${arrowX + gap - 6}" y2="${height / 2}"
                         stroke="${colors.accent}" stroke-width="3" stroke-linecap="round" />
                   <polygon points="${arrowX + gap - 6},${height / 2 - 6} ${arrowX + gap - 6},${height / 2 + 6} ${arrowX + gap + 4},${height / 2}"
                            fill="${colors.accent}" />`
                : ""
            }
          </g>
        `
      })
      .join("")}
  </svg>`
}

function generatePlaceholderSVG(width: number, height: number, colors: DiagramColorPalette): string {
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">
    <rect width="${width}" height="${height}" fill="${colors.background}" rx="12" />
    <text x="${width / 2}" y="${height / 2}" text-anchor="middle"
          font-family="system-ui, sans-serif" font-size="14" fill="${colors.text}">Diagram</text>
  </svg>`
}

export default function SVGDiagram({ config, className = "" }: SVGDiagramProps) {
  const svgString = generateSVGDiagram(config)

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgString }}
      aria-label={`${config.type} diagram`}
    />
  )
}
