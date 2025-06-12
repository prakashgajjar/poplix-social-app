import { getUserIdFromToken } from "@/lib/getUserIdfromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.models";
import status from "@/utils/status";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();
    const id = await req.json();

    if (!userId || !id) {
      return NextResponse.json(
        { message: status.UNAUTHORIZED.message },
        { status: status.UNAUTHORIZED.code }
      );
    }

    const followRequestFrom = User.findOne({_id:userId})
    const followRequestTo = User.findOne({_id:id})

    



    return NextResponse.json({message: status.OK.message,},{status: status.OK.code,}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
