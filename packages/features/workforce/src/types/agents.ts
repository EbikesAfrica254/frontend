import type {
  AvailabilityStatus,
  CapabilityClass,
  NationalIdType,
} from "./enums";
import type { DocumentUploadInfo } from "./documents";

export interface CreateAgentRequest {
  alternatePhoneNumber?: string;
  capabilityClass: CapabilityClass;
  documents: DocumentUploadInfo[];
  email?: string;
  firstName: string;
  lastName: string;
  maxConcurrentOrders?: number;
  nationalIdNumber: string;
  nationalIdType: NationalIdType;
  phoneNumber: string;
  userId: string;
}

export interface UpdateAgentRequest {
  alternatePhoneNumber?: string;
  capabilityClass?: CapabilityClass;
  email?: string;
  maxConcurrentOrders?: number;
}

export interface UpdateAvailabilityRequest {
  reason?: string;
  status: AvailabilityStatus;
}

export interface AgentSummaryResponse {
  availabilityStatus: AvailabilityStatus;
  capabilityClass: CapabilityClass;
  createdAt: string;
  email?: string;
  firstName: string;
  id: string;
  lastName: string;
  nationalIdNumber: string;
  phoneNumber: string;
  reliabilityScore?: number;
  updatedAt: string;
}

export interface AgentDetailResponse {
  alternatePhoneNumber?: string;
  availabilityStatus: AvailabilityStatus;
  capabilityClass: CapabilityClass;
  createdAt: string;
  email?: string;
  firstName: string;
  hasActiveSuspension: boolean;
  id: string;
  lastName: string;
  maxConcurrentOrders: number;
  nationalIdNumber: string;
  nationalIdType: NationalIdType;
  phoneNumber: string;
  reliabilityScore?: number;
  updatedAt: string;
}

export interface AvailabilityLogEntry {
  changedAt: string;
  id: string;
  newStatus: AvailabilityStatus;
  previousStatus?: AvailabilityStatus;
  reason?: string;
}
