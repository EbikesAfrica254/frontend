import { auth } from "@repo/features-auth/server";
import {
  ApprovalActionButtons,
  RequestSummaryResponse,
} from "@repo/features-maker-checker/client";

interface RequestActionsProps {
  request: RequestSummaryResponse;
}

export async function RequestActions({ request }: RequestActionsProps) {
  const session = await auth();
  const currentUserId = session?.user?.keycloakUserId;
  const isMaker = currentUserId === request.makerId;

  return (
    <ApprovalActionButtons
      isMaker={isMaker}
      requestId={request.id}
      status={request.status}
    />
  );
}
