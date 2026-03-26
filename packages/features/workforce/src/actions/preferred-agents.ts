"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  createPreferredAgentResource,
  deletePreferredAgentResource,
  getPreferredAgentResource,
  searchPreferredAgentsResource,
  updatePreferredAgentResource,
} from "../resources/preferred-agents";
import type {
  CreatePreferredAgentRequest,
  UpdatePreferredAgentRequest,
} from "../types/preferred-agents";

export const createPreferredAgent = withAction(
  async (body: CreatePreferredAgentRequest) => {
    const result = await createPreferredAgentResource(body);

    revalidatePath("/workforce/preferred-agents");

    return result;
  },
);

export const searchPreferredAgents = withPaginatedAction(
  async (queryString: string) => {
    return await searchPreferredAgentsResource(queryString);
  },
);

export const getPreferredAgent = withAction(
  async (preferredAgentId: string) => {
    return await getPreferredAgentResource(preferredAgentId);
  },
);

export const updatePreferredAgent = withAction(
  async (preferredAgentId: string, body: UpdatePreferredAgentRequest) => {
    const result = await updatePreferredAgentResource(preferredAgentId, body);

    revalidatePath("/workforce/preferred-agents");

    return result;
  },
);

export const deletePreferredAgent = withAction(
  async (preferredAgentId: string) => {
    const result = await deletePreferredAgentResource(preferredAgentId);

    revalidatePath("/workforce/preferred-agents");

    return result;
  },
);
