import { createSearchParamsCache } from "nuqs/server";
import { userPreferenceParamsParser } from "./user-preferences-params-parser";

export const userPreferencesParamsCache = createSearchParamsCache(
  userPreferenceParamsParser,
);
