"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { uploadBanner } from "@/actions/profile/uploadbanner";
import { uploadprofilepic } from "@/actions/profile/uploadprofilepic";
import { getprofiledatail } from "@/actions/profile/getprofiledetail";
import Follow from "./follow"
import ProfileInfo from "./Profile";
import { checkfollowuser } from "@/actions/profile/checkfollow";
import Card from "../../components/Card";
import GlassSidebar from "@/components/GlassSidebar";
import ProfileSkeleton from "@/components/ProfilepageLoader";

export default function ProfilePage() {
  // const [activeTab, setActiveTab] = useState("posts");
  const bannerRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [checkFollow, setCheckFollow] = useState<boolean>(false);
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

  const fetchData = async () => {
    try {
      const data = await getprofiledatail({ username });
      const data1 = await checkfollowuser(data.user._id);
      console.log("posts of user : ", data.user.posts)
      setProfile(data.user);
      setUserId(data.userId);
      setCheckFollow(data1);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };



  useEffect(() => {
    if (username) fetchData();
  }, [username]);



  return (
    profile ? (
      <div className="max-w-4xl mx-auto bg-black text-white overflow-auto h-screen">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-4">
          <button onClick={() => router.replace('/home')} className="text-white hover:text-gray-300">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-white font-semibold text-base">{profile?.fullname || "User Name"}</h1>
            <p className="text-gray-400 text-sm">{profile?.posts?.length || 0} posts</p>
          </div>
        </div>

        {/* Banner */}
        <div className="relative w-full md:h-60 h-36 bg-gray-800 group" >
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

              {userId === profile._id && (
                <>
                  <div
                    className="absolute inset-0 bg-black/60 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer transition"
                    onClick={handleProfilePicClick}
                  >
                    <Camera size={20} className="text-white" />
                  </div>
                  <input
                    type="file"
                    name="profilepic"
                    id="profilepic"
                    ref={profilePicRef}
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </>
              )}
            </div>

            {profile && <Follow id={profile._id} checkFollow={checkFollow} />}
          </div>

          <ProfileInfo profile={profile} userId={userId} />
        </div>

        <div className="mt-6 px-4">
          <div className="flex items-center gap-2 border-b-1 border-blue-500  py-2 text-white font-semibold hover:bg-blue-500/10 transition-all cursor-pointer">
            <ImageIcon className="w-5 h-5 text-blue-400" />
            <span>Posts</span>
          </div>

          <div className="mt-4">

            <div className="grid grid-cols-3 gap-[1px] bg-black">
              {profile?.posts?.length > 0 ? (
                profile.posts.map((post, index) => (
                  <div key={index} className="aspect-square bg-neutral-900 overflow-hidden">
                    <Card post={post} />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-white py-6">No posts yet</p>
              )}
            </div>

          </div>

        </div>
       <div className="z-50">
         <GlassSidebar url={profile?.username}/>
       </div>
      </div>
    ):(
      <ProfileSkeleton/>
    )
  );
}
