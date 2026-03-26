import { requestsParamsParser } from "./requests-params-parser";
import { createSearchParamsCache } from "nuqs/server";

export const requestsParamsCache =
  createSearchParamsCache(requestsParamsParser);
