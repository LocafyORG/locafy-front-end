export interface Address {
  addressId?: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  locationId?: string;
  productionIds?: string[];
  uploadedAt?: string;
  lastUpdated?: string;
}
