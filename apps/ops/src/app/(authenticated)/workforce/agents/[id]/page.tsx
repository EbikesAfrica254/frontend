import { notFound } from "next/navigation";
import { getAgentResource } from "@repo/features-workforce/server";
import { auth } from "@repo/features-auth/server";
import { hasRole } from "@repo/features-auth/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/primitives/tabs";
import { AgentPageHeader } from "./_components/agent-page-header";
import { AgentOverviewTab } from "./_components/tabs/agent-overview-tab";
import { AgentDocumentsTab } from "./_components/tabs/agent-documents-tab";
import { AgentCertificationsTab } from "./_components/tabs/agent-certifications-tab";
import { AgentPaymentMethodsTab } from "./_components/tabs/agent-payment-methods-tab";
import { AgentSuspensionsTab } from "./_components/tabs/agent-suspensions-tab";

interface AgentDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function AgentDetailPage({
  params,
  searchParams,
}: AgentDetailPageProps) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const session = await auth();
  const isSystemAdmin = hasRole(session, "SYSTEM_ADMIN");

  const response = await getAgentResource(id);

  if (!response) notFound();

  const agent = response.data;

  return (
    <div className="space-y-6 p-4">
      <AgentPageHeader agent={agent} isSystemAdmin={isSystemAdmin} />

      <Tabs className="w-full" defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="suspensions">Suspensions</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6" value="overview">
          <AgentOverviewTab agent={agent} />
        </TabsContent>

        <TabsContent className="mt-6" value="documents">
          <AgentDocumentsTab agentId={agent.id} />
        </TabsContent>

        <TabsContent className="mt-6" value="certifications">
          <AgentCertificationsTab agentId={agent.id} />
        </TabsContent>

        <TabsContent className="mt-6" value="payment-methods">
          <AgentPaymentMethodsTab agentId={agent.id} />
        </TabsContent>

        <TabsContent className="mt-6" value="suspensions">
          <AgentSuspensionsTab agentId={agent.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
