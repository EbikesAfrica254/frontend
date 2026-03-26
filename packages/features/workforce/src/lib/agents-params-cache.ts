import { createSearchParamsCache } from "nuqs/server";
import { agentParamsParser } from "./agents-params-parser";

export const agentsParamsCache = createSearchParamsCache(agentParamsParser);
