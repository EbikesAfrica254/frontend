"use server";

import { revalidatePath } from "next/cache";
import {
  createMembershipResource,
  removeFromOrganizationResource,
  removeMembershipResource,
  setPrimaryMembershipResource,
  updateMembershipRolesResource,
} from "../resources/memberships";
import type {
  CreateMembershipRequest,
  UpdateMembershipRolesRequest,
} from "../types/membership";
import { withAction } from "@repo/shared/actions";

export const createMembership = withAction(
  async (
    keycloakUserId: string,
    data: CreateMembershipRequest,
    userExtensionId: string,
  ) => {
    const result = await createMembershipResource(keycloakUserId, data);

    revalidatePath(`/iam/users/${userExtensionId}`);

    return result;
  },
);

export const removeMembership = withAction(
  async (
    keycloakUserId: string,
    organizationId: string,
    keycloakGroupPath: string,
    userExtensionId: string,
    branchId?: string,
  ) => {
    const result = await removeMembershipResource(
      keycloakUserId,
      organizationId,
      keycloakGroupPath,
      branchId,
    );

    revalidatePath(`/iam/users/${userExtensionId}`);

    return result;
  },
);

export const removeFromOrganization = withAction(
  async (
    keycloakUserId: string,
    organizationId: string,
    keycloakGroupPath: string,
    userExtensionId: string,
  ) => {
    const result = await removeFromOrganizationResource(
      keycloakUserId,
      organizationId,
      keycloakGroupPath,
    );

    revalidatePath(`/iam/users/${userExtensionId}`);

    return result;
  },
);

export const setPrimaryMembership = withAction(
  async (
    keycloakUserId: string,
    organizationId: string,
    userExtensionId: string,
  ) => {
    const result = await setPrimaryMembershipResource(
      keycloakUserId,
      organizationId,
    );

    revalidatePath(`/iam/users/${userExtensionId}`);

    return result;
  },
);

export const updateMembershipRoles = withAction(
  async (
    keycloakUserId: string,
    organizationId: string,
    data: UpdateMembershipRolesRequest,
    userExtensionId: string,
    branchId?: string,
  ) => {
    const result = await updateMembershipRolesResource(
      keycloakUserId,
      organizationId,
      branchId,
      data,
    );

    revalidatePath(`/iam/users/${userExtensionId}`);

    return result;
  },
);
