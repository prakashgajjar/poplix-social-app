// server.ts
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as IOServer, Socket } from "socket.io";
import { IncomingMessage, ServerResponse } from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Create HTTP + Socket.IO server
app.prepare().then(() => {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);
  });

  const io = new IOServer(server, {
    cors: {
      origin: "*", // Change this to your frontend domain in prod
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(" New socket connected:", socket.id);

    socket.on("join-room", ({ userId, targetUserId }: { userId: string; targetUserId: string }) => {
      const room = [userId, targetUserId].sort().join("-");
      socket.join(room);
      console.log(`User ${userId} joined room: ${room}`);
    });

    socket.on("send-message", ({
      senderId,
      receiverId,
      message,
    }: {
      senderId: string;
      receiverId: string;
      message: string;
    }) => {
      const room = [senderId, receiverId].sort().join("-");
      io.to(room).emit("receive-message", { senderId, message });
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected", socket.id);
    });
  });

  server.listen(3000, () => {
    console.log("🚀 Next.js + Socket.IO server running on http://localhost:3000");
  });
});
