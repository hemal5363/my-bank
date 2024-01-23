import { getAccountById } from "./accountService";

export const getAllAccountHistoryByAccountId = async (accountId: string) => {
  const jsonData = await fetch(`/api/accountHistory/accountId/${accountId}`);

  const data = await jsonData.json();

  const { data: accountData } = await getAccountById(accountId);

  return { data, accountName: accountData.name };
};

export const createAccountHistory = async (
  amount: number,
  newAmount: number,
  isCredited: boolean,
  _account: string
) => {
  const jsonData = await fetch("/api/accountHistory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, newAmount, isCredited, _account }),
  });

  const data = await jsonData.json();

  return data;
};

export const deleteAllAccountHistoryByAccountId = async (id: string) => {
  const jsonData = await fetch(`/api/accountHistory/accountId/${id}`, {
    method: "DELETE",
  });

  const data = await jsonData.json();

  return data;
};
