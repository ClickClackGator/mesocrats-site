import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyApiKey } from "../../../lib/verify-api-key";
import { createPartyStackClient } from "../../../lib/partystack-db";
import { apiError, apiSuccess } from "../middleware";

/**
 * GET /api/v1/committees
 *
 * Returns the committee bound to this API key, or null if unbound.
 * Requires a valid API key (committee_id may be null).
 */
export async function GET(request: NextRequest) {
  const keyInfo = await verifyApiKey(request.headers.get("authorization"));
  if (!keyInfo) return apiError("Invalid API key", 401);

  if (!keyInfo.committeeId) {
    return apiSuccess(null, 200);
  }

  const ps = createPartyStackClient();
  const { data: committee, error } = await ps
    .from("committees")
    .select("*")
    .eq("id", keyInfo.committeeId)
    .single();

  if (error) return apiError(error.message, 500);

  return apiSuccess(committee);
}

const VALID_COMMITTEE_TYPES = [
  "national_party",
  "state_party",
  "pac",
  "super_pac",
  "candidate",
] as const;

const VALID_FILING_FREQUENCIES = [
  "quarterly",
  "monthly",
  "semiannual",
] as const;

/**
 * POST /api/v1/committees
 *
 * Creates a committee and binds it to the calling API key.
 * The API key must NOT already be bound to a committee.
 *
 * Writes to TWO databases:
 *   1. PartyStack Supabase — insert committee row
 *   2. Main Supabase — update developer_api_keys.committee_id
 */
export async function POST(request: NextRequest) {
  const keyInfo = await verifyApiKey(request.headers.get("authorization"));
  if (!keyInfo) return apiError("Invalid API key", 401);

  if (keyInfo.committeeId) {
    return apiError("This API key is already bound to a committee", 409);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", 400);
  }

  const name = body.name as string | undefined;
  if (!name?.trim()) {
    return apiError("name is required", 400);
  }

  const committeeType = (body.committee_type as string) || "national_party";
  if (
    !VALID_COMMITTEE_TYPES.includes(
      committeeType as (typeof VALID_COMMITTEE_TYPES)[number]
    )
  ) {
    return apiError(
      `committee_type must be one of: ${VALID_COMMITTEE_TYPES.join(", ")}`,
      400
    );
  }

  const filingFrequency = (body.filing_frequency as string) || "quarterly";
  if (
    !VALID_FILING_FREQUENCIES.includes(
      filingFrequency as (typeof VALID_FILING_FREQUENCIES)[number]
    )
  ) {
    return apiError(
      `filing_frequency must be one of: ${VALID_FILING_FREQUENCIES.join(", ")}`,
      400
    );
  }

  // 1. Insert committee into PartyStack Supabase
  const ps = createPartyStackClient();
  const { data: committee, error: insertError } = await ps
    .from("committees")
    .insert({
      owner_user_id: keyInfo.userId,
      name: name.trim(),
      legal_name: ((body.legal_name as string) || "").trim() || null,
      fec_id: ((body.fec_id as string) || "").trim() || null,
      ein: ((body.ein as string) || "").trim() || null,
      committee_type: committeeType,
      treasurer_name: ((body.treasurer_name as string) || "").trim() || null,
      treasurer_address:
        ((body.treasurer_address as string) || "").trim() || null,
      mailing_address:
        ((body.mailing_address as string) || "").trim() || null,
      filing_frequency: filingFrequency,
    })
    .select()
    .single();

  if (insertError) return apiError(insertError.message, 500);

  // 2. Bind the API key to this committee in Main Supabase
  const mainSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: bindError } = await mainSupabase
    .from("developer_api_keys")
    .update({ committee_id: committee.id })
    .eq("id", keyInfo.id);

  if (bindError) {
    // Committee was created but binding failed — log and still return the
    // committee so the user isn't left in a broken state. They can retry
    // or contact support.
    console.error(
      "[POST /api/v1/committees] Failed to bind key to committee:",
      bindError.message
    );
  }

  return apiSuccess(committee, 201);
}
