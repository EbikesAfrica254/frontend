import { PackageCheck } from "lucide-react";

export function DeliverySuccessCard() {
  return (
    <div className="max-w-md mx-auto text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-muted p-4">
          <PackageCheck className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Location Confirmed</h1>
        <p className="text-sm text-muted-foreground">
          Your delivery location has been submitted successfully. You will be
          contacted when your parcel is on its way.
        </p>
      </div>
    </div>
  );
}
