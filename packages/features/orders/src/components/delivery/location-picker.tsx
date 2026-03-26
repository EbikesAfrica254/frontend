"use client";

import maplibregl from "maplibre-gl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { StyleSpecification } from "maplibre-gl";
import {
  Map as MapLibreMap,
  MapControls,
  useMap,
} from "@repo/ui/primitives/map";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/primitives/command";
import { Loader2, MapPin } from "lucide-react";
import type { ActionResult, GeocodingResult } from "@repo/shared/client";

const NAIROBI_LATITUDE = -1.286389;
const NAIROBI_LONGITUDE = 36.817223;
const DEFAULT_ZOOM = 13;

const OSM_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      attribution:
        "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      type: "raster",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      source: "osm",
      type: "raster",
    },
  ],
};

interface LocationPickerSearchProps {
  disabled: boolean;
  onChange: (latitude: number, longitude: number) => void;
  onGeocode: (query: string) => Promise<ActionResult<GeocodingResult[]>>;
}

function LocationPickerSearch({
  disabled,
  onChange,
  onGeocode,
}: LocationPickerSearchProps) {
  const { isLoaded, map } = useMap();
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback(
    (query: string) => {
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
    },
    [onGeocode],
  );

  const handleSelectSuggestion = useCallback(
    (suggestion: GeocodingResult) => {
      if (map && isLoaded) {
        map.flyTo({
          center: [suggestion.longitude, suggestion.latitude],
          zoom: DEFAULT_ZOOM,
        });
      }
      onChange(suggestion.latitude, suggestion.longitude);
      setSearchQuery("");
      setSuggestions([]);
      setSearchError(null);
    },
    [isLoaded, map, onChange],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const showResults = searchQuery.length >= 3;

  return (
    <div className="absolute left-2 right-14 top-2 z-10">
      <div className="rounded-md border bg-background shadow-sm">
        <Command shouldFilter={false}>
          <CommandInput
            disabled={disabled}
            placeholder="Search for a location..."
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          {showResults && (
            <CommandList className="max-h-48">
              {isSearching && (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </div>
              )}
              {!isSearching && searchError && (
                <div className="px-4 py-3 text-sm text-destructive">
                  {searchError}
                </div>
              )}
              {!isSearching && suggestions.length === 0 && !searchError && (
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
                      <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{suggestion.displayName}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  );
}

interface LocationPickerInnerProps {
  disabled: boolean;
  latitude: number | null;
  longitude: number | null;
  onChange: (latitude: number, longitude: number) => void;
}

function LocationPickerInner({
  disabled,
  latitude,
  longitude,
  onChange,
}: LocationPickerInnerProps) {
  const { isLoaded, map } = useMap();
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const hasFlewToInitial = useRef(false);

  // Recreate marker when map readiness or disabled changes.
  // Consumers must stabilize onChange with useCallback to avoid churn.
  useEffect(() => {
    if (!map || !isLoaded) return;

    const initialLng = longitude ?? NAIROBI_LONGITUDE;
    const initialLat = latitude ?? NAIROBI_LATITUDE;

    const marker = new maplibregl.Marker({ draggable: !disabled })
      .setLngLat([initialLng, initialLat])
      .addTo(map);

    markerRef.current = marker;

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      onChange(lngLat.lat, lngLat.lng);
    });

    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [isLoaded, map, disabled]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      if (disabled) return;
      const { lat, lng } = e.lngLat;
      markerRef.current?.setLngLat([lng, lat]);
      onChange(lat, lng);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [disabled, isLoaded, map, onChange]);

  // Sync controlled lat/lng into the marker without recreating it.
  useEffect(() => {
    if (!markerRef.current || latitude === null || longitude === null) return;
    markerRef.current.setLngLat([longitude, latitude]);
  }, [latitude, longitude]);

  // Fly to real coordinates once on initial load only.
  // Subsequent pan/zoom is left to the user.
  useEffect(() => {
    if (!map || !isLoaded || hasFlewToInitial.current) return;
    if (latitude === null || longitude === null) return;

    map.flyTo({ center: [longitude, latitude], zoom: DEFAULT_ZOOM });
    hasFlewToInitial.current = true;
  }, [isLoaded, map, latitude, longitude]);

  return null;
}

interface LocationPickerProps {
  disabled?: boolean;
  latitude: number | null;
  longitude: number | null;
  onChange: (latitude: number, longitude: number) => void;
  onGeocode?: (query: string) => Promise<ActionResult<GeocodingResult[]>>;
}

export function LocationPicker({
  disabled = false,
  latitude,
  longitude,
  onChange,
  onGeocode,
}: LocationPickerProps) {
  const center: [number, number] = [
    longitude ?? NAIROBI_LONGITUDE,
    latitude ?? NAIROBI_LATITUDE,
  ];

  return (
    <div className="space-y-2">
      <div className="h-[360px] w-full overflow-hidden rounded-md border">
        <MapLibreMap
          center={center}
          styles={{ light: OSM_STYLE, dark: OSM_STYLE }}
          zoom={DEFAULT_ZOOM}
        >
          <LocationPickerInner
            disabled={disabled}
            latitude={latitude}
            longitude={longitude}
            onChange={onChange}
          />
          {onGeocode && (
            <LocationPickerSearch
              disabled={disabled}
              onChange={onChange}
              onGeocode={onGeocode}
            />
          )}
          <MapControls showLocate showZoom />
        </MapLibreMap>
      </div>
      {latitude !== null && longitude !== null ? (
        <p className="text-xs text-muted-foreground">
          {latitude.toFixed(6)}, {longitude.toFixed(6)} — tap the map or drag
          the pin to adjust
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Tap anywhere on the map to set your delivery location
        </p>
      )}
    </div>
  );
}
