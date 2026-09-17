-- D1 schema for the enquiry wizard. Optional: functions/api/enquiry.ts
-- degrades gracefully if this table (or D1 itself) isn't set up yet.
--
-- Apply with:
--   npx wrangler d1 execute <your-db-name> --file=migrations/0001_enquiries.sql
--   npx wrangler d1 execute <your-db-name> --file=migrations/0001_enquiries.sql --remote

CREATE TABLE IF NOT EXISTS enquiry_submissions (
  id TEXT PRIMARY KEY,
  ip TEXT,
  service TEXT NOT NULL,
  site_type TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TEXT NOT NULL,
  -- The full structured enquiry (service details, access, conditions,
  -- timing, file references, contact) as JSON — one record is enough for
  -- Farrelly Bros' current scale; split into columns later if that changes.
  data TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiry_submissions_created_at
  ON enquiry_submissions (created_at);

CREATE INDEX IF NOT EXISTS idx_enquiry_submissions_ip_created_at
  ON enquiry_submissions (ip, created_at);
