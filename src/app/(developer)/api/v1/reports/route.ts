import { NextRequest } from "next/server";
import { createPartyStackClient } from "../../../lib/partystack-db";
import { authenticateRequest, apiError, apiSuccess } from "../middleware";
import { logAudit, isValidDate, clientIp } from "../utils";

const VALID_REPORT_TYPES = [
  "quarterly",
  "monthly",
  "semiannual",
  "year_end",
  "amendment",
] as const;

/**
 * GET /api/v1/reports
 */
export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) return apiError(auth.error, auth.status);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const reportType = searchParams.get("report_type");

  const ps = createPartyStackClient();

  let query = ps
    .from("reports")
    .select("*")
    .eq("committee_id", auth.committeeId)
    .order("coverage_start", { ascending: false });

  if (status) query = query.eq("status", status);
  if (reportType) query = query.eq("report_type", reportType);

  const { data, error } = await query;

  if (error) return apiError(error.message, 500);

  return apiSuccess(data);
}

/**
 * POST /api/v1/reports
 */
export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if ("error" in auth) return apiError(auth.error, auth.status);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", 400);
  }

  const coverageStart = ((body.coverage_start as string) || "").trim();
  const coverageEnd = ((body.coverage_end as string) || "").trim();
  const reportType = ((body.report_type as string) || "quarterly").trim();
  const filingDeadline = ((body.filing_deadline as string) || "").trim() || null;

  // Validation
  const errors: string[] = [];
  if (!coverageStart || !isValidDate(coverageStart))
    errors.push("coverage_start is required and must be YYYY-MM-DD");
  if (!coverageEnd || !isValidDate(coverageEnd))
    errors.push("coverage_end is required and must be YYYY-MM-DD");
  if (
    coverageStart &&
    coverageEnd &&
    isValidDate(coverageStart) &&
    isValidDate(coverageEnd) &&
    coverageStart >= coverageEnd
  ) {
    errors.push("coverage_start must be before coverage_end");
  }
  if (
    !VALID_REPORT_TYPES.includes(
      reportType as (typeof VALID_REPORT_TYPES)[number]
    )
  ) {
    errors.push(
      `report_type must be one of: ${VALID_REPORT_TYPES.join(", ")}`
    );
  }
  if (filingDeadline && !isValidDate(filingDeadline)) {
    errors.push("filing_deadline must be YYYY-MM-DD");
  }

  if (errors.length > 0) {
    return apiError(errors.join("; "), 400);
  }

  const ps = createPartyStackClient();
  const { data: report, error } = await ps
    .from("reports")
    .insert({
      committee_id: auth.committeeId,
      report_type: reportType,
      coverage_start: coverageStart,
      coverage_end: coverageEnd,
      filing_deadline: filingDeadline,
      status: "draft",
    })
    .select()
    .single();

  if (error) return apiError(error.message, 500);

  logAudit(ps, {
    committeeId: auth.committeeId,
    userId: auth.userId,
    action: "create",
    tableName: "reports",
    recordId: report.id,
    newValue: report,
    ipAddress: clientIp(request),
  });

  return apiSuccess(report, 201);
}
