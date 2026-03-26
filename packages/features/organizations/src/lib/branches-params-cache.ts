import { createSearchParamsCache } from "nuqs/server";
import { branchParamsParser } from "./branches-params-parser";

export const branchesParamsCache = createSearchParamsCache(branchParamsParser);
