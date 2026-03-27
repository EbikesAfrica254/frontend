/**
 * Error detail for field-level validation errors
 */
export interface ErrorDetail {
  field: string;
  message: string;
  rejectedValue?: unknown;
}

/**
 * RFC 7807 Problem Details error response
 */
export interface ErrorResponse {
  code: string;
  detail: string;
  errorReference: string;
  errors?: ErrorDetail[];
  instance: string;
  status: number;
  title: string;
  type: string;
}

/**
 * Custom error class for IAM API errors
 */
export class ApiError extends Error {
  public readonly code: string;
  public readonly errorReference: string;
  public readonly errors?: ErrorDetail[];
  public readonly detail: string;
  public readonly status: number;
  public readonly title: string;
  public readonly type: string;

  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.title);
    this.name = "ApiError";
    this.code = errorResponse.code;
    this.errorReference = errorResponse.errorReference;
    this.errors = errorResponse.errors;
    this.detail = errorResponse.detail;
    this.status = errorResponse.status;
    this.title = errorResponse.title;
    this.type = errorResponse.type;
  }
}
