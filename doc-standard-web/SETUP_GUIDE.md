# Setup Guide - DocStandard.co

Complete setup instructions for getting the project running locally.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Git
- Code editor (VS Code recommended)

## Step 1: Clone & Install

```bash
# Navigate to project directory
cd doc-standard-web

# Install dependencies
npm install
```

## Step 2: Supabase Setup

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create account
3. Click "New Project"
4. Fill in details:
   - **Name**: DocStandard
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
5. Wait for project to be created (~2 minutes)

### 2.2 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 2.3 Run Database Migration

**Option A: Via Dashboard** (Easiest)

1. Go to **SQL Editor** in Supabase Dashboard
2. Open `supabase/migrations/20260201000000_initial_schema.sql`
3. Copy entire contents
4. Paste in SQL Editor
5. Click **Run**
6. Wait for success message

**Option B: Via Supabase CLI**

```bash
# Install CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-ref

# Push migration
supabase db push
```

### 2.4 Create Storage Bucket

1. Go to **Storage** in Dashboard
2. Click **New Bucket**
3. Settings:
   - **Name**: `batch-files`
   - **Public**: ❌ No (keep private)
   - **File size limit**: 50MB
   - **Allowed MIME types**: Leave blank (allow all)
4. Click **Create Bucket**

### 2.5 Apply Storage Policies

Go to **Storage** → **Policies** → **batch-files** bucket

**Policy 1: Users can upload to own batches**
```sql
CREATE POLICY "Users can upload to own batch folders"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'batch-files' AND
  (storage.foldername(name))[1] = 'batches' AND
  auth.uid()::text IN (
    SELECT user_id::text FROM batches 
    WHERE id::text = (storage.foldername(name))[2]
  )
);
```

**Policy 2: Users can read own batch files**
```sql
CREATE POLICY "Users can read own batch files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'batch-files' AND
  (storage.foldername(name))[1] = 'batches' AND
  auth.uid()::text IN (
    SELECT user_id::text FROM batches 
    WHERE id::text = (storage.foldername(name))[2]
  )
);
```

**Policy 3: Service role full access**
```sql
CREATE POLICY "Service role has full access"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'batch-files');
```

## Step 3: Environment Variables

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe (Phase 4)
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
```

**Important**: Replace all placeholder values with your actual keys!

## Step 4: Run Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:3000`

## Step 5: Create Test User

### Option A: Enable Email Auth (Simple)

1. Go to **Authentication** → **Providers**
2. Enable **Email**
3. Disable email confirmation (for testing):
   - Go to **Authentication** → **Email Templates**
   - Under "Confirm signup", toggle off email confirmation

### Option B: Create User via SQL

```sql
-- Insert test user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'test@docstandard.co',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### Option C: Use Supabase Auth UI (Recommended)

1. Install Supabase Auth helpers:
```bash
npm install @supabase/auth-helpers-nextjs
```

2. Use Supabase Auth UI component (implement in Phase 4)

## Step 6: Test the Application

### Test 1: Home Page
```
http://localhost:3000/
```
Should show landing page.

### Test 2: pSEO Pages
```
http://localhost:3000/us/ca/los-angeles/customs-clearance-services
```
Should render pSEO content.

### Test 3: Dashboard (Requires Auth)
```
http://localhost:3000/dashboard
```
Should show batches dashboard (after login).

### Test 4: Upload Flow (Requires Auth)
```
http://localhost:3000/upload
```
1. Drag & drop PDF or image
2. Click "Upload"
3. Watch progress
4. Should redirect to dashboard

## Verification Checklist

### Database ✅
```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('batches', 'uploads');

-- Check enums
SELECT typname FROM pg_type 
WHERE typtype = 'e' AND typname IN ('batch_status', 'batch_tier', 'file_role');

-- Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('batches', 'uploads');
```

Expected: All queries return results.

### Storage ✅
- Go to Storage → Should see `batch-files` bucket
- Bucket should be **Private** (not public)
- Policies tab should show 3 policies

### Environment ✅
```bash
# Check env vars are loaded
npm run dev

# Should see in console:
# ✓ Ready in X seconds
# No errors about missing env vars
```

### Upload Test ✅
1. Create test user
2. Sign in
3. Go to /upload
4. Upload test PDF
5. Check database:
```sql
SELECT * FROM batches ORDER BY created_at DESC LIMIT 1;
SELECT * FROM uploads ORDER BY created_at DESC LIMIT 1;
```
6. Check storage: batches/{batch_id}/inputs/

## Troubleshooting

### Issue: "Permission denied for table batches"

**Cause**: RLS is enabled but user not authenticated.

**Fix**: 
- Sign in as a user
- Or disable RLS temporarily (not recommended):
```sql
ALTER TABLE batches DISABLE ROW LEVEL SECURITY;
```

### Issue: "relation 'batches' does not exist"

**Cause**: Migration not run.

**Fix**: Run the SQL migration in Supabase Dashboard.

### Issue: "Bucket 'batch-files' not found"

**Cause**: Storage bucket not created.

**Fix**: Create bucket via Dashboard (see Step 2.4).

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Cause**: Environment variables not loaded.

**Fix**:
1. Check `.env.local` exists
2. Restart dev server
3. Verify no typos in env var names

### Issue: Upload fails with "403 Forbidden"

**Cause**: Storage policies not applied or incorrect.

**Fix**: 
1. Check storage policies exist
2. Verify user is authenticated
3. Check RLS policies on batches table

### Issue: "Failed to fetch" on upload

**Cause**: CORS or network issue.

**Fix**:
1. Check Supabase project is running
2. Verify API URL in .env.local
3. Check browser console for details

## Development Workflow

### Making Changes

1. **Code Changes**: Edit files, hot reload updates automatically
2. **Database Changes**: Create new migration files
3. **Test Locally**: Use `npm run dev`
4. **Build**: Run `npm run build` before deploying

### Database Migrations

Create new migration:
```bash
# Create migration file
touch supabase/migrations/$(date +%Y%m%d%H%M%S)_description.sql

# Edit file with SQL changes

# Apply migration
supabase db push
```

### Testing Uploads

Test files:
- Small PDF: ~100KB
- Large PDF: ~10MB
- Image: ~2MB JPG
- Invalid: .exe file (should reject)

## Next Steps

After setup complete:

1. **Phase 4**: Add authentication UI
2. **Phase 4**: Integrate Stripe payments
3. **Phase 4**: Add file download
4. **Phase 5**: Build admin dashboard
5. **Phase 5**: Implement processing workers

## Quick Reference

### Dev Server
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality
```

### Supabase CLI
```bash
supabase link        # Link to project
supabase db push     # Push migrations
supabase db pull     # Pull schema
supabase status      # Check status
```

### URLs
- Local dev: `http://localhost:3000`
- Supabase Dashboard: `https://supabase.com/dashboard`
- Storage browser: Dashboard → Storage → batch-files

---

**Setup Time**: ~30 minutes
**Difficulty**: Medium

If you get stuck, check:
1. `PHASE_3_COMPLETE.md` - Detailed implementation docs
2. `supabase/README.md` - Database-specific docs
3. Browser console - Error messages
4. Supabase logs - Dashboard → Logs

**Ready to upload documents?** 🚀
