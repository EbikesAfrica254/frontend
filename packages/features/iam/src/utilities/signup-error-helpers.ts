import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import type { ActionFailure } from "@repo/shared/client";
import type { SignupFormData } from "../schemas/user-schemas";
import { showApiErrorToast } from "@repo/shared/client";

const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  DUPLICATE_RESOURCE:
    "An account with this email is already registered. Please sign in instead.",
  EXTERNAL_SERVICE_ERROR:
    "Username may already be taken. Please try a different one.",
};

const SIGNUP_FORM_FIELDS = new Set<keyof SignupFormData>([
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "username",
]);

export function handleSignupError(
  failure: ActionFailure,
  form: UseFormReturn<SignupFormData>,
): void {
  if (failure.errors && failure.errors.length > 0) {
    for (const detail of failure.errors) {
      const field = detail.field as keyof SignupFormData;

      if (SIGNUP_FORM_FIELDS.has(field)) {
        form.setError(field, { message: detail.message });
      } else {
        toast.error(detail.message);
      }
    }
    return;
  }

  if (SIGNUP_ERROR_MESSAGES[failure.code]) {
    toast.error(SIGNUP_ERROR_MESSAGES[failure.code]);
    return;
  }

  showApiErrorToast(failure);
}
