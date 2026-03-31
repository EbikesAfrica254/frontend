import { TableHead, TableHeader, TableRow } from "@repo/ui/primitives/table";
import { SortableHeader } from "@repo/ui/tables/controls/sortable-header";
import React from "react";

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
        <TableHead>
          <SortableHeader
            title="Event Type"
            isSorted={getSortState("eventType")}
            onSort={() => onSort("eventType")}
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            title="Retry Count"
            isSorted={getSortState("retryCount")}
            onSort={() => onSort("retryCount")}
          />
        </TableHead>
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
        <TableHead>
          <SortableHeader
            title="Updated At"
            isSorted={getSortState("updatedAt")}
            onSort={() => onSort("updatedAt")}
          />
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
