export interface Contact {
  contactId?: string;
  name: string;
  phone: string;
  description: string;
  email: string;
  notes: string;
  uploadedById: string;
  locationIds: string[];
  nonFilmingIds: string[];
  uploadedAt: string;
  lastUpdated: string;
}

export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  notes: string;
  assocLocationIds: string[];
}

export interface ContactState {
  name: string;
  phone: string;
  email: string;
  notes: string;
  description: string;
  uploadedById: string;
  locationIds: string[];
}