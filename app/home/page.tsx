"use client";

import { Toaster } from 'react-hot-toast';
import {
  FaHome, FaSearch, FaBell, FaUser, FaPlus,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import SendPost from "./SendPost";
import Post from "@/app/home/Post";
import RePostCard from "./RePost";

import { getPosts } from '@/actions/postActions/getpost';
import { getpostfollowing } from '@/actions/postActions/getpostforfollowing';
import { getuserinfo } from "@/actions/auth/getuserinfo";
import GlassSidebar from '@/components/GlassSidebar';
import Image from 'next/image';
import SendPostBigComp from './SendPostBigComp';

export default function HomeLayout() {
  const [posts, setPosts] = useState([]);
  const [followingPost, setFollowingPost] = useState([]);
  const [activeTab, setActiveTab] = useState("foryou");
  const [userData, setUSerData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);

    async function fetchUser() {
      const data = await getuserinfo();
      setUSerData(data);
      console.log(data)
    }

    fetchUser();
  }, []);



  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Feed center */}
      <main className="flex-1 max-w-3xl border-x h-screen overflow-scroll border-gray-800 mx-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 🚀 Logo Left */}
          <div className="flex items-center gap-2">
            <Image
              src="/logos/poplix1.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
              height={40}
              width={40}
            />

            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>

          {/* 🧭 Optional - Can add search/settings later */}
        </div>

        {/* Sticky Tab Bar */}
        <div className="sticky top-0 z-10 bg-black border-b border-gray-800">


          {/* 🔄 Tabs */}
          <div className="flex justify-between items-center border-t border-gray-700">
            <button
              onClick={() => setActiveTab("foryou")}
              className={`w-1/2 py-2 font-semibold transition ${activeTab === "foryou"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              For You
            </button>
            <button
              onClick={async () => {
                setActiveTab("following");
                const data = await getpostfollowing();
                setFollowingPost(data);
              }}
              className={`w-1/2 py-2 font-semibold transition ${activeTab === "following"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              Following
            </button>
          </div>
        </div>



        {/* Posts Feed */}
        <div>
          {activeTab === "foryou" ? (
            <div className="p-4 [&>div:last-child]:mb-10">
              <SendPost />
              <div>
                {posts?.map((post) =>
                  post?.isRetweet ? (
                    <RePostCard key={post._id} post={post?.retweetOf} repostUser={post?.user} />
                  ) : (
                    <Post key={post._id} post={post} />
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 [&>div:last-child]:mb-10">
              {followingPost && (
                <div>
                  {followingPost?.map((post) =>
                    post?.isRetweet ? (
                      <RePostCard key={post._id} post={post?.retweetOf} repostUser={post?.user} />
                    ) : (
                      <Post key={post._id} post={post} />
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <GlassSidebar />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-black border-t border-gray-800 flex justify-around items-center py-2 md:hidden z-50">
        <FaHome
          className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95"
          onClick={() => {
            if (userData) router.replace(`/home`);
          }}
        />
        <FaSearch className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95" onClick={() => {
          router.replace("/explore")
        }} />
        <FaPlus className="text-2xl bg-blue-500 text-white p-2 rounded-full cursor-pointer transition-all duration-200 active:bg-blue-600 active:scale-95" onClick={() => {
          router.replace(`/home`);
        }} />
        <FaBell className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95" onClick={() => {
          router.replace(`/notifications`);
        }} />
        <FaUser
          className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95"
          onClick={() => {
            if (userData) {
              router.replace(`/${userData?.user?.username}`);
            }
          }}
        />
      </div>


    </div>
  );
}
