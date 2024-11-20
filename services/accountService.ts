export const getAllAccount = async (type: number) => {
  const jsonData = await fetch(`/api/account?type=${type}`);

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
  type: number,
  expenseTypeId: string,
) => {
  const jsonData = await fetch("/api/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount, type, expenseTypeId }),
  });

  const { data } = await jsonData.json();

  return data;
};

export const updateAccount = async (
  id: string,
  amount: number,
  isCredited: boolean,
  expenseTypeId: string,
) => {
  const jsonData = await fetch(`/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, isCredited, expenseTypeId }),
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

export const updateExpenseAccount = async (
  id: string,
  amount: number,
  fromAccountId: string, 
  expenseTypeId: string,
) => {
  await updateAccount(id, amount, true, expenseTypeId);
  await updateAccount(fromAccountId, amount, false, expenseTypeId);
};
