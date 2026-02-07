-- Add customer_email to batches

ALTER TABLE batches
ADD COLUMN IF NOT EXISTS customer_email TEXT;
