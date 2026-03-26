import type { UserExtensionResponse } from "@repo/features-iam/client";
import { getMembershipsResource } from "@repo/features-iam/server";
import { MembershipsTable } from "./memberships-table";

interface UserMembershipsTabProps {
  user: UserExtensionResponse;
}

export async function UserMembershipsTab({ user }: UserMembershipsTabProps) {
  const membershipsResponse = await getMembershipsResource(user.keycloakUserId);
  const memberships = membershipsResponse.data || [];

  return (
    <div>
      <MembershipsTable
        keycloakUserId={user.keycloakUserId}
        userExtensionId={user.id}
        memberships={memberships}
      />
    </div>
  );
}
