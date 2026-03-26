"use server";

import {
  completeAccountActivationResource,
  completePhoneVerificationResource,
  requestEmailVerificationResource,
  requestPhoneVerificationResource,
} from "../resources/verification";
import { withAction } from "@repo/shared/actions";
import { redirect } from "next/navigation";
import {
  CompleteAccountActivationRequest,
  EmailVerificationRequest,
  PhoneVerificationRequest,
} from "../types/verification";

export const completeAccountActivation = withAction(
  async (data: CompleteAccountActivationRequest) => {
    return await completeAccountActivationResource(data);
  },
);

export const completePhoneVerification = withAction(async (code: string) => {
  await completePhoneVerificationResource({ code });
  redirect("/api/auth/signin?callbackUrl=/dashboard");
});

export async function requestEmailVerification(data: EmailVerificationRequest) {
  return await requestEmailVerificationResource(data);
}

export async function requestPhoneVerification(data: PhoneVerificationRequest) {
  return await requestPhoneVerificationResource(data);
}
