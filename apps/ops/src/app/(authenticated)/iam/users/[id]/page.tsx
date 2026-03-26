import {
  getCurrentUserResource,
  getUserResource,
} from "@repo/features-iam/server";
import { UserDetailActions } from "./_components/user-detail-actions";
import { UserOverviewTab } from "./_components/user-overview-tab";
import { UserMembershipsTab } from "./_components/user-memberships-tab";
import { UserPreferencesTab } from "./_components/user-preferences-tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function UserDetailPage({
  params,
  searchParams,
}: UserDetailPageProps) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const [userResponse, currentUserResponse] = await Promise.all([
    getUserResource(id),
    getCurrentUserResource(),
  ]);

  const user = userResponse.data;
  const currentUser = currentUserResponse.data;
  const fullName = `${user.firstName} ${user.lastName}`;

  const isSystemAdmin = currentUser.memberships.some((membership) =>
    membership.roles.includes("SYSTEM_ADMIN"),
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-end">
        <UserDetailActions
          isSystemAdmin={isSystemAdmin}
          userId={user.id}
          userName={fullName}
          userStatus={user.status}
        />
      </div>

      <Tabs defaultValue={tab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <UserOverviewTab user={user} />
        </TabsContent>

        <TabsContent value="memberships" className="mt-6">
          <UserMembershipsTab user={user} />
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <UserPreferencesTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
