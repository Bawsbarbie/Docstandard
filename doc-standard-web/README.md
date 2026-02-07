# DocStandard.co - Programmatic SEO Engine

A high-scale pSEO platform for logistics document processing services.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Database:** Supabase
- **Deployment:** Coolify (Docker)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
/
├── app/
│   ├── (marketing)/          # Landing pages
│   ├── (pseo)/               # Programmatic SEO pages
│   ├── (app)/                # Protected dashboard
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # Shadcn components
│   ├── pseo/                 # Content blocks
│   └── upload/               # Upload widgets
├── lib/
│   ├── pseo/                 # pSEO engine
│   │   ├── content-factory.ts
│   │   ├── geo.ts
│   │   ├── intents.ts
│   │   └── types.ts
│   └── supabase/             # Database clients
├── data/
│   ├── geo.csv               # Geographic data
│   ├── intents.csv           # Service intents
│   └── content/              # Content templates
└── public/
    └── sitemap/              # Generated sitemaps
```

## Implementation Status

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Next.js 14 with TypeScript
- [x] Tailwind CSS configuration
- [x] Shadcn/UI setup
- [x] Supabase client configuration
- [x] Folder structure created
- [x] Geographic data loader (`lib/pseo/geo.ts`)
- [x] Intent data loader (`lib/pseo/intents.ts`)
- [x] Sample CSV data files (41 cities, 30 services)
- [x] Content templates and pools

### ✅ Phase 2: Content Engine & Routes (COMPLETE)
- [x] Content Factory (`lib/pseo/content-factory.ts`)
  - Deterministic block selection using URL hash
  - Pool resolution (Intent → Kind → Default)
  - Template variable replacement
- [x] pSEO Routing (`app/(pseo)/[...slug]/page.tsx`)
  - Canonical route: `/[country]/[state]/[city]/[intent]`
  - Alias route: `/[country]/[city]/[intent]` (308 redirects)
- [x] pSEO Components:
  - IntroBlock, PainSection, BenefitsGrid
  - FAQSection, CTASection, PseoPageTemplate
- [x] Metadata generation with index gating
- [x] Static params generation (top 100 pages)

### ✅ Phase 3: Database & Upload Flow (COMPLETE)
- [x] Supabase schema migration
  - Enums: batch_status, batch_tier, file_role, upload_status
  - Tables: batches, uploads
  - RLS policies for security
  - Indexes and triggers
- [x] Upload actions (`lib/actions/upload.ts`)
  - createBatch, getSignedUploadUrl
  - createUpload, completeBatchUpload
  - getUserBatches, getBatchUploads
- [x] FileUploader component
  - Drag & drop with react-dropzone
  - Progress tracking per file
  - Error handling and validation
- [x] Upload page integration
- [x] Dashboard with batch management
- [x] App layout with navigation

### ✅ Phase 4: Stripe & Checkout (COMPLETE)
- [x] Stripe SDK integration
- [x] Checkout session creation
- [x] Webhook handler (checkout.session.completed)
- [x] Checkout page with batch summary
- [x] Success page with confirmation
- [x] Payment flow automation
- [x] Batch status updates (queued)
- [x] paid_at timestamp tracking

### 🔜 Phase 5: Admin & Processing (TODO)
- [ ] Admin dashboard
- [ ] Worker queue for processing
- [ ] File download functionality
- [ ] Email notifications
- [ ] File processing logic
- [ ] Status notifications
- [ ] Analytics and reporting

## pSEO Architecture

**Core Principle:** Deterministic Assembly

```
Content = Function(Hash(City + Intent))
```

- **100k+ pages** generated from templates
- **Index gating:** Only high-priority cities (priority >= 90) + top intents (1-15)
- **Alias handling:** `/country/city/intent` → 308 redirect → `/country/state/city/intent`
- **No middleware:** All redirects handled in page components for performance

## Documentation

See `DOC_STANDARD_CURSOR.md` for complete architecture and implementation details.

## License

Proprietary - All rights reserved
