import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Rewrite developer.mesocrats.org requests to /developer/* path
  const isDeveloperSubdomain =
    hostname === "developer.mesocrats.org" ||
    hostname.startsWith("developer.localhost");

  if (isDeveloperSubdomain) {
    // Already has /developer prefix -- don't double-prepend
    if (pathname.startsWith("/developer")) {
      return NextResponse.next();
    }

    // Let Next.js internals and static assets pass through
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon") ||
      pathname === "/icon.png"
    ) {
      return NextResponse.next();
    }

    // Rewrite to /developer/* path
    const url = request.nextUrl.clone();
    url.pathname = `/developer${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
