import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "landdevspec.net";
const CANONICAL_ORIGIN = "https://landdevspec.net";

function requestProtocol(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0].trim().toLowerCase();
  return request.nextUrl.protocol.replace(":", "").toLowerCase();
}

function hostname(request: NextRequest): string {
  const host = request.headers.get("host") ?? request.nextUrl.host;
  return host.split(":")[0].toLowerCase();
}

export function middleware(request: NextRequest) {
  const host = hostname(request);

  if (/hostingersite\.com|localhost|127\.0\.0\.1/i.test(host)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // www (either protocol) and plain http on the apex go to https://landdevspec.net.
  // Path and query are kept. HTTPS on the apex is not redirected, so this cannot loop.
  // Plain HTTP only reaches this app when the host accepts port 80.
  // A hang on port 80 is fixed in Hostinger hPanel: Force HTTPS.
  const proto = requestProtocol(request);
  const isWww = host === `www.${CANONICAL_HOST}`;
  const isApexHttp = host === CANONICAL_HOST && proto === "http";
  if (isWww || isApexHttp) {
    const destination = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      CANONICAL_ORIGIN,
    );
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
