import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import status from "@/utils/status";
import { getUserIdFromToken } from "@/lib/getUserIdfromToken";

import User from "@/models/User.models";
import Chat from "@/models/Chat.models";
import ChatMessage from "@/models/MessageChat.models";

type MediaType = "text" | "image" | "video" | "audio" | "pdf";

export async function POST(req: NextRequest) {
  await connectDB();

  const senderId = await getUserIdFromToken();
  if (!senderId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const message = formData.get("message") as string | null;
  const receiverId = formData.get("receiverId")?.toString() || null;
  const media = formData.get("media") as File | null;

  if (!receiverId || (!message && !media)) {
    return NextResponse.json(
      { message: status.FORBIDDEN.message },
      { status: status.FORBIDDEN.code }
    );
  }

  try {
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    type UploadResultType = {
      secure_url: string;
      [key: string]: unknown;
    };

    let uploadUrl: string | "" = "";
    let type: MediaType = "text";

    if (media) {
      const buffer = Buffer.from(await media.arrayBuffer());
      const mime = media.type;

      if (mime.includes("pdf")) type = "pdf";
      else if (mime.includes("image")) type = "image";
      else if (mime.includes("video")) type = "video";
      else if (mime.includes("audio")) type = "audio";

      const uploadResult = await new Promise<UploadResultType>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "poplix/messagesPosts",
                resource_type: "auto",
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result as UploadResultType); 
              }
            )
            .end(buffer);
        }
      );

      uploadUrl = uploadResult.secure_url;
    }

    // Check if chat exists
    let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [senderId, receiverId], $size: 2 },
    });

    if (!chat) {
      chat = await Chat.create({
        isGroup: false,
        members: [senderId, receiverId],
      });
    }

    const messageChat = await ChatMessage.create({
      chat: chat._id,
      sender: senderId,
      url: uploadUrl,
      content: message,
      type,
    });

    chat.latestMessage = messageChat._id;
    await chat.save();

    if (!sender.contacts.includes(receiverId)) {
      sender.contacts.push(receiverId);
      await sender.save();
    }

    if (!receiver.contacts.includes(senderId)) {
      receiver.contacts.push(senderId);
      await receiver.save();
    }

    return NextResponse.json(
      {
        message: status.OK.message,
        chat,
        messageChat,
        sender,
        receiver,
      },
      { status: status.OK.code }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
