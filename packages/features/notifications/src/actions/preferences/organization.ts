"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  createOrganizationPreferenceResource,
  deleteOrganizationPreferenceResource,
  updateOrganizationPreferenceResource,
} from "../../resources/preferences/organization";
import type {
  CreateOrganizationPreferenceRequest,
  UpdateOrganizationPreferenceRequest,
} from "../../types/preferences";

export const createOrganizationPreference = withAction(
  async (organizationId: string, data: CreateOrganizationPreferenceRequest) => {
    const result = await createOrganizationPreferenceResource(data);

    revalidatePath(`/organizations/${organizationId}`);

    return result;
  },
);

export const deleteOrganizationPreference = withAction(
  async (id: string, organizationId: string) => {
    const result = await deleteOrganizationPreferenceResource(id);

    revalidatePath(`/organizations/${organizationId}`);

    return result;
  },
);

export const updateOrganizationPreference = withAction(
  async (
    id: string,
    organizationId: string,
    data: UpdateOrganizationPreferenceRequest,
  ) => {
    const result = await updateOrganizationPreferenceResource(id, data);

    revalidatePath(`/organizations/${organizationId}`);

    return result;
  },
);
