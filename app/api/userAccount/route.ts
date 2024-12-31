import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import UserAccount from "@/models/UserAccount";
import { getTokenData, hashPassword } from "@/utils/helper";
import {
  IPatchRequestUserAccount,
  IPostRequestUserAccount,
  IPutRequestUserAccount,
  ITokenData,
} from "@/types";
import { ACCOUNT_TYPES, NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const tokenData: ITokenData = getTokenData(req);

  try {
    const existingUser = await UserAccount.findById(tokenData._id);

    return NextResponse.json(
      {
        data: existingUser,
      },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  const data: IPostRequestUserAccount = await req.json();

  try {
    const existingUser = await UserAccount.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json(
        { message: configJSON.accountAlreadyExists },
        { status: NEXT_RESPONSE_STATUS.CONFLICT }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const userAccount = await UserAccount.create({
      ...data,
      password: hashedPassword,
    });

    const account = await Account.create({
      name: configJSON.myExpense,
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
        message: configJSON.userAccountCreated,
        data: userAccount,
      },
      { status: NEXT_RESPONSE_STATUS.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  await connectDB();

  const data: IPatchRequestUserAccount = await req.json();

  const tokenData: ITokenData = getTokenData(req);

  try {
    const existingUser = await UserAccount.findById(tokenData._id);

    const isValidPassword = await bcrypt.compare(
      data.oldPassword,
      existingUser.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: configJSON.currentPasswordIncorrect },
        { status: NEXT_RESPONSE_STATUS.UNAUTHORIZED }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const userAccount = await UserAccount.findByIdAndUpdate(tokenData._id, {
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: configJSON.passwordUpdate,
        data: userAccount,
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

export const PUT = async (req: NextRequest) => {
  await connectDB();

  const data: IPutRequestUserAccount = await req.json();

  const tokenData: ITokenData = getTokenData(req);

  try {
    const existingUser = await UserAccount.findByIdAndUpdate(
      tokenData._id,
      {
        name: data.name,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: configJSON.userAccountUpdated,
        data: existingUser,
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

export const DELETE = async (req: NextRequest) => {
  await connectDB();

  const tokenData: ITokenData = getTokenData(req);

  try {
    await UserAccount.findByIdAndDelete(tokenData._id);

    const accounts = await Account.find({ _userAccount: tokenData._id });

    const accountIds = accounts.map((account) => account._id);

    await AccountHistory.deleteMany({ _account: { $in: accountIds } });

    await Account.deleteMany({ _userAccount: tokenData._id })

    return NextResponse.json(
      { message: configJSON.userAccountDeleted },
      { status: NEXT_RESPONSE_STATUS.ACCEPTED }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
