"use server";

import { revalidatePath } from "next/cache";
import {
  convertDraftToOrderResource,
  createDraftsFromDocumentResource,
  updateDraftDeliveryLocationResource,
} from "../resources/drafts";
import type {
  CreateDraftsFromDocumentRequest,
  UpdateDeliveryLocationRequest,
} from "../types/drafts";
import { withAction } from "@repo/shared/actions";

export const convertDraftToOrder = withAction(async (id: string) => {
  const result = await convertDraftToOrderResource(id);

  revalidatePath(`/orders/drafts/${id}`);
  revalidatePath("/orders");

  return result;
});

export const createDraftsFromDocument = withAction(
  async (data: CreateDraftsFromDocumentRequest) => {
    const result = await createDraftsFromDocumentResource(data);

    revalidatePath("/orders/drafts");

    return result;
  },
);

export const updateDraftDeliveryLocation = withAction(
  async (id: string, data: UpdateDeliveryLocationRequest) => {
    const result = await updateDraftDeliveryLocationResource(id, data);

    revalidatePath(`/orders/drafts/${id}`);

    return result;
  },
);
