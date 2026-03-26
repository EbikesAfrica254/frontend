"use server";

import { revalidatePath } from "next/cache";
import { withAction, withPaginatedAction } from "@repo/shared/actions";
import {
  getSuspensionResource,
  liftSuspensionResource,
  searchSuspensionsResource,
  suspendAgentResource,
} from "../resources/suspensions";
import type {
  LiftSuspensionRequest,
  SuspendAgentRequest,
} from "../types/suspensions";

export const suspendAgent = withAction(
  async (agentId: string, body: SuspendAgentRequest) => {
    const result = await suspendAgentResource(agentId, body);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const liftSuspension = withAction(
  async (agentId: string, body: LiftSuspensionRequest) => {
    const result = await liftSuspensionResource(agentId, body);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const searchSuspensions = withPaginatedAction(
  async (agentId: string, queryString: string) => {
    return await searchSuspensionsResource(agentId, queryString);
  },
);

export const getSuspension = withAction(async (suspensionId: string) => {
  return await getSuspensionResource(suspensionId);
});
