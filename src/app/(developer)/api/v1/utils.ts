import type { SupabaseClient } from "@supabase/supabase-js";

// ── Pagination ──────────────────────────────────────────────

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  let page = parseInt(searchParams.get("page") || "1", 10);
  if (isNaN(page) || page < 1) page = 1;

  let limit = parseInt(searchParams.get("limit") || "50", 10);
  if (isNaN(limit) || limit < 1) limit = 50;
  if (limit > 250) limit = 250;

  return { page, limit, offset: (page - 1) * limit };
}

export function paginationMeta(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    total_pages: Math.ceil(total / limit),
  };
}

// ── Audit Logging ───────────────────────────────────────────

export async function logAudit(
  supabase: SupabaseClient,
  params: {
    committeeId: string;
    userId: string;
    action: string;
    tableName: string;
    recordId?: string;
    oldValue?: unknown;
    newValue?: unknown;
    ipAddress?: string | null;
  }
) {
  // Fire-and-forget — don't block the response on audit writes
  supabase
    .from("audit_log")
    .insert({
      committee_id: params.committeeId,
      user_id: params.userId,
      action: params.action,
      table_name: params.tableName,
      record_id: params.recordId || null,
      old_value: params.oldValue || null,
      new_value: params.newValue || null,
      ip_address: params.ipAddress || null,
    })
    .then(({ error }) => {
      if (error) console.error("[audit_log] Insert failed:", error.message);
    });
}

// ── Validation Helpers ──────────────────────────────────────

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const ts = Date.parse(value);
  return !isNaN(ts);
}

export function clientIp(request: Request): string | null {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}
