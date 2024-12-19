import { LOCATIONS_BASE_PATH } from "@constants/Endpoints";
import { getAuthToken } from "@api/auth/authTokenApi";
import { Location } from "@api/interfaces/Location";
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
  const bod = JSON.stringify(location);
  console.log("here!\n", bod);
  return request<Location>(`${LOCATIONS_BASE_PATH}`, {
    method: "POST",
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: bod,
  });
}

export async function getUserLocations(): Promise<Location[] | Error> {
  return fetch(`${LOCATIONS_BASE_PATH}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
}

/**
 * Returns a string URL pointing to the image.
 */
/*
function getImageUrlByUuid(): string {
  return '@assets/img/under-development.webp';
}
*/
