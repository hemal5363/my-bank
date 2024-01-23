import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const accounts = await Account.findOne({ isExpense: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: accounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
