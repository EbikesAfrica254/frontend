import {
  ContactStatus,
  DraftStatus,
  IncidentType,
  OrderStatus,
  OutboxStatus,
  ReassignmentStatus,
  TipPaymentStatus,
} from "../types/enums";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getContactStatusBadge(status: ContactStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    ContactStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [ContactStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [ContactStatus.RESOLVED]: { label: "Resolved", variant: "default" },
    [ContactStatus.UNRESOLVED]: { label: "Unresolved", variant: "outline" },
  };

  return statusMap[status];
}

export function getDraftStatusBadge(status: DraftStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    DraftStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [DraftStatus.CANCELLED]: { label: "Cancelled", variant: "destructive" },
    [DraftStatus.CONFIRMED]: { label: "Confirmed", variant: "default" },
    [DraftStatus.CREATED]: { label: "Created", variant: "secondary" },
    [DraftStatus.EXPIRED]: { label: "Expired", variant: "outline" },
  };

  return statusMap[status];
}

export function getIncidentTypeBadge(type: IncidentType): {
  label: string;
  variant: BadgeVariant;
} {
  const typeMap: Record<
    IncidentType,
    { label: string; variant: BadgeVariant }
  > = {
    [IncidentType.ACCIDENT]: { label: "Accident", variant: "destructive" },
    [IncidentType.AGENT_DISAPPEARED]: {
      label: "Agent Disappeared",
      variant: "destructive",
    },
    [IncidentType.GOODS_DAMAGED]: {
      label: "Goods Damaged",
      variant: "destructive",
    },
    [IncidentType.GOODS_LOST]: { label: "Goods Lost", variant: "destructive" },
    [IncidentType.THEFT]: { label: "Theft", variant: "destructive" },
  };

  return typeMap[type];
}

export function getOrderStatusBadge(status: OrderStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OrderStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OrderStatus.AGENT_UNRESPONSIVE]: {
      label: "Agent Unresponsive",
      variant: "destructive",
    },
    [OrderStatus.ASSIGNED]: { label: "Assigned", variant: "secondary" },
    [OrderStatus.BROADCASTING]: { label: "Broadcasting", variant: "secondary" },
    [OrderStatus.CANCELLED]: { label: "Cancelled", variant: "destructive" },
    [OrderStatus.COMPLETED]: { label: "Completed", variant: "default" },
    [OrderStatus.DELAYED]: { label: "Delayed", variant: "outline" },
    [OrderStatus.DELIVERED]: { label: "Delivered", variant: "default" },
    [OrderStatus.ESCALATED]: { label: "Escalated", variant: "destructive" },
    [OrderStatus.IN_TRANSIT]: { label: "In Transit", variant: "secondary" },
    [OrderStatus.LOST]: { label: "Lost", variant: "destructive" },
    [OrderStatus.PENDING]: { label: "Pending", variant: "outline" },
    [OrderStatus.PENDING_PICKUP]: {
      label: "Pending Pickup",
      variant: "outline",
    },
    [OrderStatus.READY_FOR_BROADCAST]: {
      label: "Ready for Broadcast",
      variant: "secondary",
    },
    [OrderStatus.REASSIGNED]: { label: "Reassigned", variant: "secondary" },
  };

  return statusMap[status];
}

export function getOutboxStatusBadge(status: OutboxStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OutboxStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OutboxStatus.DEAD_LETTER]: {
      label: "Dead Letter",
      variant: "destructive",
    },
    [OutboxStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [OutboxStatus.PENDING]: { label: "Pending", variant: "outline" },
    [OutboxStatus.SENT]: { label: "Sent", variant: "default" },
  };

  return statusMap[status];
}

export function getReassignmentStatusBadge(status: ReassignmentStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    ReassignmentStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [ReassignmentStatus.COMPLETED]: { label: "Completed", variant: "default" },
    [ReassignmentStatus.FAILED]: { label: "Failed", variant: "destructive" },
    [ReassignmentStatus.PENDING]: { label: "Pending", variant: "outline" },
  };

  return statusMap[status];
}

export function getTipPaymentStatusBadge(status: TipPaymentStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    TipPaymentStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [TipPaymentStatus.COMPLETED]: { label: "Completed", variant: "default" },
    [TipPaymentStatus.PENDING]: { label: "Pending", variant: "outline" },
  };

  return statusMap[status];
}
