"use client";

import { MessageCircle, Heart, Repeat, Share2, Bookmark, BarChart3 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { likepost } from "@/actions/postActions/postlike";
import { getlikes } from "@/actions/postActions/getlikes";
import { useRouter } from 'next/navigation';
import { repost } from "@/actions/postActions/repost";
import { formatDistanceToNow } from 'date-fns';
import RepostConfirmModal from "./RepostConform";
import { toast } from "react-hot-toast";
import CommentSection from "./CommentSection";
import { getcomments } from "@/actions/postActions/getcomments";
import { getuserinfo } from "@/actions/auth/getuserinfo";
import { addview } from "@/actions/postActions/addviews";
import { savepost } from "@/actions/postActions/savepost";

const PostCard = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [commentLoad, setCommentLoad] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [savedPost, setSavedPost] = useState(false);
    const [checkSavedPost, setCheckSavedPost] = useState(false);

    const [user, setUser] = useState(null);
    const contentRef = useRef(null);
    const postRef = useRef(null);
    const hasViewed = useRef(false);
    const router = useRouter()

    const [likedPost, setLikedPost] = useState([]);
    const [isLiked, setIsLiked] = useState(false);


    const handleLike = async () => {
        const res = await likepost(post._id);

        if (res?.liked) {
            setLikedPost((prev) => [...prev, post._id]);
        } else {
            setLikedPost((prev) => prev.filter((id) => id !== post._id));
        }
    };

    const handleGetlike = async () => {
        const data = await getlikes();
        setLikedPost(data);
    };
    const handleRepost = async () => {
        try {
            const res = await repost(post._id);
            if (res?.status == 200) {
                toast.success("Reposted successfully!");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    const handleSavedPost = async () => {
        const data = await savepost(post._id);
        console.log(data)
        setSavedPost(data);
    }


    //ckecklike include or not 
    useEffect(() => {
        if (likedPost && likedPost.includes(post._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [likedPost, post._id]);

    //like get handler useEffect
    useEffect(() => {
        async function getData() {
            try {
                const data = await getuserinfo();
                await handleGetlike();
                setUser(data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);

    //show more and less for text 
    useEffect(() => {
        const el = contentRef.current;
        if (el && el.scrollHeight > el.clientHeight) {
            setShowReadMore(true);
        }
    }, [post]);


    //add view useEffect 
    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && !hasViewed.current) {
                hasViewed.current = true;
                await addview(post._id);
            }
        }, { threshold: 0.6 });

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => {
            if (postRef.current) {
                observer.unobserve(postRef.current);
            }
        };
    }, [post._id]);

    return (
        <div ref={postRef}>
            <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-xl shadow-md">
                {/* Header */}
                <div className="flex relative -left-[25px]  items-center md:-left-[29px] space-x-2">
                    <Image
                        src={`${post?.user?.avatar}`}
                        alt="User"
                        width={40}
                        height={40}
                        className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold flex items-center space-x-1 cursor-pointer" onClick={() => {
                            router.replace(`/${post?.user?.username}`);
                        }}>
                            <span>{post?.user?.username}</span>
                            <Image
                                src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20aria-label%3D%22Verified%20account%22%20role%3D%22img%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20stroke%3D%22%231DA1F2%22%20stroke-width%3D%222%22%20fill%3D%22%231DA1F2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M9%2012.5l2%202%204-4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A"
                                alt="Verified"
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                            />
                            <span className="text-gray-400">
                                · {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-2 max-w-2xl relative left-[16px] space-y-2 text-md">
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
                <RepostConfirmModal
                    isOpen={showRepostModal}
                    onClose={() => setShowRepostModal(false)}
                    onConfirm={handleRepost}
                />

                {/* Media */}
                {post?.type === "image" && (
                    <div className="mt-3 grid relative left-[16px] grid-cols-2 gap-2 rounded-xl overflow-hidden">
                        <Image
                            src={post?.url}
                            alt="Post media"
                            width={900}
                            height={300}
                            className="col-span-2 rounded-xl object-cover"
                        />
                    </div>
                )}

                {post?.type === "video" && (
                    <div className="mt-3 grid relative left-[16px] grid-cols-2 gap-2 rounded-xl overflow-hidden">
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
                <div className="flex justify-between px-3 text-gray-400 mt-4 ml-4 text-sm">
                    <div className="flex items-center  hover:text-blue-400 cursor-pointer" onClick={async () => {
                        if (!commentLoad) {
                            const data = await getcomments(post?._id);
                            setCommentData(data)
                        }
                        setCommentLoad(!commentLoad);
                    }}>
                        <MessageCircle size={16} /> <span>{post?.comments.length}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer" onClick={() => setShowRepostModal(true)}>
                        <Repeat size={16} /> <span>{post?.countRepost || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-pink-400 cursor-pointer" onClick={handleLike}>
                        <Heart size={16} className={`${isLiked ? "fill-pink-500" : ""}`} /> <span>{post?.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
                        <BarChart3 size={16} /> <span>{post?.views}</span>
                    </div>
                    {<div className="flex items-center space-x-1 hover:text-white cursor-pointer" onClick={() => {
                        handleSavedPost()
                    }}>
                        <Bookmark size={16} className={`${(savedPost ) ? "fill-blue-600" : ""}`} /> <span>{post?.saved?.length || 0}</span>
                    </div>}
                </div>

            </div>
            <div className="mt-2 relative left-2">
                {
                    commentLoad && <CommentSection
                        comments={commentData}
                        postId={post?._id}
                        user={user}
                    />
                }
            </div>
        </div>
    );
};

export default PostCard;
