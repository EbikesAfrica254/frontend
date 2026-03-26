import type { Session } from "next-auth";
import { UserRole } from "@repo/shared/client";

const DRAFT_CREATION_ROLES = new Set<UserRole>([
  UserRole.BRANCH_ADMIN,
  UserRole.BRANCH_OPERATOR,
  UserRole.ORGANIZATION_ADMIN,
  UserRole.ORGANIZATION_OPERATOR,
  UserRole.SYSTEM_ADMIN,
]);

export function canCreateDraft(session: Session | null): boolean {
  const roles = session?.user?.roles as UserRole[] | undefined;
  if (!roles?.length) return false;
  return roles.some((role) => DRAFT_CREATION_ROLES.has(role));
}
