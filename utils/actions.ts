"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export const getAllAccount = async () => {
  const data = await prisma.account.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  let total = 0;
  data.forEach((account) => {
    total = total + account.amount;
  });

  return { data, totalAmount: total };
};

export const createAccount = async (name: string, amount: number) => {
  await prisma.account.create({
    data: {
      name,
      amount,
    },
  });
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
};

export const deleteAccount = async (id: string) => {
  await prisma.account.delete({
    where: {
      id,
    },
  });
};
