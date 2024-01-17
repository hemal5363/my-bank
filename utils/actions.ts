"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export const getAllAccount = async () => {
  return await prisma.account.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createAccount = async (name: string, amount: number) => {
  await prisma.account.create({
    data: {
      name,
      amount,
    },
  });
  revalidatePath("/");
};

export const editAccount = async (id: string, name: string, amount: number) => {
  await prisma.account.update({
    where: {
      id,
    },
    data: {
      name,
      amount,
    },
  });
  revalidatePath("/");
};

export const deleteAccount = async (id: string) => {
  await prisma.account.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
