"use server";

import { withAction } from "@repo/shared/actions";
import {
  retryOutboxEventResource,
  retryAllFailedOutboxEventsResource,
} from "../resources/outbox";

export const retryOutboxEvent = withAction(async (id: string) => {
  return await retryOutboxEventResource(id);
});

export const retryAllFailedEvents = withAction(async () => {
  return await retryAllFailedOutboxEventsResource();
});
