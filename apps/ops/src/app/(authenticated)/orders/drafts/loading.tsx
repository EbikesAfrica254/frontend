import { Skeleton } from "@repo/ui/primitives/skeleton";

export default function DraftsLoading() {
  return (
    <div className="space-y-6 p-4">
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-150 w-full rounded-lg" />
    </div>
  );
}
