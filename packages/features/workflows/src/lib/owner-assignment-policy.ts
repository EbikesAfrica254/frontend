import "server-only";
import { auth } from "@repo/features-auth/server";
import { UserRole } from "@repo/shared/client";
import type { OwnerAssignmentPolicy } from "../components/organizations/wizard/create-organization-wizard";

function hasAnyRole(userRoles: string[] | undefined, roles: readonly string[]) {
  if (!userRoles?.length) return false;
  return roles.some((role) => userRoles.includes(role));
}

const ORGANIZATION_SCOPED_ROLES = [
  UserRole.ORGANIZATION_ADMIN,
  UserRole.ORGANIZATION_CHECKER,
  UserRole.ORGANIZATION_FLEET_MANAGER,
  UserRole.ORGANIZATION_FLEET_SUPPORT,
  UserRole.ORGANIZATION_INVENTORY_MANAGER,
  UserRole.ORGANIZATION_MAKER,
  UserRole.ORGANIZATION_OPERATOR,
] as const;

const BRANCH_SCOPED_ROLES = [
  UserRole.BRANCH_ADMIN,
  UserRole.BRANCH_CHECKER,
  UserRole.BRANCH_FLEET_MANAGER,
  UserRole.BRANCH_FLEET_SUPPORT,
  UserRole.BRANCH_INVENTORY_MANAGER,
  UserRole.BRANCH_MAKER,
  UserRole.BRANCH_OPERATOR,
] as const;

export async function resolveOwnerAssignmentPolicy(): Promise<OwnerAssignmentPolicy> {
  const session = await auth();
  const user = session?.user;
  const initialOwnerId = user?.keycloakUserId;

  if (!initialOwnerId) {
    throw new Error("User not authenticated");
  }

  const roles = user.roles ?? [];

  if (roles.includes(UserRole.SYSTEM_ADMIN)) {
    return {
      initialOwnerDisplayName: user.name,
      initialOwnerEmail: user.email,
      initialOwnerId,
      mode: "GLOBAL_SEARCH",
    };
  }

  if (hasAnyRole(roles, BRANCH_SCOPED_ROLES)) {
    return {
      activeBranch: user.activeBranch,
      activeOrganization: user.activeOrganization,
      initialOwnerDisplayName: user.name,
      initialOwnerEmail: user.email,
      initialOwnerId,
      mode: "BRANCH_SEARCH",
    };
  }

  if (hasAnyRole(roles, ORGANIZATION_SCOPED_ROLES)) {
    return {
      activeOrganization: user.activeOrganization,
      initialOwnerDisplayName: user.name,
      initialOwnerEmail: user.email,
      initialOwnerId,
      mode: "ORGANIZATION_SEARCH",
    };
  }

  return {
    activeBranch: user.activeBranch,
    activeOrganization: user.activeOrganization,
    initialOwnerDisplayName: user.name,
    initialOwnerEmail: user.email,
    initialOwnerId,
    mode: "FIXED_SELF",
  };
}
