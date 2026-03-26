import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface NotificationsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function NotificationsTableHeader({
                                           getSortState,
                                           onSort,
                                         }: NotificationsTableHeaderProps) {
  return (
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">
            <SortableHeader
                isSorted={getSortState("channel")}
                onSort={() => onSort("channel")}
                title="Channel"
            />
          </TableHead>

          <TableHead className="w-56">Recipient</TableHead>

          <TableHead className="w-32">
            <SortableHeader
                isSorted={getSortState("status")}
                onSort={() => onSort("status")}
                title="Status"
            />
          </TableHead>

          <TableHead className="hidden w-52 md:table-cell">Template</TableHead>

          <TableHead className="hidden w-45 lg:table-cell">
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