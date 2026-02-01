-- DocStandard.co Initial Schema Migration
-- This migration creates the core tables for the document processing service

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- ENUMS
-- ==========================================

-- Order status lifecycle
CREATE TYPE order_status AS ENUM (
  'created',      -- Order initialized, awaiting upload
  'uploaded',     -- Files uploaded, awaiting payment
  'queued',       -- Payment received, queued for processing
  'processing',   -- Currently being processed
  'needs_review', -- Processing complete, needs manual review
  'delivered',    -- Final files delivered to customer
  'failed'        -- Processing failed
);

-- Batch scope/complexity
CREATE TYPE batch_scope AS ENUM (
  'standard',     -- Up to 50 documents
  'large',        -- 51-150 documents
  'complex'       -- 150+ documents or special handling
);

-- File role in the order
CREATE TYPE file_role AS ENUM (
  'input',        -- Customer uploaded file
  'output'        -- Processed file ready for delivery
);

-- ==========================================
-- TABLES
-- ==========================================

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status order_status NOT NULL DEFAULT 'created',
  scope batch_scope NOT NULL DEFAULT 'standard',
  price_cents INTEGER NOT NULL DEFAULT 79900,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- Order files table
CREATE TABLE order_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  role file_role NOT NULL DEFAULT 'input',
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploaded_at TIMESTAMPTZ
);

-- ==========================================
-- INDEXES
-- ==========================================

-- Performance indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_files_order_id ON order_files(order_id);
CREATE INDEX idx_order_files_role ON order_files(role);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

-- Orders policies
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders (limited fields)
CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order files policies
-- Users can view files for their own orders
CREATE POLICY "Users can view own order files"
  ON order_files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can insert files for their own orders
CREATE POLICY "Users can upload files to own orders"
  ON order_files
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can update files for their own orders
CREATE POLICY "Users can update own order files"
  ON order_files
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ==========================================
-- FUNCTIONS & TRIGGERS
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on orders
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- STORAGE BUCKETS
-- ==========================================

-- Note: Storage buckets and policies must be created via Supabase Dashboard or API
-- Bucket name: 'order-files'
-- Structure:
--   orders/{order_id}/inputs/{file_id}.{ext}
--   orders/{order_id}/outputs/{file_id}.{ext}

-- Storage policies (to be applied via Dashboard):
-- 1. Users can upload to their own order folders
-- 2. Users can read from their own order folders
-- 3. Service role has full access

-- ==========================================
-- SEED DATA (Optional)
-- ==========================================

-- Example: Insert test order statuses for development
-- Uncomment for local development only
/*
INSERT INTO orders (user_id, status, scope, notes) VALUES
  (auth.uid(), 'created', 'standard', 'Test order 1'),
  (auth.uid(), 'uploaded', 'standard', 'Test order 2'),
  (auth.uid(), 'delivered', 'standard', 'Test order 3');
*/

-- ==========================================
-- GRANTS (for Service Role)
-- ==========================================

-- Service role needs full access for worker operations
-- These grants are typically automatic via Supabase, but explicit for clarity

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Grant all on tables to service_role
GRANT ALL ON orders TO service_role;
GRANT ALL ON order_files TO service_role;

-- ==========================================
-- COMMENTS
-- ==========================================

COMMENT ON TABLE orders IS 'Customer orders for document processing services';
COMMENT ON TABLE order_files IS 'Files associated with orders (both inputs and outputs)';
COMMENT ON COLUMN orders.price_cents IS 'Price in cents (79900 = $799.00)';
COMMENT ON COLUMN orders.scope IS 'Batch size/complexity tier';
COMMENT ON COLUMN order_files.storage_path IS 'Path in Supabase Storage bucket';
COMMENT ON COLUMN order_files.role IS 'Whether this is an input or output file';
