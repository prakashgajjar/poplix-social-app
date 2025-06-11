"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="max-w-4xl mx-auto bg-black text-white min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-60 bg-gray-800 group">
        <Image
          src="/banner.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer">
          <Camera size={24} />
          <span className="ml-2 text-sm">Upload Banner</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 mt-[-40px]">
        <div className="flex justify-between items-end">
          <div className="relative group">
            <Image
              src="https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full border-4 border-black"
            />
            <div className="absolute inset-0 bg-black/60 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer">
              <Camera size={20} />
            </div>
          </div>
          <button className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">
            Follow
          </button>
        </div>

        <div className="mt-2">
          <h1 className="text-xl font-bold">Cristiano Ronaldo</h1>
          <p className="text-sm text-gray-400">@Cristiano</p>
          <p className="text-sm mt-1">
            Welcome to the official account of Cristiano Ronaldo.
          </p>
          <div className="flex gap-4 mt-2 text-sm text-gray-400">
            <span>Born February 5, 1985</span>
            <span>Joined June 2010</span>
          </div>
          <div className="flex gap-4 mt-1 text-sm">
            <span className="font-bold text-white">76</span> Following
            <span className="font-bold text-white">115.4M</span> Followers
          </div>
        </div>
      </div>

      {/* Tabs Inline */}
      <div className="mt-6 px-4">
        <div className="flex gap-4 border-b border-gray-700">
          {["posts", "replies", "media"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-sm font-medium border-b-2 transition-all duration-150 ${
                activeTab === tab
                  ? "text-white border-white"
                  : "text-gray-300 border-transparent hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "posts" && (
            <div className="text-center py-6 text-gray-400">No posts yet.</div>
          )}
          {activeTab === "replies" && (
            <div className="text-center py-6 text-gray-400">No replies yet.</div>
          )}
          {activeTab === "media" && (
            <div className="text-center py-6 text-gray-400">No media uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
