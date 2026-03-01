"use server";

import { createSupabaseServerClient } from "../../lib/supabase-server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// NOTE: Any existing plain-text keys in developer_api_keys predate hashing.
// They should be revoked and regenerated. No automated migration is provided —
// revoke via the dashboard and create fresh keys.

export async function createApiKey(keyName: string) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const rawKey = `mce_live_${crypto.randomBytes(16).toString("hex")}`;
  const prefix = rawKey.slice(0, 12);
  const hashedKey = await bcrypt.hash(rawKey, 12);

  const { error } = await supabase.from("developer_api_keys").insert({
    user_id: user.id,
    key_name: keyName,
    api_key: hashedKey,
    prefix,
    is_active: true,
  });

  if (error) return { error: error.message };

  // Return the raw key ONE TIME — it is not stored and cannot be retrieved
  return { key: rawKey, prefix };
}

export async function revokeApiKey(keyId: string) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("developer_api_keys")
    .update({ is_active: false, revoked_at: new Date().toISOString() })
    .eq("id", keyId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  return { success: true };
}

export async function listApiKeys() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated", keys: [] };

  const { data, error } = await supabase
    .from("developer_api_keys")
    .select("id, key_name, prefix, is_active, created_at, last_used_at, revoked_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message, keys: [] };

  return { keys: data ?? [] };
}
