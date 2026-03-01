-- PartyStack API — Database Schema
-- Run manually in the PartyStack Supabase SQL editor.
-- This file is for reference/documentation only.

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE committees (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id   uuid NOT NULL,
  name            text NOT NULL,
  legal_name      text,
  fec_id          text,
  ein             text,
  committee_type  text NOT NULL DEFAULT 'national_party',
  treasurer_name  text,
  treasurer_address text,
  mailing_address text,
  filing_frequency text DEFAULT 'quarterly',
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE TABLE contributors (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id    uuid NOT NULL REFERENCES committees(id),
  entity_type     text NOT NULL DEFAULT 'individual',
  first_name      text,
  last_name       text,
  full_name       text,
  email           text,
  address_line1   text,
  address_line2   text,
  city            text,
  state           text,
  zip_code        text,
  employer        text,
  occupation      text,
  match_key       text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE TABLE reports (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id            uuid NOT NULL REFERENCES committees(id),
  report_type             text NOT NULL DEFAULT 'quarterly',
  coverage_start          date NOT NULL,
  coverage_end            date NOT NULL,
  filing_deadline         date,
  status                  text NOT NULL DEFAULT 'draft',
  fec_file_path           text,
  fec_confirmation_number text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

CREATE TABLE contributions (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id            uuid NOT NULL REFERENCES committees(id),
  contributor_id          uuid NOT NULL REFERENCES contributors(id),
  amount_cents            integer NOT NULL,
  date_received           date NOT NULL,
  contribution_type       text DEFAULT 'individual',
  payment_method          text,
  stripe_charge_id        text,
  frequency               text DEFAULT 'one_time',
  citizenship_attested    boolean DEFAULT false,
  personal_funds_attested boolean DEFAULT false,
  non_contractor_attested boolean DEFAULT false,
  personal_card_attested  boolean DEFAULT false,
  age_attested            boolean DEFAULT false,
  ip_address              text,
  aggregate_ytd_cents     integer,
  itemized                boolean DEFAULT false,
  report_id               uuid REFERENCES reports(id),
  created_at              timestamptz DEFAULT now()
);

CREATE TABLE disbursements (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id    uuid NOT NULL REFERENCES committees(id),
  payee_name      text NOT NULL,
  payee_address   text,
  amount_cents    integer NOT NULL,
  date            date NOT NULL,
  purpose         text NOT NULL,
  category        text DEFAULT 'operating',
  check_number    text,
  receipt_url     text,
  report_id       uuid REFERENCES reports(id),
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE aggregates (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id        uuid NOT NULL REFERENCES contributors(id),
  committee_id          uuid NOT NULL REFERENCES committees(id),
  calendar_year         integer NOT NULL,
  total_cents           integer NOT NULL DEFAULT 0,
  contribution_count    integer NOT NULL DEFAULT 0,
  last_contribution_date date,
  itemization_required  boolean DEFAULT false,
  UNIQUE (contributor_id, committee_id, calendar_year)
);

CREATE TABLE audit_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id    uuid NOT NULL REFERENCES committees(id),
  user_id         uuid,
  action          text NOT NULL,
  table_name      text NOT NULL,
  record_id       uuid,
  old_value       jsonb,
  new_value       jsonb,
  ip_address      text,
  created_at      timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_contributors_committee_id ON contributors(committee_id);
CREATE INDEX idx_contributors_match_key    ON contributors(match_key);

CREATE INDEX idx_contributions_committee_id     ON contributions(committee_id);
CREATE INDEX idx_contributions_contributor_id   ON contributions(contributor_id);
CREATE INDEX idx_contributions_date_received    ON contributions(date_received);
CREATE INDEX idx_contributions_committee_created ON contributions(committee_id, created_at);

CREATE INDEX idx_disbursements_committee_id      ON disbursements(committee_id);
CREATE INDEX idx_disbursements_date              ON disbursements(date);
CREATE INDEX idx_disbursements_committee_created ON disbursements(committee_id, created_at);

-- aggregates unique index covers (contributor_id, committee_id, calendar_year)
CREATE INDEX idx_aggregates_committee_id ON aggregates(committee_id);

CREATE INDEX idx_reports_committee_id ON reports(committee_id);
CREATE INDEX idx_reports_status       ON reports(status);

CREATE INDEX idx_audit_log_committee_id ON audit_log(committee_id);
CREATE INDEX idx_audit_log_created_at   ON audit_log(created_at);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- RLS is enabled for defense in depth. Our API routes use the
-- service_role key (which bypasses RLS), but these policies
-- document the intended access patterns.

ALTER TABLE committees     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors   ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE disbursements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE aggregates     ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports        ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log      ENABLE ROW LEVEL SECURITY;

-- Committees: owner can read/write their own
CREATE POLICY committees_owner_select ON committees FOR SELECT USING (owner_user_id = auth.uid());
CREATE POLICY committees_owner_insert ON committees FOR INSERT WITH CHECK (owner_user_id = auth.uid());
CREATE POLICY committees_owner_update ON committees FOR UPDATE USING (owner_user_id = auth.uid());

-- Contributors: scoped by committee ownership
CREATE POLICY contributors_select ON contributors FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY contributors_insert ON contributors FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY contributors_update ON contributors FOR UPDATE
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));

-- Contributions: scoped by committee ownership
CREATE POLICY contributions_select ON contributions FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY contributions_insert ON contributions FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY contributions_update ON contributions FOR UPDATE
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));

-- Disbursements: scoped by committee ownership
CREATE POLICY disbursements_select ON disbursements FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY disbursements_insert ON disbursements FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY disbursements_update ON disbursements FOR UPDATE
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));

-- Aggregates: scoped by committee ownership
CREATE POLICY aggregates_select ON aggregates FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY aggregates_insert ON aggregates FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY aggregates_update ON aggregates FOR UPDATE
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));

-- Reports: scoped by committee ownership
CREATE POLICY reports_select ON reports FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY reports_insert ON reports FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY reports_update ON reports FOR UPDATE
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));

-- Audit log: read-only for committee owners, insert by service role only
CREATE POLICY audit_log_select ON audit_log FOR SELECT
  USING (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
CREATE POLICY audit_log_insert ON audit_log FOR INSERT
  WITH CHECK (committee_id IN (SELECT id FROM committees WHERE owner_user_id = auth.uid()));
