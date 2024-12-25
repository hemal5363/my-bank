import { customFetch } from "@/utils/fetch";

export const getUserAccount = async () => {
  const { data } = await customFetch("/api/userAccount");

  return data;
};

export const createUserAccount = async (
  name: string,
  email: string,
  password: string
) => {
  const jsonData = await customFetch("/api/userAccount", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  return jsonData;
};

export const updateUserAccount = async (name: string) => {
  const jsonData = await customFetch("/api/userAccount", {
    method: "PUT",
    body: JSON.stringify({ name }),
  });

  return jsonData;
};

export const signInUserAccount = async (email: string, password: string) => {
  const jsonData = await customFetch("/api/signIn", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return jsonData;
};

export const forgotPassword = async (email: string) => {
  const jsonData = await customFetch("/api/send", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  return jsonData;
};

export const resetPassword = async (oldPassword: string, password: string) => {
  const jsonData = await customFetch("/api/userAccount", {
    method: "PATCH",
    body: JSON.stringify({ oldPassword, password }),
  });

  return jsonData;
};
