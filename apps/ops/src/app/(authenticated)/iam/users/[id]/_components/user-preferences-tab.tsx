import type { UserExtensionResponse } from "@repo/features-iam/client";
import { searchUserPreferencesResource } from "@repo/features-notifications/server";
import { UserPreferencesMatrix } from "@repo/features-notifications/client";

interface UserPreferencesTabProps {
  user: UserExtensionResponse;
}

export async function UserPreferencesTab({ user }: UserPreferencesTabProps) {
  const preferencesResponse = await searchUserPreferencesResource(
    user.keycloakUserId,
    "",
  );

  const preferences = preferencesResponse.data || [];

  return (
    <UserPreferencesMatrix
      keycloakUserId={user.keycloakUserId}
      preferences={preferences}
    />
  );
}
