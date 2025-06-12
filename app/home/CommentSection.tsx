"use client";

import { useState, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { sendcomment } from "@/actions/postActions/sendcomments";


export default function CommentSection({ comments, postId , user }) {
  const [commentText, setCommentText] = useState("");
  const commentBoxRef = useRef(null);
console.log("user : ",user)
  const handleSend = () => {
    if (!commentText.trim()) return;
    sendcomment(postId, commentText);
    setCommentText("");
    
  };

  return (
    <div className="w-full max-w-2xl h-[450px] bg-[#0e0e15] border border-[#2a2a2a] rounded-2xl shadow-xl mx-auto flex flex-col overflow-hidden">

      {/* 💬 Input Area */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#333] bg-[#16161e]">
        {/* 👽 Static Alien Avatar */}
        <div className="w-10 h-10 rounded-full border-2 border-[#5eead4] overflow-hidden shadow-md">
          <Image
            src={`${user?.user?.avatar}`}
            alt="Alien"
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        </div>

        {/* 📝 Textarea */}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave a comment..."
          rows={1}
          className="flex-1 resize-none bg-[#101018] text-white placeholder-gray-500 p-2.5 rounded-xl border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />

        {/* 📤 Send Button */}
        <button
          onClick={handleSend}
          className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white rounded-xl shadow-md transition-all"
        >
          <SendHorizonal size={18} />
        </button>
      </div>

      {/* 🧾 Comment List */}
      <div
        ref={commentBoxRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-5 custom-scrollbar"
      >
        {comments?.map((comment, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* 👽 Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#444] flex-shrink-0 shadow">
              <Image
                src={comment?.user?.avatar || "https://api.dicebear.com/8.x/bottts/svg?seed=guestalien"}
                alt="User Avatar"
                width={36}
                height={36}
                className="object-cover rounded-full"
              />
            </div>

            {/* 📄 Comment Box */}
            <div className="bg-[#181820] p-3 rounded-xl border border-[#2a2a2a] w-full shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-semibold text-sm">
                  {comment?.user?.username || "SpaceUser"}
                </span>
                <span className="text-xs text-gray-500">
                  {comment?.createdAt || "a moment ago"}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-snug">
                {comment?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
