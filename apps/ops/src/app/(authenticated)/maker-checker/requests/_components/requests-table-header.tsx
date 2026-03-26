import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface RequestsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function RequestsTableHeader({
  getSortState,
  onSort,
}: RequestsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <SortableHeader
            title="Entity Type"
            isSorted={getSortState("entityType")}
            onSort={() => onSort("entityType")}
          />
        </TableHead>
        <TableHead>Organization ID</TableHead>
        <TableHead>
          <SortableHeader
            title="Maker ID"
            isSorted={getSortState("makerId")}
            onSort={() => onSort("makerId")}
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            title="Created At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
