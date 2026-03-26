import { ReassignmentStatus } from "./enums";

export interface InitiateReassignmentRequest {
  reason: string;
}

export interface ReassignmentResponse {
  id: string;
  attemptNumber: number;
  completedAt: string | null;
  createdAt: string;
  initiatedBy: string;
  newAgentId: string | null;
  orderId: string;
  previousAgentId: string | null;
  reason: string;
  status: ReassignmentStatus;
  version: number;
}
