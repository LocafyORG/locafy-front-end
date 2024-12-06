import { LOCATIONS_BASE_PATH } from "@constants/Endpoints";
import { getAuthToken } from "@api/auth/authTokenApi";

export interface LocationDto {
  locationId: string,
  addressIds: string[],
  name: string,
  locationType: string,
  notes: string,
  keywords: string[],
  sceneLocationIds: string[],
  nonFilmingLocationIds: string[],
  contactIds: string[],
  locationPhotoIds: string[],
  uploadedById: string,
  uploadedAt: string,
  lastUpdated: string,
  permissionIds: string[]
}

export async function getAllLocations(): Promise<LocationDto[] | Error> {
  return fetch(`${LOCATIONS_BASE_PATH}/all`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getAuthToken()}`,
    },
  })
    .then(res => res.json())
    .catch(err => err as Error);
}

export async function getUserLocations(): Promise<LocationDto[] | Error> {
  return fetch(`${LOCATIONS_BASE_PATH}/user`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getAuthToken()}`,
    },
  })
    .then(res => res.json())
    .catch(err => err as Error);
}

/**
 * Returns a string URL pointing to the image.
 */
/*
function getImageUrlByUuid(): string {
  return '@assets/img/under-development.webp';
}
*/
