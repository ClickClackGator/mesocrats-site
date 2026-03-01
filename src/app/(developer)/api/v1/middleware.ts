import { NextResponse } from "next/server";
import { verifyApiKey } from "../../lib/verify-api-key";

export function apiError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiSuccess(data: any, status = 200) {
  return NextResponse.json({ data }, { status });
}

/**
 * Authenticate an API request using a Bearer token.
 *
 * Returns the verified key info on success, or an error response.
 */
export async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get("authorization");
  const keyInfo = await verifyApiKey(authHeader);

  if (!keyInfo) {
    return { error: "Invalid API key" as const, status: 401 as const };
  }

  if (!keyInfo.committeeId) {
    return {
      error:
        "API key not bound to a committee. Create a committee first via POST /api/v1/committees." as const,
      status: 403 as const,
    };
  }

  return {
    userId: keyInfo.userId,
    committeeId: keyInfo.committeeId,
    keyId: keyInfo.id,
  };
}
