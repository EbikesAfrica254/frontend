import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { authenticatedIamFetch } from "./core/iam-fetch";
import { MembershipResponse } from "../types/membership";
import { ContextResponse, SwitchContextRequest } from "../types/context";

export async function getAvailableContextsResource(): Promise<
  SuccessResponse<MembershipResponse[]>
> {
  return authenticatedIamFetch<SuccessResponse<MembershipResponse[]>>(
    "/contexts/available",
  );
}

export async function getCurrentContextResource(): Promise<
  SuccessResponse<ContextResponse>
> {
  return authenticatedIamFetch<SuccessResponse<ContextResponse>>("/contexts");
}

export async function switchContextResource(
  data: SwitchContextRequest,
): Promise<SuccessResponse<void>> {
  return authenticatedIamFetch<SuccessResponse<void>>("/contexts/switch", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
