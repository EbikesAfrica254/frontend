"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  activateTemplateResource,
  createTemplateResource,
  deactivateTemplateResource,
  getTemplateResource,
  searchTemplatesResource,
  updateTemplateResource,
} from "../resources/templates";
import type {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from "../types/templates";

export const activateTemplate = withAction(async (id: string) => {
  const result = await activateTemplateResource(id);

  revalidatePath(`/notifications/templates/${id}`);
  revalidatePath("/notifications/templates");

  return result;
});

export const createTemplate = withAction(
  async (data: CreateTemplateRequest) => {
    const result = await createTemplateResource(data);

    revalidatePath("/notifications/templates");

    return result;
  },
);

export const deactivateTemplate = withAction(async (id: string) => {
  const result = await deactivateTemplateResource(id);

  revalidatePath(`/notifications/templates/${id}`);
  revalidatePath("/notifications/templates");

  return result;
});

export const getTemplate = withAction(async (id: string) => {
  return getTemplateResource(id);
});

export const searchTemplates = withPaginatedAction(
  async (queryString: string) => {
    return searchTemplatesResource(queryString);
  },
);

export const updateTemplate = withAction(
  async (id: string, data: UpdateTemplateRequest) => {
    const result = await updateTemplateResource(id, data);

    revalidatePath(`/notifications/templates/${id}`);
    revalidatePath("/notifications/templates");

    return result;
  },
);
