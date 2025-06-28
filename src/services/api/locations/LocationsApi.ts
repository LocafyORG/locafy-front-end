import { LOCATIONS_BASE_PATH } from "@constants/Endpoints";
import { getAuthToken } from "@api/auth/authTokenApi";
import { Location } from "@api/interfaces/LocationDTO";
import { request } from "@utils/httpClient";

export async function getAllLocations(): Promise<Location[]> {
  return request<Location[]>(`${LOCATIONS_BASE_PATH}/all`, {
    method: "GET",
    authenticate: true,
  });
}

export async function getLocationById(locationId: string): Promise<Location> {
  return request<Location>(`${LOCATIONS_BASE_PATH}/${locationId}`, {
    method: "GET",
    authenticate: true,
  });
}

export async function createLocation(location: Location): Promise<Location> {
  const body = JSON.stringify(location);
  return request<Location>(`${LOCATIONS_BASE_PATH}`, {
    method: "POST",
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
}

export async function getUserLocations(): Promise<Location[] | Error> {
  try {
    const res = await fetch(`${LOCATIONS_BASE_PATH}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const locations = await res.json();

    // Normalize locations: ensure every location has a unique 'id' string property
    if (Array.isArray(locations)) {
      return locations.map((location: Location, index: number) => ({
        ...location,
        id:
          location.locationId ?? // fallback if your backend uses locationId
          `location-${index}`, // fallback unique string
      }));
    }
    return new Error("Unexpected response format");
  } catch (error) {
    return new Error("Failed to fetch user locations");
  }
}


export async function deleteLocation(locationId: string) {
  const token = getAuthToken();
  const res = await fetch(`/api/v1/locations/${locationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Add auth header here
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete location");
  }
}

export async function updateLocation(
  locationId: string,
  updatedLocation: Partial<Location>,
): Promise<Location> {
  const body = JSON.stringify(updatedLocation);
  return request<Location>(`${LOCATIONS_BASE_PATH}/${locationId}`, {
    method: "PUT", // or PATCH, depending on your backend
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: body,
  });
}

/**
 * Returns a string URL pointing to the image.
 */
/*
function getImageUrlByUuid(): string {
  return '@assets/img/under-development.webp';
}
*/
