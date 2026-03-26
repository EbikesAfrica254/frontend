"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
import type { ActionResult, PaginatedResponse } from "@repo/shared/client";
import type { AgentSummaryResponse } from "../../types/agents";

interface AgentSearchProps {
  disabled?: boolean;
  onFetch: (
    query: string,
  ) => Promise<ActionResult<PaginatedResponse<AgentSummaryResponse>>>;
  onValueChange: (value: string, agent: AgentSummaryResponse) => void;
  placeholder?: string;
  value?: string;
}

export function AgentSearch({
  disabled = false,
  onFetch,
  onValueChange,
  placeholder = "Search agents...",
  value,
}: AgentSearchProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [agents, setAgents] = useState<AgentSummaryResponse[]>([]);
  const [query, setQuery] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchRef = useRef(onFetch);
  fetchRef.current = onFetch;

  const selected = agents.find((agent) => agent.id === value);

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
            setAgents(result.data.data);
          } else {
            setError(result.error ?? "Failed to load agents");
            setAgents([]);
          }
        } catch {
          setError("Failed to load agents");
          setAgents([]);
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

  const handleSelect = (agent: AgentSummaryResponse) => {
    onValueChange(agent.id, agent);
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
            <span className="truncate">
              {selected.firstName} {selected.lastName}
            </span>
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
                <CommandEmpty>No agents found.</CommandEmpty>
                <CommandGroup>
                  {agents.map((agent) => (
                    <CommandItem
                      key={agent.id}
                      value={agent.id}
                      onSelect={() => handleSelect(agent)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 shrink-0 ${
                          value === agent.id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {agent.firstName} {agent.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {agent.phoneNumber}
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
