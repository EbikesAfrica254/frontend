import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
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
