import ExpenseType from "@/models/ExpenseType";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const expenseTypes = await ExpenseType.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({ data: expenseTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    const expenseType = await ExpenseType.create(data);

    return NextResponse.json(
      {
        message: "Expense Type Created Successfully",
        data: expenseType,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
