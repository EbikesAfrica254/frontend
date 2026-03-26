import {ErrorDetail} from "../types/api-errors";
import {ActionResult} from "../types/action-result";

export function getFieldError<T = unknown>(
    state: ActionResult<T> | null | undefined,
    fieldName: string,
): string | undefined {
    if (!state || state.success) return undefined;

    const errors = state.errors;
    if (!errors || !Array.isArray(errors)) return undefined;

    const error = errors.find((e: ErrorDetail) => e.field === fieldName);
    return error?.message;
}

export function hasFieldError<T = unknown>(
    state: ActionResult<T> | null | undefined,
    fieldName: string,
): boolean {
    return !!getFieldError(state, fieldName);
}

export function getGeneralError<T = unknown>(
    state: ActionResult<T> | null | undefined,
): string | undefined {
    if (!state || state.success) return undefined;
    return state.error;
}
