-- Create batches/uploads tables and migrate data from orders/order_files

-- Enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'batch_tier') THEN
    CREATE TYPE batch_tier AS ENUM ('standard', 'expedited', 'compliance');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'upload_status') THEN
    CREATE TYPE upload_status AS ENUM ('pending', 'processing', 'completed', 'failed');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'file_role') THEN
    CREATE TYPE file_role AS ENUM ('input', 'output');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'batch_status') THEN
    CREATE TYPE batch_status AS ENUM (
      'created',
      'uploaded',
      'queued',
      'processing',
      'needs_review',
      'delivered',
      'failed'
    );
  END IF;
END $$;

-- Batches table (replaces orders)
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status batch_status NOT NULL DEFAULT 'created',
  tier batch_tier NOT NULL DEFAULT 'standard',
  total_pages INTEGER NOT NULL DEFAULT 2000,
  total_files INTEGER NOT NULL DEFAULT 1000,
  pages_used INTEGER NOT NULL DEFAULT 0,
  files_used INTEGER NOT NULL DEFAULT 0,
  price_cents INTEGER NOT NULL DEFAULT 79900,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- Uploads table (replaces order_files)
CREATE TABLE IF NOT EXISTS uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  role file_role NOT NULL DEFAULT 'input',
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type TEXT,
  page_count INTEGER,
  document_types TEXT[],
  status upload_status NOT NULL DEFAULT 'pending',
  delivery_eta TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploaded_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_batches_user_id ON batches(user_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_created_at ON batches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uploads_batch_id ON uploads(batch_id);
CREATE INDEX IF NOT EXISTS idx_uploads_role ON uploads(role);
CREATE INDEX IF NOT EXISTS idx_uploads_status ON uploads(status);

-- RLS
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'batches' AND policyname = 'Users can view own batches'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own batches"
      ON batches
      FOR SELECT
      USING (auth.uid() = user_id);';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'batches' AND policyname = 'Users can create own batches'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can create own batches"
      ON batches
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'batches' AND policyname = 'Users can update own batches'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can update own batches"
      ON batches
      FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'uploads' AND policyname = 'Users can view own uploads'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own uploads"
      ON uploads
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM batches
          WHERE batches.id = uploads.batch_id
          AND batches.user_id = auth.uid()
        )
      );';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'uploads' AND policyname = 'Users can create uploads for own batches'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can create uploads for own batches"
      ON uploads
      FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM batches
          WHERE batches.id = uploads.batch_id
          AND batches.user_id = auth.uid()
        )
      );';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'uploads' AND policyname = 'Users can update uploads for own batches'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can update uploads for own batches"
      ON uploads
      FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM batches
          WHERE batches.id = uploads.batch_id
          AND batches.user_id = auth.uid()
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM batches
          WHERE batches.id = uploads.batch_id
          AND batches.user_id = auth.uid()
        )
      );';
  END IF;
END $$;

-- updated_at trigger for batches
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_batches_updated_at'
  ) THEN
    CREATE TRIGGER update_batches_updated_at
      BEFORE UPDATE ON batches
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Data migration from orders/order_files if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'orders'
  ) THEN
    EXECUTE $migrate_orders$
      INSERT INTO batches (
        id,
        user_id,
        status,
        tier,
        price_cents,
        stripe_session_id,
        stripe_payment_intent_id,
        notes,
        created_at,
        updated_at,
        paid_at,
        processed_at,
        delivered_at
      )
      SELECT
        o.id,
        o.user_id,
        o.status::text::batch_status,
        CASE
          WHEN o.scope = 'standard' THEN 'standard'
          WHEN o.scope = 'large' THEN 'expedited'
          ELSE 'compliance'
        END::batch_tier,
        o.price_cents,
        o.stripe_session_id,
        o.stripe_payment_intent_id,
        o.notes,
        o.created_at,
        o.updated_at,
        o.paid_at,
        o.processed_at,
        o.delivered_at
      FROM orders o
      ON CONFLICT (id) DO NOTHING;
    $migrate_orders$;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'order_files'
  ) THEN
    DECLARE
      has_role BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'role'
      );
      has_storage_path BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'storage_path'
      );
      has_file_path BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'file_path'
      );
      has_original_name BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'original_name'
      );
      has_mime_type BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'mime_type'
      );
      has_file_type BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'file_type'
      );
      has_page_count BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'page_count'
      );
      has_uploaded_at BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'uploaded_at'
      );
      has_file_size BOOLEAN := EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'order_files' AND column_name = 'file_size_bytes'
      );
    BEGIN
      EXECUTE format(
        'INSERT INTO uploads (
           id, batch_id, role, storage_path, original_name,
           file_size_bytes, mime_type, page_count, created_at, uploaded_at, status
         )
         SELECT
           f.id,
           f.order_id,
           %s,
           %s,
           %s,
           %s,
           %s,
           %s,
           f.created_at,
           %s,
           %s
         FROM order_files f
         ON CONFLICT (id) DO NOTHING;',
        CASE
          WHEN has_role THEN 'f.role'
          ELSE '''input''::file_role'
        END,
        CASE
          WHEN has_storage_path AND has_file_path THEN 'COALESCE(f.storage_path, f.file_path, ''unknown'')'
          WHEN has_storage_path THEN 'COALESCE(f.storage_path, ''unknown'')'
          WHEN has_file_path THEN 'COALESCE(f.file_path, ''unknown'')'
          ELSE '''unknown'''
        END,
        CASE
          WHEN has_original_name AND has_storage_path THEN 'COALESCE(f.original_name, f.storage_path)'
          WHEN has_original_name AND has_file_path THEN 'COALESCE(f.original_name, f.file_path)'
          WHEN has_original_name THEN 'f.original_name'
          WHEN has_storage_path THEN 'COALESCE(f.storage_path, ''unknown'')'
          WHEN has_file_path THEN 'COALESCE(f.file_path, ''unknown'')'
          ELSE '''unknown'''
        END,
        CASE
          WHEN has_file_size THEN 'f.file_size_bytes'
          ELSE 'NULL'
        END,
        CASE
          WHEN has_mime_type AND has_file_type THEN 'COALESCE(f.mime_type, f.file_type)'
          WHEN has_mime_type THEN 'f.mime_type'
          WHEN has_file_type THEN 'f.file_type'
          ELSE 'NULL'
        END,
        CASE
          WHEN has_page_count THEN 'f.page_count'
          ELSE 'NULL'
        END,
        CASE
          WHEN has_uploaded_at THEN 'f.uploaded_at'
          ELSE 'f.created_at'
        END,
        '''completed''::upload_status'
      );
    END;
  END IF;
END $$;

-- Drop legacy order_files table
DROP TABLE IF EXISTS order_files;
