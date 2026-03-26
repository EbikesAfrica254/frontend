"use server";

import {
  approveRequestResource,
  cancelRequestResource,
  rejectRequestResource,
} from "../resources/requests";
import { ApproveRequestRequest, RejectRequestRequest } from "../types/requests";
import { withAction } from "@repo/shared/actions";

export const approveRequestAction = withAction(
  async (requestId: string, data?: ApproveRequestRequest) => {
    return await approveRequestResource(requestId, data);
  },
);

export const rejectRequestAction = withAction(
  async (requestId: string, data: RejectRequestRequest) => {
    return await rejectRequestResource(requestId, data);
  },
);

export const cancelRequestAction = withAction(async (requestId: string) => {
  return await cancelRequestResource(requestId);
});
