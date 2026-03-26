import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDraftForDeliveryResource } from "@repo/features-orders/server";
import { ApiError } from "@repo/shared/server";
import { DeliveryDraftPreview } from "./_components/delivery-draft-preview";
import { DeliveryExpiredCard } from "./_components/delivery-expired-card";
import { DeliveryLocationForm } from "./_components/delivery-location-form";
import { DraftStatus } from "@repo/features-orders/client";
import { DeliverySuccessCard } from "@/app/(public)/delivery/[token]/_components/delivery-success-card";

export const metadata: Metadata = {
  title: "Confirm Delivery Location | eBikes Africa",
  robots: "noindex,nofollow",
};

interface DeliveryPageProps {
  params: Promise<{ token: string }>;
}

export default async function DeliveryPage({ params }: DeliveryPageProps) {
  const { token: shortCode } = await params;

  let draft;
  let deliveryToken: string | null = null;

  try {
    const response = await getDraftForDeliveryResource(shortCode);
    draft = response.data.draft;
    deliveryToken = response.data.deliveryToken;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 410) {
        return (
          <div className="container mx-auto px-4 py-16">
            <DeliveryExpiredCard />
          </div>
        );
      }

      if (error.status === 404) {
        notFound();
      }
    }

    throw error;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <DeliveryDraftPreview draft={draft} />
        {draft.status === DraftStatus.CONFIRMED ? (
          <DeliverySuccessCard />
        ) : (
          <DeliveryLocationForm
            deliveryToken={deliveryToken}
            draft={draft}
            shortCode={shortCode}
          />
        )}
      </div>
    </div>
  );
}
