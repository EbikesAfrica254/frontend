
import { loadDockerSecrets } from "@repo/shared/server";

export async function register() {
  loadDockerSecrets({
    KEYCLOAK_CLIENT_SECRET: "/run/secrets/client_keycloak_client_secret",
    NEXTAUTH_SECRET: "/run/secrets/client_nextauth_secret",
    OTEL_EXPORTER_OTLP_HEADERS: "/run/secrets/client_otel_otlp_headers",
  });
}
