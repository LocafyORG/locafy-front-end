import { LOCATIONS_BASE_PATH } from "@constants/Endpoints";
import { getAuthToken } from "@api/auth/authTokenApi";
import { Location } from "@api/interfaces/Location";

export async function getAllLocations(): Promise<Location[] | Error> {
  return fetch(`${LOCATIONS_BASE_PATH}/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err as Error);
}

export async function getUserLocations(): Promise<Location[] | Error> {
  return fetch(`${LOCATIONS_BASE_PATH}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err as Error);
}

/**
 * Returns a string URL pointing to the image.
 */
/*
function getImageUrlByUuid(): string {
  return '@assets/img/under-development.webp';
}
*/