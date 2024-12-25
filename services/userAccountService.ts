import { customFetch } from "@/utils/fetch";

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
