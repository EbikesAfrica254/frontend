import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { AvailabilityStatus, CapabilityClass } from "../types/enums";

export const agentParamsParser = {
  availabilityStatus: parseAsStringEnum(Object.values(AvailabilityStatus)),
  capabilityClass: parseAsStringEnum(Object.values(CapabilityClass)),
  createdAtFrom: parseAsString,
  createdAtTo: parseAsString,
  firstName: parseAsString,
  hasActiveSuspension: parseAsBoolean,
  lastName: parseAsString,
  nationalIdNumber: parseAsString,
  page: parseAsInteger.withDefault(1),
  phoneNumber: parseAsString,
  reliabilityScoreMax: parseAsInteger,
  reliabilityScoreMin: parseAsInteger,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
};
