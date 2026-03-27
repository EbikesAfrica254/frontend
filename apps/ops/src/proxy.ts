import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { validateAudience } from "@repo/features-auth/client";

function buildCsp(): string {
  const s3Orders = process.env.S3_CSP_ORIGIN_ORDERS;
  const s3Organizations = process.env.S3_CSP_ORIGIN_ORGANIZATIONS;
  const s3Workforce = process.env.S3_CSP_ORIGIN_WORKFORCE;

  if (!s3Orders) throw new Error("S3_CSP_ORIGIN_ORDERS is required");
  if (!s3Organizations)
    throw new Error("S3_CSP_ORIGIN_ORGANIZATIONS is required");
  if (!s3Workforce) throw new Error("S3_CSP_ORIGIN_WORKFORCE is required");

  return [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: ${s3Orders} ${s3Organizations} ${s3Workforce} https://tile.openstreetmap.org https://basemaps.cartocdn.com`,
    `frame-src 'self' ${s3Orders} ${s3Organizations} ${s3Workforce}`,
    `connect-src 'self' ${s3Orders} ${s3Organizations} ${s3Workforce} https://tile.openstreetmap.org https://basemaps.cartocdn.com`,
    `worker-src blob:`,
  ].join("; ");
}

export default withAuth(
  function proxy() {
    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", buildCsp());
    return response;
  },
  {
    callbacks: {
      authorized({ token }) {
        if (!token) return false;

        if (!validateAudience(token.aud, "ebikes-ops")) {
          console.warn("Invalid audience for ops app:", token.aud);
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: "/api/auth/signin",
    },
  },
);

export const config = {
  matcher: ["/((?!api/auth|api/health|_next/static|_next/image|favicon.ico).*)"],
};
