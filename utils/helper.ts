import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { ITokenData } from "@/types";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";

const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

export const showLoader = (): void => {
  const loaderDiv = document?.getElementById("loaderForAPICall");
  if (loaderDiv) {
    loaderDiv.classList.add("visible");
    loaderDiv.classList.remove("invisible");
  }
  const mainDiv = document?.getElementById("mainDiv");
  if (mainDiv) {
    mainDiv.classList.add("overflow-hidden");
    mainDiv.classList.remove("overflow-auto");
  }
};

export const hideLoader = (): void => {
  const loaderDiv = document?.getElementById("loaderForAPICall");
  if (loaderDiv) {
    loaderDiv.classList.remove("visible");
    loaderDiv.classList.add("invisible");
  }
  const mainDiv = document?.getElementById("mainDiv");
  if (mainDiv) {
    mainDiv.classList.remove("overflow-hidden");
    mainDiv.classList.add("overflow-auto");
  }
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10; // Adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const truncateString = (string: string | null | undefined) => {
  if (!string) return string;
  if (string.length <= 5) return string;
  return string.slice(0, 5) + "...";
};

export const getTokenData = (req: NextRequest) => {
  const token = req.headers.get("Authorization");

  let tokenData: ITokenData = {
    _id: "",
    email: "",
    expenseAccountId: "",
  };

  jwt.verify(token, secretKey, (err: null, decoded: ITokenData) => {
    tokenData = decoded;
  });

  return tokenData;
};

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};
