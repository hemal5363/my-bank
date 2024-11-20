import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  try {
    const accounts = await Account.find({
      type: Number(type),
    }).sort({
      createdAt: -1,
    });

    const total = accounts.reduce(
      (totalSum, account) => totalSum + account.amount,
      0
    );

    return NextResponse.json(
      { data: accounts, totalAmount: total },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    const account = await Account.create(data);

    const accountHistory = await AccountHistory.create({
      amount: 0,
      newAmount: data.amount,
      isCredited: data.type === ACCOUNT_TYPES.Account,
      _account: account._id,
      _expenseType: data.expenseTypeId,
    });

    return NextResponse.json(
      {
        message: "Account Created Successfully",
        data: { ...account._doc, history: accountHistory },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
