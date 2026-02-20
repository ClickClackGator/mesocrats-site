-- Mesocrats Supabase schema
-- Run this in the Supabase SQL Editor to create the required tables.

CREATE TABLE IF NOT EXISTS contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  email text NOT NULL,
  first_name text,
  last_name text,
  state text,
  source text NOT NULL,
  phone text,
  message text,
  metadata jsonb
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL
);

CREATE TABLE IF NOT EXISTS policy_ideas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  policy_area text NOT NULL,
  title text NOT NULL,
  description text NOT NULL
);
