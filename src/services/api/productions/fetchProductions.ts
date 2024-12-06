import { API_URL } from '@/constants/Endpoints';
import { Production } from '@api/interfaces/Production';
import { getAuthToken } from '@api/auth/authTokenApi';

export const fetchProductions = async (): Promise<Production[]> => {
  // Retrieve the token from localStorage (or wherever you're storing it)
  const token = getAuthToken();		// Adjust based on where your token is stored

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  const response = await fetch(API_URL, {
    method: "GET",  // Ensure this matches your API method
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result);

  return result.map((item: Production) => ({
    productionId: item.productionId,
    title: item.title,
    description: item.description,
  }));
};
