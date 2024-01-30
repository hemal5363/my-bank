import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
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
            _account: process.env.EXPENSE_ID,
            isCredited: "$isCredited",
          },
          sum_val: { $sum: "$amount" },
        },
      },
    ]);

    return NextResponse.json(
      {
        totalAvailableAmount: totalAvailableAmount[0]?.sum_val,
        totalDueAmount: -totalDueAmount[0]?.sum_val,
        totalMonthlyExpenseAmount: totalMonthlyExpense
          .filter(
            (expense) =>
              !expense._id.isCredited &&
              expense._id.year === Number(process.env.EXPENSE_YEAR)
          )
          .map((expense) => ({
            year: expense._id.year,
            month: expense._id.month,
            totalAmount: expense.sum_val,
          })),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
