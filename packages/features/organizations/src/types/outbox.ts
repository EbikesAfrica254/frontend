import type { OutboxStatus } from "./enums";

export interface OutboxResponse {
  createdAt: string;
  eventType: string;
  id: string;
  retryCount: number;
  routingKey: string;
  status: OutboxStatus;
  updatedAt: string;
}
