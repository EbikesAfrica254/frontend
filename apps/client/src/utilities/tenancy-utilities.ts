import "server-only";
import {
  getOrganizationMembershipResources,
  getOrganizationMembershipResourcesWithToken,
} from "@repo/features/iam/src/resources";
import { OrganizationMembership } from "@repo/features-auth";

/**
 * Builds organization memberships from IAM data
 *
 * @param keycloakUserId - The user's Keycloak ID
 * @param accessToken - Optional access token for authentication during JWT callback
 * @returns Array of organization memberships with full data from IAM
 */
export async function buildOrganizationMemberships(
  keycloakUserId: string,
  accessToken?: string,
): Promise<OrganizationMembership[]> {
  try {
    const membershipData = accessToken
      ? await getOrganizationMembershipResourcesWithToken(
          keycloakUserId,
          accessToken,
        )
      : await getOrganizationMembershipResources(keycloakUserId);

    return membershipData.map((membership) => ({
      id: membership.organizationId,
      isPrimary: membership.isPrimary,
      keycloakGroupPath: membership.keycloakGroupPath,
      name: membership.organizationName,
    }));
  } catch (error) {
    console.error(
      `Failed to build organization memberships for user ${keycloakUserId}:`,
      {
        error,
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
      },
    );

    return [];
  }
}
