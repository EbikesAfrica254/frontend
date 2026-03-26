import { createSearchParamsCache } from "nuqs/server";
import { reassignmentsParamsParser } from "./reassignments-params-parser";

export const reassignmentsParamsCache = createSearchParamsCache(
  reassignmentsParamsParser,
);
