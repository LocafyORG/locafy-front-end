export interface Contact {
  contactId?: string;
  name: string;
  phone: string;
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
