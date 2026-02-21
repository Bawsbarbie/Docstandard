-- Add Nova observer worker policy
INSERT INTO ops_policy (key, value) VALUES
('observer_worker_enabled', '{"enabled": true}')
ON CONFLICT (key) DO UPDATE SET value = '{"enabled": true}';
