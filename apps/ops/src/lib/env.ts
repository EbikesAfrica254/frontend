import { getRequiredEnv } from "@repo/shared/server";

export const environment = process.env.NODE_ENV as
  | "development"
  | "production"
  | "test";

export const nextAuthSecret = getRequiredEnv("NEXTAUTH_SECRET");
export const whitelistedEmailDomains = getRequiredEnv(
  "WHITELISTED_EMAIL_DOMAINS",
  "",
).split(",");
