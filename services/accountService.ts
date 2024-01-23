export const getAllAccount = async () => {
  const jsonData = await fetch("/api/account");

  const data = await jsonData.json();

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

  return jsonData;

  //   await createAccountHistory(
  //     { id: newAccount.id, amount: 0, name: newAccount.name },
  //     amount,
  //     true
  //   );
};
