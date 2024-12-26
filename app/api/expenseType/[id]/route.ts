import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import AccountHistory from "@/models/AccountHistory";
import ExpenseType from "@/models/ExpenseType";
import { IPostAndPutRequestExpenseType } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  const id = params.id;

  try {
    const accountHistory = await AccountHistory.find({ _account: id }).populate(
      "_expenseType"
    );

    const expenseTypeList = accountHistory
      .map((accountH) => accountH._expenseType)
      .filter((item) => item !== null && item !== undefined)
      .filter(
        (item, index, array) =>
          array.findIndex((other) => other?._id === item?._id) === index
      );

    return NextResponse.json(
      { data: expenseTypeList },
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

  const data: IPostAndPutRequestExpenseType = await req.json();

  try {
    const updatedExpenseType = await ExpenseType.findByIdAndUpdate(id, {
      name: data.name,
    });

    return NextResponse.json(
      {
        message: configJSON.expenseTypeUpdated,
        data: updatedExpenseType,
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
    await ExpenseType.findByIdAndDelete(id);

    return NextResponse.json(
      { message: configJSON.expenseTypeDeleted },
      { status: NEXT_RESPONSE_STATUS.ACCEPTED }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
