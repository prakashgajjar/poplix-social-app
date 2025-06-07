import cloudinary from "@/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/Post.models.ts";
import { jwtVerify } from "jose";
import User from "@/models/User.models";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("post") as File | null;
    const content = formData.get("content") as string | null;

    if (!file && !content) {
      return NextResponse.json(
        { error: "No content or file uploaded" },
        { status: 400 }
      );
    }

    const token = req.cookies.get("login")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;

    let uploadResult: any = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "poplix",
            resource_type: "auto", // supports both images & videos
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        ).end(buffer);
      });
    }

 const user  = await User.findOne({
  _id : userId
 })

    return NextResponse.json(
      {
        message: "Post created successfully",
        // post: newPost,
        user : user
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /sendpost error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
