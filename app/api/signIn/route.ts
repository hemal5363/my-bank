import UserAccount from "@/models/UserAccount";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Account from "@/models/Account";
import { ACCOUNT_TYPES } from "@/constants";
const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

export const POST = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  try {
    // Check if email already exists
    const existingUser = await UserAccount.findOne({ email: data.email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 } // 409 Conflict
      );
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password!" },
        { status: 401 } // 409 Conflict
      );
    }

    const account = await Account.findOne({
      type: ACCOUNT_TYPES.Expense,
      _userAccount: existingUser._id,
    });

    const token = jwt.sign(
      {
        email: existingUser.email,
        _id: existingUser._id,
        expenseAccountId: account?._id,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        message: "User Account Sign In Successfully",
        data: existingUser,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
