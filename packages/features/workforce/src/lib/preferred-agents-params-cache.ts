import { createSearchParamsCache } from "nuqs/server";
import { preferredAgentParamsParser } from "./preferred-agents-params-parser";

export const preferredAgentsParamsCache = createSearchParamsCache(
  preferredAgentParamsParser,
);
