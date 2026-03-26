import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";
import type {AuthToken} from "@repo/features-auth/server";
import {getAuthEnvConfiguration} from "../utilities/env-helpers";

const {clientId, issuer} = getAuthEnvConfiguration();

/**
 * Federated logout endpoint following OIDC RP-Initiated Logout spec
 * https://openid.net/specs/openid-connect-rpinitiated-1_0.html
 */
export async function POST(req: NextRequest) {
    try {
        const token = (await getToken({req})) as AuthToken | null;

        if (!token) {
            return NextResponse.json({error: "No active session"}, {status: 401});
        }

        if (token.error === "RefreshAccessTokenError") {
            return NextResponse.json({error: "Session expired"}, {status: 401});
        }

        if (!token.idToken) {
            console.error("ID token not available in session");
            return NextResponse.json(
                {error: "Invalid session data"},
                {status: 500},
            );
        }

        const redirectUri = process.env.NEXTAUTH_URL;

        if (!issuer || !redirectUri) {
            console.error("Missing required environment variables", {
                hasIssuer: !!issuer,
                hasRedirectUri: !!redirectUri,
            });
            return NextResponse.json(
                {error: "Server configuration error"},
                {status: 500},
            );
        }

        const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);

        logoutUrl.searchParams.set("id_token_hint", token.idToken);
        logoutUrl.searchParams.set("post_logout_redirect_uri", redirectUri);

        if (clientId) {
            logoutUrl.searchParams.set("client_id", clientId);
        }

        return NextResponse.json({
            url: logoutUrl.href,
        });
    } catch (error) {
        console.error("Federated logout error:", error);
        return NextResponse.json(
            {error: "Logout requests failed"},
            {status: 500},
        );
    }
}

// Block other HTTP methods
export async function GET() {
    return NextResponse.json(
        {error: "Method not allowed. Use POST."},
        {status: 405},
    );
}
