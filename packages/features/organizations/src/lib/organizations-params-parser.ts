import {
  parseAsIsoDate,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import {
  ComplianceStatus,
  OrganizationStatus,
  RegistrationType,
} from "../types/enums";

export const organizationParamsParser = {
  activatedDateFrom: parseAsIsoDate,
  activatedDateTo: parseAsIsoDate,
  complianceStatus: parseAsStringEnum(Object.values(ComplianceStatus)),
  createdDateFrom: parseAsIsoDate,
  createdDateTo: parseAsIsoDate,
  legalName: parseAsString,
  page: parseAsInteger.withDefault(1),
  registrationType: parseAsStringEnum(Object.values(RegistrationType)),
  size: parseAsInteger.withDefault(20),
  sortBy: parseAsString.withDefault("createdAt"),
  sortDirection: parseAsStringEnum(["ASC", "DESC"]).withDefault("DESC"),
  status: parseAsStringEnum(Object.values(OrganizationStatus)),
};
