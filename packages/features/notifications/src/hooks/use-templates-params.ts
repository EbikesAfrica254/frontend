import { useQueryStates } from "nuqs";
import { templateParamsParser } from "../lib/templates-params-parser";

export function useTemplatesParams() {
  const [params, setParams] = useQueryStates(templateParamsParser, {
    shallow: false,
  });

  return { params, setParams };
}
