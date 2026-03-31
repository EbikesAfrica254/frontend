import { createSearchParamsCache } from "nuqs/server";
import { outboxParamsParser } from "./outbox-params-parser";
import { buildQueryString } from "../utilities/query-builder";

export const outboxParamsCache = createSearchParamsCache(outboxParamsParser);

export async function resolveOutboxQueryString(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
): Promise<string> {
  const filters = outboxParamsCache.parse(await searchParams);
  return buildQueryString({
    eventType: filters.eventType,
    maxRetryCount: filters.maxRetryCount,
    minRetryCount: filters.minRetryCount,
    page: filters.page ?? 1,
    size: filters.size ?? 20,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection,
    status: filters.status,
  });
}
