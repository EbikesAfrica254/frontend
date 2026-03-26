import type { DraftDetailResponse } from "@repo/features-orders/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";

interface DraftItemsTabProps {
  draft: DraftDetailResponse;
}

export function DraftItemsTab({ draft }: DraftItemsTabProps) {
  if (draft.items.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No parcel items found for this draft.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Row</TableHead>
            <TableHead>External Reference</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Weight (kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {draft.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-muted-foreground">
                {item.rowNumber}
              </TableCell>
              <TableCell className="font-medium">
                {item.externalReference ?? "—"}
              </TableCell>
              <TableCell>{item.description ?? "—"}</TableCell>
              <TableCell className="text-right">{item.weight ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
