import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { NotificationCategory, NotificationChannel } from "../types/enums";

export const userPreferenceParamsParser = {
  category: parseAsStringEnum(Object.values(NotificationCategory)),
  channel: parseAsStringEnum(Object.values(NotificationChannel)),
  enabled: parseAsBoolean,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
