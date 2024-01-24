import { updateAccount } from "./accountService";

export const getExpenseAccount = async () => {
  const jsonData = await fetch("/api/expense");

  const { data } = await jsonData.json();

  return data;
};

export const updateExpenseAccount = async (
  id: string,
  amount: number,
  fromAccountId: string
) => {
  await updateAccount(id, amount, true);
  await updateAccount(fromAccountId, amount, false);
};
