import { toast } from "sonner";
import type { ActionFailure } from "../types/action-result";

const CONTACT_SUPPORT =
  "We're unable to complete this action. Please contact support for assistance.";

const REFERENCE_CODES = new Set([
  "FORBIDDEN",
  "INSUFFICIENT_SCOPE",
  "INTERNAL_SERVER_ERROR",
]);

export const API_ERROR_MESSAGES: Record<string, string> = {
  AUTHENTICATION_FAILED: "Your session has expired. Please sign in again.",
  DUPLICATE_RESOURCE: "This resource already exists.",
  EXTERNAL_SERVICE_ERROR:
    "We're having trouble connecting to an external service. Please try again shortly.",
  FORBIDDEN: CONTACT_SUPPORT,
  GATEWAY_TIMEOUT: "The request timed out. Please try again.",
  INSUFFICIENT_SCOPE: CONTACT_SUPPORT,
  INTERNAL_SERVER_ERROR: CONTACT_SUPPORT,
  INVALID_ARGUMENTS:
    "The request contained invalid data. Please check your input and try again.",
  INVALID_FORMAT:
    "One or more fields have an invalid format. Please check your input and try again.",
  INVALID_STATE:
    "This action cannot be completed in the current state. Please refresh and try again.",
  MISSING_REQUIRED_FIELD:
    "Required information is missing. Please check your input and try again.",
  RATE_LIMIT_EXCEEDED:
    "Too many attempts. Please wait a few minutes and try again.",
  RESOURCE_NOT_FOUND: "The requested resource could not be found.",
};

const FALLBACK_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again.";

export function showApiErrorToast(failure: ActionFailure): void {
  const message = API_ERROR_MESSAGES[failure.code] ?? FALLBACK_ERROR_MESSAGE;
  const description =
    REFERENCE_CODES.has(failure.code) && failure.errorReference
      ? `Reference: ${failure.errorReference}`
      : undefined;

  toast.error(message, { description });
}
