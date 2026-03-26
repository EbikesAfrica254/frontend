import { createSearchParamsCache } from "nuqs/server";
import { organizationParamsParser } from "./organizations-params-parser";

export const organizationsParamsCache = createSearchParamsCache(
  organizationParamsParser,
);
