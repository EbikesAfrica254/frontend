import { createSearchParamsCache } from "nuqs/server";
import { organizationPreferenceParamsParser } from "./organization-preferences-params-parser";

export const organizationPreferencesParamsCache = createSearchParamsCache(
  organizationPreferenceParamsParser,
);
