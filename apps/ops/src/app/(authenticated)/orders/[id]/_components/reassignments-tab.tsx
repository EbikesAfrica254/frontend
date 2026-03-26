import type { OrderDetailResponse } from "@repo/features-orders/client";
import { ReassignmentStatusBadge } from "@repo/features-orders/client";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";
import { TableEmptyState } from "@repo/ui/tables/states/table-state";
import { formatDateTime } from "@repo/shared/client";

interface ReassignmentsTabProps {
  order: OrderDetailResponse;
}

export function ReassignmentsTab({ order }: ReassignmentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Reassignments</h2>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attempt</TableHead>
                <TableHead>Previous Agent</TableHead>
                <TableHead>New Agent</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Initiated By</TableHead>
                <TableHead>Initiated At</TableHead>
                <TableHead>Completed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.reassignments.length > 0 ? (
                order.reassignments.map((reassignment) => (
                  <TableRow key={reassignment.id}>
                    <TableCell>{reassignment.attemptNumber}</TableCell>
                    <TableCell>{reassignment.previousAgentId || "—"}</TableCell>
                    <TableCell>{reassignment.newAgentId || "—"}</TableCell>
                    <TableCell>{reassignment.reason}</TableCell>
                    <TableCell>
                      <ReassignmentStatusBadge status={reassignment.status} />
                    </TableCell>
                    <TableCell>{reassignment.initiatedBy}</TableCell>
                    <TableCell>
                      {formatDateTime(reassignment.initiatedAt)}
                    </TableCell>
                    <TableCell>
                      {reassignment.completedAt
                        ? formatDateTime(reassignment.completedAt)
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableEmptyState
                  columnCount={8}
                  message="No reassignments found."
                />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
