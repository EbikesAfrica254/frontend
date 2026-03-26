"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  createBranchResource,
  deactivateBranchResource,
  reinstateBranchResource,
  suspendBranchResource,
  updateBranchResource,
} from "../resources/branches";
import type {
  CreateBranchRequest,
  DeactivateBranchRequest,
  UpdateBranchRequest,
} from "../types/branches";

export const createBranch = withAction(
  async (organizationId: string, body: CreateBranchRequest) => {
    const result = await createBranchResource(organizationId, body);

    revalidatePath(`/organizations/${organizationId}/branches`);

    return result;
  },
);

export const deactivateBranch = withAction(
  async (
    organizationId: string,
    branchId: string,
    body: DeactivateBranchRequest,
  ) => {
    const result = await deactivateBranchResource(
      organizationId,
      branchId,
      body,
    );

    revalidatePath(`/organizations/${organizationId}/branches/${branchId}`);
    revalidatePath(`/organizations/${organizationId}/branches`);

    return result;
  },
);

export const reinstateBranch = withAction(
  async (organizationId: string, branchId: string) => {
    const result = await reinstateBranchResource(organizationId, branchId);

    revalidatePath(`/organizations/${organizationId}/branches/${branchId}`);
    revalidatePath(`/organizations/${organizationId}/branches`);

    return result;
  },
);

export const suspendBranch = withAction(
  async (organizationId: string, branchId: string) => {
    const result = await suspendBranchResource(organizationId, branchId);

    revalidatePath(`/organizations/${organizationId}/branches/${branchId}`);
    revalidatePath(`/organizations/${organizationId}/branches`);

    return result;
  },
);

export const updateBranch = withAction(
  async (
    organizationId: string,
    branchId: string,
    body: UpdateBranchRequest,
  ) => {
    const result = await updateBranchResource(organizationId, branchId, body);

    revalidatePath(`/organizations/${organizationId}/branches/${branchId}`);
    revalidatePath(`/organizations/${organizationId}/branches`);

    return result;
  },
);
