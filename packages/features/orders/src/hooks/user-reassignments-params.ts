import { useFilterParams } from "@repo/shared/client";
import { reassignmentsParamsParser } from "../lib/reassignments-params-parser";

export function useReassignmentsParams() {
  return useFilterParams(reassignmentsParamsParser);
}
