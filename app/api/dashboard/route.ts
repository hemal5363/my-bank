import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);

  try {
    const totalAvailableAmount = await Account.aggregate([
      { $match: { type: ACCOUNT_TYPES.Account | ACCOUNT_TYPES.Expense } },
      { $group: { _id: null, sum_val: { $sum: "$amount" } } },
    ]);

    const totalDueAmount = await Account.aggregate([
      { $match: { type: ACCOUNT_TYPES.Due } },
      { $group: { _id: null, sum_val: { $sum: "$amount" } } },
    ]);

    return NextResponse.json(
      {
        totalAvailableAmount: totalAvailableAmount[0].sum_val,
        totalDueAmount: -totalDueAmount[0].sum_val,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
