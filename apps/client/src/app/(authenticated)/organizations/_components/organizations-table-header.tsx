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
        <TableHead>
          <SortableHeader
            title="Organization"
            isSorted={getSortState("legalName")}
            onSort={() => onSort("legalName")}
          />
        </TableHead>
        <TableHead>Registration Type</TableHead>
        <TableHead>
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>
        <TableHead>Compliance</TableHead>
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
