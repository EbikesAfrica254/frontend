import "server-only";

import { unauthenticatedIamFetch } from "./core/iam-fetch";
import {
  CompletePasswordResetRequest,
  PasswordResetRequest,
} from "../types/password-reset";
import { SuccessResponse } from "@repo/shared/client";

export async function completePasswordResetResource(
  data: CompletePasswordResetRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/password-reset/complete",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function requestPasswordResetResource(
  data: PasswordResetRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>("/password-reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
