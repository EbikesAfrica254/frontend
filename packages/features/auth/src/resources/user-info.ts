import type {KeycloakUserInfo} from "../types/keycloak";
import {getAuthEnvConfiguration} from "../utilities/env-helpers";

export async function fetchUserInfo(
    accessToken: string,
): Promise<KeycloakUserInfo> {
    const {issuer} = getAuthEnvConfiguration();

    const response = await fetch(`${issuer}/protocol/openid-connect/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    return response.json();
}
