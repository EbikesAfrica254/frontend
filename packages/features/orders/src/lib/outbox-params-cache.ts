import { createSearchParamsCache } from "nuqs/server";
import { outboxParamsParser } from "./outbox-params-parser";

export const outboxParamsCache = createSearchParamsCache(outboxParamsParser);
