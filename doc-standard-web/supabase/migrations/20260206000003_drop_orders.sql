-- Drop legacy orders table after migration to batches/uploads

DROP TABLE IF EXISTS orders CASCADE;
