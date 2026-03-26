import type { OrderDetailResponse } from "@repo/features-orders/client";
import { IncidentTypeBadge } from "@repo/features-orders/client";
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

interface IncidentsTabProps {
  order: OrderDetailResponse;
}

export function IncidentsTab({ order }: IncidentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Incidents</h2>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Last Known Latitude</TableHead>
                <TableHead>Last Known Longitude</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Reported At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.incidents.length > 0 ? (
                order.incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <IncidentTypeBadge type={incident.incidentType} />
                    </TableCell>
                    <TableCell>{incident.agentId}</TableCell>
                    <TableCell>{incident.reportedBy}</TableCell>
                    <TableCell>{incident.lastKnownLatitude ?? "—"}</TableCell>
                    <TableCell>{incident.lastKnownLongitude ?? "—"}</TableCell>
                    <TableCell>{incident.notes || "—"}</TableCell>
                    <TableCell>{formatDateTime(incident.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableEmptyState
                  columnCount={7}
                  message="No incidents found."
                />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
