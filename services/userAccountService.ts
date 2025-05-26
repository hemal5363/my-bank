import { customFetch } from "@/utils/fetch";
import {
  IPatchRequestUserAccount,
  IPostRequestSend,
  IPostRequestSignIn,
  IPostRequestUserAccount,
  IUserAccount,
} from "@/types";

export const getUserAccount = async (): Promise<IUserAccount> => {
  const { data } = await customFetch("/api/userAccount");

  return data;
};

export const createUserAccount = async ({
  name,
  email,
  password,
}: IPostRequestUserAccount): Promise<IUserAccount> => {
  const { data } = await customFetch("/api/userAccount", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  return data;
};

export const updateUserAccount = async (
  formData: FormData
): Promise<IUserAccount> => {
  const { data } = await customFetch(
    "/api/userAccount",
    {
      method: "PUT",
      body: formData,
    },
    true
  );

  return data;
};

export const signInUserAccount = async ({
  email,
  password,
}: IPostRequestSignIn): Promise<{ data: IUserAccount; token: string }> => {
  const jsonData = await customFetch("/api/signIn", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return jsonData;
};

export const forgotPassword = async ({ email }: IPostRequestSend) => {
  await customFetch("/api/send", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async ({
  oldPassword,
  password,
}: IPatchRequestUserAccount): Promise<IUserAccount> => {
  const { data } = await customFetch("/api/userAccount", {
    method: "PATCH",
    body: JSON.stringify({ oldPassword, password }),
  });

  return data;
};

export const deleteUserAccount = async () => {
  const data = await customFetch(`/api/userAccount`, {
    method: "DELETE",
  });
  return data;
};
