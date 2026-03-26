import { Skeleton } from "@repo/ui/primitives/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";
import { TableLoadingState } from "@repo/ui/tables/states/table-state";

export default function OrdersLoading() {
  return (
    <div className="space-y-6 p-4">
      {/* Filters skeleton — 8 cells matching OrderFilters grid */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-12" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-35">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="w-[25%]">
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead className="w-[25%]">
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead className="w-30">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="w-35">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="w-40">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="w-15">
                  <Skeleton className="h-4 w-14" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableLoadingState columnCount={7} />
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-17.5" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
