import path from "path";
import type { NextConfig } from "next";

const s3CspOrders = process.env.S3_CSP_ORIGIN_ORDERS;
const s3CspWorkforce = process.env.S3_CSP_ORIGIN_WORKFORCE;

if (!s3CspOrders) throw new Error("S3_CSP_ORIGIN_ORDERS env var is required");
if (!s3CspWorkforce) throw new Error("S3_CSP_ORIGIN_WORKFORCE env var is required");

const csp = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: ${s3CspOrders} ${s3CspWorkforce}`,
    `frame-src 'self' ${s3CspOrders} ${s3CspWorkforce}`,
    `connect-src 'self' ${s3CspOrders} ${s3CspWorkforce}`,
    `worker-src blob:`,
].join("; ");

const nextConfig: NextConfig = {
    output: "standalone",
    outputFileTracingRoot: path.join(__dirname, "../../"),
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
    transpilePackages: [
        "@repo/ui",
        "@repo/shared",
        "@repo/features-auth",
        "@repo/features-workforce",
        "@repo/features-orders",
        "@repo/features-notifications",
    ],
};

export default nextConfig;