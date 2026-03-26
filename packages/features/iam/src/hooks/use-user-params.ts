import { useFilterParams } from "@repo/shared/client";
import { userParamsParser } from "../lib/users-params-parser";

export function useUserParams() {
  return useFilterParams(userParamsParser);
}
