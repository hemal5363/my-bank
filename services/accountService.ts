import { customFetch } from "@/utils/fetch";
import { IAccount, IPostRequestAccount, IPutRequestAccount } from "@/types";

export const getAllAccount = async (
  type: number
): Promise<{ data: IAccount[]; totalAmount: number }> => {
  const jsonData = await customFetch(`/api/account?type=${type}`);

  return jsonData;
};

export const getAccountById = async (id: string): Promise<IAccount> => {
  const { data } = await customFetch(`/api/account/${id}`);

  return data;
};

export const createAccount = async ({
  name,
  amount,
  type,
  expenseTypeId,
}: IPostRequestAccount): Promise<IAccount> => {
  const { data } = await customFetch("/api/account", {
    method: "POST",
    body: JSON.stringify({ name, amount, type, expenseTypeId }),
  });

  return data;
};

export const updateAccount = async (
  id: string,
  { amount, isCredited, expenseTypeId }: IPutRequestAccount
): Promise<IAccount> => {
  const { data } = await customFetch(`/api/account/${id}`, {
    method: "PUT",
    body: JSON.stringify({ amount, isCredited, expenseTypeId }),
  });

  return data;
};

export const deleteAccount = async (id: string) => {
  await customFetch(`/api/account/${id}`, {
    method: "DELETE",
  });
};

export const updateExpenseAccount = async (
  id: string,
  amount: number,
  fromAccountId: string,
  expenseTypeId: string
) => {
  await updateAccount(id, { amount, isCredited: true, expenseTypeId });
  await updateAccount(fromAccountId, {
    amount,
    isCredited: false,
    expenseTypeId,
  });
};
