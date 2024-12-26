import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import UserAccount from "@/models/UserAccount";
import transporter from "@/utils/sendMail";
import { IPostRequestSend } from "@/types";
import { NEXT_RESPONSE_STATUS } from "@/constants";
import * as configJSON from "@/constants/configJson";

export const POST = async (req: NextRequest) => {
  await connectDB();

  const requestData: IPostRequestSend = await req.json();

  try {
    const existingUser = await UserAccount.findOne({
      email: requestData.email,
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: configJSON.invalidEmail },
        { status: NEXT_RESPONSE_STATUS.NOT_FOUND }
      );
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let dummyPassword = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      dummyPassword += characters[randomIndex];
    }

    const hashDummyPassword = await bcrypt.hash(dummyPassword, 10);

    await UserAccount.findByIdAndUpdate(existingUser._id, {
      password: hashDummyPassword,
    });

    const info = await transporter.sendMail({
      from: '"Hemal Parmar" <hemalparmar2017@gmail.com>', // sender address
      to: existingUser.email, // list of receivers
      subject: "Password Reset Instructions", // Subject line
      text: `
          Hi ${existingUser.name},

          We received a request to reset the password for your account. Please find your temporary password below:

          Temporary Password: ${dummyPassword}

          To continue with resetting your password, please follow these steps:
          1. Visit our website and go to the Password Reset page.
          2. Enter the temporary password above.
          3. Follow the instructions to set a new password.

          If you didn't request a password reset, please ignore this email, and your account will remain secure.

          If you have any questions or need further assistance, feel free to reach out to our support team.

          Best regards,  
          Support Team
        `, // plain text body
    });

    return Response.json(
      {
        message: configJSON.emailSend,
        info,
      },
      { status: NEXT_RESPONSE_STATUS.OK }
    );
  } catch (error) {
    return Response.json(
      { error },
      { status: NEXT_RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
};
