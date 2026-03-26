"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  createOrganizationResource,
  deactivateOrganizationResource,
  getOrganizationBranchesResource,
  getOrganizationResource,
  searchOrganizationsResource,
  updateOrganizationResource,
} from "../resources/organizations";
import type {
  CreateOrganizationRequest,
  DeactivateOrganizationRequest,
  UpdateOrganizationRequest,
} from "../types/organizations";

export const createOrganization = withAction(
  async (body: CreateOrganizationRequest) => {
    const result = await createOrganizationResource(body);

    revalidatePath("/organizations");

    return result;
  },
);

export const deactivateOrganization = withAction(
  async (organizationId: string, body: DeactivateOrganizationRequest) => {
    const result = await deactivateOrganizationResource(organizationId, body);

    revalidatePath(`/organizations/${organizationId}`);
    revalidatePath("/organizations");

    return result;
  },
);

export const getOrganization = withAction(async (organizationId: string) => {
  return await getOrganizationResource(organizationId);
});

export const getOrganizationBranches = withAction(
  async (organizationId: string) => {
    return await getOrganizationBranchesResource(organizationId);
  },
);

export const searchOrganizations = withPaginatedAction(
  async (queryString: string) => {
    return await searchOrganizationsResource(queryString);
  },
);

export const updateOrganization = withAction(
  async (organizationId: string, body: UpdateOrganizationRequest) => {
    const result = await updateOrganizationResource(organizationId, body);

    revalidatePath(`/organizations/${organizationId}`);
    revalidatePath("/organizations");

    return result;
  },
);
