import { createSearchParamsCache } from "nuqs/server";
import { userParamsParser } from "./users-params-parser";

export const userParamsCache = createSearchParamsCache(userParamsParser);
