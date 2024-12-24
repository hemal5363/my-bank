import { customFetch } from "@/utils/fetch";

export const getAllAccountHistoryByAccountId = async (accountId: string) => {
  const jsonData = await customFetch(
    `/api/accountHistory/accountId/${accountId}`
  );

  return jsonData;
};

export const getAllAccountHistoryByExpenseAccountId = async (
  fromDate: Date | undefined,
  toDate: Date | undefined,
  expenseTypeId: string | undefined
) => {
  const jsonData = await customFetch(
    `/api/accountHistory/accountId?fromDate=${fromDate}&toDate=${toDate}&expenseTypeId=${expenseTypeId}`
  );

  return jsonData;
};

export const createAccountHistory = async (
  amount: number,
  newAmount: number,
  isCredited: boolean,
  _account: string
) => {
  const { data } = await customFetch("/api/accountHistory", {
    method: "POST",
    body: JSON.stringify({ amount, newAmount, isCredited, _account }),
  });

  return data;
};

export const deleteAllAccountHistoryByAccountId = async (id: string) => {
  const { data } = await customFetch(`/api/accountHistory/accountId/${id}`, {
    method: "DELETE",
  });

  return data;
};
