import { getAuthToken } from "@api/auth/authTokenApi";
import { Contact, ContactInput } from "@api/interfaces/Contacts";
import { CONTACTS_BASE_PATH } from "@constants/Endpoints";
import { request } from "@utils/httpClient";

export const getAllContactsForUser = async (): Promise<Contact[]> => {
  const token = getAuthToken(); // Retrieve the authentication token

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const response = await fetch(`${CONTACTS_BASE_PATH}/my-contacts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Use the token in the Authorization header
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);

  return result as Contact[]; // Return the array of contacts
};

export async function createContact(
  contact: ContactInput,
  selectedLocation: [],
): Promise<Contact> {
  const dto: ContactInput = {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    notes: contact.notes,
    assocLocationIds: selectedLocation,
  };
  console.log(dto);
  const token = getAuthToken();
  return request<Contact>(`${CONTACTS_BASE_PATH}`, {
    method: "POST",
    authenticate: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });
}

export async function getContactsByUserId(userId: string): Promise<Contact[]> {
  return request<Contact[]>(`${CONTACTS_BASE_PATH}/users/${userId}`, {
    method: "GET",
    authenticate: true,
  });
}

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
  return request<void>(`${CONTACTS_BASE_PATH}/${contactId}`, {
    method: "DELETE",
    authenticate: true,
  });
}
