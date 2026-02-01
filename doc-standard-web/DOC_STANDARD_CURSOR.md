# DocStandard.co - Master Cursor Blueprint

**Mission:** Build a high-scale pSEO programmatic SEO engine and a $799 flat-fee document processing service for the logistics industry.

**Core Tech Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Database/Auth/Storage:** Supabase
- **Deployment:** Coolify (Docker)

---

## 1. Project Structure

```
/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # Home (Landing)
│   │   ├── layout.tsx
│   ├── (pseo)/                       # Programmatic SEO Engine
│   │   ├── [country]/
│   │   │   ├── [state]/
│   │   │   │   ├── [city]/
│   │   │   │   │   ├── [intent]/
│   │   │   │   │   │   └── page.tsx  # The Money Page (Canonical)
│   │   │   └── [city]/
│   │   │       ├── [intent]/
│   │   │       │   └── page.tsx      # Alias Redirect (308 -> Canonical)
│   ├── (app)/                        # Protected App (Dashboard)
│   │   ├── dashboard/
│   │   ├── upload/
│   ├── api/
│   │   ├── revalidate/               # ISR On-Demand
│   │   ├── upload/                   # Signed URLs
│   │   └── webhooks/stripe/
├── components/
│   ├── ui/                           # Shadcn Components
│   ├── pseo/                         # Content Blocks (Intro, Pain, FAQ)
│   ├── upload/                       # Upload Widget
├── lib/
│   ├── pseo/
│   │   ├── content-factory.ts        # The Content Assembly Engine
│   │   ├── pools.ts                  # Block Pools (Default/Override)
│   │   ├── geo.ts                    # Geo Data Loaders
│   │   └── types.ts
│   ├── supabase/
│   │   ├── server.ts
│   │   ├── client.ts
│   │   └── admin.ts                  # Service Role (for Workers)
│   └── utils.ts
├── data/
│   ├── geo.csv                       # Countries, States, Cities
│   ├── intents.csv                   # 200+ Slugs & Configs
│   ├── pages.csv                     # (Optional) Manual Overrides
│   └── content/
│       ├── blocks.json               # Raw Text Templates
│       └── pools.json                # Pool Logic
└── public/
    └── sitemap/                      # Chunked Sitemaps
```

---

## 2. pSEO Architecture (The 100k Page Engine)

**Core Principle:** *Deterministic Assembly.*
`Content = Function(Hash(City + Intent))`

### A. Routing & Aliases
- **Canonical Route:** `/[country]/[state]/[city]/[intent]`
- **Alias Route:** `/[country]/[city]/[intent]`
- **Logic:**
  - Alias route performs a **Server-Side Redirect (308)** to Canonical.
  - **No Middleware** for redirects (Performance bottleneck).
  - Use `lib/geo.ts` to look up State from City slug quickly (Memoized Map).

### B. Index Gating (The "Safety Valve")
- **Rule:** Generate ALL pages, but only `noindex` most of them.
- **Indexable Condition:**
  - City Priority >= 90
  - Intent is in Top 15 (Core Logistics)
- **Implementation:**
  - `generateMetadata()` checks these rules and sets `<meta name="robots">`.

### C. Content Assembly (Block + Pool)
- **Interface:**
  ```typescript
  interface BlockItem { id: string; text: string; tags?: string[]; }
  interface ContentPool { id: string; extends?: string; blocks: Record<string, BlockItem[]>; }
  ```
- **Resolution Chain:** `IntentPool` -> `KindPool` (Doctype) -> `DefaultPool`.
- **Hashing:** Use a stable hash of the URL params to pick the same Intro/FAQ every time for a specific URL.

---

## 3. Database Schema (Supabase)

### Enums
```sql
create type order_status as enum ('created', 'uploaded', 'queued', 'processing', 'needs_review', 'delivered', 'failed');
create type batch_scope as enum ('standard', 'large', 'complex');
create type file_role as enum ('input', 'output');
```

### Table: `orders`
- **id:** UUID (PK)
- **user_id:** UUID (FK Auth)
- **status:** `order_status` (Default: 'created')
- **scope:** `batch_scope` (Default: 'standard')
- **price_cents:** 79900
- **stripe_session_id:** Text

### Table: `order_files`
- **id:** UUID (PK)
- **order_id:** UUID (FK Orders)
- **role:** `file_role` ('input')
- **storage_path:** Text (e.g., `orders/{order_id}/inputs/{file_id}.pdf`)
- **original_name:** Text

### RLS Policies
- Users can only `SELECT/INSERT` their own Orders and Files.
- Service Role (Worker) has full access.

---

## 4. Implementation Plan (Phase 1)

1.  **Setup:** Initialize Next.js, Tailwind, Shadcn, Supabase Client.
2.  **Data Layer:** Create `lib/pseo/geo.ts` and `intents.csv` loader.
3.  **Routing:** Implement the Canonical and Alias page routes.
4.  **Content Engine:** Build `content-factory.ts` to assemble blocks.
5.  **UI:** Build the `[intent]/page.tsx` template using the assembled content.

**Command for Cursor:**
"Reference DOC_STANDARD_CURSOR.md. We are starting Phase 1. Please initialize the folder structure and set up the `lib/pseo` data loaders for `geo.csv` and `intents.csv`."
