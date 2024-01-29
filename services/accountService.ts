export const getAllAccount = async (isDue = false) => {
  const jsonData = await fetch(`/api/account?isDue=${isDue}`);

  const data = await jsonData.json();

  return data;
};

export const getAccountById = async (id: string) => {
  const jsonData = await fetch(`/api/account/${id}`);

  const { data } = await jsonData.json();

  return data;
};

export const createAccount = async (
  name: string,
  amount: number,
  isDue = false
) => {
  const jsonData = await fetch("/api/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount, isExpense: false, isDue }),
  });

  const { data } = await jsonData.json();

  return data;
};

export const updateAccount = async (
  id: string,
  amount: number,
  isCredited: boolean
) => {
  const jsonData = await fetch(`/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, isCredited }),
  });

  const { data } = await jsonData.json();

  return data;
};

export const deleteAccount = async (id: string) => {
  const jsonData = await fetch(`/api/account/${id}`, {
    method: "DELETE",
  });

  const { data } = await jsonData.json();

  return data;
};

export const getExpenseAccount = async () => {
  const jsonData = await fetch("/api/account?isExpense=true");

  const { data } = await jsonData.json();

  return data[0];
};

export const updateExpenseAccount = async (
  id: string,
  amount: number,
  fromAccountId: string
) => {
  await updateAccount(id, amount, true);
  await updateAccount(fromAccountId, amount, false);
};
