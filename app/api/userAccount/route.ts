import { ACCOUNT_TYPES } from "@/constants";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import UserAccount from "@/models/UserAccount";
import { ITokenData } from "@/types";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

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

export const PATCH = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  const token = req.headers.get("Authorization");

  let tokenData: ITokenData = {
    _id: "",
    email: "",
    expenseAccountId: "",
  };

  jwt.verify(token, secretKey, (err: null, decoded: ITokenData) => {
    tokenData = decoded;
  });

  try {
    const existingUser = await UserAccount.findById(tokenData._id);

    const isValidPassword = await bcrypt.compare(
      data.oldPassword,
      existingUser.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "The old password is incorrect." },
        { status: 409 } // 409 Conflict
      );
    }

    const userAccount = await UserAccount.findByIdAndUpdate(tokenData._id, {
      password: data.password,
    });

    return NextResponse.json(
      {
        message: "Password Updated Successfully",
        data: userAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
