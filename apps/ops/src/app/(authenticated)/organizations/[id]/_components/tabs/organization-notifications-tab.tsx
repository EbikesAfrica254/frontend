import { searchOrganizationPreferencesResource } from "@repo/features-notifications/server";
import { OrganizationPreferencesMatrix } from "@repo/features-notifications/client";
import type { OrganizationResponse } from "@repo/features-organizations/client";

interface OrganizationNotificationsTabProps {
  organization: OrganizationResponse;
}

export async function OrganizationNotificationsTab({
  organization,
}: OrganizationNotificationsTabProps) {
  const response = await searchOrganizationPreferencesResource(
    `page=1&size=100`,
  ).catch(() => null);

  const preferences = response?.data ?? [];

  return (
    <OrganizationPreferencesMatrix
      organizationId={organization.id}
      preferences={preferences}
    />
  );
}
