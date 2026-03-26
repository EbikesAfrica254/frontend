import "server-only";

import {ApiError, ErrorResponse} from "../types/api-errors";
import {
    ConnectionError,
    isNetworkError,
    isTimeoutError,
    NetworkError,
    TimeoutError,
} from "../types/network-errors";
import {FetchConfiguration} from "../types/requests";

const DEFAULT_TIMEOUT_MS = 10000;
const INITIAL_RETRY_DELAY_MS = 1000;
const MAX_RETRIES = 2;

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout<T>(
    url: string,
    options: RequestInit,
    timeoutMs: number,
): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new ApiError(errorData);
        }

        if (
            response.status === 204 ||
            response.headers.get("content-length") === "0"
        ) {
            return undefined as T;
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);

        if (isTimeoutError(error)) {
            throw new TimeoutError(`${url}`, timeoutMs);
        }

        if (isNetworkError(error)) {
            throw new ConnectionError(`${url}`, error as Error);
        }

        if (error instanceof ApiError) {
            throw error;
        }

        throw new NetworkError(`${url}`, error as Error);
    }
}

export async function baseFetch<T>(
    baseUrl: string,
    endpoint: string,
    options: RequestInit = {},
    config: FetchConfiguration = {},
): Promise<T> {
    const fetchOptions: RequestInit = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...config.headers,
            ...options.headers,
        },
    };
    const maxRetries = config.maxRetries ?? MAX_RETRIES;
    const timeoutMs = config.timeout ?? DEFAULT_TIMEOUT_MS;
    const url = `${baseUrl}${endpoint}`;
    console.debug(`Fetching ${url}`);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fetchWithTimeout<T>(url, fetchOptions, timeoutMs);
        } catch (error) {
            lastError = error as Error;

            if (
                error instanceof ConnectionError ||
                error instanceof TimeoutError ||
                error instanceof NetworkError
            ) {
                if (attempt === maxRetries) {
                    break;
                }

                const delayMs = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt);
                await delay(delayMs);
                continue;
            }

            if (error instanceof ApiError) {
                throw error;
            }

            throw error;
        }
    }

    throw lastError;
}
