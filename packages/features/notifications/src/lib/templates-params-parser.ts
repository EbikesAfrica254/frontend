import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { NotificationChannel, TemplateContentType } from "../types/enums";

export const templateParamsParser = {
  channel: parseAsStringEnum(Object.values(NotificationChannel)),
  contentType: parseAsStringEnum(Object.values(TemplateContentType)),
  isActive: parseAsBoolean,
  name: parseAsString,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
