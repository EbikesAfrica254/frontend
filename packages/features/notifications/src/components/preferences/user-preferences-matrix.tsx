"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Lock, Loader2 } from "lucide-react";
import { Switch } from "@repo/ui/primitives/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/primitives/tooltip";
import type { UserPreferenceResponse } from "@repo/features-notifications/client";
import {
  NotificationCategory,
  NotificationChannel,
} from "@repo/features-notifications/client";
import {
  createUserPreference,
  deleteUserPreference,
  updateUserPreference,
} from "@repo/features-notifications/actions";
import { getCategories, getChannels } from "../../utilities/preference-helpers";
import React from "react";

const CATEGORIES = getCategories();
const CHANNELS = getChannels();

interface UserPreferencesMatrixProps {
  keycloakUserId: string;
  preferences: UserPreferenceResponse[];
}

export function UserPreferencesMatrix({
  keycloakUserId,
  preferences: initialPreferences,
}: UserPreferencesMatrixProps) {
  const [preferences, setPreferences] =
    useState<UserPreferenceResponse[]>(initialPreferences);
  const [pending, setPending] = useState<string | null>(null);

  const cellKey = (
    category: NotificationCategory,
    channel: NotificationChannel,
  ) => `${category}:${channel}`;

  const getPreference = (
    category: NotificationCategory,
    channel: NotificationChannel,
  ) =>
    preferences.find((p) => p.category === category && p.channel === channel);

  const handleToggle = async (
    category: NotificationCategory,
    channel: NotificationChannel,
  ) => {
    const key = cellKey(category, channel);
    const existing = getPreference(category, channel);
    setPending(key);

    if (!existing) {
      const result = await createUserPreference(keycloakUserId, {
        category,
        channel,
        enabled: true,
      });

      if (result.success) {
        setPreferences((prev) => [...prev, result.data]);
        toast.success("Preference enabled");
      } else {
        toast.error(result.error || "Failed to create preference");
      }
    } else if (existing.enabled) {
      const result = await deleteUserPreference(
        keycloakUserId,
        channel,
        category,
      );

      if (result.success) {
        setPreferences((prev) =>
          prev.filter(
            (p) => !(p.category === category && p.channel === channel),
          ),
        );
        toast.success("Preference disabled");
      } else {
        toast.error(result.error || "Failed to disable preference");
      }
    } else {
      const result = await updateUserPreference(
        keycloakUserId,
        channel,
        category,
        { enabled: true },
      );

      if (result.success) {
        setPreferences((prev) =>
          prev.map((p) =>
            p.category === category && p.channel === channel
              ? { ...p, enabled: true }
              : p,
          ),
        );
        toast.success("Preference enabled");
      } else {
        toast.error(result.error || "Failed to update preference");
      }
    }

    setPending(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure which channels are active for each notification category.
            Locked rows are mandatory and cannot be disabled.
          </p>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-48">
                  Category
                </th>
                {CHANNELS.map((channel) => (
                  <th
                    key={channel.value}
                    className="text-center p-4 text-sm font-medium text-muted-foreground min-w-28"
                  >
                    {channel.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CATEGORIES.map((category) => (
                <tr
                  key={category.value}
                  className={category.mandatory ? "bg-muted/30" : undefined}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">
                        {category.label}
                      </span>
                      {category.mandatory && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Mandatory — always delivered regardless of
                            preference
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.description}
                    </p>
                  </td>
                  {CHANNELS.map((channel) => {
                    const key = cellKey(category.value, channel.value);
                    const preference = getPreference(
                      category.value,
                      channel.value,
                    );
                    const isLoading = pending === key;
                    const isEnabled = !!preference?.enabled;

                    if (category.mandatory) {
                      const mandatoryEnabled = preference?.enabled ?? true;

                      return (
                        <td key={channel.value} className="p-4 text-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center justify-center">
                                <Switch
                                  checked={mandatoryEnabled}
                                  disabled
                                  aria-label={`${category.label} via ${channel.label} (mandatory)`}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {category.label} notifications are always
                              delivered regardless of this setting
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      );
                    }

                    return (
                      <td key={channel.value} className="p-4 text-center">
                        {isLoading ? (
                          <div className="inline-flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        ) : (
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() =>
                              handleToggle(category.value, channel.value)
                            }
                            disabled={isLoading}
                            aria-label={`${category.label} via ${channel.label}`}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
}
