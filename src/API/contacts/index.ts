export interface ContactDto {
	contactId?: string,
	name: string,
	phone: string,
	email: string,
	notes: string,
	uploadedById: string,
	locationIds: string[],
	nonFilmingIds: string[],
	uploadedAt: string,
	lastUpdated: string,
}

interface ContactInput {
	name: string,
	phone: string,
	email: string,
	notes: string,
	assocLocationIds: string[]
}

export async function createContact(input: ContactInput, ownerId: string): Promise<ContactDto> { 
	const dto: ContactDto = {
		locationIds: input.assocLocationIds,
		nonFilmingIds: [],
		uploadedAt: "",
		lastUpdated: "",
		uploadedById: ownerId,
		...input
	}

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	return fetch(``, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(dto),
	})
	.then(res => res.json())
	.then(data => data.body as ContactDto)
}

export function getContactById() {}

export function getContactByUserId() {}

export function updateContact() {}

export function deleteContact() {}
