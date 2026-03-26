import "server-only";

import {getOptionalEnv} from "../lib/env";
import {baseFetch} from "./base-fetch";
import type {GeocodingResult} from "../types/geocoding";
import type {SuccessResponse} from "../types/api-responses";

interface NominatimReverseResult {
    display_name: string;
    lat: string;
    lon: string;
}

interface PhotonFeature {
    geometry: {
        coordinates: [number, number];
        type: "Point";
    };
    properties: {
        city?: string;
        country?: string;
        name?: string;
        postcode?: string;
        state?: string;
        street?: string;
    };
    type: "Feature";
}

interface PhotonResponse {
    features: PhotonFeature[];
    type: "FeatureCollection";
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const NOMINATIM_USER_AGENT = getOptionalEnv(
    "NOMINATIM_USER_AGENT",
    "eBikesAfrica/1.0 (ops@ebikesafrica.co.ke)",
);
const PHOTON_BASE_URL = getOptionalEnv(
    "PHOTON_BASE_URL",
    "https://photon.komoot.io",
);

export async function geocodeAddressResource(
    query: string,
    limit = 5,
): Promise<SuccessResponse<GeocodingResult[]>> {
    const params = new URLSearchParams({
        lang: "en",
        limit: String(limit),
        q: query,
    });

    const endpoint = `/api?${params.toString()}`;
    console.debug("[geocoding] geocodeAddressResource → request", {
        endpoint,
        query,
    });

    const response = await baseFetch<PhotonResponse>(
        PHOTON_BASE_URL,
        endpoint,
        {},
        {headers: {"User-Agent": NOMINATIM_USER_AGENT}},
    );

    console.log("[geocoding] geocodeAddressResource → raw response", {
        query,
        featureCount: Array.isArray(response.features)
            ? response.features.length
            : "not-array",
    });

    if (!Array.isArray(response.features) || response.features.length === 0) {
        console.warn("[geocoding] geocodeAddressResource → no features returned", {
            query,
        });
        return {code: "SUCCESS", data: []};
    }

    const data = response.features.map((feature) => {
        const {properties, geometry} = feature;
        const parts = [
            properties.name,
            properties.street,
            properties.city,
            properties.state,
            properties.country,
        ].filter(Boolean);

        return {
            displayName: parts.join(", "),
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
        };
    });

    console.log("[geocoding] geocodeAddressResource → resolved", {
        query,
        resultCount: data.length,
    });

    return {code: "SUCCESS", data};
}

export async function reverseGeocodeResource(
    latitude: number,
    longitude: number,
): Promise<SuccessResponse<GeocodingResult>> {
    const params = new URLSearchParams({
        format: "json",
        lat: String(latitude),
        lon: String(longitude),
    });

    const endpoint = `/reverse?${params.toString()}`;
    console.log("[geocoding] reverseGeocodeResource → request", {
        endpoint,
        latitude,
        longitude,
    });

    const result = await baseFetch<NominatimReverseResult>(
        NOMINATIM_BASE_URL,
        endpoint,
        {},
        {headers: {"User-Agent": NOMINATIM_USER_AGENT}},
    );

    console.log("[geocoding] reverseGeocodeResource → raw response", result);

    if (!result || !result.display_name) {
        console.warn(
            "[geocoding] reverseGeocodeResource → empty or malformed response",
            {result, latitude, longitude},
        );
        throw new Error("No address found for the provided coordinates");
    }

    const geocodingResult: GeocodingResult = {
        displayName: result.display_name,
        latitude,
        longitude,
    };

    console.log("[geocoding] reverseGeocodeResource → resolved", geocodingResult);

    return {code: "SUCCESS", data: geocodingResult};
}
