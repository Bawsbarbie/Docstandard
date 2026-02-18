# V1-Comparison Template

**Template Name:** `v1-comparison`  
**Purpose:** Platform/System comparison pages (e.g., CargoWise vs Magaya)  
**Based on:** V1 Integration Template (city-integration pages)

---

## Template Structure (11 Sections)

| # | Section | Content |
|---|---------|---------|
| 1 | **Hero** | Title, subtitle, tracking tag, CTAs |
| 2 | **Risk** | "The Hidden Cost" + 4 stat cards + "Manual Data Trap" sidebar |
| 3 | **Pain** | 3 icons (FileJson, RefreshCw, BarChart3) with descriptions |
| 4 | **Technical** | Comparison table + 3 info cards below |
| 5 | **Context** | Platform Context (network stats, not city-specific) |
| 6 | **ROI** | 4 dark cards (Clock, Zap, DollarSign, Shield) |
| 7 | **Benefits** | 3 gradient cards (indigo-50 to white) |
| 8 | **FAQ** | 5 questions on bg-slate-50 |
| 9 | **Testimonials** | 3 cards with 5-star ratings |
| 10 | **CTA** | (Optional - removed per page needs) |

---

## Key Differences from V1 (Integration)

| Element | V1 (Integration) | V1-Comparison |
|---------|------------------|---------------|
| Hero tag | City name | "Platform Comparison" |
| Technical | Field mapping table | Feature comparison table |
| Context | City infrastructure (ports, airports) | Platform network stats |
| Use case | SystemA → SystemB integration | Platform A vs Platform B |

---

## Files Using This Template

- `app/(pseo)/comparison/cargowise-vs-magaya/page.tsx`
- (Add new pages here as they're created)

---

## Create New Comparison Page

```bash
# Copy template
mkdir -p app/\(pseo\)/comparison/[slug]
cp app/\(pseo\)/comparison/cargowise-vs-magaya/page.tsx app/\(pseo\)/comparison/[slug]/page.tsx

# Edit content:
# 1. Update metadata (title, description)
# 2. Update comparisonFeatures array
# 3. Update context section
# 4. Update FAQ questions
# 5. Update testimonials (if needed)
```

---

## Visual Design System

**Colors:**
- Hero: `bg-slate-900` with `from-indigo-900/40` gradient
- Risk: `bg-slate-950` with red accents
- Pain: `bg-white` with `bg-slate-50` cards
- Technical: `bg-slate-50` with white table
- Context: `bg-white`
- ROI: `bg-slate-900` with colored icons
- Benefits: `bg-white` with gradient cards
- FAQ: `bg-slate-50` with white cards
- Testimonials: `bg-white` with `bg-slate-50` cards
- CTA: `bg-slate-900`

**Icons:**
- Pain: FileJson, RefreshCw, BarChart3 (indigo-100 bg)
- ROI: Clock (red), Zap (green), DollarSign (indigo), Shield (purple)
- Benefits: Database, Building2, BarChart3 (indigo-600 bg)

**Typography:**
- H1: `text-4xl md:text-6xl font-bold`
- H2: `text-3xl md:text-4xl font-bold`
- Body: `text-lg text-slate-600`

---

## Example Pages

1. ✅ `/comparison/cargowise-vs-magaya`
2. ⏳ `/comparison/sap-tm-vs-oracle-otm`
3. ⏳ `/comparison/manual-processing-vs-automated-extraction`
4. ⏳ `/comparison/netsuite-vs-dynamics365`
5. ⏳ `/comparison/descartes-vs-mercurygate`
6. ⏳ `/comparison/flexport-vs-freightos`
7. ⏳ `/comparison/quickbooks-vs-sage`
8. ⏳ `/comparison/excel-vs-tms-automation`
9. ⏳ `/comparison/edi-vs-api-integration`
10. ⏳ `/comparison/in-house-team-vs-outsourced-processing`
