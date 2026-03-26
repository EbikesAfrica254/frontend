"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { ActivationForm } from "./activation-form";
import { InvalidTokenCard } from "./invalid-token-card";
import { SuccessCard } from "./success-card";
import { VerifyPhone } from "./verify-phone";
import { completeAccountActivation } from "@repo/features-iam/actions";

type ActivationState = {
  error?: string;
  message?: string;
  success: boolean;
};

export function ActivateAccount() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: ActivationState,
      formData: FormData,
    ): Promise<ActivationState> => {
      const password = formData.get("password") as string;

      if (!token) {
        return {
          error: "Invalid activation token",
          success: false,
        };
      }

      const result = await completeAccountActivation({
        password,
        token,
      });

      if (result.success) {
        return {
          message: result.message || "Account activated successfully",
          success: true,
        };
      }

      return {
        error: result.error,
        success: false,
      };
    },
    { success: false },
  );

  if (!token) return <InvalidTokenCard />;

  if (showPhoneVerification) {
    return <VerifyPhone />;
  }

  if (state.success) {
    return (
      <SuccessCard
        message={state.message || "Account activated successfully"}
        onVerifyPhone={() => setShowPhoneVerification(true)}
      />
    );
  }

  return (
    <ActivationForm
      error={state.error}
      formAction={formAction}
      isPending={isPending}
    />
  );
}
