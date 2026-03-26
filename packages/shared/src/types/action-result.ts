import {SuccessResponse} from "./api-responses";
import {ErrorDetail} from "./api-errors";

export type ActionSuccess<TData = void> = SuccessResponse<TData> & {
    success: true;
};

export interface ActionFailure {
    success: false;
    code: string;
    error: string;
    errors?: ErrorDetail[];
}

export type ActionResult<TData = void> = ActionSuccess<TData> | ActionFailure;
