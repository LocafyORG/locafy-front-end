import { Address } from "./Address";

export interface Location {
  locationId?: string;
  addresses: Address[];
  name: string;
  locationType: string;
  notes: string;
  keywords: string[];
  candidateIds: string[];
  contactIds: string[];
  locationPhotoIds: string[];
  uploadedById?: string;
  uploadedAt?: string;
  lastUpdated?: string;
}
