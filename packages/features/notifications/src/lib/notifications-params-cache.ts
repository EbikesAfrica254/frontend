import { createSearchParamsCache } from "nuqs/server";
import { notificationParamsParser } from "./notifications-params-parser";

export const notificationsParamsCache = createSearchParamsCache(
  notificationParamsParser,
);
