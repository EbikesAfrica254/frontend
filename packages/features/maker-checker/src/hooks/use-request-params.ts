"use client";

import { useQueryStates } from "nuqs";
import { requestsParamsParser } from "../lib/requests-params-parser";

export function useRequestParams() {
  const [params, setParams] = useQueryStates(requestsParamsParser, {
    shallow: false,
  });

  return { params, setParams };
}
