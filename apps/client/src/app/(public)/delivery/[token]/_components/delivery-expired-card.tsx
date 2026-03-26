import { PackageX } from "lucide-react";

export function DeliveryExpiredCard() {
  return (
    <div className="max-w-md mx-auto text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-muted p-4">
          <PackageX className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Link No Longer Available</h1>
        <p className="text-sm text-muted-foreground">
          This delivery link has either expired or your location has already
          been submitted. Please contact the sender if you need assistance.
        </p>
      </div>
    </div>
  );
}
