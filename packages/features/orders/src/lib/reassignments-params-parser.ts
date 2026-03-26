import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { ReassignmentStatus } from "../types/enums";

export const reassignmentsParamsParser = {
  attemptNumber: parseAsInteger,
  completedDateFrom: parseAsString,
  completedDateTo: parseAsString,
  initiatedBy: parseAsString,
  initiatedDateFrom: parseAsString,
  initiatedDateTo: parseAsString,
  newAgentId: parseAsString,
  orderId: parseAsString,
  page: parseAsInteger.withDefault(1),
  previousAgentId: parseAsString,
  reason: parseAsString,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(ReassignmentStatus)),
  timeoutDateFrom: parseAsString,
  timeoutDateTo: parseAsString,
};
