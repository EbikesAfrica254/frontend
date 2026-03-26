import {
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { NotificationChannel, NotificationStatus } from "../types/enums";

export const notificationParamsParser = {
  branchId: parseAsString,
  channel: parseAsStringEnum(Object.values(NotificationChannel)),
  createdAtFrom: parseAsIsoDateTime,
  createdAtTo: parseAsIsoDateTime,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  recipient: parseAsString,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(NotificationStatus)),
  templateId: parseAsString,
};
