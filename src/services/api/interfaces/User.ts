export interface ProductionMembership {
  userId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  productionId: string;
  role: string;
  jobTitle: string;
  authority: string;
}

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  enabled: boolean;
  locationIds: string[];
  contactIds: string[];
  createdProductionIds: string[];
  productionMemberships: ProductionMembership[];
  sceneIds: string[];
  sceneLocationIds: string[];
}
