"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  createPaymentMethodResource,
  deletePaymentMethodResource,
  getPaymentMethodResource,
  getPaymentMethodsResource,
  setPrimaryPaymentMethodResource,
  updatePaymentMethodResource,
} from "../resources/payment-methods";
import type {
  CreatePaymentMethodRequest,
  UpdatePaymentMethodRequest,
} from "../types/payment-methods";

export const createPaymentMethod = withAction(
  async (agentId: string, body: CreatePaymentMethodRequest) => {
    const result = await createPaymentMethodResource(agentId, body);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const getPaymentMethods = withAction(async (agentId: string) => {
  return await getPaymentMethodsResource(agentId);
});

export const getPaymentMethod = withAction(
  async (agentId: string, paymentMethodId: string) => {
    return await getPaymentMethodResource(agentId, paymentMethodId);
  },
);

export const updatePaymentMethod = withAction(
  async (
    agentId: string,
    paymentMethodId: string,
    body: UpdatePaymentMethodRequest,
  ) => {
    const result = await updatePaymentMethodResource(
      agentId,
      paymentMethodId,
      body,
    );

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const deletePaymentMethod = withAction(
  async (agentId: string, paymentMethodId: string) => {
    const result = await deletePaymentMethodResource(agentId, paymentMethodId);

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);

export const setPrimaryPaymentMethod = withAction(
  async (agentId: string, paymentMethodId: string) => {
    const result = await setPrimaryPaymentMethodResource(
      agentId,
      paymentMethodId,
    );

    revalidatePath(`/workforce/agents/${agentId}`);

    return result;
  },
);
