import Link from "next/link";
import { Button } from "@repo/ui/primitives/button";

export default function NotificationNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">Notification Not Found</h1>
      <p className="text-muted-foreground">
        The notification you are looking for does not exist or has been removed.
      </p>
      <Button asChild variant="outline">
        <Link href="/notifications">Back to Notifications</Link>
      </Button>
    </div>
  );
}
