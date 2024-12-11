import { Contact, ContactInput } from "@api/interfaces/Contacts";

export async function createContact(
  input: ContactInput,
  ownerId: string,
): Promise<Contact> {
  const dto: Contact = {
    locationIds: input.assocLocationIds,
    nonFilmingIds: [],
    uploadedAt: "",
    lastUpdated: "",
    uploadedById: ownerId,
    ...input,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return fetch(``, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(dto),
  })
    .then((res) => res.json())
    .then((data) => data.body as Contact);
}

export function getContactById() {}

export function getContactByUserId() {}

export function updateContact() {}

export function deleteContact() {}
