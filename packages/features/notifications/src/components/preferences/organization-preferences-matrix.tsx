"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@repo/ui/primitives/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/primitives/tooltip";
import {
  createOrganizationPreference,
  deleteOrganizationPreference,
  updateOrganizationPreference,
} from "../../actions/preferences/organization";
import { NotificationCategory, NotificationChannel } from "../../types/enums";
import type { OrganizationPreferenceResponse } from "../../types/preferences";
import { getCategories, getChannels } from "../../utilities/preference-helpers";
import React from "react";

const CATEGORIES = getCategories();
const CHANNELS = getChannels();

interface OrganizationPreferencesMatrixProps {
  organizationId: string;
  preferences: OrganizationPreferenceResponse[];
}

export function OrganizationPreferencesMatrix({
  organizationId,
  preferences: initialPreferences,
}: OrganizationPreferencesMatrixProps) {
  const [pending, setPending] = useState<string | null>(null);
  const [preferences, setPreferences] =
    useState<OrganizationPreferenceResponse[]>(initialPreferences);

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
      const result = await createOrganizationPreference(organizationId, {
        category,
        channel,
        enabled: true,
      });

      if (result.success) {
        const { data } = result;
        setPreferences((prev) => [...prev, data]);
        toast.success("Channel enabled");
      } else {
        toast.error(result.error ?? "Failed to enable channel");
      }
    } else if (existing.enabled) {
      const result = await deleteOrganizationPreference(
        existing.id,
        organizationId,
      );

      if (result.success) {
        setPreferences((prev) =>
          prev.filter(
            (p) => !(p.category === category && p.channel === channel),
          ),
        );
        toast.success("Channel disabled");
      } else {
        toast.error(result.error ?? "Failed to disable channel");
      }
    } else {
      const result = await updateOrganizationPreference(
        existing.id,
        organizationId,
        { enabled: true },
      );

      if (result.success) {
        const { data } = result;
        setPreferences((prev) =>
          prev.map((p) =>
            p.category === category && p.channel === channel
              ? { ...p, enabled: true, version: data.version }
              : p,
          ),
        );
        toast.success("Channel enabled");
      } else {
        toast.error(result.error ?? "Failed to enable channel");
      }
    }

    setPending(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">
            Organization Notification Channels
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure which channels are active for each notification category
            within this organization. Locked rows are mandatory and cannot be
            disabled.
          </p>
        </div>
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-48 p-4 text-left text-sm font-medium text-muted-foreground">
                  Category
                </th>
                {CHANNELS.map((channel) => (
                  <th
                    key={channel.value}
                    className="min-w-28 p-4 text-center text-sm font-medium text-muted-foreground"
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
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </td>
                  {CHANNELS.map((channel) => {
                    const key = cellKey(category.value, channel.value);
                    const isLoading = pending === key;
                    const preference = getPreference(
                      category.value,
                      channel.value,
                    );
                    const isEnabled = !!preference?.enabled;

                    if (category.mandatory) {
                      const mandatoryEnabled = preference?.enabled ?? true;

                      return (
                        <td key={channel.value} className="p-4 text-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-flex items-center justify-center">
                                <Switch
                                  aria-label={`${category.label} via ${channel.label} (mandatory)`}
                                  checked={mandatoryEnabled}
                                  disabled
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
                            aria-label={`${category.label} via ${channel.label}`}
                            checked={isEnabled}
                            disabled={isLoading}
                            onCheckedChange={() =>
                              handleToggle(category.value, channel.value)
                            }
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
