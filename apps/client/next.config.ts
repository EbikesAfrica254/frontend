import type { NextConfig } from "next";
import path from "path";

const s3CspOrders = process.env.S3_CSP_ORIGIN_ORDERS;
const s3CspOrganizations = process.env.S3_CSP_ORIGIN_ORGANIZATIONS;

if (!s3CspOrders) throw new Error("S3_CSP_ORIGIN_ORDERS env var is required");
if (!s3CspOrganizations) throw new Error("S3_CSP_ORIGIN_ORGANIZATIONS env var is required");

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${s3CspOrders} ${s3CspOrganizations} https://tile.openstreetmap.org https://basemaps.cartocdn.com`,
  `frame-src 'self' ${s3CspOrders} ${s3CspOrganizations}`,
  `connect-src 'self' ${s3CspOrders} ${s3CspOrganizations} https://tile.openstreetmap.org https://basemaps.cartocdn.com`,
  `worker-src blob:`,
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: [
    "@repo/ui",
    "@repo/shared",
    "@repo/features-auth",
    "@repo/features-iam",
    "@repo/features-maker-checker",
    "@repo/features-notifications",
    "@repo/features-orders",
    "@repo/features-organizations",
  ],
};

export default nextConfig;
