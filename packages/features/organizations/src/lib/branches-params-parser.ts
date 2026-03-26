import {
  parseAsIsoDate,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { BranchStatus } from "../types/enums";

export const branchParamsParser = {
  branchName: parseAsString,
  createdDateFrom: parseAsIsoDate,
  createdDateTo: parseAsIsoDate,
  organizationId: parseAsString,
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(BranchStatus)),
};
