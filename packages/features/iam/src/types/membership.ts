import type { UserRole } from "./enums";

export interface MembershipResponse {
  id: string;
  branchId?: string;
  branchName?: string;
  isPrimary: boolean;
  keycloakGroupPath: string;
  keycloakUserId: string;
  organizationId: string;
  organizationName: string;
  roles: string[];
  userExtensionId: string;
}

export interface CreateMembershipRequest {
  branchId?: string;
  branchName?: string;
  isPrimary: boolean;
  organizationId: string;
  organizationName: string;
  roles: UserRole[];
}

export interface UpdateMembershipRolesRequest {
  roles: string[];
}
