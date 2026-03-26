"use client";

import { useActionState } from "react";
import { VerifyCodeForm } from "./verify-code-form";
import { completePhoneVerification } from "@repo/features-iam/actions";

type VerifyPhoneState = {
  error?: string;
  success: boolean;
};

export function VerifyPhone() {
  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: VerifyPhoneState,
      formData: FormData,
    ): Promise<VerifyPhoneState> => {
      const code = formData.get("code") as string;

      // Client-side validation
      if (!code || code.trim().length === 0) {
        return {
          error: "Verification code is required",
          success: false,
        };
      }

      if (code.length !== 6) {
        return {
          error: "Please enter a valid 6-digit code",
          success: false,
        };
      }

      const result = await completePhoneVerification(code);

      if (result.success) {
        return { success: true };
      }

      return {
        error: result.error,
        success: false,
      };
    },
    { success: false },
  );

  return (
    <VerifyCodeForm
      error={state.error}
      formAction={formAction}
      isPending={isPending}
    />
  );
}
