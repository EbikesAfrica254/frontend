import { Skeleton } from "@repo/ui/primitives/skeleton";

export default function DraftDetailLoading() {
  return (
    <div className="space-y-6 p-4">
      <Skeleton className="h-16 w-full rounded-lg" />
      <Skeleton className="h-10 w-64 rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
}
