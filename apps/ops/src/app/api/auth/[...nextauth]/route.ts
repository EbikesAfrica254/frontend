import "server-only";

import type { NextRequest } from "next/server";
import NextAuth, { type AuthOptions } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import {
  createAuthOptions,
  getAuthEnvConfiguration,
  validateEmailDomain,
} from "@repo/features-auth/server";
import type { AuthToken } from "@repo/features-auth/server";

export const dynamic = "force-dynamic";

function buildHandler() {
  const { clientId, clientSecret, issuer } = getAuthEnvConfiguration();
  const base = createAuthOptions();

  const whitelistedEmailDomains = (process.env.WHITELISTED_EMAIL_DOMAINS ?? "")
    .split(",")
    .filter(Boolean);

  const opsAuthOptions: AuthOptions = {
    ...base,
    providers: [
      Keycloak({
        clientId,
        clientSecret,
        issuer,
        authorization: {
          params: { prompt: "login" },
        },
      }),
    ],
    callbacks: {
      ...base.callbacks,
      async signIn({ user, account, profile }) {
        if (account?.provider === "keycloak") {
          const email = user.email || profile?.email;
          try {
            const isAllowed = validateEmailDomain(
              email,
              whitelistedEmailDomains,
            );
            if (!isAllowed) {
              console.warn(`Access denied: ${email}`);
              return false;
            }
          } catch (error) {
            console.error("Validation error:", error);
            return false;
          }
        }
        return true;
      },

      async jwt({ account, token, user, trigger, session }) {
        const baseToken = base.callbacks?.jwt
          ? await base.callbacks.jwt({
              token,
              user,
              account,
              trigger,
              session,
            })
          : token;

        if (!baseToken) return token;

        return baseToken;
      },

      async session({ session, token }) {
        const authToken = token as unknown as AuthToken;
        session.accessToken = authToken.accessToken;
        session.aud = authToken.aud;
        session.error = authToken.error;
        session.user = authToken.user;
        return session;
      },
    },
    pages: {
      error: "/auth/error",
    },
  };

  return NextAuth(opsAuthOptions);
}

export async function GET(req: NextRequest, ctx: { params: unknown }) {
  return buildHandler()(req, ctx);
}

export async function POST(req: NextRequest, ctx: { params: unknown }) {
  return buildHandler()(req, ctx);
}
