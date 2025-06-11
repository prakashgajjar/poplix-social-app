import Post from "@/models/Post.models";
import status from "@/utils/status";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ObjectId } from "mongoose";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const seenPostIds = body.seen || [];

    const posts = await Post.aggregate([
      { $match: { _id: { $nin: seenPostIds.map((id) => new ObjectId(id)) } } },
      { $sample: { size: 10 } },
    ]);
    const postIds = posts.map((post) => post._id);
const populatedPosts = await Post.find({ _id: { $in: postIds } })
  .populate({
    path: "user", // user who posted or reposted
  })
  .populate({
    path: "retweetOf", // the original post
    populate: {
      path: "user", // also populate the user of the original post
    },
  });
    return NextResponse.json({ status: status.OK.code, data: populatedPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
