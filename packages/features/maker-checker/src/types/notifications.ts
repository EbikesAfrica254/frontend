interface NotificationData {
  [key: string]: unknown;
}

export interface ApprovalNotificationData extends NotificationData {
  requestId: string;
  requestStatus: string;
  requesterName: string;
  requesterOrganization: string;
  entityType: string;
  entityId: string;
  changedFieldCount: number;
}
