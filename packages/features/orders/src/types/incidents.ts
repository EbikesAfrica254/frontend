import { IncidentType } from "./enums";

export interface IncidentResponse {
  id: string;
  agentId: string;
  createdAt: string;
  incidentType: IncidentType;
  lastKnownLatitude: number | null;
  lastKnownLongitude: number | null;
  notes: string | null;
  orderId: string;
  reportedBy: string;
}

export interface ReportIncidentRequest {
  agentId: string;
  incidentType: IncidentType;
  lastKnownLatitude?: number;
  lastKnownLongitude?: number;
  notes?: string;
}
