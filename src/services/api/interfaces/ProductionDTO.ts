export interface OfficeAddress {
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  country: string;
  latitude: 0;
  longitude: 0;
  locationId: string;
  productionIds: string[];
  uploadedAt: string;
  lastUpdated: string;
}
export interface ProductionMemberships {
  userId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  productionId: string;
  role: string;
  jobTitle: string;
  authority: string;
}

export interface Production {
  productionId: string;
  title: string;
  description: string;
  officeAddress: OfficeAddress;
  sceneIds: string[];
  productionMemberships: ProductionMemberships;
  createdById: string;
  createdAt: string;
  lastUpdated: string;
}

export interface ProductionInput {
  title: string;
  description: string;
  officeAddress?: OfficeAddress;
  sceneIds?: string[];
  productionMemberships?: ProductionMemberships;
  createdById?: string;
}
