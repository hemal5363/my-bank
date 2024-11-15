import ExpenseType from "@/models/ExpenseType";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

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
