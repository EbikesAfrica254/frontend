import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface AgentsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function AgentsTableHeader({
  getSortState,
  onSort,
}: AgentsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-55">
          <SortableHeader
            title="Name"
            isSorted={getSortState("firstName")}
            onSort={() => onSort("firstName")}
          />
        </TableHead>

        <TableHead className="hidden w-40 sm:table-cell">
          <SortableHeader
            title="Phone"
            isSorted={getSortState("phoneNumber")}
            onSort={() => onSort("phoneNumber")}
          />
        </TableHead>

        <TableHead className="w-35">
          <SortableHeader
            title="Class"
            isSorted={getSortState("capabilityClass")}
            onSort={() => onSort("capabilityClass")}
          />
        </TableHead>

        <TableHead className="w-37.5">
          <SortableHeader
            title="Availability"
            isSorted={getSortState("availabilityStatus")}
            onSort={() => onSort("availabilityStatus")}
          />
        </TableHead>

        <TableHead className="hidden w-30 lg:table-cell">
          <SortableHeader
            title="Reliability"
            isSorted={getSortState("reliabilityScore")}
            onSort={() => onSort("reliabilityScore")}
          />
        </TableHead>

        <TableHead className="hidden w-45 md:table-cell">
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
