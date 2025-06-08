"use client";

import {
  FaHome, FaSearch, FaBell, FaUser, FaPlus,
} from "react-icons/fa";
import Image from "next/image";
import Post from "@/app/home/Post";
import { useEffect, useState } from "react";
import SendPost from "./SendPost";
import { getPosts } from "@/actions/getpost";

import TrendingCard from "./TrendingCard";
import FollowSuggestions from "./FollowSuggestions";
import SubscribePremium from "./SubscribePremium";


export default function HomeLayout() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("foryou");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      
      {/* Feed center */}
      <main className="flex-1 max-w-2xl border-x h-screen overflow-scroll border-gray-800 mx-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {/* Sticky Tab Bar */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2 bg-black sticky top-0 z-10">
          <button
            onClick={() => setActiveTab("foryou")}
            className={`w-1/2 py-2 font-semibold ${
              activeTab === "foryou"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`w-1/2 py-2 font-semibold ${
              activeTab === "following"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Following
          </button>
        </div>

        <div className="p-4">
          <SendPost />

          <div>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
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

        <div className="flex flex-col gap-5">
          <SubscribePremium />
          <TrendingCard />
          <FollowSuggestions />
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
