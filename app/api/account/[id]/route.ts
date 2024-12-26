import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import { getTokenData } from "@/utils/helper";
import { IPutRequestAccount, ITokenData } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  const id = params.id;

  const tokenData: ITokenData = getTokenData(req);

  try {
    const account = await Account.findOne({
      _id: id,
      _userAccount: tokenData._id,
    });

    return NextResponse.json(
      { data: account },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  const id = params.id;

  const data: IPutRequestAccount = await req.json();

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
        message: configJSON.accountUpdated,
        data: { ...newAccount._doc, history: accountHistory },
      },
      { status: NEXT_RESPONSE_STATUS.ACCEPTED }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
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
      { message: configJSON.accountDeleted },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
