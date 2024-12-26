import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import { getTokenData } from "@/utils/helper";
import { IPostRequestAccount, ITokenData } from "@/types";
import { ACCOUNT_TYPES, NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  const tokenData: ITokenData = getTokenData(req);

  try {
    const accounts = await Account.find({
      type: Number(type),
      _userAccount: tokenData._id,
    }).sort({
      createdAt: -1,
    });

    const total = accounts.reduce(
      (totalSum, account) => totalSum + account.amount,
      0
    );

    return NextResponse.json(
      { data: accounts, totalAmount: total },
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
  const data: IPostRequestAccount = await req.json();

  const tokenData: ITokenData = getTokenData(req);

  try {
    const account = await Account.create({
      ...data,
      _userAccount: tokenData._id,
    });

    const accountHistory = await AccountHistory.create({
      amount: 0,
      newAmount: data.amount,
      isCredited: data.type === ACCOUNT_TYPES.Account,
      _account: account._id,
      _expenseType: data.expenseTypeId,
    });

    return NextResponse.json(
      {
        message: configJSON.accountCreated,
        data: { ...account._doc, history: accountHistory },
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
