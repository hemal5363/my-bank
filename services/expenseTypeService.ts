export const getAllExpenseType = async () => {
  const jsonData = await fetch(`/api/expenseType`);

  const data = await jsonData.json();

  return data;
};

export const getFilterExpenseType = async (accountId?: string) => {
  const jsonData = await fetch(`/api/expenseType/${accountId}`);

  const data = await jsonData.json();

  return data;
};

export const createExpenseType = async (name: string) => {
  const jsonData = await fetch("/api/expenseType", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const { data } = await jsonData.json();

  return data;
};

export const updateExpenseType = async (id: string, name: string) => {
  const jsonData = await fetch(`/api/expenseType/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const { data } = await jsonData.json();

  return data;
};

export const deleteExpenseType = async (id: string) => {
  const jsonData = await fetch(`/api/expenseType/${id}`, {
    method: "DELETE",
  });

  const { data } = await jsonData.json();

  return data;
};
