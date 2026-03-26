import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

export const preferredAgentParamsParser = {
  agentId: parseAsString,
  branchId: parseAsString,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
