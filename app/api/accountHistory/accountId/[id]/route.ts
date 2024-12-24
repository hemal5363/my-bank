import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;

  try {
    const accountHistory = await AccountHistory.find({
      _account: id,
    })
      .populate("_expenseType")
      .sort({
        createdAt: -1,
      });
    const account = await Account.findById(id);

    const total = accountHistory
      .filter((account: any) => !account.isCredited)
      .reduce((totalSum, account) => totalSum + account.amount, 0);

    return NextResponse.json(
      { data: accountHistory, account, totalAmount: total },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;
  try {
    await AccountHistory.deleteMany({ _account: id });
    return NextResponse.json(
      { message: "AccountHistory deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
