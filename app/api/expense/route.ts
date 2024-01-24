import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  console.log("params", params);
  try {
    const accounts = await Account.find();
    return NextResponse.json(
      { data: accounts.filter((account) => account.isExpense)[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
