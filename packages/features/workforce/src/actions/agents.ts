"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  createAgentResource,
  deactivateAgentResource,
  getAgentResource,
  getAvailabilityLogResource,
  getLocationHistoryResource,
  resubmitAgentResource,
  searchAgentsResource,
  updateAgentResource,
  updateAvailabilityResource,
  updateLocationResource,
} from "../resources/agents";
import type { CreateAgentRequest, UpdateAgentRequest } from "../types/agents";
import type { AvailabilityStatus } from "../types/enums";

export const createAgent = withAction(async (body: CreateAgentRequest) => {
  const result = await createAgentResource(body);

  revalidatePath("/workforce/agents");

  return result;
});

export const getAgent = withAction(async (agentId: string) => {
  return await getAgentResource(agentId);
});

export const searchAgents = withPaginatedAction(async (queryString: string) => {
  return await searchAgentsResource(queryString);
});

export const updateAgent = withAction(
  async (agentId: string, body: UpdateAgentRequest) => {
    const result = await updateAgentResource(agentId, body);

    revalidatePath(`/workforce/agents/${agentId}`);
    revalidatePath("/workforce/agents");

    return result;
  },
);

export const deactivateAgent = withAction(async (agentId: string) => {
  const result = await deactivateAgentResource(agentId);

  revalidatePath("/workforce/agents");

  return result;
});

export const updateAvailability = withAction(
  async (agentId: string, status: AvailabilityStatus, reason?: string) => {
    const result = await updateAvailabilityResource(agentId, status, reason);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const getAvailabilityLog = withPaginatedAction(
  async (agentId: string, queryString: string) => {
    return await getAvailabilityLogResource(agentId, queryString);
  },
);

export const updateLocation = withAction(
  async (agentId: string, body: { latitude: number; longitude: number }) => {
    return await updateLocationResource(agentId, body);
  },
);

export const getLocationHistory = withPaginatedAction(
  async (agentId: string, queryString: string) => {
    return await getLocationHistoryResource(agentId, queryString);
  },
);

export const resubmitAgent = withAction(async (agentId: string) => {
  const result = await resubmitAgentResource(agentId);

  revalidatePath(`/workforce/agents/${agentId}`);

  return result;
});
