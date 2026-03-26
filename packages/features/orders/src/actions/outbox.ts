"use server";

import { withAction } from "@repo/shared/actions";
import {
  retryAllFailedOutboxEventsResource,
  retryOutboxEventResource,
} from "../resources/outbox";

export const retryAllFailedOutboxEvents = withAction(async () => {
  return await retryAllFailedOutboxEventsResource();
});

export const retryOutboxEvent = withAction(async (id: string) => {
  return await retryOutboxEventResource(id);
});
