import { Skeleton } from "@repo/ui/primitives/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";
import { TableLoadingState } from "@repo/ui/tables/states/table-state";

export default function AgentsLoading() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div />
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Filters skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-12" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="w-[15%]">
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead className="w-[15%]">
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead className="w-[15%]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="w-[10%]">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="w-[15%]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="w-[10%]">
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
