import "server-only";

import { SuccessResponse } from "@repo/shared/server";
import { unauthenticatedIamFetch } from "./core/iam-fetch";
import {
  CompleteAccountActivationRequest,
  CompleteEmailVerificationRequest,
  CompletePhoneVerificationRequest,
  EmailVerificationRequest,
  PhoneVerificationRequest,
} from "../types/verification";

export async function completeAccountActivationResource(
  data: CompleteAccountActivationRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/verification/account/activate",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function completeEmailVerificationResource(
  data: CompleteEmailVerificationRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/verification/email/complete",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function completePhoneVerificationResource(
  data: CompletePhoneVerificationRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/verification/phone/complete",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function requestEmailVerificationResource(
  data: EmailVerificationRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/verification/email/requests",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function requestPhoneVerificationResource(
  data: PhoneVerificationRequest,
): Promise<SuccessResponse<void>> {
  return unauthenticatedIamFetch<SuccessResponse<void>>(
    "/verification/phone/requests",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}
