"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { uploadBanner } from "@/actions/profile/uploadbanner";
import { uploadprofilepic } from "@/actions/profile/uploadprofilepic";
import { getprofiledatail } from "@/actions/profile/getprofiledetail";
import ProfileInfo from "./Profile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const bannerRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profile, setProfile] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const params = useParams();

  const username = params.username;

  const handleBannerClick = () => bannerRef?.current?.click();
  const handleProfilePicClick = () => profilePicRef?.current?.click();

  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("banner", file);
      await uploadBanner(formData);
      e.target.value = "";
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);
      await uploadprofilepic(formData);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getprofiledatail({ username });
        setProfile(data.user);
        setUserId(data.userId);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    if (username) fetchData();
  }, [username]);

  return (
    profile && (
      <div className="max-w-4xl mx-auto bg-black text-white min-h-screen">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-4">
          <button onClick={() => router.replace('/home')} className="text-white hover:text-gray-300">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-white font-semibold text-base">{profile?.profileName || "User Name"}</h1>
            <p className="text-gray-400 text-sm">{profile?.posts?.length || 0} posts</p>
          </div>
        </div>

        {/* Banner */}
        <div className="relative w-full h-60 bg-gray-800 group" >
          {profile?.banner && (
            <Image
              src={`${profile?.banner}`}
              alt="Banner"
              fill
              className="object-cover"
            />
          )}
          {
            (userId === profile._id) && <div>
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer" onClick={handleBannerClick}>
                <Camera size={24} />
                <span className="ml-2 text-sm">Upload Banner</span>
              </div>
              <input
                type="file"
                name="banner"
                id="banner"
                ref={bannerRef}
                className="hidden"
                onChange={handleBannerChange}
              />
            </div>
          }
        </div>

        {/* Profile Section */}
        <div className="px-4 mt-[-40px]">
          <div className="flex justify-between items-end">
            <div className="relative group" >
              <Image
                src={
                  (profile?.avatar) ||
                  "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"
                }
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-black"
              />
              {
              (userId === profile._id) &&  <div>
                  <div className="absolute inset-0 bg-black/60 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer" onClick={handleProfilePicClick}>
                    <Camera size={20} />
                  </div>
                  <input
                    type="file"
                    name="profilepic"
                    id="profilepic"
                    ref={profilePicRef}
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
              }
            </div>
            <button className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">
              Follow
            </button>
          </div>

          <ProfileInfo profile={profile} />
        </div>

        {/* Tabs */}
        <div className="mt-6 px-4">
          <div className="flex gap-4 border-b border-gray-700">
            {["posts", "replies", "media"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-sm font-medium border-b-2 transition-all duration-150 ${activeTab === tab
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
    )
  );
}
