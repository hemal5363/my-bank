import { customFetch } from "@/utils/fetch";
import { IExpenseType, IPostAndPutRequestExpenseType } from "@/types";

export const getAllExpenseType = async (): Promise<IExpenseType[]> => {
  const { data } = await customFetch(`/api/expenseType`);

  return data;
};

export const getFilterExpenseType = async (
  accountId?: string
): Promise<IExpenseType[]> => {
  const { data } = await customFetch(`/api/expenseType/${accountId}`);

  return data;
};

export const createExpenseType = async ({
  name,
}: IPostAndPutRequestExpenseType): Promise<IExpenseType> => {
  const { data } = await customFetch("/api/expenseType", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  return data;
};

export const updateExpenseType = async (
  id: string,
  { name }: IPostAndPutRequestExpenseType
): Promise<IExpenseType> => {
  const { data } = await customFetch(`/api/expenseType/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });

  return data;
};

export const deleteExpenseType = async (id: string) => {
  await customFetch(`/api/expenseType/${id}`, {
    method: "DELETE",
  });
};
