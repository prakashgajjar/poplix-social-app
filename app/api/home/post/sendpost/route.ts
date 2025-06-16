import cloudinary from "@/lib/cloudinary";
import { NextResponse, NextRequest } from "next/server";
import Post from "@/models/Post.models";
import User from "@/models/User.models";
import { getUserIdFromToken } from "@/lib/getUserIdfromToken";
import { Notification } from "@/models/Notification.models";

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

    const userId = await getUserIdFromToken();
    const user = await User.findById(userId);

    let uploadResult = null;
    let type: "text" | "image" | "video" = "text";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "poplix",
              resource_type: "auto", // supports both images & videos
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      type = uploadResult?.resource_type === "video" ? "video" : "image";
    }

    const newPost = await Post.create({
      user: userId,
      content: content,
      url: uploadResult?.url || null,
      type: type,
    });

    user.posts.push(newPost._id);
    await user.save();

    // if (user.followers && user.followers.length > 0) {
    //   const followers = await User.find({ _id: { $in: user.followers } });

    //   await Promise.all(
    //     followers.map(async (follower) => {
    //       const notification = await Notification.create({
    //         recipient: follower._id,
    //         sender: userId,
    //         type: "post", // optional: add this to enum
    //         message: `${user.username} just posted something new!`,
    //         meta: {
    //           avatar: user.avatar,
    //           username: user.username,
    //         },
    //       });

    //       follower.notifications.push(notification._id);
    //       await follower.save();
    //     })
    //   );
    // }

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("POST /sendpost error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
