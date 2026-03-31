import {
  parseAsBoolean,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { UserStatus } from "../types/enums";

export const userParamsParser = {
  branchId: parseAsString,
  countryCode: parseAsString,
  createdAtFrom: parseAsIsoDateTime,
  createdAtTo: parseAsIsoDateTime,
  email: parseAsString,
  emailVerified: parseAsBoolean,
  firstName: parseAsString,
  keycloakUserId: parseAsString,
  lastName: parseAsString,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  phoneNumber: parseAsString,
  phoneNumberVerified: parseAsBoolean,
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(UserStatus)),
  username: parseAsString,
};
