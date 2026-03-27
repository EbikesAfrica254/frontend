import type { Session } from "next-auth";
import type { UserRole } from "@repo/shared/client";

export function hasAllRoles(
  session: Session | null,
  roles: UserRole[],
): boolean {
  if (!session?.user?.roles) return false;
  return roles.every((role) => session.user.roles.includes(role));
}

export function hasAnyRole(
  session: Session | null,
  roles: UserRole[],
): boolean {
  if (!session?.user?.roles) return false;
  return roles.some((role) => session.user.roles.includes(role));
}

export function hasRole(session: Session | null, role: UserRole): boolean {
  if (!session?.user?.roles) return false;
  return session.user.roles.includes(role);
}
