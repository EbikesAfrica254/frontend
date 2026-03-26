import NextAuth, { AuthOptions } from "next-auth";
import {
  authOptions,
  fetchUserInfo,
  KeycloakAccessToken,
  refreshAccessToken,
} from "@repo/features-auth/server";
import { nextAuthSecret } from "@/lib/env";
import { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import { getAuthEnvConfiguration } from "@repo/features-auth/server";
import { decode } from "jsonwebtoken";

const { clientId, clientSecret, issuer } = getAuthEnvConfiguration();

export const clientAuthOptions: AuthOptions = {
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async jwt({ account, token, trigger, user }): Promise<JWT> {
      const baseToken = await authOptions.callbacks?.jwt?.({
        token,
        account,
        user,
        trigger,
      });

      if (!baseToken) {
        return token;
      }

      if (account && baseToken.user?.keycloakUserId) {
        return baseToken;
      }

      if (trigger === "update" && baseToken.user?.keycloakUserId) {
        const refreshedToken = await refreshAccessToken(baseToken);

        if (refreshedToken.error) {
          return refreshedToken;
        }

        const decodedToken = decode(
          refreshedToken.accessToken,
        ) as KeycloakAccessToken;

        const userInfo = await fetchUserInfo(refreshedToken.accessToken);

        return {
          ...refreshedToken,
          user: {
            ...refreshedToken.user,
            activeOrganization: decodedToken.active_organization,
            groups: userInfo.groups,
          },
        };
      }

      return baseToken;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.aud = token.aud;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
  providers: [
    Keycloak({
      clientId,
      clientSecret,
      issuer,
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  secret: nextAuthSecret,
};

const handler = NextAuth(clientAuthOptions);

export { handler as GET, handler as POST };
