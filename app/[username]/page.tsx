"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Camera, ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { uploadBanner } from "@/actions/profile/uploadbanner";
import { uploadprofilepic } from "@/actions/profile/uploadprofilepic";
import { getprofiledatail } from "@/actions/profile/getprofiledetail";
import Follow from "./Follow";
import ProfileInfo from "./Profile";
// import { checkfollowuser } from "@/actions/profile/checkfollow";
import GlassSidebar from "@/components/GlassSidebar";
import ProfileSkeleton from "@/components/ProfilepageLoader";
import MediaCard from "@/components/Media";
import PostShow from "@/components/PostShow";
import SwipeToGoBack from "@/components/SwipeToGoBack";
import Message from "./MessageButton";


export default function ProfilePage() {
  const bannerRef = useRef(null);
  const profilePicRef = useRef(null);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [checkFollow, setCheckFollow] = useState<boolean>(false);
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState(null);

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

  const fetchData = useCallback(async () => {
    try {
      const data = await getprofiledatail({ username });
      // const data1 = await checkfollowuser(data.user._id);
      setProfile(data.user);
      setUserId(data.userId);
      // setCheckFollow(data1);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }, username); // Now fetchData is stable

  useEffect(() => {
    if (username) fetchData();
  }, [username, fetchData]);

  // ✨ Long press handlers
  const handlePressStart = (post) => {
    holdTimeout.current = setTimeout(() => {
      setPostData(post);
      setShowPost(true);
    }, 300);
  };

  const handlePressEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    setShowPost(false);
  };

  return (
    <SwipeToGoBack>{
      profile ? (
        <div className="max-w-4xl mx-auto bg-black text-white overflow-auto h-screen">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-4">
            <button onClick={() => router.replace("/home")} className="text-white hover:text-gray-300">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-white font-semibold text-base">{profile?.fullname || "User Name"}</h1>
              <p className="text-gray-400 text-sm">{profile?.posts?.length || 0} posts</p>
            </div>
          </div>

          {/* Banner */}
          <div className="relative w-full md:h-60 h-36 bg-gray-800 group">
            {profile?.banner && (
              <Image src={profile?.banner} alt="Banner" fill className="object-cover" />
            )}
            {userId === profile?._id && (
              <>
                <div
                  className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer"
                  onClick={handleBannerClick}
                >
                  <Camera size={24} />
                  <span className="ml-2 text-sm">Upload Banner</span>
                </div>
                <input
                  type="file"
                  ref={bannerRef}
                  className="hidden"
                  onChange={handleBannerChange}
                />
              </>
            )}
          </div>

          {/* Profile Pic + Follow */}
          <div className="px-4 mt-[-40px]">
            <div className="flex justify-between items-end">
              <div className="relative group w-24 h-24">
                <Image
                  src={
                    profile?.avatar ||
                    "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"
                  }
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-black object-cover w-full h-full"
                />

                {userId === profile?._id && (
                  <>
                    <div
                      className="absolute inset-0 bg-black/60 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer transition"
                      onClick={handleProfilePicClick}
                    >
                      <Camera size={20} className="text-white" />
                    </div>
                    <input
                      type="file"
                      ref={profilePicRef}
                      className="hidden"
                      onChange={handleProfilePicChange}
                    />
                  </>
                )}
              </div>
              <div className="flex gap-3">

                {userId !== profile?._id && <Message id={profile?._id} />}
                {userId !== profile?._id && <Follow id={profile?._id} />}
              </div>
            </div>

            {/* Bio + Details */}
            <ProfileInfo profile={profile} userId={userId} />
          </div>

          {/* Posts */}
          <div className="mt-6 px-4">
            <div className="flex items-center gap-2 border-b-1 select-none border-blue-500 py-2 text-white font-semibold hover:bg-blue-500/10 transition-all cursor-pointer"
              onClick={() => router.replace(`post/${username}`)}
            >
              <ImageIcon className="w-5 h-5 text-blue-400" />
              <span>Posts</span>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-3 gap-[1px] bg-black">
                {profile?.posts?.length > 0 ? (
                  profile?.posts?.map((post, index) => (

                    <div
                      key={index}
                      onTouchStart={() => { handlePressStart(post) }}
                      onTouchEnd={handlePressEnd}
                      onTouchCancel={handlePressEnd}
                      onMouseDown={() => { handlePressStart(post) }}
                      onMouseUp={handlePressEnd}
                      onContextMenu={(e) => { e.preventDefault() }}
                      className="last:mb-20"
                    >

                      <MediaCard post={post} />
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-white py-6">No posts yet</p>
                )}
              </div>

              {/* Post Preview Modal */}
              {showPost && (
                <PostShow post={postData} onClose={() => setShowPost(false)} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="z-50">
            <GlassSidebar />
          </div>
        </div>
      ) : (
        <ProfileSkeleton />
      )
    }
    </SwipeToGoBack>
  )
}
