import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import UserAccount from "@/models/UserAccount";
import Account from "@/models/Account";
import { IPostRequestSignIn } from "@/types";
import { ACCOUNT_TYPES, NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

export const POST = async (req: NextRequest) => {
  await connectDB();

  const data: IPostRequestSignIn = await req.json();

  try {
    const existingUser = await UserAccount.findOne({ email: data.email });

    if (!existingUser) {
      return NextResponse.json(
        { message: configJSON.invalidEmail },
        { status: NEXT_RESPONSE_STATUS.NOT_FOUND }
      );
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: configJSON.invalidPassword },
        { status: NEXT_RESPONSE_STATUS.CONFLICT }
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
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        message: configJSON.userAccountSignIn,
        data: existingUser,
        token,
      },
      { status: NEXT_RESPONSE_STATUS.ACCEPTED }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
