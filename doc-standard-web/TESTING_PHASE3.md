# Phase 3 Testing Guide

Quick reference for testing the database and upload flow.

## Prerequisites

Before testing, ensure:
- ✅ Supabase project created
- ✅ Database migration run
- ✅ Storage bucket `batch-files` created
- ✅ Storage policies applied
- ✅ Environment variables set in `.env.local`
- ✅ Dev server running (`npm run dev`)
- ✅ Test user created (or auth enabled)

## Test 1: Database Schema ✅

### Verify Tables Exist

```sql
-- Run in Supabase SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('batches', 'uploads');
```

**Expected**: Returns 2 rows (batches, uploads)

### Verify Enums Exist

```sql
SELECT typname 
FROM pg_type 
WHERE typtype = 'e' 
  AND typname IN ('batch_status', 'batch_tier', 'file_role');
```

**Expected**: Returns 3 rows

### Verify RLS Enabled

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('batches', 'uploads');
```

**Expected**: rowsecurity = true for both tables

### Check Policies

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

**Expected**: At least 6 policies (3 for batches, 3 for uploads)

## Test 2: Storage Setup ✅

### Via Dashboard:
1. Go to **Storage**
2. Should see `batch-files` bucket
3. Click bucket → Should be **Private**
4. Go to **Policies** tab
5. Should see 3 policies

### Via SQL:
```sql
SELECT * FROM storage.buckets WHERE name = 'batch-files';
```

**Expected**: Returns 1 row with public = false

## Test 3: Authentication ✅

### Option A: Create Test User (SQL)

```sql
-- Create test user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  'test@docstandard.co',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
);
```

### Option B: Sign Up via UI

1. Enable email auth in Supabase Dashboard
2. Disable email confirmation (for testing)
3. Use Supabase Auth UI to sign up

## Test 4: Upload Page Access ✅

### Test URL:
```
http://localhost:3000/upload
```

### Expected:
- Page loads without errors
- Shows upload dropzone
- Shows pricing information ($799)
- Shows "What happens next?" section

### Check Console:
- No errors
- No 404s
- No authentication errors

## Test 5: File Upload Flow ✅

### Step-by-Step Test:

**1. Prepare Test Files**
- Small PDF (~100KB)
- Medium PDF (~5MB)
- Large image (~2MB)

**2. Select Files**
- Drag & drop into dropzone
- OR click and select files
- Files should appear in list below

**3. Verify File List**
- ✅ File names displayed
- ✅ File sizes shown
- ✅ Remove buttons visible
- ✅ Upload button enabled

**4. Click Upload**
- ✅ Button changes to "Uploading..."
- ✅ Progress bars appear
- ✅ Progress updates (0% → 100%)
- ✅ Success checkmarks appear

**5. Check Success**
- ✅ Green success message
- ✅ Batch ID displayed
- ✅ Auto-redirect to dashboard (after 2 seconds)

### Check Database:

```sql
-- View latest batch
SELECT * FROM batches 
ORDER BY created_at DESC 
LIMIT 1;

-- View files for that batch
SELECT * FROM uploads 
WHERE batch_id = 'your-batch-id-here'
ORDER BY created_at DESC;
```

**Expected**:
- Batch exists with status = 'uploaded'
- Files exist with role = 'input'
- storage_path populated

### Check Storage:

1. Go to Storage → batch-files
2. Navigate to: `batches/{batch_id}/inputs/`
3. Should see uploaded files

## Test 6: Dashboard ✅

### Test URL:
```
http://localhost:3000/dashboard
```

### Expected:
- Shows total batches count
- Shows "In Progress" count
- Shows "Completed" count
- Lists recent batches
- Each batch shows:
  - Batch ID (first 8 chars)
  - Status badge (color-coded)
  - Creation date
  - Price ($799.00)
  - Scope (standard/large/complex)

### Test Empty State:
1. Delete all batches:
```sql
DELETE FROM uploads;
DELETE FROM batches;
```
2. Refresh dashboard
3. Should show "No batches yet" message
4. Should show "Upload Documents" button

## Test 7: Error Handling ✅

### Test File Too Large:
1. Try uploading 100MB file
2. **Expected**: Error message "Files must be under 50MB"

### Test Too Many Files:
1. Try uploading 51 files
2. **Expected**: Error message "Maximum 50 files allowed"

### Test Invalid File Type:
1. Try uploading .exe file
2. **Expected**: File rejected (not added to list)

### Test Upload Without Files:
1. Click "Upload" with no files selected
2. **Expected**: Error message "Please add files to upload"

### Test Unauthenticated Access:
1. Sign out
2. Try to access `/upload`
3. **Expected**: Redirect to login or error

## Test 8: Progress Tracking ✅

### Test Real-time Updates:

1. Upload large file (10MB+)
2. Watch progress bar
3. **Expected**:
   - Progress starts at 0%
   - Updates to 10% (got signed URL)
   - Updates to 30% (started upload)
   - Updates to 100% (complete)
   - Status changes: pending → uploading → success

### Test Multiple Files:

1. Upload 5 files
2. Watch each file progress independently
3. **Expected**:
   - Files upload sequentially (not parallel)
   - Each shows individual progress
   - All complete before redirect

## Test 9: Navigation ✅

### Test Nav Links:

1. Click "Dashboard" in nav
   - **Expected**: Navigate to `/dashboard`

2. Click "Upload" in nav
   - **Expected**: Navigate to `/upload`

3. Click "DocStandard" logo
   - **Expected**: Navigate to `/` (home)

4. Click "New Batch" button on dashboard
   - **Expected**: Navigate to `/upload`

## Test 10: Responsive Design ✅

### Mobile Test:

1. Open Chrome DevTools
2. Toggle device toolbar (Cmd/Ctrl + Shift + M)
3. Select iPhone or Android device
4. Test:
   - Upload page displays correctly
   - Dashboard stats stack vertically
   - Navigation accessible
   - File list readable
   - Upload button full-width

### Desktop Test:

1. Resize browser window
2. Test various widths: 1920px, 1440px, 1024px
3. **Expected**:
   - Layout adapts smoothly
   - No horizontal scroll
   - All content visible

## Test 11: Security ✅

### Test Cross-User Access:

1. Create 2 test users (User A, User B)
2. User A uploads files (creates Batch 1)
3. Sign in as User B
4. Try to access Batch 1:

```sql
-- As User B, try to view User A's batch
SELECT * FROM batches WHERE id = 'user-a-batch-id';
```

**Expected**: Returns 0 rows (RLS blocks access)

### Test Signed URL Expiry:

1. Generate signed URL
2. Wait 1 hour
3. Try to upload to expired URL
4. **Expected**: Upload fails with 403 error

### Test Batch Ownership:

1. Sign in as User A
2. Get User B's batch ID
3. Try to upload to User B's batch
4. **Expected**: getSignedUploadUrl() returns "Unauthorized"

## Common Issues & Fixes

### Issue: "Not authenticated" error

**Fix**: 
- Check user is signed in
- Verify auth token in browser DevTools → Application → Cookies

### Issue: "Batch not found" error

**Fix**:
- Check batch exists in database
- Verify batch_id is correct UUID format

### Issue: Upload succeeds but files not in storage

**Fix**:
- Check storage bucket exists
- Verify storage policies applied
- Check browser console for PUT request errors

### Issue: Dashboard shows no batches

**Fix**:
- Check RLS policies allow user to view their batches
- Verify user_id matches in batches table
- Check browser console for SQL errors

### Issue: Progress bar doesn't update

**Fix**:
- Check React state updates working
- Verify no errors in console
- Check file size (very small files complete instantly)

## Success Criteria

All tests passing means:

- ✅ Database schema correct
- ✅ RLS policies working
- ✅ Storage bucket configured
- ✅ File upload functional
- ✅ Progress tracking working
- ✅ Dashboard displays batches
- ✅ Navigation working
- ✅ Error handling robust
- ✅ Security enforced
- ✅ Responsive design

**Phase 3 Status: COMPLETE** 🎉

## Next Steps

After all tests pass:

1. **Production Setup**: Deploy to Vercel/Coolify
2. **Phase 4**: Add authentication UI
3. **Phase 4**: Integrate Stripe payments
4. **Phase 5**: Build admin dashboard
5. **Phase 5**: Implement processing workers

## Quick Commands

```bash
# Start dev server
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build

# View Supabase logs
# Go to Dashboard → Logs
```

## Support

If tests fail:
1. Check browser console
2. Check Supabase logs
3. Review `.env.local` values
4. Verify database migration ran
5. Check storage bucket exists

---

**Happy Testing!** 🧪
