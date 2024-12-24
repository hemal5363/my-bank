import { customFetch } from "@/utils/fetch";

export const getAllAccount = async (type: number) => {
  const jsonData = await customFetch(`/api/account?type=${type}`);

  return jsonData;
};

export const getAccountById = async (id: string) => {
  const jsonData = await customFetch(`/api/account/${id}`);

  return jsonData;
};

export const createAccount = async (
  name: string,
  amount: number,
  type: number,
  expenseTypeId: string
) => {
  const jsonData = await customFetch("/api/account", {
    method: "POST",
    body: JSON.stringify({ name, amount, type, expenseTypeId }),
  });

  return jsonData;
};

export const updateAccount = async (
  id: string,
  amount: number,
  isCredited: boolean,
  expenseTypeId: string
) => {
  const jsonData = await customFetch(`/api/account/${id}`, {
    method: "PUT",
    body: JSON.stringify({ amount, isCredited, expenseTypeId }),
  });

  return jsonData;
};

export const deleteAccount = async (id: string) => {
  const jsonData = await customFetch(`/api/account/${id}`, {
    method: "DELETE",
  });

  return jsonData;
};

export const updateExpenseAccount = async (
  id: string,
  amount: number,
  fromAccountId: string,
  expenseTypeId: string
) => {
  await updateAccount(id, amount, true, expenseTypeId);
  await updateAccount(fromAccountId, amount, false, expenseTypeId);
};
