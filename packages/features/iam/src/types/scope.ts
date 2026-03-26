import { UserRole } from "@repo/shared/client";

export const ORGANIZATION_SCOPE_ROLES = new Set<UserRole>([
  UserRole.ORGANIZATION_ADMIN,
  UserRole.ORGANIZATION_CHECKER,
  UserRole.ORGANIZATION_FLEET_MANAGER,
  UserRole.ORGANIZATION_FLEET_SUPPORT,
  UserRole.ORGANIZATION_INVENTORY_MANAGER,
  UserRole.ORGANIZATION_MAKER,
  UserRole.ORGANIZATION_OPERATOR,
]);

export const SYSTEM_SCOPE_ROLES = new Set<UserRole>([UserRole.SYSTEM_ADMIN]);

export interface BranchScope {
  branchId: string;
  kind: "branch";
  organizationId: string;
}

export interface OrganizationScope {
  kind: "organization";
  organizationId: string;
}

export interface SystemScope {
  kind: "system";
}

export type OperationalScope = BranchScope | OrganizationScope | SystemScope;

export function isBranchScope(scope: OperationalScope): scope is BranchScope {
  return scope.kind === "branch";
}

export function isOrganizationScope(
  scope: OperationalScope,
): scope is OrganizationScope {
  return scope.kind === "organization";
}

export function isSystemScope(scope: OperationalScope): scope is SystemScope {
  return scope.kind === "system";
}
