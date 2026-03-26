type QueryValue = string | number | boolean | undefined | null;

export function buildQueryString(
    params: Record<string, QueryValue | QueryValue[]>,
): string {
    const searchParams = new URLSearchParams();

    Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item !== undefined && item !== null) {
                        searchParams.append(key, String(item));
                    }
                });
            } else {
                searchParams.set(key, String(value));
            }
        });

    return searchParams.toString();
}
