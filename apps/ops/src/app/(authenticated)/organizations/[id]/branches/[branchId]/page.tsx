import { notFound } from "next/navigation";
import { getBranchResource } from "@repo/features-organizations/server";
import { BranchPageHeader } from "./_components/branch-page-header";
import { BranchOverview } from "./_components/branch-overview";

interface BranchDetailPageProps {
  params: Promise<{ id: string; branchId: string }>;
}

export default async function BranchDetailPage({
  params,
}: BranchDetailPageProps) {
  const { id: organizationId, branchId } = await params;

  const response = await getBranchResource(organizationId, branchId).catch(
    () => null,
  );

  if (!response?.data) {
    notFound();
  }

  const branch = response.data;

  return (
    <div className="space-y-6 p-4">
      <BranchPageHeader branch={branch} organizationId={organizationId} />
      <BranchOverview branch={branch} />
    </div>
  );
}
