import {ApiError, ErrorResponse} from "./api-errors";

interface NodeSystemError extends Error {
    code?: string;
    address?: string;
    port?: number;
    hostname?: string;
    syscall?: string;
    errno?: number;
    cause?: unknown;
}

function isNodeSystemError(error: unknown): error is NodeSystemError {
    return (
        error instanceof Error &&
        typeof error === "object" &&
        true &&
        "code" in error &&
        typeof (error as Record<string, unknown>).code === "string"
    );
}

function extractErrorDetails(error: Error): string {
    let cause: unknown = error;

    while (cause) {
        if (!isNodeSystemError(cause)) break;

        const {code} = cause;

        if (code === "ECONNREFUSED" && cause.address && cause.port) {
            return `Connection refused to ${cause.address}:${cause.port}`;
        }

        if (code === "ENOTFOUND" && cause.hostname) {
            return `Unable to resolve hostname: ${cause.hostname}`;
        }

        if (code === "ECONNRESET") {
            return `Connection was reset by the server`;
        }

        if (code === "ETIMEDOUT") {
            return `Connection timed out`;
        }

        cause = cause.cause;
    }

    return error.message || "Network connection failed";
}

export class ConnectionError extends ApiError {
    constructor(serviceName: string, cause?: Error) {
        const detail = cause
            ? extractErrorDetails(cause)
            : `Unable to connect to ${serviceName}`;

        const errorResponse: ErrorResponse = {
            code: "EXTERNAL_SERVICE_ERROR",
            detail,
            errorReference: crypto.randomUUID(),
            instance: "/api/downstream",
            status: 503,
            title: "Service Unavailable",
            type: "https://docs.ebikesafrica.co.ke/errors/external-service-error",
        };
        super(errorResponse);
        this.name = "ConnectionError";
        this.cause = cause;
    }
}

export class TimeoutError extends ApiError {
    constructor(serviceName: string, timeoutMs: number) {
        const errorResponse: ErrorResponse = {
            code: "GATEWAY_TIMEOUT",
            detail: `Request to ${serviceName} timed out after ${timeoutMs}ms`,
            errorReference: crypto.randomUUID(),
            instance: "/api/downstream",
            status: 504,
            title: "Gateway Timeout",
            type: "https://docs.ebikesafrica.co.ke/errors/gateway-timeout",
        };
        super(errorResponse);
        this.name = "TimeoutError";
    }
}

export class NetworkError extends ApiError {
    constructor(serviceName: string, cause: Error) {
        const detail = `Network error communicating with ${serviceName}: ${cause.message}`;

        const errorResponse: ErrorResponse = {
            code: "EXTERNAL_SERVICE_ERROR",
            detail,
            errorReference: crypto.randomUUID(),
            instance: "/api/downstream",
            status: 503,
            title: "Network Error",
            type: "https://docs.ebikesafrica.co.ke/errors/external-service-error",
        };
        super(errorResponse);
        this.name = "NetworkError";
        this.cause = cause;
    }
}

export function isNetworkError(error: unknown): error is TypeError {
    if (!(error instanceof TypeError)) return false;

    const message = error.message.toLowerCase();
    return (
        message.includes("fetch failed") ||
        message.includes("network") ||
        message.includes("econnrefused") ||
        message.includes("enotfound") ||
        message.includes("econnreset")
    );
}

export function isTimeoutError(error: unknown): error is Error {
    return error instanceof Error && error.name === "AbortError";
}
