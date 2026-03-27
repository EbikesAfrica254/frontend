import type {
  PaginatedResponse,
  SuccessResponse,
} from "../types/api-responses";
import { ActionResult, ActionSuccess } from "../types/action-result";
import { ApiError } from "../types/api-errors";

function handleActionError<TData>(error: unknown): ActionResult<TData> {
  // re-throw Next.js redirect errors — they are control flow, not real errors
  if (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  ) {
    throw error;
  }

  console.error("Error running action:", error);

  if (error instanceof ApiError) {
    return {
      success: false,
      code: error.code,
      error: error.detail,
      errors: error.errors,
    };
  }

  return {
    success: false,
    code: "UNKNOWN_ERROR",
    error: error instanceof Error ? error.message : "An error occurred",
  };
}

/**
 * Wraps a server action that returns a raw TData value.
 * The result is normalized into a { data, success: true } envelope.
 */
export function withAction<TData = void, TArgs extends unknown[] = []>(
  action: (...args: TArgs) => Promise<SuccessResponse<TData>>,
): (...args: TArgs) => Promise<ActionResult<TData>> {
  return async (...args: TArgs): Promise<ActionResult<TData>> => {
    try {
      const response = await action(...args);
      return { success: true, ...response } as ActionSuccess<TData>;
    } catch (error: unknown) {
      return handleActionError(error);
    }
  };
}

/**
 * Wraps a server action that returns a raw PaginatedResponse<TItem>.
 * Paginated endpoints return the pagination envelope directly —
 * they are NOT wrapped in SuccessResponse, unlike singular endpoints.
 */
export function withPaginatedAction<TItem, TArgs extends unknown[] = []>(
  action: (...args: TArgs) => Promise<PaginatedResponse<TItem>>,
): (...args: TArgs) => Promise<ActionResult<PaginatedResponse<TItem>>> {
  return async (
    ...args: TArgs
  ): Promise<ActionResult<PaginatedResponse<TItem>>> => {
    try {
      const data = await action(...args);
      return { success: true, data } as ActionSuccess<PaginatedResponse<TItem>>;
    } catch (error: unknown) {
      return handleActionError(error);
    }
  };
}
