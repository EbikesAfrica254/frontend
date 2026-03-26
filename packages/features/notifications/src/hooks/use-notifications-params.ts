import { useQueryStates } from "nuqs";
import { notificationParamsParser } from "../lib/notifications-params-parser";

export function useNotificationsParams() {
  const [params, setParams] = useQueryStates(notificationParamsParser, {
    shallow: false,
  });

  return { params, setParams };
}
