import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { OrderStatus, OrderType } from "../types/enums";

export const ordersParamsParser = {
  agentId: parseAsString,
  cancelledFromStatus: parseAsStringEnum(Object.values(OrderStatus)),
  createdDateFrom: parseAsString,
  createdDateTo: parseAsString,
  customerId: parseAsString,
  orderType: parseAsStringEnum(Object.values(OrderType)),
  page: parseAsInteger.withDefault(1),
  paymentVerified: parseAsString,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(OrderStatus)),
  updatedDateFrom: parseAsString,
  updatedDateTo: parseAsString,
};
