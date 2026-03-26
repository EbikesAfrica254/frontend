import { createSearchParamsCache } from "nuqs/server";
import { templateParamsParser } from "./templates-params-parser";

export const templateParamsCache =
  createSearchParamsCache(templateParamsParser);
