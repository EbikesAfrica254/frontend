import "server-only";

import { validateAudience } from "@repo/features-auth/server";
import { auth } from "@repo/features-auth/server";
import { FetchConfiguration } from "@repo/shared/server";
import { baseFetch } from "@repo/shared/server";

export async function authenticatedIamFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  expectedClientId?: string,
): Promise<T> {
  const token = await getAuthToken(expectedClientId);
  return baseIamFetch<T>(endpoint, options, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function unauthenticatedIamFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  return baseIamFetch<T>(endpoint, options);
}

function baseIamFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  configuration: FetchConfiguration = {},
): Promise<T> {
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...configuration.headers,
      ...options.headers,
    },
  };

  return baseFetch<T>(
    `${process.env.IAM_SERVICE_BASE_URL}`,
    endpoint,
    mergedOptions,
    configuration,
  );
}

async function getAuthToken(expectedClientId?: string): Promise<string> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Authentication required: No access token available");
  }

  if (expectedClientId && session.aud) {
    if (!validateAudience(session.aud, expectedClientId)) {
      throw new Error(
        `Invalid token audience: Expected ${expectedClientId}, got ${typeof session.aud === "string" ? session.aud : session.aud.join(", ")}`,
      );
    }
  }

  return session.accessToken;
}
