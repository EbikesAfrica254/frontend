"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@repo/ui/primitives/avatar";
import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { getUserInitials } from "@repo/ui";
import { Edit, X } from "lucide-react";
import type {
  UpdateUserFormData,
  UserExtensionDetailResponse,
} from "@repo/features-iam/client";
import {
  getUserStatusBadge,
  UserDetailForm,
  UserStatus,
} from "@repo/features-iam/client";
import { updateUser } from "@repo/features-iam/actions";
import { formatDateTime } from "@repo/shared/client";

interface UserOverviewTabProps {
  user: UserExtensionDetailResponse;
}

export function UserOverviewTab({ user }: UserOverviewTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fullName = `${user.firstName} ${user.lastName}`;
  const { label, variant } = getUserStatusBadge(user.status);

  const handleSubmit = async (data: UpdateUserFormData) => {
    startTransition(async () => {
      const result = await updateUser(user.id, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        status: data.status as UserStatus,
      });

      if (result.success) {
        toast.success("User updated successfully");
        setIsEditing(false);
      } else {
        toast.error(result.error || "Failed to update user");
      }
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Edit User</h2>
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
          <UserDetailForm user={user} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{getUserInitials(fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={variant}>{label}</Badge>
            {user.status !== UserStatus.DELETED && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground mb-1">Email</dt>
            <dd className="flex items-center gap-2">
              {user.email}
              <Badge
                variant={user.emailVerified ? "default" : "secondary"}
                className="text-xs"
              >
                {user.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground mb-1">Phone</dt>
            <dd className="flex items-center gap-2">
              {user.phoneNumber
                ? `${user.countryCode} ${user.phoneNumber}`
                : "—"}
              {user.phoneNumber && (
                <Badge
                  variant={user.phoneNumberVerified ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.phoneNumberVerified ? "Verified" : "Not Verified"}
                </Badge>
              )}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Keycloak ID
            </dt>
            <dd className="font-mono text-xs text-muted-foreground break-all">
              {user.keycloakUserId}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground mb-1">Status</dt>
            <dd>
              <Badge variant={variant}>{label}</Badge>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground mb-1">Created</dt>
            <dd>{user.createdAt ? formatDateTime(user.createdAt) : "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground mb-1">
              Last Updated
            </dt>
            <dd>{user.updatedAt ? formatDateTime(user.updatedAt) : "—"}</dd>
          </div>
          {user.deletedAt && (
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Deleted
              </dt>
              <dd className="text-destructive">
                {formatDateTime(user.deletedAt)}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
