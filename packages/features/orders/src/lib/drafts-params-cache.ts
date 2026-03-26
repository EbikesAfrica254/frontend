import { createSearchParamsCache } from "nuqs/server";
import { draftsParamsParser } from "./drafts-params-parser";

export const draftsParamsCache = createSearchParamsCache(draftsParamsParser);
