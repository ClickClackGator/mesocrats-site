import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

/**
 * Verify a developer API key from the Authorization header.
 *
 * 1. Extract the raw key from "Bearer mce_live_..."
 * 2. Derive the prefix (first 12 chars) and look up active rows
 * 3. bcrypt.compare against each candidate hash (typically 1 row)
 * 4. On match, update last_used_at and return the key row
 */
export async function verifyApiKey(authHeader: string | null) {
  if (!authHeader) return null;

  const rawKey = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!rawKey || !rawKey.startsWith("mce_live_")) return null;

  const prefix = rawKey.slice(0, 12);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: candidates, error } = await supabase
    .from("developer_api_keys")
    .select("id, user_id, key_name, api_key, prefix, committee_id")
    .eq("prefix", prefix)
    .eq("is_active", true);

  if (error || !candidates || candidates.length === 0) return null;

  for (const row of candidates) {
    const match = await bcrypt.compare(rawKey, row.api_key);
    if (match) {
      // Update last_used_at (fire-and-forget)
      supabase
        .from("developer_api_keys")
        .update({ last_used_at: new Date().toISOString() })
        .eq("id", row.id)
        .then(() => {});

      return {
        id: row.id,
        userId: row.user_id,
        keyName: row.key_name,
        committeeId: row.committee_id as string | null,
      };
    }
  }

  return null;
}
