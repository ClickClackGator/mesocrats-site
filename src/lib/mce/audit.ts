// src/lib/mce/audit.ts
// Mesocratic Compliance Engine — Audit Log
//
// Immutable append-only record of every data mutation in the
// donation system.  Fire-and-forget: never blocks the caller.

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function writeAuditLog(
  tableName: string,
  recordId: string,
  action: 'create' | 'update' | 'delete',
  oldValue: Record<string, unknown> | null,
  newValue: Record<string, unknown> | null,
  ipAddress: string | null
): Promise<void> {
  try {
    const { error } = await getSupabase().from('audit_log').insert({
      table_name: tableName,
      record_id: recordId,
      action,
      old_value: oldValue,
      new_value: newValue,
      ip_address: ipAddress,
    });

    if (error) {
      console.error('[MCE Audit] Insert failed:', error.message);
    }
  } catch (err) {
    console.error(
      '[MCE Audit] Unexpected error:',
      err instanceof Error ? err.message : err
    );
  }
}
