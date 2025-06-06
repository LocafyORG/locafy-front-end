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
  // Location Routes
  LOCATIONS: ROUTES.LOCATIONS,
  ADD_LOCATION: `${ROUTES.LOCATIONS}/add`,
  EDIT_LOCATION: `${ROUTES.LOCATIONS}/edit`,

  // Contact Routes
  CONTACTS: ROUTES.CONTACTS,
  ADD_CONTACT: `${ROUTES.CONTACTS}/add`,
  EDIT_CONTACT: `${ROUTES.CONTACTS}/edit`,

  // Production Routes
  PRODUCTIONS: ROUTES.PRODUCTIONS,
  ADD_PRODUCTION: `${ROUTES.PRODUCTIONS}/add`,
  EDIT_PRODUCTION: `${ROUTES.PRODUCTIONS}/edit`,
};
