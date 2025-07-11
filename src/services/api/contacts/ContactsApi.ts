import { CONTACTS_BASE_PATH } from "@constants/Endpoints";
import { getAuthToken } from "@api/auth/authTokenApi";
import { Contact, ContactInput } from "@api/interfaces/ContactsDTO";
import { request } from "@utils/httpClient";
import { Location } from "@api/interfaces/LocationDTO";

// Get all contacts for the current user
export async function getAllContacts(): Promise<Contact[]> {
  return request<Contact[]>(`${CONTACTS_BASE_PATH}/my-contacts`, {
    method: "GET",
    authenticate: true,
  });
}

// Create a new contact and associate it with selected location IDs
export async function createContact(
  contact: ContactInput,
): Promise<Contact> {
  return request<Contact>(`${CONTACTS_BASE_PATH}`, {
    method: "POST",
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
}

// Get a contact by their user ID
export async function getContactById(userId: string): Promise<Contact> {
  return request<Contact>(`${CONTACTS_BASE_PATH}/${userId}`, {
    method: "GET",
    authenticate: true,
  });
}

export async function getLocationByContact(
  contactId: string,
): Promise<Location[]> {
  return request<Location[]>(`${CONTACTS_BASE_PATH}/${contactId}/locations`, {
    method: "GET",
    authenticate: true,
  });
}

// Update a contact
export async function updateContact(
  contactId: string,
  input: ContactInput,
): Promise<Contact> {
  return request<Contact>(`${CONTACTS_BASE_PATH}/${contactId}`, {
    method: "PUT",
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

export async function deleteContact(contactId: string): Promise<void> {
  const token = getAuthToken();

  const res = await fetch(`${CONTACTS_BASE_PATH}/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete contact with id ${contactId}`);
  }
}
