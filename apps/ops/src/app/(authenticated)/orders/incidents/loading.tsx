import { Skeleton } from "@repo/ui/primitives/skeleton";

export default function OrdersLoading() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-150 w-full rounded-lg" />
    </div>
  );
}
