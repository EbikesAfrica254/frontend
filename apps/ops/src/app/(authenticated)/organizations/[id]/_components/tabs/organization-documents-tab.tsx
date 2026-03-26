import { getOrganizationDocumentPreviewsResource } from "@repo/features-organizations/server";
import { DocumentCard } from "@repo/features-organizations/client";
import type { OrganizationResponse } from "@repo/features-organizations/client";

interface OrganizationDocumentsTabProps {
  organization: OrganizationResponse;
}

export async function OrganizationDocumentsTab({
  organization,
}: OrganizationDocumentsTabProps) {
  const response = await getOrganizationDocumentPreviewsResource(
    organization.id,
    true,
  ).catch(() => null);

  const documents = response?.data ?? [];

  if (documents.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No documents uploaded for this organization.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
}
