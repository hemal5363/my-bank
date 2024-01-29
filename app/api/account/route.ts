import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);
  const isExpense = url.searchParams.get("isExpense");
  const isDue = url.searchParams.get("isDue");

  try {
    const accounts = await Account.find({
      isExpense: isExpense === "true",
      isDue: isDue === "true",
    }).sort({
      createdAt: -1,
    });

    let total = 0;
    accounts.forEach((account: any) => {
      total = total + account.amount;
    });

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
      isCredited: !data.isDue,
      _account: account._id,
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
