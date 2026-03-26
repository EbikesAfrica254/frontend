import { Suspense } from "react";
import { ActivateAccount } from "./_components/activate-account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activate Account | eBikes Africa",
  robots: "noindex,nofollow",
};

export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Suspense fallback={<VerifyLoadingSkeleton />}>
        <ActivateAccount />
      </Suspense>
    </div>
  );
}

function VerifyLoadingSkeleton() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
