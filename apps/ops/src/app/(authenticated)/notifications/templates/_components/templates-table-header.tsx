import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface TemplatesTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function TemplatesTableHeader({
  getSortState,
  onSort,
}: TemplatesTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <SortableHeader
            isSorted={getSortState("name")}
            onSort={() => onSort("name")}
            title="Name"
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            isSorted={getSortState("channel")}
            onSort={() => onSort("channel")}
            title="Channel"
          />
        </TableHead>
        <TableHead>Content Type</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>
          <SortableHeader
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
            title="Created At"
          />
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
