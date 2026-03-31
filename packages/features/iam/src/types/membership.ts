import { UserRole } from "@repo/shared/client";

export interface MembershipResponse {
  id: string;
  branchId?: string;
  branchName?: string;
  isPrimary: boolean | null;
  keycloakGroupPath: string;
  keycloakUserId: string;
  organizationId: string;
  organizationName?: string;
  roles: string[];
  userExtensionId: string;
}

export interface CreateMembershipRequest {
  branchId?: string;
  isPrimary: boolean;
  organizationId: string;
  roles: UserRole[];
}

export interface UpdateMembershipRolesRequest {
  roles: UserRole[];
}
