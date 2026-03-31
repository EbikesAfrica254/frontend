import {
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { OutboxStatus } from "../types/outbox";

export const outboxParamsParser = {
  createdAtFrom: parseAsIsoDateTime,
  createdAtTo: parseAsIsoDateTime,
  eventType: parseAsString,
  maxRetryCount: parseAsInteger,
  minRetryCount: parseAsInteger,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(OutboxStatus)),
  updatedAtFrom: parseAsIsoDateTime,
  updatedAtTo: parseAsIsoDateTime,
};
