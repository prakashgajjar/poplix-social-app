"use client";

import { MessageCircle, Heart, Repeat, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PostCard = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (el && el.scrollHeight > el.clientHeight) {
            setShowReadMore(true);
        }
    }, [post]);

    return (
        <div className="max-w-xl mx-auto bg-black text-white p-4 rounded-xl shadow-md">
            {/* Header */}
            <div className="flex items-center space-x-2">
                <img
                    src="https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <div className="font-bold flex items-center space-x-1">
                        <span>{post?.user?.username}</span>
                        <img
                            src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20aria-label%3D%22Verified%20account%22%20role%3D%22img%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20stroke%3D%22%231DA1F2%22%20stroke-width%3D%222%22%20fill%3D%22%231DA1F2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M9%2012.5l2%202%204-4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A"
                            alt="Verified"
                            className="w-4 h-4"
                        />
                        <span className="text-gray-400">
                            {post?.user?.username} · 22m
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-2 max-w-xl space-y-2 text-sm">
                <div
                    ref={contentRef}
                    className={`text-white whitespace-pre-wrap break-words overflow-hidden ${expanded ? "" : "line-clamp-4"}`}
                >
                    {post?.content}
                </div>

                {showReadMore && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-400 text-sm mt-1 hover:underline"
                    >
                        {expanded ? "Read less" : "Read more"}
                    </button>
                )}
            </div>

            {/* Media */}
            {post?.type === "image" && (
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                    <img
                        src={post?.url}
                        alt="Post media"
                        className="col-span-2 rounded-xl"
                    />
                </div>
            )}

            {post?.type === "video" && (
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                    <video
                        src={post?.url}
                        className="col-span-2 rounded-xl"
                        controls
                        preload="metadata"
                        playsInline
                        muted
                        autoPlay
                    />
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between text-gray-400 mt-4 text-sm">
                <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
                    <MessageCircle size={16} /> <span>4</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer">
                    <Repeat size={16} /> <span>14</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-pink-400 cursor-pointer">
                    <Heart size={16} /> <span>268</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
                    <Share2 size={16} /> <span>9.2K</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
