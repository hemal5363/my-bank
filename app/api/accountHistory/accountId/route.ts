import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import { getTokenData } from "@/utils/helper";
import { ITokenData } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";

export const GET = async (req: NextRequest) => {
  await connectDB();

  const url = new URL(req.url);

  const fromDate = url.searchParams.get("fromDate");
  const toDate = url.searchParams.get("toDate");
  const expenseTypeId = url.searchParams.get("expenseTypeId");

  const tokenData: ITokenData = getTokenData(req);

  let matchCreatedAt = {};

  if (fromDate !== "undefined" && toDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $gte: fromDate,
        $lte: toDate,
      },
      _account: tokenData.expenseAccountId,
    };
  } else if (fromDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $gte: fromDate,
      },
      _account: tokenData.expenseAccountId,
    };
  } else if (toDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $lte: toDate,
      },
      _account: tokenData.expenseAccountId,
    };
  } else {
    matchCreatedAt = {
      _account: tokenData.expenseAccountId,
    };
  }

  if (expenseTypeId !== "undefined") {
    matchCreatedAt = { ...matchCreatedAt, _expenseType: expenseTypeId };
  } else {
    matchCreatedAt = { ...matchCreatedAt, _expenseType: { $ne: null } };
  }

  try {
    const accountHistory = await AccountHistory.find(matchCreatedAt)
      .populate("_expenseType")
      .sort({
        createdAt: -1,
      });

    const account = await Account.findById(tokenData.expenseAccountId);

    const total = accountHistory
      .filter((account) => !account.isCredited)
      .reduce((totalSum, account) => totalSum + account.amount, 0);

    return NextResponse.json(
      { data: accountHistory, account, totalAmount: total },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
