"use client"

import { useState } from "react";
import { Paperclip, Mic, Send, Image as ImageIcon, Smile, ArrowLeft, Users, Plus } from "lucide-react";
import { FaCog } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";

const dummyMessages = [
  { from: "me", text: "🔥🔥🔥🔥🔥", time: "11:36 AM" },
  { from: "you", text: "Thanks 🙏🙏", time: "12:23 PM" },
  { from: "me", text: "Swayam https://share.google/PpKTL4efRfLDQKjZ", link: true, time: "10:33 PM" },
  { from: "me", text: "ai ml and deep learning na course aay che join kari le", time: "10:33 PM" },
  { from: "you", text: "ha", time: "10:34 PM" },
  { from: "you", image: "/parul-marksheet.png", time: "11:27 AM" },
];

const dummyUsers = [
  { name: "CSE_4th_Sem", lastMsg: "~ joined this group", time: "12:20 PM" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "PRKSH (You)", lastMsg: "HEY", time: "Yesterday" },
  { name: "Study Material", lastMsg: "~ ボイドンジ", time: "2:28 PM" },
  { name: "MSME INTERNSHIP", lastMsg: "~Visva✨: ✨AICT...", time: "12:44 PM" },
  { name: "Tirth Oza", lastMsg: "Thanks 🙏🙏", time: "12:23 PM" },
];

export default function ChatUI() {
  const [message, setMessage] = useState("");
  const router = useRouter()

  const sendMessage = () => {
    if (!message.trim()) return;
    dummyMessages.push({ from: "me", text: message, time: "Now" });
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-zinc-950/90 text-white">
      {/* Left Sidebar */}
      <aside className="hidden md:flex w-[300px] border-r border-gray-800/90 bg-zinc-950 flex-col">
        {/* Header & Search */}
        <div className="pb-3 border-b border-gray-700">
          <div className="flex justify-between pr-3 items-center">
            <div className="p-4 font-semibold text-lg text-white">Messages</div>
            <div className="gap-3 flex  items-center">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer">
                <Users className="text-white w-[16px] h-[16px]" />
              </div>
              <div className="hover:rotate-45 transition-all">
                <FaCog />
              </div>
            </div>
          </div>
          <div className="px-4">
            <input
              type="text"
              placeholder="Search user"
              className="w-full px-3 py-1.5 text-sm bg-[zinc-800] text-white placeholder:text-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto mt-2">
          {dummyUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[#2b2b2b] cursor-pointer transition-colors duration-150 border-b border-gray-800"
            >
              <Image
                src="https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-white">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.lastMsg}</div>
                <div className="text-[10px] text-gray-500 mt-1">{user.time}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>



      {/* Main Chat Panel */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-3 flex items-center border-b border-gray-700">
          <button
            className="text-white md:hidden hover:text-gray-300"
            onClick={() => router.replace('/home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Image
            src="https://i.pravatar.cc/150?img=3"
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="font-medium text-md">Tirth Oza</h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-sm">
          <div className="text-center text-gray-400 text-xs">Today</div>
          {dummyMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">
                {msg.image ? (
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={msg.image}
                      alt="uploaded"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className={`px-4 py-2 rounded-lg mb-1 ${msg.from === "me"
                      ? "bg-[#075e54] text-white rounded-br-none"
                      : "bg-[#2a2a2a] text-white rounded-bl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                )}
                <div className="text-[10px] text-gray-400 mt-1 ml-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center px-4 py-3 mb-1 border-t border-gray-700 gap-2">
          <button>
            <Smile size={20} />
          </button>
          <button>
            <Paperclip size={20} />
          </button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 bg-zinc-950/80 border-[1px] border-white/40 rounded-full outline-none text-sm"
          />
          <button>
            <Mic size={20} />
          </button>
          <button onClick={sendMessage}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

