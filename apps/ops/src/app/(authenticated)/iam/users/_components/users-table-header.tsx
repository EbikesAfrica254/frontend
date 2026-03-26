import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface UsersTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function UsersTableHeader({
  getSortState,
  onSort,
}: UsersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <SortableHeader
            title="Name"
            isSorted={getSortState("firstName")}
            onSort={() => onSort("firstName")}
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            title="Email"
            isSorted={getSortState("email")}
            onSort={() => onSort("email")}
          />
        </TableHead>
        <TableHead>Phone Number</TableHead>
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
