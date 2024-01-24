import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const accounts = await Account.find({ isExpense: true });
    return NextResponse.json({ data: accounts[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
