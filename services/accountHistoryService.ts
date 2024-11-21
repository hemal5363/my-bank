export const getAllAccountHistoryByAccountId = async (
  accountId: string,
  fromDate: Date | undefined,
  toDate: Date | undefined,
  expenseTypeId: string | undefined
) => {
  const jsonData = await fetch(
    `/api/accountHistory/accountId/${accountId}?fromDate=${fromDate}&toDate=${toDate}&expenseTypeId=${expenseTypeId}`
  );

  const data = await jsonData.json();

  return data;
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

  const { data } = await jsonData.json();

  return data;
};

export const deleteAllAccountHistoryByAccountId = async (id: string) => {
  const jsonData = await fetch(`/api/accountHistory/accountId/${id}`, {
    method: "DELETE",
  });

  const { data } = await jsonData.json();

  return data;
};
