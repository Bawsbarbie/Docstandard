-- Add page_count to order_files for accurate page-based metrics

ALTER TABLE order_files
ADD COLUMN IF NOT EXISTS page_count INTEGER;
