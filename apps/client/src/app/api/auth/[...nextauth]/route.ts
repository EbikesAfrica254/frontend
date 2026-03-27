import "server-only";

import type { NextRequest } from "next/server";
import NextAuth, { type AuthOptions } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { decode } from "jsonwebtoken";
import {
  createAuthOptions,
  fetchUserInfo,
  getAuthEnvConfiguration,
  refreshAccessToken,
} from "@repo/features-auth/server";
import type {
  AuthToken,
  KeycloakAccessToken,
} from "@repo/features-auth/server";

export const dynamic = "force-dynamic";

function buildHandler() {
  const { clientId, clientSecret, issuer } = getAuthEnvConfiguration();
  const base = createAuthOptions();

  const clientAuthOptions: AuthOptions = {
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

        if (
          account &&
          (baseToken as unknown as AuthToken).user?.keycloakUserId
        ) {
          return baseToken;
        }

        if (
          trigger === "update" &&
          (baseToken as unknown as AuthToken).user?.keycloakUserId
        ) {
          const refreshed = await refreshAccessToken(
            baseToken as unknown as AuthToken,
          );

          if (refreshed.error) return refreshed;

          const decodedToken = decode(
            refreshed.accessToken,
          ) as KeycloakAccessToken;
          const userInfo = await fetchUserInfo(refreshed.accessToken);

          return {
            ...refreshed,
            user: {
              ...refreshed.user,
              activeOrganization: decodedToken.active_organization,
              groups: userInfo.groups,
            },
          };
        }

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

  return NextAuth(clientAuthOptions);
}

export async function GET(req: NextRequest, ctx: { params: unknown }) {
  return buildHandler()(req, ctx);
}

export async function POST(req: NextRequest, ctx: { params: unknown }) {
  return buildHandler()(req, ctx);
}
