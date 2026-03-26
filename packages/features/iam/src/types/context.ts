export interface ContextResponse {
  organizationId: string;
  branchId?: string;
  roles: string[];
}

export interface SwitchContextRequest {
  organizationId: string;
  branchId?: string;
}
