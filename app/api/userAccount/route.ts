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
  ITokenData,
} from "@/types";
import { ACCOUNT_TYPES, NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { Readable } from "stream";
import type { IncomingMessage } from "http";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

function bufferToIncomingMessage(
  buffer: Buffer,
  headers: Record<string, string>,
  method: string = "POST"
): IncomingMessage {
  const stream = Readable.from(buffer) as IncomingMessage;

  stream.headers = headers;
  stream.method = method;
  stream.url = "/";

  return stream;
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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

  const tokenData: ITokenData = getTokenData(req);

  try {
    const contentType = req.headers.get("content-type");

    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await req.arrayBuffer());

    const headers = Object.fromEntries(req.headers.entries());

    const mockReq = bufferToIncomingMessage(buffer, headers, "PUT");

    const form = new IncomingForm({ multiples: false, keepExtensions: true });

    const { fields, files } = await new Promise<any>((resolve, reject) => {
      form.parse(mockReq as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const name = fields.name?.[0];
    const imageDelete = fields.imageDelete?.[0];
    const file = files.image?.[0];

    let imageUrl: string | null | undefined;

    if (file) {
      const fileContent = await fs.readFile(file.filepath);

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `profile-image/${Date.now()}-${file.originalFilename}`,
        Body: fileContent,
        ContentType: file.mimetype || "application/octet-stream",
      };

      await s3.send(new PutObjectCommand(uploadParams));

      imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    }
    const existingUserData = await UserAccount.findById(tokenData._id);
    if (existingUserData.profileImage && (imageDelete === "true" || !!file)) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: existingUserData.profileImage.split("amazonaws.com/")[1], // the full path/key of the file in your bucket
        })
      );
      imageUrl = imageDelete === "true" ? null : imageUrl
    }

    const existingUser = await UserAccount.findByIdAndUpdate(
      tokenData._id,
      {
        name,
        profileImage: imageUrl,
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
    const existingUserData = await UserAccount.findById(tokenData._id);
    if (existingUserData.profileImage) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: existingUserData.profileImage.split("amazonaws.com/")[1], // the full path/key of the file in your bucket
        })
      );
    }

    await UserAccount.findByIdAndDelete(tokenData._id);

    const accounts = await Account.find({ _userAccount: tokenData._id });

    const accountIds = accounts.map((account) => account._id);

    await AccountHistory.deleteMany({ _account: { $in: accountIds } });

    await Account.deleteMany({ _userAccount: tokenData._id });

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
