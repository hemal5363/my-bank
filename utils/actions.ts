"use server";

import prisma from "./db";
import { IAccount } from "@/types";

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

export const deleteAccount = async (id: string) => {
  await prisma.accountHistory.deleteMany({
    where: {
      accountId: id,
    },
  });

  await prisma.account.delete({
    where: {
      id,
    },
  });
};

export const createAccountHistory = async (
  oldAccount: IAccount,
  amount: number
) => {
  await prisma.accountHistory.create({
    data: {
      amount,
      newAmount: oldAccount?.amount + amount,
      action: "Add",
      accountId: oldAccount?.id,
    },
  });
};

export const addAmount = async (id: string, amount: number) => {
  const oldAccount = await prisma.account.findUnique({
    where: {
      id,
    },
  });

  if (oldAccount?.id) {
    await prisma.account.update({
      where: {
        id,
      },
      data: {
        amount: oldAccount?.amount + amount,
      },
    });
    await createAccountHistory(oldAccount, amount);
  }
};

export const getAllAccountHistory = async (id: string) => {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
  });
  const accountHistory = await prisma.accountHistory.findMany({
    where: {
      accountId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { data: accountHistory, accountName: account?.name };
};
