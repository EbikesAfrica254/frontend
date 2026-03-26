"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/primitives/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/primitives/popover";
import type { BranchSummaryResponse } from "../../types/branches";
import { ActionResult } from "@repo/shared/client";

interface OrganizationBranchSearchProps {
  disabled?: boolean;
  onFetch: (
    organizationId: string,
  ) => Promise<ActionResult<BranchSummaryResponse[]>>;
  onValueChange: (value: string, branch: BranchSummaryResponse) => void;
  organizationId?: string;
  placeholder?: string;
  value?: string;
}

export function OrganizationBranchSearch({
  disabled = false,
  onFetch,
  onValueChange,
  organizationId,
  placeholder = "Search branches...",
  value,
}: OrganizationBranchSearchProps) {
  const [allBranches, setAllBranches] = useState<BranchSummaryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const fetchRef = useRef(onFetch);
  fetchRef.current = onFetch;

  const isDisabled = disabled || !organizationId;
  const selected = allBranches.find((b) => b.id === value);

  // reset state when the organization changes
  useEffect(() => {
    setAllBranches([]);
    setQuery("");
    setError(null);
  }, [organizationId]);

  // load all the organization's branches as soon as the popover opens for the current organization
  useEffect(() => {
    if (!isOpen || !organizationId || allBranches.length > 0) return;

    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setError(null);

      const result = await fetchRef.current(organizationId);

      if (cancelled) return;

      if (result.success) {
        setAllBranches(result.data);
      } else {
        setError(result.error ?? "Failed to load branches");
      }

      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, organizationId]); // allBranches intentionally omitted — guard is inside

  // Client-side filtering
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allBranches;
    return allBranches.filter(
      (b) =>
        b.displayName.toLowerCase().includes(q) ||
        b.branchName.toLowerCase().includes(q),
    );
  }, [query, allBranches]);

  const handleSelect = (branch: BranchSummaryResponse) => {
    onValueChange(branch.id, branch);
    setIsOpen(false);
  };

  const derivedPlaceholder = !organizationId
    ? "Select an organization first"
    : placeholder;

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (!isDisabled) setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label={derivedPlaceholder}
          disabled={isDisabled}
          className="w-full justify-between font-normal"
        >
          {selected ? (
            <span className="truncate">{selected.displayName}</span>
          ) : (
            <span className="text-muted-foreground">{derivedPlaceholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by name..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}

            {!isLoading && error && (
              <div className="px-3 py-6 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <>
                <CommandEmpty>No branches found.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((branch) => (
                    <CommandItem
                      key={branch.id}
                      value={branch.id}
                      onSelect={() => handleSelect(branch)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 shrink-0 ${
                          value === branch.id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {branch.displayName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {branch.branchName}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
