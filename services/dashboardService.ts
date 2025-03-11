import { customFetch } from "@/utils/fetch";

export const getDashboardData = async (month?: number) => {
  const jsonData = await customFetch(`/api/dashboard?month=${month}`);

  return jsonData;
};
