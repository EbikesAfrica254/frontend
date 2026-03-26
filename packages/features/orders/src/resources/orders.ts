import "server-only";

import { PaginatedResponse, SuccessResponse } from "@repo/shared/server";
import {
  AdjustCostRequest,
  CostAdjustmentResponse,
} from "../types/cost-adjustments";
import {
  CancelOrderRequest,
  CreateOrderRequest,
  OrderDetailResponse,
  OrderSummaryResponse,
} from "../types/orders";
import {
  InitiateReassignmentRequest,
  ReassignmentResponse,
} from "../types/reassignments";
import { IncidentResponse, ReportIncidentRequest } from "../types/incidents";
import { RecordTipRequest, TipResponse } from "../types/tips";
import { authenticatedOrdersFetch } from "./core/orders-fetch";

export async function adjustOrderCostResource(
  id: string,
  data: AdjustCostRequest,
): Promise<SuccessResponse<CostAdjustmentResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<CostAdjustmentResponse>>(
    `/orders/${id}/cost-adjustments`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function cancelOrderResource(
  id: string,
  data: CancelOrderRequest,
): Promise<SuccessResponse<OrderDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<OrderDetailResponse>>(
    `/orders/${id}/cancel`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function createOrderResource(
  data: CreateOrderRequest,
): Promise<SuccessResponse<OrderDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<OrderDetailResponse>>(
    `/orders`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function getOrderByIdResource(
  id: string,
): Promise<SuccessResponse<OrderDetailResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<OrderDetailResponse>>(
    `/orders/${id}`,
  );
}

export async function initiateReassignmentResource(
  orderId: string,
  data: InitiateReassignmentRequest,
): Promise<SuccessResponse<ReassignmentResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<ReassignmentResponse>>(
    `/orders/${orderId}/reassignments`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function recordOrderTipResource(
  id: string,
  data: RecordTipRequest,
): Promise<SuccessResponse<TipResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<TipResponse>>(
    `/orders/${id}/tips`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function reportIncidentResource(
  id: string,
  data: ReportIncidentRequest,
): Promise<SuccessResponse<IncidentResponse>> {
  return authenticatedOrdersFetch<SuccessResponse<IncidentResponse>>(
    `/orders/${id}/incidents`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function searchOrdersResource(
  queryString: string,
): Promise<PaginatedResponse<OrderSummaryResponse>> {
  return authenticatedOrdersFetch<PaginatedResponse<OrderSummaryResponse>>(
    `/orders?${queryString}`,
  );
}
