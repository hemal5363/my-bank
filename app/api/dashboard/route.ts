import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

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
          new Date(expense._id.year, expense._id.month - 1) >=
            new Date(new Date().getFullYear() - 1, new Date().getMonth() - 1)
        );
      })
      .map((expense) => ({
        year: expense._id.year,
        month: expense._id.month,
        totalAmount: expense.sum_val,
      }))
      .sort((a, b) => b.month - a.month);

    const totalMonthlyTypeExpense = await AccountHistory.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            expenseType: "$_expenseType",
            accountId: "$_account",
            isCredited: "$isCredited",
          },
          sum_val: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "expensetypes",
          localField: "_id.expenseType",
          foreignField: "_id",
          as: "expenseTypeDetails",
        },
      },
      {
        $unwind: "$expenseTypeDetails",
      },
    ]);

    const totalMonthlyTypeExpenseAmount = totalMonthlyTypeExpense
      .filter((typeExpense) => {
        return (
          typeExpense._id.accountId.equals(
            new ObjectId(process.env.EXPENSE_ID)
          ) &&
          !typeExpense._id.isCredited &&
          typeExpense._id.month === new Date().getMonth() + 1 &&
          typeExpense.expenseTypeDetails !== null
        );
      })
      .map((typeExpense) => ({
        expenseTypeDetails: typeExpense.expenseTypeDetails,
        totalAmount: typeExpense.sum_val,
      }))
      .sort((a, b) => b.expenseTypeDetails.createdAt - a.expenseTypeDetails.createdAt);

    return NextResponse.json(
      {
        totalAvailableAmount: totalAvailableAmount[0]?.sum_val,
        totalDueAmount: -totalDueAmount[0]?.sum_val,
        totalMonthlyExpenseAmount,
        totalMonthlyTypeExpenseAmount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
