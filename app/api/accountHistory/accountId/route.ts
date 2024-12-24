import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_SECRET;

export const GET = async (req: NextRequest) => {
  await connectDB();
  const url = new URL(req.url);
  const fromDate = url.searchParams.get("fromDate");
  const toDate = url.searchParams.get("toDate");
  const expenseTypeId = url.searchParams.get("expenseTypeId");

  const token = req.headers.get("Authorization");

  let tokenData = {
    expenseAccountId: "",
  };

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    tokenData = decoded;
  });

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
  }

  try {
    const accountHistory = await AccountHistory.find(matchCreatedAt)
      .populate("_expenseType")
      .sort({
        createdAt: -1,
      });
    const account = await Account.findById(tokenData.expenseAccountId);

    const total = accountHistory
      .filter((account: any) => !account.isCredited)
      .reduce((totalSum, account) => totalSum + account.amount, 0);

    return NextResponse.json(
      { data: accountHistory, account, totalAmount: total },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
