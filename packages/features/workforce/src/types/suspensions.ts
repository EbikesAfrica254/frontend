export interface SuspendAgentRequest {
  expiresAt?: string;
  notes?: string;
  reason: string;
}

export interface LiftSuspensionRequest {
  notes?: string;
}

export interface SuspensionDetailResponse {
  agentId: string;
  createdAt: string;
  expiresAt?: string;
  id: string;
  isActive: boolean;
  liftedAt?: string;
  liftedBy?: string;
  liftNotes?: string;
  notes?: string;
  reason: string;
}
