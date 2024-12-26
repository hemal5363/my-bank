import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import ExpenseType from "@/models/ExpenseType";
import { IPostAndPutRequestExpenseType } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const GET = async () => {
  await connectDB();

  try {
    const expenseTypes = await ExpenseType.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { data: expenseTypes },
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

  const data: IPostAndPutRequestExpenseType = await req.json();

  try {
    const expenseType = await ExpenseType.create(data);

    return NextResponse.json(
      {
        message: configJSON.expenseTypeCreated,
        data: expenseType,
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
