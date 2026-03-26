import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { IncidentType } from "../types/enums";

export const incidentsParamsParser = {
  agentId: parseAsString,
  incidentType: parseAsStringEnum(Object.values(IncidentType)),
  notes: parseAsString,
  orderId: parseAsString,
  page: parseAsInteger.withDefault(1),
  reportedBy: parseAsString,
  reportedDateFrom: parseAsString,
  reportedDateTo: parseAsString,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
