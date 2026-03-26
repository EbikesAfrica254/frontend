import { useFilterParams } from "@repo/shared/client";
import { agentParamsParser } from "../lib/agents-params-parser";

export function useAgentsParams() {
  return useFilterParams(agentParamsParser);
}
