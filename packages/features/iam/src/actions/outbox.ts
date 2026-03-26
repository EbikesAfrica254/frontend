"use server";

import { revalidatePath } from "next/cache";
import {
  retryAllFailedOutboxEventsResource,
  retryOutboxEventResource,
} from "../resources/outbox";
import { withAction } from "@repo/shared/actions";

export const retryFailedEvent = withAction(async (id: string) => {
  await retryOutboxEventResource(id);

  revalidatePath("/iam/outbox");

  return {
    code: "SUCCESS" as const,
    data: undefined,
    message: "Event queued for retry",
  };
});

export const retryAllFailedEvents = withAction(async () => {
  const result = await retryAllFailedOutboxEventsResource();

  revalidatePath("/iam/outbox");

  return result;
});
