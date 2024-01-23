import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const accounts = await Account.find({ isExpense: false }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: accounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    const account = await Account.create(data);
    return NextResponse.json(
      { message: "Account Created Successfully", data: account },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
