'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Check, VolumeX, Volume2 } from 'lucide-react';

import { getPosts } from '@/actions/postActions/getpost';



const ExplorePage = () => {

  const [explorePosts, setExplorePosts] = useState([]);

  const handlepost = async () => {
    const data = await getPosts();
    setExplorePosts(data)
  }

  useEffect(() => {
    handlepost()
  }, [])
  return (
    <div className="p-4 h-screen overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-[2px]">
        {!(explorePosts?.isRetweet) && explorePosts.map((post) => (
          <ExploreCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

const ExploreCard = ({ post }: { post: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  return (
    <div
      className="relative aspect-square group overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media */}
      {post.type === 'image' ? (
        <img
          src={post.url}
          alt="post"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : post.type === 'video' ? (
        <video
          ref={videoRef}
          src={post?.url}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
        />
      ) : null}


      {/* Overlay for image posts only */}
      {post.type === 'image' && isHovered && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-2 text-white transition-opacity duration-300">
          {/* Username + Verified */}
          <div className="flex items-center gap-1  px-2 py-[2px]  rounded-full text-xs">
            <span className=''>@{post.user.username}</span>
            {post.verified && <Check className="w-3 h-3 text-blue-400" />}
          </div>

          {/* Likes + Comments */}
          <div className="flex justify-center items-center gap-6 m-auto">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span className="text-sm">{post.likes.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.comments.length || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mute/Unmute for videos */}
      {post.type === 'video' && isHovered && (
        <div
          className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white cursor-pointer z-10"
          onClick={toggleMute}
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
