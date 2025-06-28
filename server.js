import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Replace with frontend URL for production
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected: ", socket.id);

    socket.on("sendMessage", (msg) => {
      io.emit("receiveMessage", msg); // Broadcast to all users
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  server.all("*", (req, res) => handle(req, res));

  httpServer.listen(3001, () => {
    console.log("🚀 Socket.IO Server ready on http://localhost:3001");
  });
});
