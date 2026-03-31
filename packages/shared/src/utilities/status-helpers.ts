import { OutboxStatus } from "../types/outbox";

type BadgeVariant = "default" | "destructive" | "outline" | "secondary";

export function getOutboxStatusBadge(status: OutboxStatus): {
  label: string;
  variant: BadgeVariant;
} {
  const statusMap: Record<
    OutboxStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [OutboxStatus.DEAD_LETTER]: { label: "Dead Letter", variant: "outline" },
    [OutboxStatus.PENDING]: { label: "Pending", variant: "secondary" },
    [OutboxStatus.SENT]: { label: "Sent", variant: "default" },
    [OutboxStatus.FAILED]: { label: "Failed", variant: "destructive" },
  };

  return statusMap[status];
}
