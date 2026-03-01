import { createClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client for the PartyStack API database.
 * Server-side only — uses the service role key.
 */
export function createPartyStackClient() {
  const url = process.env.PARTYSTACK_SUPABASE_URL;
  const key = process.env.PARTYSTACK_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing PARTYSTACK_SUPABASE_URL or PARTYSTACK_SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key);
}
