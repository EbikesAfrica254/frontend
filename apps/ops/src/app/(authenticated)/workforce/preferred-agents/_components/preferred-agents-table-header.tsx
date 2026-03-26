import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface PreferredAgentsTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function PreferredAgentsTableHeader({
  getSortState,
  onSort,
}: PreferredAgentsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[25%]">
          <SortableHeader
            title="Agent ID"
            isSorted={getSortState("agentId")}
            onSort={() => onSort("agentId")}
          />
        </TableHead>
        <TableHead className="w-[20%]">
          <SortableHeader
            title="Organization"
            isSorted={getSortState("organizationId")}
            onSort={() => onSort("organizationId")}
          />
        </TableHead>
        <TableHead className="w-[15%]">
          <SortableHeader
            title="Priority"
            isSorted={getSortState("priority")}
            onSort={() => onSort("priority")}
          />
        </TableHead>
        <TableHead className="w-[25%]">
          <SortableHeader
            title="Created At"
            isSorted={getSortState("createdAt")}
            onSort={() => onSort("createdAt")}
          />
        </TableHead>
        <TableHead className="w-[15%]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
