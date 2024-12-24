import { customFetch } from "@/utils/fetch";

export const getAllExpenseType = async () => {
  const jsonData = await customFetch(`/api/expenseType`);

  return jsonData;
};

export const getFilterExpenseType = async (accountId?: string) => {
  const jsonData = await customFetch(`/api/expenseType/${accountId}`);

  return jsonData;
};

export const createExpenseType = async (name: string) => {
  const { data } = await customFetch("/api/expenseType", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  return data;
};

export const updateExpenseType = async (id: string, name: string) => {
  const { data } = await customFetch(`/api/expenseType/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });

  return data;
};

export const deleteExpenseType = async (id: string) => {
  const { data } = await customFetch(`/api/expenseType/${id}`, {
    method: "DELETE",
  });

  return data;
};
