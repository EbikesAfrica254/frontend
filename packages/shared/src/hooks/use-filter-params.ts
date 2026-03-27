import { useQueryStates, type SingleParserBuilder } from "nuqs";

interface ClampConfig {
  maxSize?: number;
  minPage?: number;
  minSize?: number;
}

type ParserWithPagination = {
  page: SingleParserBuilder<number>;
  size: SingleParserBuilder<number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required for TypeScript variance: SingleParserBuilder<T> in function parameters is contravariant, making unknown incompatible
  [key: string]: SingleParserBuilder<any>;
};

export function useFilterParams<TParser extends ParserWithPagination>(
  parser: TParser,
  config: ClampConfig = {},
) {
  const [params, setParams] = useQueryStates(parser, {
    history: "replace",
    shallow: false,
  });

  const { maxSize = 100, minPage = 1, minSize = 1 } = config;

  const page = params.page ?? 1;
  const size = params.size ?? 20;

  return {
    params: {
      ...params,
      page: Math.max(minPage, page),
      size: Math.min(maxSize, Math.max(minSize, size)),
      sortDirection: params.sortDirection ?? ("ASC" as const),
    },
    setParams,
  };
}
