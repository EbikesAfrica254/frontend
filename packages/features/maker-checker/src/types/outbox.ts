import { OutboxStatus } from "./enums";

export interface OutboxResponse {
  id: string;
  createdAt: string;
  eventType: string;
  retryCount: number;
  routingKey: string;
  status: OutboxStatus;
  updatedAt: string;
}
