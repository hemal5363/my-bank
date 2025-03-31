import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  const id = params.id;

  try {
    const accountHistory = await AccountHistory.find({
      _account: id,
      _expenseType: { $ne: null }
    })
      .populate("_expenseType")
      .sort({
        createdAt: -1,
      });

    const account = await Account.findById(id);

    return NextResponse.json(
      { data: accountHistory, account },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error) {
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
    await AccountHistory.deleteMany({ _account: id });

    return NextResponse.json(
      { message: configJSON.accountHistoryDeleted },
      { status: NEXT_RESPONSE_STATUS.ACCEPTED }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
