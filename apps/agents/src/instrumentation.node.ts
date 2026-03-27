import { readFileSync } from "fs";

export async function register() {
  if (process.env.NODE_ENV === "development") return;

  const secrets: Record<string, string> = {
    KEYCLOAK_CLIENT_SECRET: "/run/secrets/agents_keycloak_client_secret",
    NEXTAUTH_SECRET: "/run/secrets/agents_nextauth_secret",
    OTEL_EXPORTER_OTLP_HEADERS: "/run/secrets/agents_otel_otlp_headers",
  };

  for (const [envVar, secretPath] of Object.entries(secrets)) {
    try {
      const value = readFileSync(secretPath, "utf-8").trim();
      if (!value) throw new Error(`Secret file is empty: ${secretPath}`);
      process.env[envVar] = value;
    } catch (err) {
      throw new Error(`Failed to load secret for ${envVar} from ${secretPath}: ${String(err)}`);
    }
  }
}