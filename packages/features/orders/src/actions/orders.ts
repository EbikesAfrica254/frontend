"use server";

import { revalidatePath } from "next/cache";

import { withAction } from "@repo/shared/actions";
import { AdjustCostRequest } from "../types/cost-adjustments";
import {
  adjustOrderCostResource,
  cancelOrderResource,
  createOrderResource,
  initiateReassignmentResource,
  recordOrderTipResource,
  reportIncidentResource,
} from "../resources/orders";
import { CancelOrderRequest, CreateOrderRequest } from "../types/orders";
import { InitiateReassignmentRequest } from "../types/reassignments";
import { ReportIncidentRequest } from "../types/incidents";
import { RecordTipRequest } from "../types/tips";

export const adjustOrderCost = withAction(
  async (id: string, data: AdjustCostRequest) => {
    const result = await adjustOrderCostResource(id, data);

    revalidatePath(`/orders/${id}`);

    return result;
  },
);

export const cancelOrder = withAction(
  async (id: string, data: CancelOrderRequest) => {
    const result = await cancelOrderResource(id, data);

    revalidatePath(`/orders/${id}`);

    return result;
  },
);

export const createOrder = withAction(async (data: CreateOrderRequest) => {
  const result = await createOrderResource(data);

  revalidatePath("/orders");

  return result;
});

export const initiateReassignment = withAction(
  async (orderId: string, data: InitiateReassignmentRequest) => {
    const result = await initiateReassignmentResource(orderId, data);

    revalidatePath(`/orders/${orderId}`);

    return result;
  },
);

export const recordOrderTip = withAction(
  async (id: string, data: RecordTipRequest) => {
    const result = await recordOrderTipResource(id, data);

    revalidatePath(`/orders/${id}`);

    return result;
  },
);

export const reportIncident = withAction(
  async (id: string, data: ReportIncidentRequest) => {
    const result = await reportIncidentResource(id, data);

    revalidatePath(`/orders/${id}`);

    return result;
  },
);
