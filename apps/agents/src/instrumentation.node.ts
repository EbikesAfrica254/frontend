import { loadDockerSecrets } from "@repo/shared/server";

export async function register() {
  loadDockerSecrets({
    KEYCLOAK_CLIENT_SECRET: "/run/secrets/ops_keycloak_client_secret",
    NEXTAUTH_SECRET: "/run/secrets/ops_nextauth_secret",
    OTEL_EXPORTER_OTLP_HEADERS: "/run/secrets/ops_otel_otlp_headers",
  });
}
