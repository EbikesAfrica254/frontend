import { createSearchParamsCache } from "nuqs/server";
import { ordersParamsParser } from "./orders-params-parser";

export const ordersParamsCache = createSearchParamsCache(ordersParamsParser);
