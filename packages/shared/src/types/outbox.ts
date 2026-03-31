export enum OutboxStatus {
  DEAD_LETTER = "DEAD_LETTER",
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export interface OutboxResponse {
  id: string;
  createdAt: string;
  eventType: string;
  retryCount: number;
  status: OutboxStatus;
  updatedAt: string;
}
