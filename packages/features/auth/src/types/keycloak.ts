export interface AuthToken {
  accessToken: string;
  accessTokenExpires: number;
  aud?: string | string[];
  error?: "RefreshAccessTokenError";
  idToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface AuthUser {
  activeOrganization: string;
  activeBranch?: string;
  email?: string;
  emailVerified: boolean;
  groups: string[];
  keycloakUserId: string;
  name?: string;
  roles: string[];
}

export interface KeycloakAccessToken {
  acr: string;
  active_organization: string;
  allowed_origins?: string[];
  aud?: string | string[];
  azp: string;
  email?: string;
  email_verified: boolean;
  exp: number;
  family_name?: string;
  given_name?: string;
  iat: number;
  iss: string;
  jti: string;
  name?: string;
  preferred_username?: string;
  realm_access: {
    roles: string[];
  };
  scope: string;
  sid: string;
  sub: string;
  typ: string;
}

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface KeycloakUserInfo {
  email?: string;
  email_verified: boolean;
  family_name?: string;
  given_name?: string;
  groups: string[];
  name?: string;
  preferred_username?: string;
  sub: string;
}
