import "server-only";

import { decode } from "jsonwebtoken";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import type { AuthToken, KeycloakAccessToken } from "../types/keycloak";
import {
  getAuthEnvConfiguration,
  getDefaultRedirect,
} from "../utilities/env-helpers";
import { refreshAccessToken } from "../resources/refresh-token";
import { fetchUserInfo } from "../resources/user-info";

export function createAuthOptions(): AuthOptions {
  const { clientId, clientSecret, issuer, sessionExpiry } =
    getAuthEnvConfiguration();

  return {
    providers: [
      Keycloak({
        clientId,
        clientSecret,
        issuer,
      }),
    ],
    session: {
      strategy: "jwt",
      maxAge: sessionExpiry,
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;

        const parsedUrl = new URL(url);
        const parsedBase = new URL(baseUrl);

        if (
          parsedUrl.origin === parsedBase.origin &&
          parsedUrl.pathname !== "/"
        ) {
          return url;
        }

        return `${baseUrl}${getDefaultRedirect()}`;
      },

      async jwt({ account, token, user }): Promise<JWT> {
        if (account && user) {
          if (
            !account.access_token ||
            !account.refresh_token ||
            !account.expires_at
          ) {
            throw new Error(
              "Missing required tokens from authentication provider",
            );
          }

          const decodedToken = decode(
            account.access_token,
          ) as KeycloakAccessToken;

          const userInfo = await fetchUserInfo(account.access_token);

          return {
            ...token,
            accessToken: account.access_token,
            accessTokenExpires: account.expires_at * 1000,
            aud: decodedToken.aud,
            idToken: account.id_token!,
            refreshToken: account.refresh_token,
            user: {
              activeOrganization: decodedToken.active_organization,
              email: decodedToken.email,
              emailVerified: decodedToken.email_verified,
              keycloakUserId: user.id!,
              name:
                decodedToken.name ||
                `${decodedToken.given_name || ""} ${decodedToken.family_name || ""}`.trim(),
              groups: userInfo.groups,
              roles: decodedToken.realm_access?.roles ?? [],
            },
          };
        }

        const authToken = token as unknown as AuthToken;

        if (Date.now() < authToken.accessTokenExpires) {
          return token;
        }

        return refreshAccessToken(authToken);
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
  };
}
