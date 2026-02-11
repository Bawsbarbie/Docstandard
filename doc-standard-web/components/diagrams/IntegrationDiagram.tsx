// components/diagrams/IntegrationDiagram.tsx
// Pre-built data-flow diagram wrapper for integration pages.

import SVGDiagram, { generateSVGDiagram } from "./SVGDiagramGenerator"
import type { DiagramConfig, VerticalColorScheme } from "./DiagramRegistry"

interface IntegrationDiagramProps {
  sourceSystem: string
  targetSystem: string
  vertical: VerticalColorScheme
  fields?: string[]
  className?: string
}

function buildIntegrationConfig({
  sourceSystem,
  targetSystem,
  vertical,
  fields = ["Data"],
}: Omit<IntegrationDiagramProps, "className">): DiagramConfig {
  return {
    type: "data-flow",
    colorScheme: vertical,
    width: 800,
    height: 200,
    data: {
      source: { name: sourceSystem, icon: sourceSystem.toLowerCase() },
      target: { name: targetSystem, icon: targetSystem.toLowerCase() },
      transformation: "Data Bridge",
      fields,
    },
  }
}

export function IntegrationDiagram({
  sourceSystem,
  targetSystem,
  vertical,
  fields = ["Data"],
  className = "",
}: IntegrationDiagramProps) {
  return (
    <SVGDiagram
      config={buildIntegrationConfig({ sourceSystem, targetSystem, vertical, fields })}
      className={className}
    />
  )
}

export function getIntegrationDiagramSVG(props: IntegrationDiagramProps): string {
  const { sourceSystem, targetSystem, vertical, fields = ["Data"] } = props
  return generateSVGDiagram(buildIntegrationConfig({ sourceSystem, targetSystem, vertical, fields }))
}
