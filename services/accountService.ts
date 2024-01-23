import {
  createAccountHistory,
  deleteAllAccountHistoryByAccountId,
} from "./accountHistoryService";

export const getAllAccount = async () => {
  const jsonData = await fetch("/api/account");

  const { data } = await jsonData.json();

  let total = 0;
  data.forEach((account: any) => {
    total = total + account.amount;
  });

  return { data, totalAmount: total };
};

export const getAccountById = async (id: string) => {
  const jsonData = await fetch(`/api/account/${id}`);

  const data = await jsonData.json();

  return data;
};

export const createAccount = async (name: string, amount: number) => {
  const jsonData = await fetch("/api/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount, isExpense: false }),
  });

  const data = await jsonData.json();

  await createAccountHistory(0, amount, true, data.data._id);

  return data;
};

export const updateAccount = async (
  id: string,
  amount: number,
  isCredited: boolean
) => {
  const { data: accountData } = await getAccountById(id);

  const newAmount = isCredited
    ? accountData.amount + amount
    : accountData.amount - amount;

  const jsonData = await fetch(`/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: newAmount }),
  });

  const data = await jsonData.json();

  await createAccountHistory(amount, newAmount, isCredited, id);

  return data;
};

export const deleteAccount = async (id: string) => {
  const jsonData = await fetch(`/api/account/${id}`, {
    method: "DELETE",
  });

  const data = await jsonData.json();

  await deleteAllAccountHistoryByAccountId(id);

  return data;
};

export const getExpenseAccount = async () => {
  const jsonData = await fetch("/api/account/expense");

  const { data } = await jsonData.json();

  return data;
};