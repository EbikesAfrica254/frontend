import { Table, TableBody } from "@repo/ui/primitives/table";
import { TableEmptyState } from "@repo/ui/tables/states/table-state";
import type { BranchSummaryResponse } from "@repo/features-organizations/client";
import { BranchesTableHeader } from "./branches-table-header";
import { BranchesTableRow } from "./branches-table-row";

interface BranchesTableProps {
  branches: BranchSummaryResponse[];
  organizationId: string;
}

export function BranchesTable({
  branches,
  organizationId,
}: BranchesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <BranchesTableHeader />
        <TableBody>
          {branches.length > 0 ? (
            branches.map((branch) => (
              <BranchesTableRow
                key={branch.id}
                branch={branch}
                organizationId={organizationId}
              />
            ))
          ) : (
            <TableEmptyState columnCount={6} message="No branches found." />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
