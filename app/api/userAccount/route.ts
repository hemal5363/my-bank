import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import UserAccount from "@/models/UserAccount";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    // Check if email already exists
    const existingUser = await UserAccount.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Create new user account
    const userAccount = await UserAccount.create(data);

    const account = await Account.create({
      name: "My Expense",
      amount: 0,
      type: ACCOUNT_TYPES.Expense,
      _userAccount: userAccount._id,
    });

    await AccountHistory.create({
      amount: 0,
      newAmount: 0,
      isCredited: true,
      _account: account._id,
      _expenseType: null,
    });

    return NextResponse.json(
      {
        message: "User Account Created Successfully",
        data: userAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
