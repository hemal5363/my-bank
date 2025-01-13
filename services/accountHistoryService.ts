import { customFetch } from "@/utils/fetch";
import {
  IAccount,
  IExpenseType,
  IAccountHistory,
  IPostRequestAccountHistory,
} from "@/types";

export const getAllAccountHistoryByAccountId = async (
  accountId: string
): Promise<{ data: IAccountHistory[]; account: IAccount }> => {
  const jsonData = await customFetch(
    `/api/accountHistory/accountId/${accountId}`
  );

  return jsonData;
};

export const getAllAccountHistoryByExpenseAccountId = async (
  fromDate: Date | undefined,
  toDate: Date | undefined,
  expenseTypeId: string | undefined
): Promise<{
  data: IAccountHistory[];
  account: IAccount;
  totalAmount: number;
  expenseTypes: IExpenseType[];
}> => {
  const jsonData = await customFetch(
    `/api/accountHistory/accountId?fromDate=${fromDate}&toDate=${toDate}&expenseTypeId=${expenseTypeId}`
  );

  return jsonData;
};

export const createAccountHistory = async ({
  amount,
  newAmount,
  isCredited,
  _account,
}: IPostRequestAccountHistory): Promise<IAccountHistory> => {
  const { data } = await customFetch("/api/accountHistory", {
    method: "POST",
    body: JSON.stringify({ amount, newAmount, isCredited, _account }),
  });

  return data;
};

export const deleteAllAccountHistoryByAccountId = async (id: string) => {
  await customFetch(`/api/accountHistory/accountId/${id}`, {
    method: "DELETE",
  });
};
