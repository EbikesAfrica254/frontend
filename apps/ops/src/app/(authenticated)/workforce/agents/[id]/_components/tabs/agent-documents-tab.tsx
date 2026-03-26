import { getAgentDocumentPreviewsResource } from "@repo/features-workforce/server";
import { DocumentCard } from "@repo/features-workforce/client";

interface AgentDocumentsTabProps {
  agentId: string;
}

export async function AgentDocumentsTab({ agentId }: AgentDocumentsTabProps) {
  const response = await getAgentDocumentPreviewsResource(agentId).catch(
    () => null,
  );
  const documents = response?.data ?? [];

  if (documents.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No documents uploaded for this agent.
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
