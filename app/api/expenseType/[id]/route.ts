import AccountHistory from "@/models/AccountHistory";
import ExpenseType from "@/models/ExpenseType";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;
  try {
    const accountHistory = await AccountHistory.find({ _account: id }).populate(
      "_expenseType"
    );

    const expenseTypeList = accountHistory
      .map((accountH) => accountH._expenseType)
      .filter((item) => item !== null && item !== undefined) // Remove null values
      .filter(
        (item, index, array) =>
          array.findIndex((other) => other?._id === item?._id) === index // Remove duplicates
      );

    return NextResponse.json({ data: expenseTypeList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;
  const data: any = await req.json();
  try {
    const updatedExpenseType = await ExpenseType.findByIdAndUpdate(id, {
      name: data.name,
    });

    return NextResponse.json(
      {
        message: "Expense Type updated Successfully",
        data: updatedExpenseType,
      },
      { status: 200 }
    );
  } catch (error: any) {
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
    await ExpenseType.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Expense Type deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
