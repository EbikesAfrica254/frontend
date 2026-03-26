export interface AdjustCostRequest {
  currency: string;
  reason: string;
  revisedAmount: number;
}

export interface CostAdjustmentResponse {
  id: string;
  adjustedBy: string;
  createdAt: string;
  currency: string;
  orderId: string;
  originalAmount: number;
  reason: string;
  revisedAmount: number;
}
