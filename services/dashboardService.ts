import { customFetch } from "@/utils/fetch";

export const getDashboardData = async () => {
  const jsonData = await customFetch(`/api/dashboard`);

  return jsonData;
};
