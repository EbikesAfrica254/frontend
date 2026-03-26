"use client";

import { useQueryStates } from "nuqs";
import { outboxParamsParser } from "../lib/outbox-params-parser";

export function useOutboxParams() {
  const [params, setParams] = useQueryStates(outboxParamsParser, {
    shallow: false,
  });

  return { params, setParams };
}
