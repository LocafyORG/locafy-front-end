import { getAuthToken } from "@api/auth/authTokenApi";

export class HttpError extends Error {
  code: number;

  constructor(code: number, name: string = "", message: string = "") {
    super(message);
    this.code = code;
    this.name = name;
  }
}

type RequestOptions = RequestInit & {
  authenticate?: boolean;
};

/**
 * A convenience function mainly to ease header transformation and to avoid repetition.
 * @throws {Error} if error occurs within the frontend server
 * @throws {HttpError} if server returns error codes
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  // Preserve existing headers from the passed options.
  const headers = new Headers(options.headers);

  if (options.authenticate) {
    headers.set("Authorization", `Bearer ${getAuthToken()}`);
  }

  return fetch(endpoint, {
    ...options,
    headers: headers, // Custom headers
  }).then((res) => {
    if (!res.ok) {
      throw new HttpError(res.status, res.statusText);
    }
    return res.json();
  });
}
