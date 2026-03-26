"use client";

import * as React from "react";
import {Check, ChevronsUpDown, Loader2, MapPin} from "lucide-react";
import {Button} from "../primitives/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../primitives/command";
import {Popover, PopoverContent, PopoverTrigger} from "../primitives/popover";
import {cn} from "../../utilities";
import type {ActionResult, GeocodingResult} from "@repo/shared/client";

export interface LocationValue {
    address: string;
    latitude: number;
    longitude: number;
}

interface LocationSearchInputProps {
    disabled?: boolean;
    error?: string;
    onChange: (value: LocationValue) => void;
    onGeocode: (query: string) => Promise<ActionResult<GeocodingResult[]>>;
    placeholder?: string;
    value: LocationValue | null;
}

export function LocationSearchInput({
                                        disabled = false,
                                        error,
                                        onChange,
                                        onGeocode,
                                        placeholder = "Search for an address...",
                                        value,
                                    }: LocationSearchInputProps) {
    const [isSearching, setIsSearching] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [searchError, setSearchError] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [suggestions, setSuggestions] = React.useState<GeocodingResult[]>([]);

    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setSearchError(null);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsSearching(true);

            const result = await onGeocode(query);

            if (result.success) {
                setSuggestions(result.data);
            } else {
                setSearchError(result.error ?? "Search failed");
                setSuggestions([]);
            }

            setIsSearching(false);
        }, 400);
    };

    const handleSelectSuggestion = (suggestion: GeocodingResult) => {
        onChange({
            address: suggestion.displayName,
            latitude: suggestion.latitude,
            longitude: suggestion.longitude,
        });
        setOpen(false);
        setSearchQuery("");
        setSuggestions([]);
        setSearchError(null);
    };

    React.useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        aria-invalid={!!error}
                        className={cn(
                            "w-full justify-between font-normal",
                            !value?.address && "text-muted-foreground",
                            error && "border-destructive",
                        )}
                        disabled={disabled}
                        role="combobox"
                        variant="outline"
                    >
                        <span className="truncate">{value?.address || placeholder}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Type to search..."
                            value={searchQuery}
                            onValueChange={handleSearchChange}
                        />
                        <CommandList>
                            {isSearching && (
                                <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    <span>Searching...</span>
                                </div>
                            )}
                            {!isSearching && searchError && (
                                <div className="px-4 py-3 text-sm text-destructive">
                                    {searchError}
                                </div>
                            )}
                            {!isSearching &&
                                suggestions.length === 0 &&
                                searchQuery.length >= 3 &&
                                !searchError && <CommandEmpty>No results found.</CommandEmpty>}
                            {suggestions.length > 0 && (
                                <CommandGroup>
                                    {suggestions.map((suggestion, index) => (
                                        <CommandItem
                                            key={index}
                                            value={suggestion.displayName}
                                            onSelect={() => handleSelectSuggestion(suggestion)}
                                        >
                                            <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"/>
                                            <span className="truncate">{suggestion.displayName}</span>
                                            {value?.address === suggestion.displayName && (
                                                <Check className="ml-auto h-4 w-4 shrink-0"/>
                                            )}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {value && (
                <p className="text-xs text-muted-foreground">
                    {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
                </p>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
