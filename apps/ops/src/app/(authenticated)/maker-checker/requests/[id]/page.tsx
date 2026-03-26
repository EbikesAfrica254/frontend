import { notFound } from "next/navigation";
import { getRequestDetailsResource } from "@repo/features-maker-checker/server";
import { getOrganizationDocumentPreviewsResource } from "@repo/features-organizations/server";
import { formatDateTime } from "@repo/shared/client";
import {
  EntityType,
  RequestStatusBadge,
} from "@repo/features-maker-checker/client";
import type { DocumentPreviewResponse } from "@repo/features-organizations/client";

import { RequestActions } from "./_components/request-actions";
import { RequestAttachmentsSection } from "./_components/request-attachments-section";
import { RequestDecisionSection } from "./_components/request-decision-section";
import { RequestFieldChangesSection } from "./_components/request-field-changes-section";
import { RequestInfoCard } from "./_components/request-info-card";

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;

  const response = await getRequestDetailsResource(id);

  if (!response) notFound();

  const { decision, fieldChanges, request } = response.data;

  let documentPreviews: DocumentPreviewResponse[] | undefined;

  if (request.entityType === EntityType.ORGANIZATION) {
    const previewsResponse = await getOrganizationDocumentPreviewsResource(
      request.organizationId,
      true,
    ).catch(() => null);

    if (previewsResponse?.data?.length) {
      documentPreviews = previewsResponse.data;
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            {request.entityType} Request
          </h1>
          <p className="text-sm text-muted-foreground">
            Created {formatDateTime(request.createdAt)}
          </p>
        </div>
        <RequestStatusBadge status={request.status} />
      </div>

      <RequestInfoCard request={request} />

      <RequestFieldChangesSection fieldChanges={fieldChanges} />

      {documentPreviews && (
        <RequestAttachmentsSection entries={documentPreviews} />
      )}

      {decision && <RequestDecisionSection decision={decision} />}

      <RequestActions request={request} />
    </div>
  );
}
