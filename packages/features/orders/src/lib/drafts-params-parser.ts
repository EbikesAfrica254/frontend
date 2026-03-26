import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { ContactStatus, DraftStatus } from "../types/enums";

export const draftsParamsParser = {
  branchId: parseAsString,
  contactStatus: parseAsStringEnum(Object.values(ContactStatus)),
  createdDateFrom: parseAsString,
  createdDateTo: parseAsString,
  customerId: parseAsString,
  customerPhone: parseAsString,
  expiresDateFrom: parseAsString,
  expiresDateTo: parseAsString,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(DraftStatus)),
};
