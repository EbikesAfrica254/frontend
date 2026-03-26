import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { RequestStatus } from "../types/enums";

export const requestsParamsParser = {
  createdAtFrom: parseAsString,
  createdAtTo: parseAsString,
  entityId: parseAsString,
  entityType: parseAsString,
  makerId: parseAsString,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(RequestStatus)),
  updatedAtFrom: parseAsString,
  updatedAtTo: parseAsString,
};
