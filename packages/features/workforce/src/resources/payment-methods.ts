import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedWorkforceFetch } from "./core/workforce-fetch";
import type {
  CreatePaymentMethodRequest,
  PaymentMethodDetailResponse,
  UpdatePaymentMethodRequest,
} from "../types/payment-methods";

export async function createPaymentMethodResource(
  agentId: string,
  body: CreatePaymentMethodRequest,
): Promise<SuccessResponse<PaymentMethodDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<PaymentMethodDetailResponse>
  >(`/agents/${agentId}/payment-methods`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export async function getPaymentMethodsResource(
  agentId: string,
): Promise<SuccessResponse<PaymentMethodDetailResponse[]>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<PaymentMethodDetailResponse[]>
  >(`/agents/${agentId}/payment-methods`);
}

export async function getPaymentMethodResource(
  agentId: string,
  paymentMethodId: string,
): Promise<SuccessResponse<PaymentMethodDetailResponse>> {
  return authenticatedWorkforceFetch<
    SuccessResponse<PaymentMethodDetailResponse>
  >(`/agents/${agentId}/payment-methods/${paymentMethodId}`);
}

export async function updatePaymentMethodResource(
  agentId: string,
  paymentMethodId: string,
  body: UpdatePaymentMethodRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/payment-methods/${paymentMethodId}`,
    {
      body: JSON.stringify(body),
      method: "PATCH",
    },
  );
}

export async function deletePaymentMethodResource(
  agentId: string,
  paymentMethodId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/payment-methods/${paymentMethodId}`,
    {
      method: "DELETE",
    },
  );
}

export async function setPrimaryPaymentMethodResource(
  agentId: string,
  paymentMethodId: string,
): Promise<SuccessResponse<void>> {
  return authenticatedWorkforceFetch<SuccessResponse<void>>(
    `/agents/${agentId}/payment-methods/${paymentMethodId}/set-primary`,
    {
      method: "PATCH",
    },
  );
}
