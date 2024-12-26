import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import AccountHistory from "@/models/AccountHistory";
import { IPostRequestAccountHistory } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async () => {
  await connectDB();

  try {
    const AccountHistories = await AccountHistory.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { data: AccountHistories },
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

  const data: IPostRequestAccountHistory = await req.json();

  try {
    const accountHistory = await AccountHistory.create(data);

    return NextResponse.json(
      { message: configJSON.accountHistoryCreated, data: accountHistory },
      { status: NEXT_RESPONSE_STATUS.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
