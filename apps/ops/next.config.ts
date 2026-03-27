import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
