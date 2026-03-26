/**
 * Generic success response wrapper for all IAM API responses
 */
export interface SuccessResponse<T> {
    code: string;
    data: T;
    message?: string;
}

/**
 * Paginated response wrapper for available endpoints
 * NOTE: API uses 0-based page indexing (page: 0 is first page)
 */
export interface PaginatedResponse<T> {
    data: T[];
    first: boolean;
    last: boolean;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
