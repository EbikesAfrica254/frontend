interface EnvHelpers {
  clientId: string;
  clientSecret: string;
  issuer: string;
  sessionExpiry?: number;
}

export function getAuthEnvConfiguration(): EnvHelpers {
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
  const issuer = process.env.KEYCLOAK_ISSUER;
  const sessionExpiry = process.env.KEYCLOAK_MAX_SESSION_AGE
    ? parseInt(process.env.KEYCLOAK_MAX_SESSION_AGE, 10)
    : 4 * 60 * 60;

  const missingVars: string[] = [];

  if (!clientId) missingVars.push("KEYCLOAK_CLIENT_ID");
  if (!clientSecret) missingVars.push("KEYCLOAK_CLIENT_SECRET");
  if (!issuer) missingVars.push("KEYCLOAK_ISSUER");

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Keycloak environment variables: ${missingVars.join(", ")}`,
    );
  }

  return {
    clientId: clientId!,
    clientSecret: clientSecret!,
    issuer: issuer!,
    sessionExpiry: sessionExpiry!,
  };
}

/**
 * Get the default redirect path after authentication
 * Reads from NEXTAUTH_DEFAULT_REDIRECT environment variable
 * Defaults to "/" if not set
 */
export function getDefaultRedirect(): string {
  return process.env.NEXTAUTH_DEFAULT_REDIRECT || "/";
}
