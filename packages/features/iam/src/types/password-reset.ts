export interface PasswordResetRequest {
  email: string;
}

export interface CompletePasswordResetRequest {
  newPassword: string;
  token: string;
}
