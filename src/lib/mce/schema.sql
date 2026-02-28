-- Mesocratic Compliance Engine (MCE) — Full Database Schema
-- Generated from live Supabase introspection on 2026-02-28
--
-- This file is the authoritative reference for the MCE schema.
-- Run new tables/views in the Supabase SQL Editor to apply.
--
-- TODO: Remove ISPOLITICAL_API_URL, ISPOLITICAL_API_KEY, ISPOLITICAL_API_SECRET from Vercel env vars

-- ============================================================
-- EXISTING TABLE: donors
-- ============================================================
CREATE TABLE IF NOT EXISTS donors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id text UNIQUE,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  employer text NOT NULL,
  occupation text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- ============================================================
-- EXISTING TABLE: donations
-- ============================================================
CREATE TABLE IF NOT EXISTS donations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id uuid NOT NULL REFERENCES donors(id),
  stripe_charge_id text NOT NULL,
  stripe_subscription_id text,
  amount_cents integer NOT NULL,
  currency text DEFAULT 'usd',
  frequency text NOT NULL,
  status text DEFAULT 'succeeded' NOT NULL,
  fec_itemized boolean DEFAULT false,
  ispolitical_synced boolean DEFAULT false,
  ispolitical_sync_error text,
  metadata jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- ============================================================
-- EXISTING MATERIALIZED VIEW: donation_annual_totals
-- ============================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS donation_annual_totals AS
SELECT
  donor_id,
  EXTRACT(YEAR FROM created_at)::integer AS year,
  SUM(amount_cents)::bigint AS total_cents,
  COUNT(*)::bigint AS donation_count
FROM donations
WHERE status = 'succeeded'
GROUP BY donor_id, EXTRACT(YEAR FROM created_at);

-- RPC to refresh the materialized view after each donation
CREATE OR REPLACE FUNCTION refresh_donation_totals()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW donation_annual_totals;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- NEW TABLE: audit_log (MCE)
-- ============================================================
-- Immutable append-only log of all data mutations across the
-- donation system. Supports multi-committee use via committee_id.
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  committee_id text DEFAULT 'mnc' NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  old_value jsonb,
  new_value jsonb,
  user_id text,
  ip_address text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_record
  ON audit_log (table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created
  ON audit_log (created_at);

-- ============================================================
-- NEW TABLE: disbursements (MCE)
-- ============================================================
-- Tracks committee expenditures for FEC Schedule B reporting.
CREATE TABLE IF NOT EXISTS disbursements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  committee_id text DEFAULT 'mnc' NOT NULL,
  payee_name text NOT NULL,
  payee_address_line1 text NOT NULL,
  payee_address_city text NOT NULL,
  payee_address_state text NOT NULL,
  payee_address_zip text NOT NULL,
  amount_cents integer NOT NULL,
  date date NOT NULL,
  purpose text NOT NULL,
  category text NOT NULL CHECK (
    category IN ('operating', 'contribution', 'independent_expenditure', 'other')
  ),
  check_number text,
  receipt_url text,
  report_id uuid,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_disbursements_date
  ON disbursements (date);
CREATE INDEX IF NOT EXISTS idx_disbursements_category
  ON disbursements (category);

-- ============================================================
-- NEW TABLE: compliance_follow_ups (MCE)
-- ============================================================
-- Tracks employer/occupation follow-up requests for donors who
-- aggregate over $200 without complete FEC-required information.
CREATE TABLE IF NOT EXISTS compliance_follow_ups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id uuid NOT NULL REFERENCES donors(id),
  donation_id uuid NOT NULL REFERENCES donations(id),
  follow_up_type text NOT NULL CHECK (follow_up_type IN ('employer_occupation')),
  sent_at timestamptz NOT NULL,
  response_received_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_compliance_follow_ups_donor
  ON compliance_follow_ups (donor_id);

-- ============================================================
-- MIGRATION: Remove ISPolitical columns from donations table
-- Run this AFTER confirming audit_log table is working
-- ============================================================
-- ALTER TABLE donations DROP COLUMN IF EXISTS ispolitical_synced;
-- ALTER TABLE donations DROP COLUMN IF EXISTS ispolitical_sync_error;
