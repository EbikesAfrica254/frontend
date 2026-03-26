import { useFilterParams } from "@repo/shared/client";
import { ordersParamsParser } from "../lib/orders-params-parser";

export function useOrdersParams() {
  return useFilterParams(ordersParamsParser);
}
