import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface OrganizationsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function OrganizationsTableHeader({
  getSortState,
  onSort,
}: OrganizationsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-56">
          <SortableHeader
            title="Organization"
            isSorted={getSortState("displayName")}
            onSort={() => onSort("displayName")}
          />
        </TableHead>

        <TableHead className="hidden w-36 sm:table-cell">
          Registration Type
        </TableHead>

        <TableHead className="w-32">
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>

        <TableHead className="hidden w-36 md:table-cell">Compliance</TableHead>

        <TableHead className="hidden w-45 lg:table-cell">
          <SortableHeader
            title="Created At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>

        <TableHead className="w-18 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
