import { Decision, RequestStatus } from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getDecisionBadge(decision: Decision): {
  label: string;
  variant: BadgeVariant;
} {
  const map: Record<Decision, { label: string; variant: BadgeVariant }> = {
    [Decision.APPROVED]: { label: "Approved", variant: "default" },
    [Decision.REJECTED]: { label: "Rejected", variant: "destructive" },
  };

  return map[decision];
}

export function getRequestStatusBadge(status: RequestStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const map: Record<RequestStatus, { label: string; variant: BadgeVariant }> = {
    [RequestStatus.APPROVED]: { label: "Approved", variant: "default" },
    [RequestStatus.CANCELLED]: { label: "Cancelled", variant: "secondary" },
    [RequestStatus.PENDING]: { label: "Pending", variant: "outline" },
    [RequestStatus.REJECTED]: { label: "Rejected", variant: "destructive" },
  };

  return map[status];
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
