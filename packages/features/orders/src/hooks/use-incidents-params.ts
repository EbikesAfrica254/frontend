import { useFilterParams } from "@repo/shared/client";
import { incidentsParamsParser } from "../lib/incidents-params-parser";

export function useIncidentsParams() {
  return useFilterParams(incidentsParamsParser);
}
