export const BASE_PATH = "/dashboard";
export const BASE_AUTH_PATH = "/auth";
export const ROUTES = {
  HOME: "/",
  LOCATIONS: `${BASE_PATH}/locations`,
  PRODUCTIONS: `${BASE_PATH}/productions`,
  CONTACTS: `${BASE_PATH}/contacts`,
  CALENDAR: `${BASE_PATH}/calendar`,
  ABOUT: "/about",
  PROFILE: "/profile",
  PRICING: "/pricing",
  LOGIN: `${BASE_AUTH_PATH}/login`,
  REGISTER: `${BASE_AUTH_PATH}/register`,
};

export const DASHBOARD = {
  LOCATIONS: `${BASE_PATH}/locations`,
  ADD_LOCATION: `${BASE_PATH}/locations/add`,
  CONTACTS: `${BASE_PATH}/contacts`,
  ADD_CONTACT: `${BASE_PATH}/contacts/add`,
  PRODUCTIONS: `${BASE_PATH}/productions`,
  ADD_PRODUCTION: `${BASE_PATH}/productions/add`,
}
