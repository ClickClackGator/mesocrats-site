import { NextResponse } from "next/server";
import { verifyApiKey } from "../../lib/verify-api-key";

export function apiError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function apiSuccess(data: any, status = 200) {
  return NextResponse.json({ data }, { status });
}

type AuthError = { error: string; status: number };
type AuthSuccess = { userId: string; committeeId: string; keyId: string };

/**
 * Authenticate an API request using a Bearer token.
 *
 * Returns the verified key info on success, or an error response.
 */
export async function authenticateRequest(
  request: Request
): Promise<AuthError | AuthSuccess> {
  const authHeader = request.headers.get("authorization");
  const keyInfo = await verifyApiKey(authHeader);

  if (!keyInfo) {
    return { error: "Invalid API key", status: 401 };
  }

  if (!keyInfo.committeeId) {
    return {
      error:
        "API key not bound to a committee. Create a committee first via POST /api/v1/committees.",
      status: 403,
    };
  }

  return {
    userId: keyInfo.userId,
    committeeId: keyInfo.committeeId,
    keyId: keyInfo.id,
  };
}
