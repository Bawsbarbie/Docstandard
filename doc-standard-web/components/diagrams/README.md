# Dynamic SVG Diagram System

Zero-storage diagram generation for 100k+ page scale.

## Architecture

```
Page Context → DiagramRegistry → SVGDiagramGenerator → Inline SVG
     ↑
Color Palette + Layout Variants
```

## Files

| File | Purpose |
|------|---------|
| `DiagramRegistry.ts` | Configuration types, color palettes, page-to-diagram mapping |
| `SVGDiagramGenerator.tsx` | Core SVG generation logic (5 diagram types) |
| `IntegrationDiagram.tsx` | Pre-built component for integration pages |

## Diagram Types

### 1. Data Flow (`type: 'data-flow'`)
For integration pages: Source System → [Transform] → Target System

```tsx
import { IntegrationDiagram } from '@/components/diagrams/IntegrationDiagram'

<IntegrationDiagram
  sourceSystem="CargoWise"
  targetSystem="NetSuite"
  vertical="finance"
  fields={['Shipments', 'Invoices', 'Charges']}
/>
```

### 2. Port Map (`type: 'port-map'`)
For city-vertical pages: Location + document icons

```tsx
import SVGDiagram from '@/components/diagrams/SVGDiagramGenerator'

<SVGDiagram
  config={{
    type: 'port-map',
    colorScheme: 'compliance',
    width: 600,
    height: 300,
    data: {
      city: 'Antwerp',
      port: 'Port of Antwerp-Bruges',
      documents: ['Customs Declaration', 'EUR.1 Certificate', 'Packing List']
    }
  }}
/>
```

### 3. Timeline (`type: 'timeline'`)
For urgency pages: SLA badge + processing steps

```tsx
<SVGDiagram
  config={{
    type: 'timeline',
    colorScheme: 'customs',
    width: 700,
    height: 150,
    data: {
      sla: '24H',
      steps: ['Receive', 'Extract', 'Validate', 'Deliver'],
      urgency: 'emergency' // emergency | urgent | same-day
    }
  }}
/>
```

### 4. Checklist (`type: 'checklist'`)
For compliance pages: Validation flow with checkmarks

```tsx
<SVGDiagram
  config={{
    type: 'checklist',
    colorScheme: 'compliance',
    width: 400,
    height: 250,
    data: {
      steps: ['Document Upload', 'Field Extraction', 'Validation', 'Export']
    }
  }}
/>
```

## Color Schemes

| Vertical | Primary | Use Case |
|----------|---------|----------|
| `finance` | Blue #3B82F6 | Money, reports, audits |
| `customs` | Teal #14B8A6 | Government, clearance |
| `compliance` | Green #22C55E | Validation, checks |
| `invoice` | Purple #A855F7 | Billing, AP |
| `shipping` | Orange #F97316 | Logistics, cargo |
| `logistics` | Slate #64748B | General ops |

## Adding to Pages

### Integration Page Example
```tsx
// app/(pseo)/integration/[slug]/page.tsx
import { IntegrationDiagram } from '@/components/diagrams/IntegrationDiagram'

export default function IntegrationPage({ params }) {
  const { source, target, vertical } = parseSlug(params.slug)
  
  return (
    <article>
      <h1>{source} to {target} Data Bridge</h1>
      
      <IntegrationDiagram
        sourceSystem={source}
        targetSystem={target}
        vertical={vertical}
        fields={['Shipments', 'Charges', 'Invoices']}
        className="my-8"
      />
      
      {/* Rest of content */}
    </article>
  )
}
```

### City-Vertical Page Example
```tsx
// Urgency modifier page
import SVGDiagram from '@/components/diagrams/SVGDiagramGenerator'

<section className="urgency-section">
  <SVGDiagram
    config={{
      type: 'timeline',
      colorScheme: 'customs',
      width: 700,
      height: 150,
      data: {
        sla: '24H',
        steps: ['Submit', 'Process', 'Validate', 'Deliver'],
        urgency: 'urgent'
      }
    }}
    className="w-full"
  />
  
  <p>Guaranteed {sla} turnaround for urgent customs declarations.</p>
</section>
```

## Variation Engine

To create visual variety without duplicate code:

```tsx
import { getRandomVariant } from '@/components/diagrams/DiagramRegistry'

// In your page/component:
const variedConfig = getRandomVariant(baseConfig)
// Randomizes: layout direction, variant number (0-2)
```

## Storage Impact

- **20 base images** (hero backgrounds): ~1MB total
- **SVG generation code**: ~15KB
- **Per-page storage**: 0 bytes (generated at render)
- **100k pages × 0 bytes** = 0 bytes added storage

## SEO Benefits

- Zero external image requests (faster LCP)
- SVG text is crawlable
- Alt text support via aria-label
- Color contrast always WCAG compliant
