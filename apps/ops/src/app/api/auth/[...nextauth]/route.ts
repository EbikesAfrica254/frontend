import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@repo/features-auth/server";
import { nextAuthSecret, whitelistedEmailDomains } from "@/lib/env";
import {
  getAuthEnvConfiguration,
  validateEmailDomain,
} from "@repo/features-auth/server";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";

const { clientId, clientSecret, issuer } = getAuthEnvConfiguration();

export const opsAuthOptions: AuthOptions = {
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "keycloak") {
        const email = user.email || profile?.email;
        try {
          const isAllowed = validateEmailDomain(email, whitelistedEmailDomains);
          if (!isAllowed) {
            console.warn(`Access denied: ${email}`);
            return false;
          }
        } catch (error) {
          console.error(`Validation error:`, error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user }): Promise<JWT> {
      const baseToken = await authOptions.callbacks?.jwt?.({
        token,
        account,
        user,
      });

      if (!baseToken) {
        return token;
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

const handler = NextAuth(opsAuthOptions);

export { handler as GET, handler as POST };
