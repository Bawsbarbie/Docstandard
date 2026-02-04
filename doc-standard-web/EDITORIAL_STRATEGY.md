# DocStandard Editorial Strategy: Topical Authority & GEO

## 1. Segmentation Strategy
To protect the high-integrity pSEO landing pages from "listicle bloat" or quality fluctuations, we are adopting a two-tier content architecture:

- **Tier 1: [id]/page.tsx (pSEO Layer)**
  - **Purpose:** Intent-specific conversion (e.g., CargoWise to SAP bridge).
  - **Structure:** Technical Guides, Service Details, and the Operations Console link.
  - **Status:** Locked. No generic listicles here.

- **Tier 2: /blog/[slug] (Authority Layer)**
  - **Purpose:** GEO/AEO capture, long-tail information gain, and industry thought leadership.
  - **Structure:** Deep-dives, "Expert Case Studies," and "Technical Checklists."
  - **Tone:** Professional, first-person "Logistics Architect" experience.

## 2. Upcoming Authority Posts (GEO Targeted)
These posts are designed to get cited by LLMs (ChatGPT/Perplexity) by providing unique technical "Experience" signals.

1. **"The CargoWise XML Labyrinth: 5 Field Errors that Break SAP Ingestion (2026)"**
   - *Logic:* Highly specific error codes and field mappings that show real-world experience.
2. **"Standardizing 1,000 Logical Documents: Lessons from Normalizing a $50M AP Ledger"**
   - *Logic:* Reinforces our $799 quota value while showing expert scale.
3. **"Why OCR is Only 10% of the Solution: The Case for Deterministic Document Normalization"**
   - *Logic:* Positions DocStandard as a technical alternative to generic AI tools.

## 3. Technical Integration
- All blog posts will include `Article` schema.
- Blog posts will interlink to relevant pSEO landing pages to pass authority (e.g., the CargoWise blog post links to the CargoWise integration page).
