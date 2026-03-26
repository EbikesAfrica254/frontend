"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";
import {
  retryAllFailedOutboxEventsResource,
  retryOutboxEventResource,
} from "../resources/outbox";

export const retryAllFailedEvents = withAction(async () => {
  const result = await retryAllFailedOutboxEventsResource();

  revalidatePath("/notifications/outbox");

  return result;
});

export const retryOutboxEvent = withAction(async (id: string) => {
  const result = await retryOutboxEventResource(id);

  revalidatePath("/notifications/outbox");

  return result;
});
