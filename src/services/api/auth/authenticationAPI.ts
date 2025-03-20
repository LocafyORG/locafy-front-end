import {
  LOGIN_URL,
  REGISTER_URL,
  USER_PROFILE_INFO,
} from "@constants/Endpoints";
import { LoginPayload, RegisterPayload } from "@api/interfaces/Auth";
import { getAuthToken, setAuthToken } from "@api/auth/authTokenApi";
import { UserProfile } from "@api/interfaces/User";
import { ErrorResponse } from "@api/interfaces/ErrorResponse";

// Register function with proxy URL
export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json() as ErrorResponse;
    if(errorData.errors) {
      throw errorData;
    }
    throw new Error(errorData.message || "Registration failed");
  }
};

export const loginUser = async (payload: LoginPayload): Promise<void> => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json() as ErrorResponse;
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  console.log("data" + JSON.stringify(data));

  setAuthToken(data.accessToken);
};

export const getProfile = async (): Promise<UserProfile | Error> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await fetch(`${USER_PROFILE_INFO}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json() as ErrorResponse
    throw new Error(errorData.message || `Failed to feth profile: ${response.status}`);
  }

  const result = await response.json();
  console.log("HERE" + result);

  return result as UserProfile;
};
