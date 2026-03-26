import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";

interface OrdersTableHeaderProps {
  getSortState: (field: string) => false | "asc" | "desc";
  onSort: (field: string) => void;
}

export function OrdersTableHeader({
  getSortState,
  onSort,
}: OrdersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-40">
          <SortableHeader
            title="Customer ID"
            isSorted={getSortState("customerId")}
            onSort={() => onSort("customerId")}
          />
        </TableHead>

        <TableHead className="w-60">Pickup Address</TableHead>

        <TableHead className="hidden w-60 md:table-cell">
          Delivery Address
        </TableHead>

        <TableHead className="hidden w-35 xl:table-cell">Order Type</TableHead>

        <TableHead className="w-32.5">
          <SortableHeader
            title="Status"
            isSorted={getSortState("status")}
            onSort={() => onSort("status")}
          />
        </TableHead>

        <TableHead className="w-45">
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
