import { Decision, RequestStatus } from "../types/enums";

export function canApproveRequest(status: RequestStatus): boolean {
  return status === RequestStatus.PENDING;
}

export function canCancelRequest(status: RequestStatus): boolean {
  return status === RequestStatus.PENDING;
}

export function canRejectRequest(status: RequestStatus): boolean {
  return status === RequestStatus.PENDING;
}

export function getDecisionColor(decision: Decision): string {
  const colors: Record<Decision, string> = {
    [Decision.APPROVED]: "bg-green-100 text-green-800 border-green-200",
    [Decision.REJECTED]: "bg-red-100 text-red-800 border-red-200",
  };

  return colors[decision] || "bg-gray-100 text-gray-800 border-gray-200";
}

export function getDecisionLabel(decision: Decision): string {
  const labels: Record<Decision, string> = {
    [Decision.APPROVED]: "Approved",
    [Decision.REJECTED]: "Rejected",
  };

  return labels[decision] || decision;
}

export function getRequestStatusColor(status: RequestStatus): string {
  const colors: Record<RequestStatus, string> = {
    [RequestStatus.APPROVED]: "bg-green-100 text-green-800 border-green-200",
    [RequestStatus.CANCELLED]: "bg-gray-100 text-gray-800 border-gray-200",
    [RequestStatus.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [RequestStatus.REJECTED]: "bg-red-100 text-red-800 border-red-200",
  };

  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
}

export function getRequestStatusLabel(status: RequestStatus): string {
  const labels: Record<RequestStatus, string> = {
    [RequestStatus.APPROVED]: "Approved",
    [RequestStatus.CANCELLED]: "Cancelled",
    [RequestStatus.PENDING]: "Pending",
    [RequestStatus.REJECTED]: "Rejected",
  };

  return labels[status] || status;
}

export function isRequestFinalState(status: RequestStatus): boolean {
  return (
    status === RequestStatus.APPROVED ||
    status === RequestStatus.CANCELLED ||
    status === RequestStatus.REJECTED
  );
}

export function isRequestPending(status: RequestStatus): boolean {
  return status === RequestStatus.PENDING;
}
