import { PRODUCTIONS_BASE_PATH } from "@constants/Endpoints";
import { Production, ProductionInput } from "@api/interfaces/ProductionDTO";
import { getAuthToken } from "@api/auth/authTokenApi";
import { request } from "@utils/httpClient";

export const fetchProductions = async (): Promise<Production[]> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await fetch(`${PRODUCTIONS_BASE_PATH}/my-productions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export async function getProductionById(
  productionId: string,
): Promise<Production> {
  return request<Production>(`${PRODUCTIONS_BASE_PATH}/${productionId}`, {
    method: "GET",
    authenticate: true,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });
}

//TODO fix this
export async function createProduction(
  productionInput: ProductionInput,
): Promise<Production> {
  const body = JSON.stringify(productionInput);
  return request<Production>(`${PRODUCTIONS_BASE_PATH}`, {
    method: "POST",
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body,
  });
}

export async function updateProduction(
  productionId: string,
  updatedProduction: Partial<Production>,
): Promise<Production> {
  const body = JSON.stringify(updatedProduction);
  return request<Production>(`${PRODUCTIONS_BASE_PATH}/${productionId}`, {
    method: "PUT", // or "PATCH" if your backend uses partial updates
    authenticate: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: body,
  });
}
