import { createSearchParamsCache, createSerializer } from "nuqs/server";
import { outboxParamsParser } from "./outbox-params-parser";

export const outboxParamsCache = createSearchParamsCache(outboxParamsParser);

const serialize = createSerializer(outboxParamsParser);

export async function resolveOutboxQueryString(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
): Promise<string> {
  const filters = outboxParamsCache.parse(await searchParams);
  return serialize(filters).replace(/^\?/, "");
}
