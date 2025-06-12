import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import status from "@/utils/status";
import Post from "@/models/Post.models";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const {id} = await req.json();

    const post = await Post.findOne({_id : id}).populate({
        path : "comments",
        populate : {
            path : "user"
        }
    })

    return NextResponse.json({ comments : post.comments  }, { status: status.OK.code });

  } catch (error) {
    console.error("Error getting liked post IDs:", error);
    return NextResponse.json(
      { message: error.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
