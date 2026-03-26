"use server";

import { revalidatePath } from "next/cache";
import { submitDeliveryLocationResource } from "../resources/delivery";
import type { UpdateDeliveryLocationRequest } from "../types/drafts";
import { withAction } from "@repo/shared/actions";

export const submitDeliveryLocation = withAction(
  async (
    shortCode: string,
    deliveryToken: string,
    data: UpdateDeliveryLocationRequest,
  ) => {
    const result = await submitDeliveryLocationResource(
      shortCode,
      deliveryToken,
      data,
    );

    revalidatePath(`/delivery/${shortCode}`);

    return result;
  },
);
