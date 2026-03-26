import { OrderStatus, OrderType } from "./enums";
import { CostAdjustmentResponse } from "./cost-adjustments";
import { IncidentResponse } from "./incidents";
import { ReassignmentResponse } from "./reassignments";
import { TipResponse } from "./tips";

export interface CancelOrderRequest {
  reason: string;
}

export interface CreateOrderRequest {
  branchId: string;
  currency: string;
  customerId: string;
  deliveryLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  items: unknown[];
  orderType: OrderType;
  organizationId: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryTimelineResponse {
  id: string;
  actualDelivery: string | null;
  actualPickup: string | null;
  estimatedDelivery: string | null;
  estimatedPickup: string | null;
  etaExceeded: boolean | null;
}

export interface OrderSummaryResponse {
  id: string;
  agentId: string | null;
  branchId: string;
  cancelledFromStatus: OrderStatus | null;
  createdAt: string;
  customerId: string;
  deliveryAddress: string;
  draftId: string | null;
  orderType: OrderType;
  organizationId: string;
  paymentVerified: boolean;
  pickupAddress: string;
  reassignmentCount: number;
  status: OrderStatus;
  updatedAt: string;
}

export interface OrderDetailResponse extends OrderSummaryResponse {
  cancellationReason: string | null;
  cancelledAt: string | null;
  costAdjustment: CostAdjustmentResponse | null;
  currency: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  deliveryTimeline: DeliveryTimelineResponse | null;
  incidents: IncidentResponse[];
  items: unknown[];
  paymentId: string | null;
  pickupLatitude: number;
  pickupLongitude: number;
  reassignments: ReassignmentResponse[];
  tip: TipResponse | null;
  totalPrice: number;
  weight: number | null;
}
