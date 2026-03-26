import type { Session } from "next-auth";
import { UserRole } from "@repo/shared/client";

import type { OperationalScope } from "../types/scope";
import { ORGANIZATION_SCOPE_ROLES, SYSTEM_SCOPE_ROLES } from "../types/scope";

// The base/platform organization — all internal eBikes operators
// belong to this org. Used to distinguish internal users from customers
// in the client app.
export const BASE_ORGANIZATION_ID = "00000000-0000-0000-0000-000000000000";

// Roles that participate in maker-checker approval workflows.
// Consumed by navigation visibility and proxy route enforcement.
const MAKER_CHECKER_ROLES = new Set<UserRole>([
  UserRole.BRANCH_ADMIN,
  UserRole.BRANCH_CHECKER,
  UserRole.BRANCH_MAKER,
  UserRole.ORGANIZATION_ADMIN,
  UserRole.ORGANIZATION_CHECKER,
  UserRole.ORGANIZATION_MAKER,
  UserRole.SYSTEM_ADMIN,
]);

export function resolveScope(session: Session | null): OperationalScope | null {
  const user = session?.user;
  if (!user?.roles?.length) return null;

  const roles = user.roles as UserRole[];

  if (roles.some((r) => SYSTEM_SCOPE_ROLES.has(r))) {
    return { kind: "system" };
  }

  const organizationId = user.activeOrganization;
  if (!organizationId) return null;

  if (roles.some((r) => ORGANIZATION_SCOPE_ROLES.has(r))) {
    return { kind: "organization", organizationId };
  }

  const branchId = user.activeBranch;
  if (!branchId) return null;

  return { branchId, kind: "branch", organizationId };
}

export function canAccessMakerChecker(session: Session | null): boolean {
  const roles = session?.user?.roles as UserRole[] | undefined;
  if (!roles?.length) return false;
  return roles.some((role) => MAKER_CHECKER_ROLES.has(role));
}

export function isBaseOrganization(session: Session | null): boolean {
  return session?.user?.activeOrganization === BASE_ORGANIZATION_ID;
}
