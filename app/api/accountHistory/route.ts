import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const AccountHistories = await AccountHistory.find().sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: AccountHistories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    const accountHistory = await AccountHistory.create(data);
    return NextResponse.json(
      { message: "AccountHistory Created Successfully", data: accountHistory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
