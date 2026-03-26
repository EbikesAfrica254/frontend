import {
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { OutboxStatus } from "../types/enums";

export const outboxParamsParser = {
  createdAtFrom: parseAsIsoDate,
  createdAtTo: parseAsIsoDate,
  eventType: parseAsString,
  maxRetryCount: parseAsInteger,
  minRetryCount: parseAsInteger,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(OutboxStatus)),
  updatedAtFrom: parseAsIsoDate,
  updatedAtTo: parseAsIsoDate,
};
