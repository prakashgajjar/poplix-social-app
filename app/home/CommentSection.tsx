"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

export default function CommentSection({ comments = [], onPostComment }) {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const commentBoxRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      username: "You",
      text: commentText,
      timeAgo: "Just now",
    };

    await onPostComment(commentText);
    setAllComments((prev) => [...prev, newComment]);
    setCommentText("");

    // Scroll to bottom after comment
    setTimeout(() => {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }, 100);
  };

  return (
    <div className="w-full  relative  max-w-2xl h-[400px] bg-[#101018]/80 border border-[#2a2a2a] rounded-2xl shadow-xl mx-auto flex flex-col overflow-hidden">

      {/* 🧾 Top Input Row */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 px-4 py-3 border-b border-[#333] bg-[#181818]"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold shadow">
          U
        </div>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          rows={1}
          className="flex-1 resize-none bg-[#101018] text-white placeholder-gray-500 p-2.5 rounded-xl border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />

        <button
          type="submit"
          className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-xl shadow-md transition-all"
        >
          <SendHorizonal size={18} />
        </button>
      </form>

      {/* 💬 Scrollable Comment List */}
      <div
        ref={commentBoxRef}
        className="flex-1 overflow-y-auto px-4  py-4 space-y-4 custom-scrollbar"
      >
        {allComments.map((comment, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow">
              {comment.username[0]?.toUpperCase()}
            </div>

            <div className="bg-[#181818] p-3 rounded-xl border border-[#2a2a2a] w-full shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-semibold text-sm">{comment.username}</span>
                <span className="text-xs text-gray-500">{comment.timeAgo}</span>
              </div>
              <p className="text-sm text-gray-300 leading-snug">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
