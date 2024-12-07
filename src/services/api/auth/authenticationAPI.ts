import { LOGIN_URL, REGISTER_URL } from "@constants/Endpoints";
import { LoginPayload, RegisterPayload } from "@api/interfaces/Auth";
import { setAuthToken } from "./authTokenApi";

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
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
};

// Login function with proxy URL
export const loginUser = async (payload: LoginPayload): Promise<void> => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  console.log("data" + JSON.stringify(data));

  // Store the token in localStorage
  setAuthToken(data.accessToken); // Make sure the token is saved here
};
