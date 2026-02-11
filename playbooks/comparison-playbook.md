# Comparison Playbook — DocStandard
## Pattern: `/[x]-vs-[y]` | Structure: Decision-Stage Content

---

## Overview

**Purpose:** Capture users comparing two solutions/approaches. High commercial intent — they're already educated and ready to decide.

**Formula:** `/[system-a]-vs-[system-b]` or `/[approach-a]-vs-[approach-b]`

**Examples:**
- `/cargowise-vs-magaya`
- `/manual-processing-vs-automated-extraction`
- `/sap-tm-vs-oracle-otm`
- `/in-house-team-vs-outsourced-processing`

---

## Content Structure (1,500+ words)

### 1. Hero (150 words)
**H1:** [System A] vs [System B]: Logistics Data Processing Comparison
**Subtitle:** Side-by-side analysis to help you choose the right solution for your operations.

**Intro paragraph:**
Choosing between [System A] and [System B] for your logistics data processing? Both handle [core function], but they differ significantly in [key differentiator 1], [key differentiator 2], and [key differentiator 3]. This comparison breaks down the technical capabilities, integration complexity, and operational fit to help you make an informed decision.

---

### 2. Quick Comparison Table (200 words)
**At-a-glance decision matrix**

| Feature | [System A] | [System B] | Winner |
|---------|------------|------------|--------|
| **Best For** | [Use case] | [Use case] | [A/B/Tie] |
| **Data Formats** | [List] | [List] | [A/B/Tie] |
| **API Availability** | ✅/❌ | ✅/❌ | [A/B/Tie] |
| **Integration Complexity** | [Low/Med/High] | [Low/Med/High] | [A/B] |
| **Pricing Model** | [Model] | [Model] | Depends |
| **Setup Time** | [Timeframe] | [Timeframe] | [A/B] |
| **DocStandard Support** | ✅ | ✅ | Tie |

---

### 3. Deep Dive: [System A] (300 words)

**H2:** Understanding [System A]

**What It Is (80 words):**
[System A] is a [category] platform designed for [primary use case]. Developed by [company], it's used by [user type] to [core function]. The system emphasizes [key strength] and is particularly strong in [specific capability].

**Technical Specifications (100 words):**
- **Core Architecture:** [Cloud/On-premise/Hybrid]
- **Data Model:** [Relational/Document/Graph]
- **API Standards:** [REST/SOAP/GraphQL/EDI]
- **Supported Formats:** [JSON/XML/CSV/EDI X12/EDIFACT]
- **Authentication:** [OAuth 2.0/API Keys/SAML]
- **Rate Limits:** [Requests per minute/hour]
- **Webhook Support:** ✅/❌

**Best Use Cases (60 words):**
- [Specific scenario 1]
- [Specific scenario 2]
- [Specific scenario 3]

**Limitations (60 words):**
- [Limitation 1]
- [Limitation 2]
- Where DocStandard helps: [How we bridge the gap]

---

### 4. Deep Dive: [System B] (300 words)

**H2:** Understanding [System B]

*Mirror structure of Section 3*

**What It Is (80 words):**
**Technical Specifications (100 words):**
**Best Use Cases (60 words):**
**Limitations (60 words):**

---

### 5. Head-to-Head Comparison (400 words)

**H2:** [System A] vs [System B]: Feature Comparison

#### Data Processing Capabilities
| Capability | [System A] | [System B] | Verdict |
|------------|------------|------------|---------|
| Batch Processing | ✅/❌ Details | ✅/❌ Details | [Winner + Why] |
| Real-time Sync | ✅/❌ Details | ✅/❌ Details | [Winner + Why] |
| Error Handling | [Approach] | [Approach] | [Winner + Why] |
| Data Validation | [Method] | [Method] | [Winner + Why] |

#### Integration Ecosystem
| Aspect | [System A] | [System B] | Verdict |
|--------|------------|------------|---------|
| Pre-built Connectors | [Number/Types] | [Number/Types] | [Winner] |
| Custom API Support | [Level] | [Level] | [Winner] |
| Third-party Marketplace | [Size/Quality] | [Size/Quality] | [Winner] |
| DocStandard Bridge | [How it works] | [How it works] | Both ✅ |

#### Operational Fit
| Factor | [System A] | [System B] | Verdict |
|--------|------------|------------|---------|
| Learning Curve | [Steep/Moderate/Easy] | [Steep/Moderate/Easy] | [Winner] |
| Support Quality | [Rating/Notes] | [Rating/Notes] | [Winner] |
| Community Size | [Large/Med/Small] | [Large/Med/Small] | [Winner] |
| Documentation | [Quality] | [Quality] | [Winner] |

---

### 6. Decision Framework (200 words)

**H2:** Which One Should You Choose?

**Choose [System A] If:**
- [Specific scenario 1]
- [Specific scenario 2]
- [Specific scenario 3]

**Choose [System B] If:**
- [Specific scenario 1]
- [Specific scenario 2]
- [Specific scenario 3]

**When DocStandard Makes Sense:**
Regardless of which system you choose, DocStandard bridges the document-to-data gap:
- Extract from PDFs/scans → Deliver structured data to either platform
- Normalize formats between systems during migrations
- Handle legacy documents neither system can process natively

---

### 7. Related Comparisons (100 words)

**H3:** Other Comparisons You Might Like

- [Related comparison 1]
- [Related comparison 2]
- [Related comparison 3]

---

## URL Pattern Rules

| Rule | Example |
|------|---------|
| Lowercase only | `/cargowise-vs-magaya` ✅ |
| Hyphens for spaces | `/sap-tm-vs-oracle-otm` ✅ |
| No underscores | `/cargowise_vs_magaya` ❌ |
| System order: Alphabetical OR market share | `/cargowise-vs-magaya` (C before M) |
| Max 50 characters | `/cargowise-vs-magaya-data-processing` (38 chars) ✅ |

---

## Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "ComparisonTable",
  "name": "[System A] vs [System B] Comparison",
  "description": "Side-by-side comparison of [System A] and [System B] for logistics data processing",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": "[System A]"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SoftwareApplication",
        "name": "[System B]"
      }
    }
  ]
}
```

---

## Generation Formula

**Data Required Per Comparison:**
1. System A specifications (from integration database)
2. System B specifications (from integration database)
3. Head-to-head feature matrix (predefined or calculated)
4. Use case scenarios (vertical-specific)
5. DocStandard bridge description (template-based)

**Volume Potential:**
- 50 systems × 49 comparisons / 2 (avoid duplicates) = **1,225 unique comparisons**
- Priority: Compare top 20 systems first = **190 comparisons**

---

## Internal Linking Strategy

**From This Page:**
- Link to System A integration page
- Link to System B integration page
- Link to 3 related comparisons
- Link to /services or /pricing

**To This Page (from):**
- System A integration page: "Compare with alternatives"
- System B integration page: "Compare with alternatives"
- Vertical hub pages: "Not sure which system? Compare options"
- Blog posts mentioning either system

---

## Validation Gates

Before generating:
- [ ] Both systems have sufficient data (5+ fields each)
- [ ] Comparison table has at least 6 rows
- [ ] Word count target: 1,500+
- [ ] URL under 50 characters
- [ ] Unique value proposition (not generic)
- [ ] DocStandard angle included (bridge value)

---

## First 10 Comparisons to Build (Test Batch)

| # | Comparison | Priority | Why |
|---|------------|----------|-----|
| 1 | `cargowise-vs-magaya` | High | Top 2 logistics platforms |
| 2 | `sap-tm-vs-oracle-otm` | High | Enterprise TMS leaders |
| 3 | `manual-processing-vs-automated-extraction` | High | Approach comparison (broader) |
| 4 | `netsuite-vs-dynamics365` | Med | ERP integration targets |
| 5 | `descartes-vs-mercurygate` | Med | TMS mid-market |
| 6 | `in-house-team-vs-outsourced-processing` | High | Service positioning |
| 7 | `quickbooks-vs-sage` | Med | SMB finance |
| 8 | `flexport-vs-freightos` | Med | Freight forwarder tech |
| 9 | `excel-vs-tms-automation` | High | Entry point comparison |
| 10 | `edi-vs-api-integration` | High | Technical approach |

---

*Playbook ready for implementation*
