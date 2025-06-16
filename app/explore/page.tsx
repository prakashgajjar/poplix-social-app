'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Heart,
  MessageCircle,
  Check,
  VolumeX,
  Volume2,
  ArrowLeft,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getPosts } from '@/actions/postActions/getpost';
// import { getAllUsers } from '@/actions/userActions/getAllUsers'; // make sure this exists
import GlassSidebar from '@/components/GlassSidebar';

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState<'posts' | 'users'>('posts');
  const router = useRouter();

  // Fetch posts and users on mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await getPosts();
      // const fetchedUsers = await getAllUsers();
      setPosts(fetchedPosts || []);
      // setUsers(fetchedUsers || []);
      setFilteredPosts(fetchedPosts || []);
      // setFilteredUsers(fetchedUsers || []);
    };
    fetchData();
  }, []);

  // Apply filter when search term or tab changes
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase().trim();

    if (tab === 'posts') {
      if (lowerSearch === '') {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(
          posts.filter((post: any) =>
            post.user?.username?.toLowerCase().includes(lowerSearch)
          )
        );
      }
    } else {
      if (lowerSearch === '') {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(
          users.filter((user: any) =>
            user?.username?.toLowerCase().includes(lowerSearch)
          )
        );
      }
    }
  }, [searchTerm, tab, posts, users]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            className="text-white hover:text-gray-300"
            onClick={() => router.replace('/home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Explore</h1>
          <div className="w-5 h-5" />
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
            <Search className="text-white w-4 h-4 mr-2" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="w-full bg-transparent text-white outline-none text-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-b border-white/10">
          {['posts', 'users'].map((item) => (
            <button
              key={item}
              className={`flex-1 py-2 text-sm font-medium ${tab === item
                ? 'border-b-2 border-white text-white'
                : 'text-white/50'
                }`}
              onClick={() => setTab(item as 'posts' | 'users')}
            >
              {item === 'posts' ? 'Posts' : 'Users'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-[2px]">
        {tab === 'posts' ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-[2px]">
            {filteredPosts.map((post) => (
              <ExploreCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 px-4 py-3">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition"
              >
                <Image
                  src={user.avatar || '/fallback-avatar.png'}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">@{user.username}</p>
                  <p className="text-xs text-white/50">{user.name || ''}</p>
                </div>
                {user.verified && <Check className="w-4 h-4 text-blue-500" />}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {(tab === 'posts' && filteredPosts.length === 0) ||
          (tab === 'users' && filteredUsers.length === 0) ? (
          <div className="text-center text-white/40 mt-10 text-sm">
            No {tab} found.
          </div>
        ) : null}
      </div>

      <GlassSidebar />
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
      {post.type === 'image' ? (
        <Image
          src={post.url}
          alt="post"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fill
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

      {post.type === 'image' && isHovered && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-2 text-white transition-opacity duration-300">
          <div className="flex items-center gap-1 text-xs">
            <span>@{post.user.username}</span>
            {post.verified && <Check className="w-3 h-3 text-blue-400" />}
          </div>
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
