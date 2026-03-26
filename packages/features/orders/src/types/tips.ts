import { TipPaymentStatus } from "./enums";

export interface RecordTipRequest {
  amount: number;
  currency: string;
  percentage?: number;
}

export interface TipResponse {
  id: string;
  amount: number;
  createdAt: string;
  currency: string;
  orderId: string;
  paymentStatus: TipPaymentStatus;
  percentage: number;
  updatedAt: string;
}
