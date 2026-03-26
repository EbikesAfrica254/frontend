"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Edit, X } from "lucide-react";
import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { formatDateTime } from "@repo/shared/client";
import {
  formatRegistrationType,
  getComplianceStatusBadge,
  getOrganizationStatusBadge,
  OrganizationResponse,
  UpdateOrganizationForm,
  UpdateOrganizationFormData,
} from "@repo/features-organizations/client";
import { updateOrganization } from "@repo/features-organizations/actions";

interface OrganizationOverviewTabProps {
  organization: OrganizationResponse;
}

export function OrganizationOverviewTab({
  organization,
}: OrganizationOverviewTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { label: statusLabel, variant: statusVariant } =
    getOrganizationStatusBadge(organization.status);
  const { label: complianceLabel, variant: complianceVariant } =
    getComplianceStatusBadge(organization.complianceStatus);

  const handleSubmit = async (data: UpdateOrganizationFormData) => {
    startTransition(async () => {
      const result = await updateOrganization(organization.id, data);

      if (result.success) {
        toast.success("Organization updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.error ?? "Failed to update organization");
      }
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Edit Organization</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UpdateOrganizationForm
            organization={organization}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    );
  }

  const primaryAddress = organization.addresses?.[0];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{organization.displayName}</h1>
            <p className="text-sm text-muted-foreground">
              {organization.legalName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={complianceVariant}>{complianceLabel}</Badge>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground mb-1">Email</dt>
            <dd>{organization.email}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">Phone</dt>
            <dd>{organization.phoneNumber ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Registration Type
            </dt>
            <dd>{formatRegistrationType(organization.registrationType)}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Registration Number
            </dt>
            <dd>{organization.registrationNumber ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">KRA PIN</dt>
            <dd className="font-mono text-xs">{organization.kraPin ?? "—"}</dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Incorporation Date
            </dt>
            <dd>
              {organization.incorporationDate
                ? formatDateTime(organization.incorporationDate)
                : "—"}
            </dd>
          </div>

          {primaryAddress && (
            <div className="col-span-2">
              <dt className="font-medium text-muted-foreground mb-1">
                Primary Address
              </dt>
              <dd>
                {primaryAddress.streetAddress}, {primaryAddress.city},{" "}
                {primaryAddress.country}
                {primaryAddress.postalCode
                  ? ` ${primaryAddress.postalCode}`
                  : ""}
              </dd>
            </div>
          )}

          <div>
            <dt className="font-medium text-muted-foreground mb-1">Created</dt>
            <dd>
              {organization.createdAt
                ? formatDateTime(organization.createdAt)
                : "—"}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Last Updated
            </dt>
            <dd>
              {organization.updatedAt
                ? formatDateTime(organization.updatedAt)
                : "—"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
