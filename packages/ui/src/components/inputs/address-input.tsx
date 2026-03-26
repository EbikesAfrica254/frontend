"use client";

import * as React from "react";
import {Check, ChevronsUpDown, Loader2, MapPin} from "lucide-react";
import {Button} from "../primitives/button";
import {Input} from "../primitives/input";
import {Label} from "../primitives/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../primitives/select";
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
import {ActionResult, AddressTag} from "@repo/shared/client";
import {GeocodingResult} from "@repo/shared/client";

export interface AddressValue {
    addressTag: AddressTag;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    postalCode?: string;
    streetAddress: string;
}

export interface AddressFieldErrors {
    addressTag?: string;
    city?: string;
    country?: string;
    latitude?: string;
    longitude?: string;
    postalCode?: string;
    streetAddress?: string;
}

interface AddressInputProps {
    disabled?: boolean;
    errors?: AddressFieldErrors;
    onChange?: (value: AddressValue) => void;
    onGeocode: (query: string) => Promise<ActionResult<GeocodingResult[]>>;
    showAddressTag?: boolean;
    value?: AddressValue;
}

const ADDRESS_TAG_LABELS: Record<AddressTag, string> = {
    BILLING: "Billing",
    BRANCH_LOCATION: "Branch Location",
    PRIMARY: "Primary",
    SHIPPING: "Shipping",
};

const DEFAULT_VALUE: AddressValue = {
    addressTag: AddressTag.PRIMARY,
    city: "",
    country: "Kenya",
    streetAddress: "",
};

const AddressInput = React.forwardRef<HTMLDivElement, AddressInputProps>(
    (
        {
            disabled = false,
            errors,
            onChange,
            onGeocode,
            showAddressTag = true,
            value = DEFAULT_VALUE,
        },
        ref,
    ) => {
        const [coordinatesOverride, setCoordinatesOverride] = React.useState(false);
        const [isSearching, setIsSearching] = React.useState(false);
        const [open, setOpen] = React.useState(false);
        const [searchError, setSearchError] = React.useState<string | null>(null);
        const [searchQuery, setSearchQuery] = React.useState("");
        const [suggestions, setSuggestions] = React.useState<GeocodingResult[]>([]);

        const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );

        const hasCoordinates =
            value.latitude !== undefined && value.longitude !== undefined;

        const handleFieldChange = (
            field: keyof AddressValue,
            fieldValue: string | number,
        ) => {
            if (
                (field === "city" ||
                    field === "country" ||
                    field === "streetAddress") &&
                hasCoordinates &&
                !coordinatesOverride
            ) {
                onChange?.({
                    ...value,
                    [field]: fieldValue,
                    latitude: undefined,
                    longitude: undefined,
                });
                return;
            }

            onChange?.({...value, [field]: fieldValue});
        };

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
            onChange?.({
                ...value,
                latitude: suggestion.latitude,
                longitude: suggestion.longitude,
                streetAddress: suggestion.displayName,
            });
            setCoordinatesOverride(false);
            setOpen(false);
            setSearchQuery("");
            setSuggestions([]);
        };

        React.useEffect(() => {
            return () => {
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
            };
        }, []);

        return (
            <div ref={ref} className="space-y-4">
                {showAddressTag && (
                    <div className="space-y-2">
                        <Label>
                            Address Type <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            disabled={disabled}
                            value={value.addressTag}
                            onValueChange={(v) => handleFieldChange("addressTag", v)}
                        >
                            <SelectTrigger
                                className={cn(errors?.addressTag && "border-destructive")}
                            >
                                <SelectValue placeholder="Select address type"/>
                            </SelectTrigger>
                            <SelectContent>
                                {(Object.keys(ADDRESS_TAG_LABELS) as AddressTag[]).map(
                                    (tag) => (
                                        <SelectItem key={tag} value={tag}>
                                            {ADDRESS_TAG_LABELS[tag]}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                        {errors?.addressTag && (
                            <p className="text-sm text-destructive">{errors.addressTag}</p>
                        )}
                    </div>
                )}

                <div className="space-y-2">
                    <Label>
                        Search Address <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                disabled={disabled}
                                className={cn(
                                    "w-full justify-between font-normal",
                                    !value.streetAddress && "text-muted-foreground",
                                    (errors?.streetAddress || errors?.latitude) &&
                                    "border-destructive",
                                )}
                            >
                <span className="truncate">
                  {value.streetAddress || "Search for an address..."}
                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command shouldFilter={false}>
                                <CommandInput
                                    placeholder="Type to search..."
                                    value={searchQuery}
                                    onValueChange={handleSearchChange}
                                />
                                <CommandList>
                                    {isSearching && (
                                        <div
                                            className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
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
                                        !searchError && (
                                            <CommandEmpty>No results found.</CommandEmpty>
                                        )}
                                    {suggestions.length > 0 && (
                                        <CommandGroup>
                                            {suggestions.map((suggestion, index) => (
                                                <CommandItem
                                                    key={index}
                                                    value={suggestion.displayName}
                                                    onSelect={() => handleSelectSuggestion(suggestion)}
                                                >
                                                    <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"/>
                                                    <span className="truncate">
                            {suggestion.displayName}
                          </span>
                                                    {value.streetAddress === suggestion.displayName && (
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
                    {errors?.streetAddress && (
                        <p className="text-sm text-destructive">{errors.streetAddress}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="city">
                            City <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="city"
                            disabled={disabled}
                            placeholder="Nairobi"
                            value={value.city}
                            onChange={(e) => handleFieldChange("city", e.target.value)}
                            className={cn(errors?.city && "border-destructive")}
                            aria-invalid={!!errors?.city}
                        />
                        {errors?.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">
                            Country <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="country"
                            disabled={disabled}
                            placeholder="Kenya"
                            value={value.country}
                            onChange={(e) => handleFieldChange("country", e.target.value)}
                            className={cn(errors?.country && "border-destructive")}
                            aria-invalid={!!errors?.country}
                        />
                        {errors?.country && (
                            <p className="text-sm text-destructive">{errors.country}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                        id="postalCode"
                        disabled={disabled}
                        placeholder="00100"
                        value={value.postalCode ?? ""}
                        onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                    />
                </div>

                {hasCoordinates && (
                    <div className="rounded-md border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">Coordinates resolved</p>
                                <p className="text-xs text-muted-foreground">
                                    {coordinatesOverride
                                        ? "Editing manually — search again to replace"
                                        : `${value.latitude?.toFixed(6)}, ${value.longitude?.toFixed(6)}`}
                                </p>
                            </div>
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0"/>
                        </div>

                        {coordinatesOverride && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        disabled={disabled}
                                        placeholder="-1.286389"
                                        value={value.latitude ?? ""}
                                        onChange={(e) =>
                                            handleFieldChange("latitude", parseFloat(e.target.value))
                                        }
                                        className={cn(errors?.latitude && "border-destructive")}
                                        aria-invalid={!!errors?.latitude}
                                    />
                                    {errors?.latitude && (
                                        <p className="text-sm text-destructive">
                                            {errors.latitude}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        disabled={disabled}
                                        placeholder="36.817223"
                                        value={value.longitude ?? ""}
                                        onChange={(e) =>
                                            handleFieldChange("longitude", parseFloat(e.target.value))
                                        }
                                        className={cn(errors?.longitude && "border-destructive")}
                                        aria-invalid={!!errors?.longitude}
                                    />
                                    {errors?.longitude && (
                                        <p className="text-sm text-destructive">
                                            {errors.longitude}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => setCoordinatesOverride((prev) => !prev)}
                            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                        >
                            {coordinatesOverride
                                ? "Lock coordinates"
                                : "Override coordinates manually"}
                        </button>
                    </div>
                )}

                {errors?.latitude && !hasCoordinates && (
                    <p className="text-sm text-destructive">{errors.latitude}</p>
                )}
            </div>
        );
    },
);

AddressInput.displayName = "AddressInput";

export {AddressInput};
