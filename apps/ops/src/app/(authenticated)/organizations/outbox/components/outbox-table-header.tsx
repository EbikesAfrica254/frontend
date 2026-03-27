// outbox-table-header.tsx
import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface OutboxTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function OutboxTableHeader({
  getSortState,
  onSort,
}: OutboxTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-52">
          <SortableHeader
            title="Event Type"
            isSorted={getSortState("eventType")}
            onSort={() => onSort("eventType")}
          />
        </TableHead>

        <TableHead className="hidden w-52 md:table-cell">Routing Key</TableHead>

        <TableHead className="w-24">
          <SortableHeader
            title="Retry Count"
            isSorted={getSortState("retryCount")}
            onSort={() => onSort("retryCount")}
          />
        </TableHead>

        <TableHead className="w-32">
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>

        <TableHead className="hidden w-45 lg:table-cell">
          <SortableHeader
            title="Created At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>

        <TableHead className="hidden w-45 xl:table-cell">
          <SortableHeader
            title="Updated At"
            isSorted={getSortState("updatedAt")}
            onSort={() => onSort("updatedAt")}
          />
        </TableHead>

        <TableHead className="w-18 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
