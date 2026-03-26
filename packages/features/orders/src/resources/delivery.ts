import "server-only";
import { SuccessResponse } from "@repo/shared/server";
import {
  DeliveryPortalResponse,
  DraftDetailResponse,
  UpdateDeliveryLocationRequest,
} from "../types/drafts";
import { unauthenticatedOrdersFetch } from "./core/orders-fetch";

export async function getDraftForDeliveryResource(
  shortCode: string,
): Promise<SuccessResponse<DeliveryPortalResponse>> {
  return unauthenticatedOrdersFetch<SuccessResponse<DeliveryPortalResponse>>(
    `/delivery/${shortCode}`,
  );
}

export async function submitDeliveryLocationResource(
  shortCode: string,
  deliveryToken: string,
  data: UpdateDeliveryLocationRequest,
): Promise<SuccessResponse<DraftDetailResponse>> {
  return unauthenticatedOrdersFetch<SuccessResponse<DraftDetailResponse>>(
    `/delivery/${shortCode}/location`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "X-Delivery-Token": deliveryToken,
      },
    },
  );
}
