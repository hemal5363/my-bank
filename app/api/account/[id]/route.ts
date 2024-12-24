import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;
  const token = req.headers.get("Authorization");

  let tokenData = {
    _id: "",
  };

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    tokenData = decoded;
  });

  try {
    const account = await Account.findOne({
      _id: id,
      _userAccount: tokenData._id,
    });
    return NextResponse.json({ data: account }, { status: 200 });
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
    const account = await Account.findById(id);

    const newAmount = data.isCredited
      ? account.amount + data.amount
      : account.amount - data.amount;

    const newAccount = await Account.findByIdAndUpdate(id, {
      amount: newAmount,
    });

    const accountHistory = await AccountHistory.create({
      amount: data.amount,
      newAmount,
      isCredited: data.isCredited,
      _account: id,
      _expenseType: data.expenseTypeId,
    });

    return NextResponse.json(
      {
        message: "Account updated Successfully",
        data: { ...newAccount._doc, history: accountHistory },
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
    await Account.findByIdAndDelete(id);
    await AccountHistory.deleteMany({ _account: id });
    return NextResponse.json(
      { message: "Account deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
