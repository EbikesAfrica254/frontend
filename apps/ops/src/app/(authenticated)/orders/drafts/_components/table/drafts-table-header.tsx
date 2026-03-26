import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface DraftsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function DraftsTableHeader({
  getSortState,
  onSort,
}: DraftsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-40">
          <SortableHeader
            isSorted={getSortState("customerPhone")}
            onSort={() => onSort("customerPhone")}
            title="Customer Phone"
          />
        </TableHead>

        <TableHead className="w-30">
          <SortableHeader
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
            title="Status"
          />
        </TableHead>

        <TableHead className="w-32.5">
          <SortableHeader
            isSorted={getSortState("contactStatus")}
            onSort={() => onSort("contactStatus")}
            title="Contact"
          />
        </TableHead>

        <TableHead className="hidden w-22.5 sm:table-cell">Items</TableHead>

        <TableHead className="hidden w-45 md:table-cell">
          <SortableHeader
            isSorted={getSortState("expiresAt")}
            onSort={() => onSort("expiresAt")}
            title="Expires At"
          />
        </TableHead>

        <TableHead className="w-[180px]">
          <SortableHeader
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
            title="Created At"
          />
        </TableHead>

        <TableHead className="w-18 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
