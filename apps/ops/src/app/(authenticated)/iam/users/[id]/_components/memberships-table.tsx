"use client";

import { useState } from "react";
import { Button } from "@repo/ui/primitives/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/primitives/table";
import { TableEmptyState } from "@repo/ui/tables/states/table-state";
import { Plus } from "lucide-react";
import type { MembershipResponse } from "@repo/features-iam/client";
import { MembershipsTableRow } from "./memberships-table-row";
import { AddMembershipDialog } from "./add-membership-dialog";

interface MembershipsTableProps {
  keycloakUserId: string;
  userExtensionId: string;
  memberships: MembershipResponse[];
}

export function MembershipsTable({
  keycloakUserId,
  userExtensionId,
  memberships,
}: MembershipsTableProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {memberships.length}{" "}
            {memberships.length === 1 ? "membership" : "memberships"}
          </p>
          <Button onClick={() => setAddDialogOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Membership
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.length > 0 ? (
                memberships.map((membership) => (
                  <MembershipsTableRow
                    key={membership.id}
                    membership={membership}
                    keycloakUserId={keycloakUserId}
                    userExtensionId={userExtensionId}
                  />
                ))
              ) : (
                <TableEmptyState
                  columnCount={5}
                  message="No memberships found."
                />
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddMembershipDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        keycloakUserId={keycloakUserId}
        userExtensionId={userExtensionId}
      />
    </>
  );
}
