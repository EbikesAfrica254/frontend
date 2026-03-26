"use client";

import { useMemo } from "react";
import type { OperationalScope } from "../types/scope";
import { UserRole } from "@repo/shared/client";

const ROLE_AUTHORITY: Record<UserRole, number> = {
  [UserRole.SYSTEM_ADMIN]: 100,
  [UserRole.ORGANIZATION_ADMIN]: 80,
  [UserRole.BRANCH_ADMIN]: 60,
  [UserRole.ORGANIZATION_CHECKER]: 40,
  [UserRole.ORGANIZATION_FLEET_MANAGER]: 40,
  [UserRole.ORGANIZATION_FLEET_SUPPORT]: 40,
  [UserRole.ORGANIZATION_INVENTORY_MANAGER]: 40,
  [UserRole.ORGANIZATION_MAKER]: 40,
  [UserRole.ORGANIZATION_OPERATOR]: 40,
  [UserRole.AGENT]: 20,
  [UserRole.BRANCH_CHECKER]: 20,
  [UserRole.BRANCH_FLEET_MANAGER]: 20,
  [UserRole.BRANCH_FLEET_SUPPORT]: 20,
  [UserRole.BRANCH_INVENTORY_MANAGER]: 20,
  [UserRole.BRANCH_MAKER]: 20,
  [UserRole.BRANCH_OPERATOR]: 20,
  [UserRole.CUSTOMER]: 0,
};

export interface RoleOption {
  isBranchRole: boolean;
  isOrganizationRole: boolean;
  label: string;
  value: UserRole;
}

export interface UseAvailableRolesReturn {
  availableRoles: RoleOption[];
}

const ALL_ROLES: RoleOption[] = [
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "System Admin",
    value: UserRole.SYSTEM_ADMIN,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Admin",
    value: UserRole.ORGANIZATION_ADMIN,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Checker",
    value: UserRole.ORGANIZATION_CHECKER,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Fleet Manager",
    value: UserRole.ORGANIZATION_FLEET_MANAGER,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Fleet Support",
    value: UserRole.ORGANIZATION_FLEET_SUPPORT,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Inventory Manager",
    value: UserRole.ORGANIZATION_INVENTORY_MANAGER,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Maker",
    value: UserRole.ORGANIZATION_MAKER,
  },
  {
    isBranchRole: false,
    isOrganizationRole: true,
    label: "Organization Operator",
    value: UserRole.ORGANIZATION_OPERATOR,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Agent",
    value: UserRole.AGENT,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Admin",
    value: UserRole.BRANCH_ADMIN,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Checker",
    value: UserRole.BRANCH_CHECKER,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Fleet Manager",
    value: UserRole.BRANCH_FLEET_MANAGER,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Fleet Support",
    value: UserRole.BRANCH_FLEET_SUPPORT,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Inventory Manager",
    value: UserRole.BRANCH_INVENTORY_MANAGER,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Maker",
    value: UserRole.BRANCH_MAKER,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Branch Operator",
    value: UserRole.BRANCH_OPERATOR,
  },
  {
    isBranchRole: true,
    isOrganizationRole: false,
    label: "Customer",
    value: UserRole.CUSTOMER,
  },
];

export function useAvailableRoles(
  scope: OperationalScope,
  roles: string[],
  targetOrganizationId?: string,
  targetBranchId?: string,
): UseAvailableRolesReturn {
  return useMemo(() => {
    const empty: UseAvailableRolesReturn = { availableRoles: [] };

    if (!roles.length) return empty;

    const highestAuthority = Math.max(
      0,
      ...roles.map((r) => ROLE_AUTHORITY[r as UserRole] ?? 0),
    );

    const isSystemAdmin = scope.kind === "system";
    const isOrganizationScope = scope.kind === "organization";
    const isBranchScope = scope.kind === "branch";

    // org-scoped users cannot assign roles in a different organization
    if (
      !isSystemAdmin &&
      targetOrganizationId &&
      targetOrganizationId !== scope.organizationId
    ) {
      return empty;
    }

    // branch-scoped users can only assign roles within their own branch
    if (isBranchScope) {
      if (!targetBranchId) return empty;
      if (targetBranchId !== scope.branchId) return empty;
    }

    const availableRoles = ALL_ROLES.filter((role) => {
      // must have equal or greater authority than the role being assigned
      if (highestAuthority < (ROLE_AUTHORITY[role.value] ?? 0)) return false;

      // branch-scoped users can only assign branch-level roles
      if (
        (isBranchScope || isOrganizationScope) &&
        !role.isBranchRole &&
        role.value !== UserRole.ORGANIZATION_ADMIN
      ) {
        if (isBranchScope) return role.isBranchRole;
      }

      // only system admins can assign SYSTEM_ADMIN
      return !(role.value === UserRole.SYSTEM_ADMIN && !isSystemAdmin);
    });

    return { availableRoles };
  }, [scope, roles, targetOrganizationId, targetBranchId]);
}
