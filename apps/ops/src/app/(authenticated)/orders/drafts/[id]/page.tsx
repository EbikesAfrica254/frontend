import { notFound } from "next/navigation";
import { getDraftByIdResource } from "@repo/features-orders/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";
import { DraftPageHeader } from "./_components/draft-page-header";
import { DraftItemsTab } from "./_components/tabs/draft-items-tab";
import { DraftLocationTab } from "./_components/tabs/draft-location-tab";
import { DraftOverviewTab } from "./_components/tabs/draft-overview-tab";

interface DraftDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function DraftDetailPage({
  params,
  searchParams,
}: DraftDetailPageProps) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const response = await getDraftByIdResource(id).catch(() => null);

  if (!response?.data) notFound();

  const draft = response.data;

  return (
    <div className="space-y-6 p-4">
      <DraftPageHeader draft={draft} />

      <Tabs className="w-full" defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="items">Items ({draft.items.length})</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="overview">
          <DraftOverviewTab draft={draft} />
        </TabsContent>

        <TabsContent className="mt-6" value="items">
          <DraftItemsTab draft={draft} />
        </TabsContent>

        <TabsContent className="mt-6" value="location">
          <DraftLocationTab draft={draft} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
