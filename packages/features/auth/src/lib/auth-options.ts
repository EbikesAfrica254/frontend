import "server-only";

import {decode} from "jsonwebtoken";
import type {AuthOptions} from "next-auth";
import type {JWT} from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import {AuthToken, KeycloakAccessToken} from "../types/keycloak";
import {getAuthEnvConfiguration, getDefaultRedirect,} from "../utilities/env-helpers";
import {refreshAccessToken} from "../resources/refresh-token";
import {fetchUserInfo} from "../resources/user-info";

const {clientId, clientSecret, issuer, sessionExpiry} =
    getAuthEnvConfiguration();

/**
 * Base authentication options for NextAuth
 *
 * This is the shared base configuration that should be extended by individual apps
 * (client, ops, web) with their own specific callbacks.
 *
 * CRITICAL: When extending this configuration:
 * - Always spread `...authOptions.callbacks` to preserve these base callbacks
 * - The redirect, jwt, and session callbacks contain essential authentication logic
 * - Audience validation is included for cross-app token isolation
 */
export const authOptions: AuthOptions = {
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
        /**
         * Redirect callback - handles post-authentication navigation
         *
         * Priority:
         * 1. Relative URLs (starting with "/")
         * 2. Same-origin URLs with meaningful paths
         * 3. Default redirect from environment variable
         *
         * This logic is CRITICAL and must be preserved when extending.
         */
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;

            // Parse URLs to check if there's a meaningful path
            const parsedUrl = new URL(url);
            const parsedBase = new URL(baseUrl);

            // If the same origin AND has a path beyond just "/", use it
            if (
                parsedUrl.origin === parsedBase.origin &&
                parsedUrl.pathname !== "/"
            ) {
                return url;
            }

            // Default redirect for root or external URLs
            const defaultRedirect = getDefaultRedirect();
            return `${baseUrl}${defaultRedirect}`;
        },

        /**
         * JWT callback - handles token creation and refresh
         *
         * Responsibilities:
         * - Initial token creation with user info and organization data
         * - Automatic token refresh before expiry
         * - Organization membership parsing from Keycloak groups
         * - Audience claim extraction for token validation
         *
         * This callback must be preserved to maintain the authentication state.
         */
        async jwt({account, token, user}): Promise<JWT> {
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
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at * 1000,
                    aud: decodedToken.aud,
                    idToken: account.id_token!,
                    refreshToken: account.refresh_token,
                    user: {
                        activeOrganization: decodedToken.active_organization,
                        email: decodedToken.email,
                        emailVerified: decodedToken.email_verified,
                        keycloakUserId: user.id,
                        name:
                            decodedToken.name ||
                            `${decodedToken.given_name || ""} ${decodedToken.family_name || ""}`.trim(),
                        groups: userInfo.groups,
                        roles: decodedToken.realm_access?.roles ?? [],
                    },
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            return refreshAccessToken(token as AuthToken);
        },

        /**
         * Session callback - exposes token data to the client
         *
         * Makes authentication state and audience claim available via useSession() hook
         */
        async session({session, token}) {
            session.accessToken = token.accessToken;
            session.aud = token.aud;
            session.error = token.error;
            session.user = token.user;
            return session;
        },
    },
};
