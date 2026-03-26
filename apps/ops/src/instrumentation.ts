import { readFileSync } from "fs";

/**
 * Next.js instrumentation hook — runs once before the server handles requests.
 *
 * Reads Docker Swarm secrets from /run/secrets/ and injects them into
 * process.env. This is the Next.js-native alternative to an entrypoint
 * shell script, keeping secret injection in application code where it belongs.
 *
 * Secret files are provisioned by Docker Swarm from the SSM Parameter Store
 * at container startup. They are never present at build time.
 *
 * In local development, secrets are read from .env.local by Next.js directly,
 * and this hook is a no-op.
 *
 * Only runs in the Node.js runtime — never on the edge or client.
 */
export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") return;
    if (process.env.NODE_ENV === "development") return;

    const secrets: Record<string, string> = {
        KEYCLOAK_CLIENT_SECRET: "/run/secrets/ops_keycloak_client_secret",
        NEXTAUTH_SECRET: "/run/secrets/ops_nextauth_secret",
        OTEL_EXPORTER_OTLP_HEADERS: "/run/secrets/ops_otel_otlp_headers",
    };

    for (const [envVar, secretPath] of Object.entries(secrets)) {
        try {
            const value = readFileSync(secretPath, "utf-8").trim();
            if (!value) {
                throw new Error(`Secret file is empty: ${secretPath}`);
            }
            process.env[envVar] = value;
        } catch (err) {
            throw new Error(
                `Failed to load secret for ${envVar} from ${secretPath}: ${String(err)}`
            );
        }
    }
}