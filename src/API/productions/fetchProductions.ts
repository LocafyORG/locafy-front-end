import { API_URL } from "@/constants/Endpoints";
import { Production } from "../../interfaces/Production";



export const fetchProductions = async (): Promise<Production[]> => {
  const response = await fetch(API_URL);
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
