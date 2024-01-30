import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);

  try {
    const totalAvailableAmount = await Account.aggregate([
      { $match: { type: { $lt: ACCOUNT_TYPES.Due } } },
      { $group: { _id: null, sum_val: { $sum: "$amount" } } },
    ]);

    const totalDueAmount = await Account.aggregate([
      { $match: { type: ACCOUNT_TYPES.Due } },
      { $group: { _id: null, sum_val: { $sum: "$amount" } } },
    ]);

    const totalMonthlyExpense = await AccountHistory.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            accountId: "$_account",
            isCredited: "$isCredited",
          },
          sum_val: { $sum: "$amount" },
        },
      },
    ]);

    const totalMonthlyExpenseAmount = totalMonthlyExpense
      .filter((expense) => {
        return (
          expense._id.accountId.equals(new ObjectId(process.env.EXPENSE_ID)) &&
          !expense._id.isCredited &&
          expense._id.year === Number(process.env.EXPENSE_YEAR)
        );
      })
      .map((expense) => ({
        year: expense._id.year,
        month: expense._id.month,
        totalAmount: expense.sum_val,
      }));

    return NextResponse.json(
      {
        totalAvailableAmount: totalAvailableAmount[0]?.sum_val,
        totalDueAmount: -totalDueAmount[0]?.sum_val,
        totalMonthlyExpenseAmount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
