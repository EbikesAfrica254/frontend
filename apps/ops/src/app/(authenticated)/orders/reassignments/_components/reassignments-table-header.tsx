import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface ReassignmentsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function ReassignmentsTableHeader({
  getSortState,
  onSort,
}: ReassignmentsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-32">Order ID</TableHead>
        <TableHead className="min-w-20">Attempt</TableHead>
        <TableHead className="min-w-40">
          <SortableHeader
            title="Reason"
            isSorted={getSortState("reason")}
            onSort={() => onSort("reason")}
          />
        </TableHead>
        <TableHead className="min-w-32">Previous Agent</TableHead>
        <TableHead className="min-w-32">New Agent</TableHead>
        <TableHead className="min-w-28">
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>
        <TableHead className="min-w-32">Initiated By</TableHead>
        <TableHead className="min-w-40">
          <SortableHeader
            title="Created At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>
        <TableHead className="min-w-28">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
