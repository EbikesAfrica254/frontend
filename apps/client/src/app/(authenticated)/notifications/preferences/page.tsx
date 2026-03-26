import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/primitives/card";
import { UserPreferencesMatrix } from "@repo/features-notifications/client";
import { sessionUtilities } from "@/utilities/session-utilities";
import { searchUserPreferences } from "@repo/features-notifications/actions";

export default async function NotificationPreferencesPage() {
  const session = await sessionUtilities();

  if (!session?.user?.keycloakUserId) {
    redirect("/");
  }

  const response = await searchUserPreferences(
    session.user.keycloakUserId,
    "page=1&size=100",
  );

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage which channels are active for each notification category.
          </p>
        </CardHeader>
        <CardContent>
          <UserPreferencesMatrix
            keycloakUserId={session.user.keycloakUserId}
            preferences={response.success ? response.data.data : []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
