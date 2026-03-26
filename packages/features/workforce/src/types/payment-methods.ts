import type { PaymentMethodType } from "./enums";

export interface CreatePaymentMethodRequest {
  accountName: string;
  accountReference?: string;
  isPrimary: boolean;
  paybillNumber?: string;
  paymentMethodType: PaymentMethodType;
  phoneNumber?: string;
  tillNumber?: string;
}

export interface UpdatePaymentMethodRequest {
  accountName: string;
}

export interface PaymentMethodDetailResponse {
  accountName: string;
  accountReference?: string;
  id: string;
  isPrimary: boolean;
  maskedIdentifier: string;
  paybillNumber?: string;
  paymentMethodType: PaymentMethodType;
  phoneNumber?: string;
  tillNumber?: string;
}
