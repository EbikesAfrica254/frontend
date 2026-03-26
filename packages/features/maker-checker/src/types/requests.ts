import { Decision, FieldType, RequestStatus } from "./enums";

export interface ApproveRequestRequest {
  reason?: string;
}

export interface RejectRequestRequest {
  reason: string;
}

export interface DecisionResponse {
  checkerId: string;
  createdAt: string;
  id: string;
  outcome: Decision;
  reason?: string;
}

export interface FieldChangeResponse {
  createdAt: string;
  fieldName: string;
  fieldType: FieldType;
  id: string;
  newValue?: string;
  oldValue?: string;
}

export interface RequestSummaryResponse {
  branchId?: string;
  createdAt: string;
  decidedAt?: string;
  entityId: string;
  entityType: string;
  id: string;
  makerId: string;
  operationContext?: Record<string, unknown>;
  organizationId: string;
  serviceReference?: string;
  status: RequestStatus;
  updatedAt: string;
}

export interface RequestDetailResponse {
  decision?: DecisionResponse;
  fieldChanges: FieldChangeResponse[];
  request: RequestSummaryResponse;
}
