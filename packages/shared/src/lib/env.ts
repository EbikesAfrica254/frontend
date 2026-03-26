export function getRequiredEnv(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;

    if (!value) {
        if (process.env.NODE_ENV === "production") {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        console.warn(`⚠️  ${key} not set, using default: ${defaultValue}`);
    }

    return value!;
}

export function getOptionalEnv(key: string, defaultValue: string): string {
    return process.env[key] ?? defaultValue;
}
