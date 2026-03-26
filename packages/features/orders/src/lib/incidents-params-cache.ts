import { createSearchParamsCache } from "nuqs/server";
import { incidentsParamsParser } from "./incidents-params-parser";

export const incidentsParamsCache = createSearchParamsCache(
  incidentsParamsParser,
);
