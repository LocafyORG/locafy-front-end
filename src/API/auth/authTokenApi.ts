const TOKEN_STORAGE_KEY = "AUTH_TOKEN"

export function getAuthToken(): string {
	return localStorage.getItem(TOKEN_STORAGE_KEY) || ""
}

export function setAuthToken(token: string) {
	localStorage.setItem(TOKEN_STORAGE_KEY, token);
	window.dispatchEvent(new Event("token-change"));
}

export function deleteAuthToken() {
	setAuthToken("");
}

export function isAuthenticated(): boolean {
	return getAuthToken() !== "";
}
