"use client"

import {
  FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaUser, FaPlus,
  FaRocket, FaUsers, FaBriefcase, FaListUl, FaEllipsisH, FaBolt
} from "react-icons/fa";
import Image from "next/image";
import Post from "@/app/home/Post";
import { useState } from "react";
import SendPost from "./SendPost";

const navItems = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaSearch />, label: "Explore" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaEnvelope />, label: "Messages" },
  { icon: <FaListUl />, label: "Lists" },
  { icon: <FaBookmark />, label: "Bookmarks" },
  { icon: <FaBriefcase />, label: "Jobs" },
  { icon: <FaUsers />, label: "Communities" },
  { icon: <FaRocket />, label: "Premium" },
  { icon: <FaBolt />, label: "Verified Orgs" },
  { icon: <FaUser />, label: "Profile" },
  { icon: <FaEllipsisH />, label: "More" },
];

export default function HomeLayout() {
   const [activeTab, setActiveTab] = useState("foryou");
  return (
    <div className="flex h-screen overflow-hidden bg-black text-white relative">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 px-4 py-6 border-r border-gray-800">
        <div className="text-3xl font-bold text-white mb-8">
          <Image
            src="/logos/poplix-black.png"
            alt="My Lovely Image"
            width={200}
            height={100}
          />
        </div>
        <nav className="space-y-4">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-2 text-lg rounded-lg hover:bg-gray-800 cursor-pointer"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <button className="mt-6 bg-white text-black font-semibold rounded-full py-2 w-full hover:bg-gray-300">
          <FaPlus className="inline mr-2" /> Post
        </button>

        <div className="flex items-center gap-3 mt-6 p-2 hover:bg-gray-800 rounded cursor-pointer">
          <img src="/images/2.jpg" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">Prakash Gajjar</p>
            <p className="text-sm text-gray-400">@prakash801805</p>
          </div>
        </div>
      </aside>

      {/* Feed center */}
      <main className="flex-1 max-w-2xl border-x h-screen overflow-scroll border-gray-800  mx-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">

        {/* Sticky Tab Bar */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2 bg-black sticky top-0 z-10">
          <button
            onClick={() => setActiveTab("foryou")}
            className={`w-1/2 py-2 font-semibold ${activeTab === "foryou"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`w-1/2 py-2 font-semibold ${activeTab === "following"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Following
          </button>
        </div>

        {/* Post box */}
        <div className="p-4">
         
         <SendPost/>

          {/* Posts */}
          <div>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </main>


      {/* Right sidebar */}
      <aside className="hidden lg:block w-80 p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-full bg-gray-900 text-white outline-none mb-6"
        />

        <div className="bg-gray-900 p-4 rounded-xl mb-6">
          <h2 className="font-semibold mb-2">Subscribe to Premium</h2>
          <p className="text-sm text-gray-400 mb-3">Unlock new features and earn revenue.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full">
            Subscribe
          </button>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl mb-6">
          <h2 className="font-semibold mb-3">What's happening</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>#KashmirOnTrack • 20.8K posts</li>
            <li>#ArrestKohli • 34.4K posts</li>
            <li>#Bakrid2025 • Trending</li>
            <li>#CIIBuildingTrust • Politics</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Who to follow</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>Nitish Kumar</span>
              <button className="bg-white text-black px-3 py-1 rounded-full font-semibold text-xs">Follow</button>
            </div>
            <div className="flex justify-between items-center">
              <span>Jasprit Bumrah</span>
              <button className="bg-white text-black px-3 py-1 rounded-full font-semibold text-xs">Follow</button>
            </div>
            <div className="flex justify-between items-center">
              <span>Rohit Sharma</span>
              <button className="bg-white text-black px-3 py-1 rounded-full font-semibold text-xs">Follow</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-black border-t border-gray-800 flex justify-around items-center py-2 md:hidden z-50">
        <FaHome className="text-xl" />
        <FaSearch className="text-xl" />
        <FaPlus className="text-xl bg-blue-500 text-white p-2 rounded-full" />
        <FaBell className="text-xl" />
        <FaUser className="text-xl" />
      </div>
    </div>
  );
}
