import {
  parseAsBoolean,
  parseAsIsoDate,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const suspensionParamsParser = {
  createdAtFrom: parseAsIsoDate,
  createdAtTo: parseAsIsoDate,
  expiresAtFrom: parseAsIsoDate,
  expiresAtTo: parseAsIsoDate,
  isActive: parseAsBoolean,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
