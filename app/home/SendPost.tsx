
"use client"
import React, { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Smile,
  CalendarClock,
  MapPin,
  X as XIcon,
  Navigation,
  Route,
  Map,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import EmojiPicker from "./EmojiComp";
import Image from "next/image";
import { getuserinfo } from "@/actions/auth/getuserinfo";

const SendPost = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState<boolean | null>(false);
  const [showEmoji, setShowEmoji] = useState<boolean | null>(false);
  const [userData, setUSerData] = useState<Object | null>(null);


  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setPreviewUrl(null);
  };

  const handlePost = async () => {
    if (isPosting) return;

    setIsPosting(true);
    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('post', media);
    }
    try {
      const response = await axios.post('/api/home/post/sendpost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        toast.success("✨ New post just dropped!");
      } else {
        toast.success("Couldn't upload the post right now. Give it another shot? 💪");
      }

    } catch (error) {
      console.log(error);
    }
    setContent("");
    setMedia(null);
    setPreviewUrl(null);
    setIsPosting(false);
  };

  useEffect(() => {
    async function run() {
      const data = await getuserinfo();
      setUSerData(data)
    }
    run();
  }, [])

  return (
    <div className="bg-black p-4 rounded-xl border border-gray-800 text-white w-full  mx-auto">
      <div className="flex items-start gap-3">
        {
          userData && <Image
            src={`${userData?.user?.avatar || ""}`}
            alt="Profile"
            height={40}
            width={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        }
        <div className="flex-1">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What’s happening?"
            className="w-full bg-transparent text-white placeholder-gray-500 text-lg outline-none"
          />

          {/* Unified Media Preview */}
          {previewUrl && (
            <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-700">
              <button
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 transition z-10"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
              <div className="w-full">
                {media?.type.startsWith("video/") ? (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-64 w-full object-cover rounded-xl"
                  />
                ) : (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    className="w-full object-cover rounded-xl"
                    width={800}
                    height={400}
                  />
                )}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4 items-center text-blue-400 text-sm">
              <label className="cursor-pointer">
                <ImageIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer">
                <VideoIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              <div onClick={() => setShowEmoji(!showEmoji)}>
                <Smile className="w-5 h-5" />
              </div>
              <CalendarClock className="w-5 h-5" />
              <MapPin className="w-5 h-5" />
              <Route className="w-5 h-5" />
            </div>

            <button
              onClick={handlePost}
              disabled={(!content && !media) || isPosting}
              className={`px-4 py-1 rounded-full font-semibold transition ${(content || media) && !isPosting
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
          <div>
            {
              showEmoji && <div className='mt-2'>
                <EmojiPicker setContent={setContent} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPost;
