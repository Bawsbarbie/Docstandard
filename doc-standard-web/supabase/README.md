# Supabase Setup

## Overview

This directory contains database migrations and setup instructions for DocStandard.co.

## Migration Files

- `migrations/20260201000000_initial_schema.sql` - Initial database schema with orders, order_files, enums, and RLS policies

## Running Migrations

### Option 1: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase (if not already done)
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Option 2: Manual via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `migrations/20260201000000_initial_schema.sql`
4. Click **Run**

### Option 3: Using Migration Tool

```bash
# Using supabase CLI
supabase migration up
```

## Storage Bucket Setup

After running migrations, create the storage bucket:

### Via Supabase Dashboard:

1. Go to **Storage** → **Create Bucket**
2. Name: `order-files`
3. Public: **No** (private)
4. File size limit: 50MB per file
5. Allowed MIME types: `application/pdf`, `image/*`, `application/vnd.*`

### Storage Policies (Apply via Dashboard):

**Policy 1: Users can upload to own orders**
```sql
CREATE POLICY "Users can upload to own order folders"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'order-files' AND
  (storage.foldername(name))[1] = 'orders' AND
  auth.uid()::text IN (
    SELECT user_id::text FROM orders 
    WHERE id::text = (storage.foldername(name))[2]
  )
);
```

**Policy 2: Users can read own order files**
```sql
CREATE POLICY "Users can read own order files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'order-files' AND
  (storage.foldername(name))[1] = 'orders' AND
  auth.uid()::text IN (
    SELECT user_id::text FROM orders 
    WHERE id::text = (storage.foldername(name))[2]
  )
);
```

**Policy 3: Service role has full access**
```sql
CREATE POLICY "Service role has full access"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'order-files');
```

## Schema Overview

### Enums

- `order_status`: created, uploaded, queued, processing, needs_review, delivered, failed
- `batch_scope`: standard, large, complex
- `file_role`: input, output

### Tables

**orders**
- Primary customer orders table
- Tracks order lifecycle and payment
- Default price: $799.00 (79900 cents)

**order_files**
- Files associated with orders
- Both input (customer) and output (processed) files
- Links to Supabase Storage

### RLS Policies

All tables have Row Level Security enabled:
- Users can only access their own orders and files
- Service role has full access for worker operations

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Testing the Schema

After setup, test with:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check enums
SELECT typname FROM pg_type WHERE typtype = 'e';

-- Check RLS policies
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';

-- Test insert (as authenticated user)
INSERT INTO orders (user_id) VALUES (auth.uid());
```

## Troubleshooting

### Issue: "permission denied for table orders"

**Solution**: RLS is enabled. Make sure you're authenticated as a user, or use service role.

### Issue: "relation 'orders' does not exist"

**Solution**: Migration hasn't run. Execute the SQL migration file.

### Issue: "type 'order_status' does not exist"

**Solution**: Enums weren't created. Run the full migration from the beginning.

### Issue: Storage bucket not found

**Solution**: Create the `order-files` bucket via Dashboard or API.

## Schema Diagram

```
┌─────────────────┐
│     orders      │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ status          │
│ scope           │
│ price_cents     │
│ stripe_*        │
│ created_at      │
│ updated_at      │
└─────────────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│  order_files    │
├─────────────────┤
│ id (PK)         │
│ order_id (FK)   │
│ role            │
│ storage_path    │
│ original_name   │
│ file_size_bytes │
│ created_at      │
└─────────────────┘
         │
         │ references
         │
         ▼
  Supabase Storage
  orders/{order_id}/
    ├── inputs/
    └── outputs/
```

## Next Steps

1. ✅ Run migration
2. ✅ Create storage bucket
3. ✅ Apply storage policies
4. ✅ Test with authenticated user
5. → Implement upload flow in app
