export const getAllAccount = async () => {
  const jsonData = await fetch("/api/account");

  const { data } = await jsonData.json();

  let total = 0;
  data.forEach((account: any) => {
    total = total + account.amount;
  });

  return { data, totalAmount: total };
};

export const createAccount = async (name: string, amount: number) => {
  const jsonData = await fetch("/api/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount }),
  });

  const data = await jsonData.json();

  return data;
};

export const updateAccount = async (
  id: string,
  amount: number,
  isCredited: boolean
) => {
  const jsonAccountData = await fetch(`/api/account/${id}`);

  const accountData = (await jsonAccountData.json()).data;

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

  return data;
};

export const deleteAccount = async (id: string) => {
  const jsonData = await fetch(`/api/account/${id}`, {
    method: "DELETE",
  });

  const data = await jsonData.json();

  return data;
};
