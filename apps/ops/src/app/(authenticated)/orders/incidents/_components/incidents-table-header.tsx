import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface IncidentsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function IncidentsTableHeader({
  getSortState,
  onSort,
}: IncidentsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-32">Order ID</TableHead>
        <TableHead className="min-w-28">
          <SortableHeader
            title="Type"
            isSorted={getSortState("incidentType")}
            onSort={() => onSort("incidentType")}
          />
        </TableHead>
        <TableHead className="min-w-32">Agent</TableHead>
        <TableHead className="min-w-32">Reported By</TableHead>
        <TableHead className="min-w-48">Notes</TableHead>
        <TableHead className="min-w-40">
          <SortableHeader
            title="Reported At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
