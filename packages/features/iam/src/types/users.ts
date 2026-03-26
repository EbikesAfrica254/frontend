import type { UserStatus } from "./enums";
import type { MembershipResponse } from "./membership";
import { UserRole } from "@repo/shared/client";

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  organizationId?: string;
  branchId?: string;
  roles: UserRole[];
}

export interface UpdateUserExtensionRequest {
  email?: string;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  organizationId?: string;
  status?: UserStatus;
}

export interface UserExtensionResponse {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  keycloakUserId: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UserExtensionSummaryResponse {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  status: UserStatus;
  updatedAt: string;
  username: string;
}

export interface UserProfileResponse {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  status: UserStatus;
  activeMembership: MembershipResponse;
  memberships: MembershipResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
}
