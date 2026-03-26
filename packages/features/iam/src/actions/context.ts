"use server";

import { revalidatePath } from "next/cache";
import { withAction } from "@repo/shared/actions";

import {
  getAvailableContextsResource,
  getCurrentContextResource,
  switchContextResource,
} from "../resources/context";
import type { SwitchContextRequest } from "../types/context";

export const getAvailableContexts = withAction(async () => {
  return getAvailableContextsResource();
});

export const getCurrentContext = withAction(async () => {
  return getCurrentContextResource();
});

export const switchContext = withAction(async (data: SwitchContextRequest) => {
  const result = await switchContextResource(data);

  // Context changes typically affect navigation + any scoped pages.
  revalidatePath("/");
  revalidatePath("/iam");
  revalidatePath("/iam/users");
  revalidatePath("/iam/outbox");

  return result;
});
