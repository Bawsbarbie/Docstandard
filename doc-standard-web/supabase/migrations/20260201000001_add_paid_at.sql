-- Add paid_at timestamp to orders table
-- This tracks when the order was successfully paid via Stripe

ALTER TABLE orders 
ADD COLUMN paid_at TIMESTAMPTZ;

COMMENT ON COLUMN orders.paid_at IS 'Timestamp when payment was completed via Stripe';
