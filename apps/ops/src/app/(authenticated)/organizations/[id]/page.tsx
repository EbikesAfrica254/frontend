import { notFound } from "next/navigation";
import { getOrganizationResource } from "@repo/features-organizations/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";
import { OrganizationBranchesTab } from "./_components/tabs/organization-branches-tab";
import { OrganizationDocumentsTab } from "./_components/tabs/organization-documents-tab";
import { OrganizationOverviewTab } from "./_components/tabs/organization-overview-tab";
import { OrganizationNotificationsTab } from "@/app/(authenticated)/organizations/[id]/_components/tabs/organization-notifications-tab";

interface OrganizationDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function OrganizationDetailPage({
  params,
  searchParams,
}: OrganizationDetailPageProps) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const response = await getOrganizationResource(id);

  if (!response) notFound();

  const organization = response.data;

  return (
    <div className="space-y-6 p-4">
      <Tabs className="w-full" defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="overview">
          <OrganizationOverviewTab organization={organization} />
        </TabsContent>

        <TabsContent className="mt-6" value="documents">
          <OrganizationDocumentsTab organization={organization} />
        </TabsContent>

        <TabsContent className="mt-6" value="branches">
          <OrganizationBranchesTab organization={organization} />
        </TabsContent>

        <TabsContent className="mt-6" value="preferences">
          <OrganizationNotificationsTab organization={organization} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
