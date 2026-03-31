"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@repo/ui/primitives/table";
import { Button } from "@repo/ui/primitives/button";
import { Badge } from "@repo/ui/primitives/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/primitives/dropdown-menu";
import { ConfirmationDialog } from "@repo/ui/dialogs/confirmation-dialog";
import type { MembershipResponse } from "@repo/features-iam/client";
import {
  removeFromOrganization,
  removeMembership,
  setPrimaryMembership,
} from "@repo/features-iam/actions";
import { EditMembershipRolesSheet } from "../sheets/edit-membership-roles-sheet";

interface MembershipsTableRowProps {
  membership: MembershipResponse;
  keycloakUserId: string;
  userExtensionId: string;
}

export function MembershipsTableRow({
  membership,
  keycloakUserId,
  userExtensionId,
}: MembershipsTableRowProps) {
  const [editRolesDialogOpen, setEditRolesDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeOrgDialogOpen, setRemoveOrgDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);

  const membershipName = membership.branchName
    ? `${membership.organizationName} / ${membership.branchName}`
    : membership.organizationName;

  const handleSetPrimary = async () => {
    setIsSettingPrimary(true);
    const result = await setPrimaryMembership(
      keycloakUserId,
      membership.organizationId,
      userExtensionId,
    );

    if (result.success) {
      toast.success("Primary membership updated");
    } else {
      toast.error(result.error || "Failed to set primary membership");
    }
    setIsSettingPrimary(false);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    const result = await removeMembership(
      keycloakUserId,
      membership.organizationId,
      membership.keycloakGroupPath,
      userExtensionId,
      membership.branchId,
    );

    if (result.success) {
      toast.success("Membership removed");
      setRemoveDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to remove membership");
    }
    setIsRemoving(false);
  };

  const handleRemoveOrg = async () => {
    setIsRemoving(true);
    const result = await removeFromOrganization(
      keycloakUserId,
      membership.organizationId,
      membership.keycloakGroupPath,
      userExtensionId,
    );

    if (result.success) {
      toast.success("Removed from organization");
      setRemoveOrgDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to remove from organization");
    }
    setIsRemoving(false);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {membership.organizationName}
        </TableCell>
        <TableCell>{membership.branchName || "—"}</TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {membership.roles.map((role) => (
              <Badge key={role} variant="secondary" className="text-xs">
                {role}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          {membership.isPrimary && (
            <Badge variant="default" className="text-xs">
              <Star className="mr-1 h-3 w-3" />
              Primary
            </Badge>
          )}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditRolesDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Roles
              </DropdownMenuItem>
              {!membership.isPrimary && (
                <DropdownMenuItem
                  onClick={handleSetPrimary}
                  disabled={isSettingPrimary}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Set as Primary
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setRemoveDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Membership
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRemoveOrgDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove from Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <EditMembershipRolesSheet
        open={editRolesDialogOpen}
        onOpenChange={setEditRolesDialogOpen}
        keycloakUserId={keycloakUserId}
        userExtensionId={userExtensionId}
        organizationId={membership.organizationId}
        branchId={membership.branchId}
        currentRoles={membership.roles}
        membershipName={membershipName}
      />

      <ConfirmationDialog
        open={removeDialogOpen}
        onOpenChange={setRemoveDialogOpen}
        onConfirm={handleRemove}
        title="Remove Membership"
        description={
          <>
            Remove membership from <strong>{membershipName}</strong>? The user
            will lose access to this
            {membership.branchName ? " branch" : " organization"}.
          </>
        }
        confirmText="Remove Membership"
        isPending={isRemoving}
        variant="destructive"
      />

      <ConfirmationDialog
        open={removeOrgDialogOpen}
        onOpenChange={setRemoveOrgDialogOpen}
        onConfirm={handleRemoveOrg}
        title="Remove from Organization"
        description={
          <>
            Remove all memberships from{" "}
            <strong>{membership.organizationName}</strong>? The user will lose
            access to the entire organization and all its branches.
          </>
        }
        confirmText="Remove from Organization"
        isPending={isRemoving}
        variant="destructive"
      />
    </>
  );
}
