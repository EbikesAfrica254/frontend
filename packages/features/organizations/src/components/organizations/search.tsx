"use client";

import React, { useEffect, useRef, useState } from "react";
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
import type { OrganizationSummaryResponse } from "../../types/organizations";
import { ActionResult, PaginatedResponse } from "@repo/shared/client";

interface OrganizationSearchProps {
  disabled?: boolean;
  onFetch: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<OrganizationSummaryResponse>>>;
  onValueChange: (
    value: string,
    organization: OrganizationSummaryResponse,
  ) => void;
  placeholder?: string;
  value?: string;
}

export function OrganizationSearch({
  disabled = false,
  onFetch,
  onValueChange,
  placeholder = "Search organizations...",
  value,
}: OrganizationSearchProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [organizations, setOrganizations] = useState<
    OrganizationSummaryResponse[]
  >([]);
  const [query, setQuery] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchRef = useRef(onFetch);
  fetchRef.current = onFetch;

  const selected = organizations.find((org) => org.id === value);

  useEffect(() => {
    if (!isOpen) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(
      async () => {
        setIsLoading(true);
        setError(null);

        try {
          const result = await fetchRef.current(query);

          if (result.success) {
            const organizations = result.data.data;
            setOrganizations(organizations);
          } else {
            setError(result.error ?? "Failed to load organizations");
            setOrganizations([]);
          }
        } catch {
          setError("Failed to load organizations");
          setOrganizations([]);
        } finally {
          setIsLoading(false);
        }
      },
      query === "" ? 0 : 300,
    );

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, isOpen]);

  const handleSelect = (org: OrganizationSummaryResponse) => {
    onValueChange(org.id, org);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label={placeholder}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          {selected ? (
            <span className="truncate">{selected.displayName}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
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
                <CommandEmpty>No organizations found.</CommandEmpty>
                <CommandGroup>
                  {organizations.map((org) => (
                    <CommandItem
                      key={org.id}
                      value={org.id}
                      onSelect={() => handleSelect(org)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 shrink-0 ${
                          value === org.id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{org.displayName}</span>
                        <span className="text-xs text-muted-foreground">
                          {org.legalName}
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
