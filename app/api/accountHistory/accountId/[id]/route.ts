import Account from "@/models/Account";
import AccountHistory from "@/models/AccountHistory";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const id = params.id;
  const url = new URL(req.url);
  const fromDate = url.searchParams.get("fromDate");
  const toDate = url.searchParams.get("toDate");

  let matchCreatedAt = {};
  if (fromDate !== "undefined" && toDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $gte: fromDate,
        $lte: toDate,
      },
      _account: id,
    };
  } else if (fromDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $gte: fromDate,
      },
      _account: id,
    };
  } else if (toDate !== "undefined") {
    matchCreatedAt = {
      createdAt: {
        $lte: toDate,
      },
      _account: id,
    };
  } else {
    matchCreatedAt = {
      _account: id,
    };
  }
  try {
    const accountHistory = await AccountHistory.find(matchCreatedAt).sort({
      createdAt: -1,
    });
    const account = await Account.findById(id);

    let total = 0;
    accountHistory
      .filter((account: any) => !account.isCredited)
      .forEach((account: any) => {
        total = total + account.amount;
      });
    return NextResponse.json(
      { data: accountHistory, account, totalAmount: total },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
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
      { message: "AccountHistory deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
