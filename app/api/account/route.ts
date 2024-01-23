import Account from "@/models/Account";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const accounts = await Account.find();
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    const account = await Account.create(data);
    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json({ message: error  }, { status: 500 });
  }
};
