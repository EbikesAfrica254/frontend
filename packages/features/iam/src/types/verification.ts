export interface PhoneVerificationRequest {
  phoneNumber: string;
}

export interface CompletePhoneVerificationRequest {
  code: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface CompleteEmailVerificationRequest {
  code: string;
}

export interface CompleteAccountActivationRequest {
  token: string;
  password: string;
}
