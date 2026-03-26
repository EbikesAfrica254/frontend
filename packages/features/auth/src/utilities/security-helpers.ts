export function validateAudience(
    tokenAudience: string | string[] | undefined,
    expectedClientId: string,
): boolean {
    if (!tokenAudience) {
        return false;
    }

    if (typeof tokenAudience === "string") {
        return tokenAudience === expectedClientId;
    }

    return tokenAudience.includes(expectedClientId);
}

export function validateEmailDomain(
    email: string | null | undefined,
    allowedDomains: string[],
): boolean {
    if (!email) {
        throw new Error("Email address is required");
    }

    const parts = email.split("@");
    if (parts.length !== 2 || !parts[1]) {
        throw new Error("Invalid email format");
    }

    const emailDomain = parts[1].trim().toLowerCase();

    if (allowedDomains.length === 0) {
        return true;
    }

    return allowedDomains
        .map((d) => d.trim().toLowerCase())
        .includes(emailDomain);
}
