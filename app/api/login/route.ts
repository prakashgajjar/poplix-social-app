import { NextResponse, NextRequest } from "next/server";
import status from "@/utils/status";
import connectDb from "@/lib/db";
import User from "@/models/User.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({
        status: status.BAD_REQUEST.code,
        error: status.BAD_REQUEST.message,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: status.UNAUTHORIZED.code,
        error: status.UNAUTHORIZED.message,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: status.UNAUTHORIZED.code,
        error: status.UNAUTHORIZED.message,
      });
    }

    if (!user.isVerified) {
      return NextResponse.json({
        status: status.FORBIDDEN.code,
        error: status.FORBIDDEN.message,
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({
        status: status.INTERNAL_ERROR.code,
        error: "JWT secret is not defined in environment variables.",
      });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1d",
    });

    const cookieStore = cookies();
    (await cookieStore).set("login", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({
      status: status.OK.code,
      message: status.OK.message,
    });
  } catch (error) {
    console.error("Error in POST /login:", error);
    return NextResponse.json({
      status: status.INTERNAL_ERROR.code,
      error: status.INTERNAL_ERROR.message,
    });
  }
}
