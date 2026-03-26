import { useFilterParams } from "@repo/shared/client";
import { draftsParamsParser } from "../lib/drafts-params-parser";

export function useDraftsParams() {
  return useFilterParams(draftsParamsParser);
}
