import { searchSuspensionsResource } from "@repo/features-workforce/server";
import { SuspensionStatusBadge } from "@repo/features-workforce/client";
import { formatDateTime } from "@repo/shared/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";

interface AgentSuspensionsTabProps {
  agentId: string;
}

export async function AgentSuspensionsTab({
  agentId,
}: AgentSuspensionsTabProps) {
  const response = await searchSuspensionsResource(agentId, "").catch(
    () => null,
  );
  console.log("Response", JSON.stringify(response));
  const suspensions = response?.data ?? [];

  if (suspensions.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No suspension history for this agent.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Suspended At</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead>Lifted At</TableHead>
            <TableHead>Lifted By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suspensions.map((suspension) => (
            <TableRow key={suspension.id}>
              <TableCell>
                <SuspensionStatusBadge isActive={suspension.isActive} />
              </TableCell>
              <TableCell>{suspension.reason}</TableCell>
              <TableCell>{formatDateTime(suspension.createdAt)}</TableCell>
              <TableCell>
                {suspension.expiresAt
                  ? formatDateTime(suspension.expiresAt)
                  : "—"}
              </TableCell>
              <TableCell>
                {suspension.liftedAt
                  ? formatDateTime(suspension.liftedAt)
                  : "—"}
              </TableCell>
              <TableCell>{suspension.liftedBy ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
