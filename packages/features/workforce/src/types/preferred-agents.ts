export interface CreatePreferredAgentRequest {
  agentId: string;
  branchId?: string;
  notes?: string;
  organizationId: string;
  priority: number;
}

export interface UpdatePreferredAgentRequest {
  notes?: string;
  organizationId: string;
  priority?: number;
}

export interface PreferredAgentDetailResponse {
  agentId: string;
  branchId?: string;
  createdAt: string;
  id: string;
  notes?: string;
  organizationId: string;
  priority: number;
  updatedAt: string;
}
