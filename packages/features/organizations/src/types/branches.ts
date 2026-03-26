import type { BranchStatus, DayOfWeek } from "./enums";

export interface BranchAddressRequest {
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  streetAddress: string;
}

export interface BranchAddressResponse {
  city: string;
  country: string;
  id: string;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  streetAddress: string;
}

export interface BranchResponse {
  address: BranchAddressResponse;
  branchName: string;
  createdAt: string;
  createdBy: string;
  displayName: string;
  email: string;
  id: string;
  operatingHours?: DaySchedule[];
  organizationId: string;
  phoneNumber: string;
  status: BranchStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface BranchSummaryResponse {
  branchName: string;
  createdAt: string;
  createdBy: string;
  displayName: string;
  email: string;
  id: string;
  organizationId: string;
  phoneNumber: string;
  status: BranchStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface CreateBranchRequest {
  address: BranchAddressRequest;
  branchName: string;
  displayName: string;
  email: string;
  operatingHours?: DaySchedule[];
  phoneNumber: string;
}

export interface DaySchedule {
  closes: string;
  dayOfWeek: DayOfWeek;
  opens: string;
}

export interface DeactivateBranchRequest {
  reason: string;
}

export interface UpdateBranchRequest {
  address?: BranchAddressRequest;
  branchName?: string;
  displayName?: string;
  email?: string;
  operatingHours?: DaySchedule[];
  phoneNumber?: string;
}
