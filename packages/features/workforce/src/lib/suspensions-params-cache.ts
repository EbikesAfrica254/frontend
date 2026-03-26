import { createSearchParamsCache } from "nuqs/server";
import { suspensionParamsParser } from "./suspensions-params-parser";

export const suspensionsParamsCache = createSearchParamsCache(
  suspensionParamsParser,
);
