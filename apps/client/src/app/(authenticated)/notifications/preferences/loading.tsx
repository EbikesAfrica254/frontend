import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { Skeleton } from "@repo/ui/primitives/skeleton";

export default function NotificationPreferencesLoading() {
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="w-48 p-4">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <th key={i} className="min-w-28 p-4 text-center">
                      <Skeleton className="mx-auto h-4 w-12" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-36" />
                    </td>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="p-4 text-center">
                        <Skeleton className="mx-auto h-5 w-9 rounded-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
