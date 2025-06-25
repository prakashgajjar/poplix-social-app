import status from "@/utils/status";
import { NextRequest, NextResponse } from "next/server";
import ChatMessage from "@/models/MessageChat.models";
import User from "@/models/User.models";
import connectDB from "@/lib/db";
import { getUserIdFromToken } from "@/lib/getUserIdfromToken";
import Chat from "@/models/Chat.models";
import cloudinary from "@/lib/cloudinary";
import { extname } from "path";

export async function POST(req: NextRequest) {
  await connectDB();
  const senderId = await getUserIdFromToken();
  const formData = await req.formData();
  const message = formData.get("message") as string | null;
  const receiverId = formData.get("receiverId")?.toString() as string | null;
  const media = formData.get("media") as File | null;

  if (!message && !media) {
    return NextResponse.json(
      { message: status.FORBIDDEN.message },
      { status: status.FORBIDDEN.code }
    );
  }

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return NextResponse.json(
        { message: status.NOT_FOUND.message },
        { status: status.NOT_FOUND.code }
      );
    }

    let uploadResult = null;
    let type: "text" | "image" | "video" | "audio" | "pdf" = "text";

    if (media) {
      const bufferFile = Buffer.from(await media.arrayBuffer());

      // Detect mime
      const mimeType = media.type; // like 'application/pdf', 'image/png'
      if (mimeType.includes("pdf")) type = "pdf";
      else if (mimeType.includes("image")) type = "image";
      else if (mimeType.includes("video")) type = "video";
      else if (mimeType.includes("audio")) type = "audio";

      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "poplix/messagesPosts",
              resource_type: "auto", // auto handles all types
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          )
          .end(bufferFile);
      });
    }

    let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [senderId, receiverId], $size: 2 },
    });

    if (!chat) {
      chat = new Chat({ isGroup: false, members: [senderId, receiverId] });
      await chat.save();
    }

    const messageChat = await ChatMessage.create({
      chat: chat._id,
      sender: senderId,
      url: uploadResult?.secure_url || null,
      content: message,
      type: media ? type : "text",
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
      { message: status.OK.message, chat, messageChat, sender, receiver },
      { status: status.OK.code }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: status.INTERNAL_ERROR.message },
      { status: status.INTERNAL_ERROR.code }
    );
  }
}
