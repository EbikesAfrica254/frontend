import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import type { ActionFailure } from "@repo/shared/client";
import type { SignupFormData } from "../schemas/user-schemas";

/**
 * Maps backend ResponseCode values to user-facing error messages for the signup flow.
 *
 * Add entries here as new backend codes are introduced — no changes to
 * components or routing logic required.
 */
const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  DUPLICATE_RESOURCE:
    "An account with this email is already registered. Please sign in instead.",
  EXTERNAL_SERVICE_ERROR:
    "Username may already be taken. Please try a different one.",
  RATE_LIMIT_EXCEEDED:
    "Too many attempts. Please wait a few minutes and try again.",
  INTERNAL_SERVER_ERROR:
    "Something went wrong on our end. Please try again shortly.",
};

const FALLBACK_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again.";

/**
 * Form fields that exist on the signup form.
 *
 * Backend ErrorDetail.field values not in this set (e.g. countryCode, which
 * is derived server-side) cannot bind to a form field and fall back to a toast.
 */
const SIGNUP_FORM_FIELDS = new Set<keyof SignupFormData>([
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "username",
]);

/**
 * Classifies an ActionFailure and routes it to the appropriate UI:
 *
 * - Server field errors whose field is a known form field → inline via form.setError
 * - Server field errors for unknown fields (e.g. countryCode) → toast
 * - All other failures → code-keyed toast with fallback
 *
 * This keeps SignupForm free of error classification logic.
 */
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

  const message = SIGNUP_ERROR_MESSAGES[failure.code] ?? FALLBACK_ERROR_MESSAGE;
  toast.error(message);
}
