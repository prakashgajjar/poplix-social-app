"use client";

import { userpostdata } from "@/actions/userposts/getuserpost";
import RePostCard from "@/app/home/RePost";
import LoadingPost from "@/components/Loading";
import PostCard from "@/app/home/Post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // If using ShadCN
import { ArrowLeft } from "lucide-react"; 
import DeleteConfirm from "./DeleteConform";

const UserPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const username = params?.username;
  const router = useRouter();
  const [showDeletePost , setShowDeletePost] = useState(false);
  const [postId , setPostId] = useState("")
  const handleGetUser = async () => {
    if (!username) return;
    try {
      const res = await userpostdata(username);
      setPosts(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [username]);


  const handleLongPress = (post) => {
    setPostId(post?._id)
    setShowDeletePost(true);
  };

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <div className="h-screen overflow-auto p-2 md:p-6">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">{posts[0]?.user?.fullname || posts[0]?.user?.username} posts</h1>
      </div>

      <div>
        {
          showDeletePost && <DeleteConfirm onCancel={() => setShowDeletePost(false)} onDelete={() => setShowDeletePost(false)} postId={postId}/>
        }
      </div>
      {/* Post Content */}
      {loading ? (
        <div className="text-center text-gray-400 mt-10">
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
        </div>
      ) : posts?.length > 0 ? (
        <div className="flex flex-col gap-4 mb-12">
          {posts?.map((post,index) =>(
            post?.isRetweet ? (
              <div
                key={post._id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleLongPress(post);
                }}
              >
                <RePostCard post={post?.retweetOf} repostUser={post?.user} />
              </div>
            ) : (
              <div
                key={post._id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleLongPress(post);
                }}
              >
                <PostCard post={post} />
              </div>
            )
            )
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">No posts found.</div>
      )}
    </div>
  );
};

export default UserPostPage;
