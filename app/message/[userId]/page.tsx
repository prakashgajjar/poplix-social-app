"use client";

import { getuserchat } from "@/actions/messages/getuserchat";
import { ArrowLeft, Mic, Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import SwipeToGoBack from "@/components/SwipeToGoBack";
import GlassSidebar from "@/components/GlassSidebar";
import { sendmessage } from "@/actions/messages/sendmessage";
import { Image as ImageIcon, Video, FileText } from "lucide-react";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import EmojiPicker from "@/app/home/EmojiComp";

const Page = () => {
  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [showUploadTypeSelector, setShowUploadTypeSelector] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const uploadTypes = [
    { type: "image", label: "Image", icon: ImageIcon, accept: "image/*" },
    { type: "video", label: "Video", icon: Video, accept: "video/*" },
    { type: "file", label: "PDF", icon: FileText, accept: "application/pdf" },
  ];

  const handleGetChat = async () => {
    const data = await getuserchat(userId)
    console.log(data.messages, data.user);
    setMessages(data.messages)
    setUser(data.user)
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowUploadTypeSelector(false);
  };

  const handleInputSend = async () => {
    const formData = new FormData();

    formData.append("message", message);
    formData.append("receiverId", userId);
    if (media) {
      formData.append("media", media);
    }
    await sendmessage(formData);

  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    handleGetChat()
    scrollToBottom();
  }, []);

  return (
    <SwipeToGoBack to="/message">{
      messages && <div className="flex flex-col h-screen bg-zinc-950">
        <GlassSidebar />
        {/* Header */}
        {user && <div className="p-3 flex items-center gap-3 border-b border-gray-800">
          <button className="text-white md:hidden" onClick={() => router.replace("/message")}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Image
            src={user?.avatar || "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-1">
            <h2 className="font-medium text-white text-sm">{user?.fullname}</h2>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          <div className="text-center text-gray-400 text-xs">Today</div>

          {messages.map((msg, i) => {
            const isMe = msg.sender !== userId;

            return (
              <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%]">
                  {/* Handle all types */}
                  {msg.type === "text" && (
                    <div
                      className={`px-4 py-2 text-sm rounded-lg mb-1 ${isMe
                        ? "bg-[#005c4b] text-white rounded-br-none"
                        : "bg-[#202c33] text-white rounded-bl-none"
                        }`}
                    >
                      {msg.content}
                    </div>
                  )}

                  {msg.type === "image" && (
                    <div className="mb-1  ">
                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <Image
                          src={msg?.url}
                          alt="uploaded image"
                          width={250}
                          height={250}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      {msg.content && (
                        <p className="text-sm mt-1 px-1 text-white">{msg.content}</p>
                      )}
                    </div>
                  )}


                  {msg.type === "video" && (
                    <div>
                      <CustomVideoPlayer src={msg.url} onLoadedData={() => setVideoLoaded(true)} />
                      <h1>{msg.content}</h1>
                    </div>
                  )}

                  {msg.type === "pdf" && (
                    <div className="group relative flex items-center gap-4 border border-gray-700 bg-gradient-to-r from-[#1f1f1f] to-[#2c2c2c] rounded-2xl p-5 shadow-xl transition-all duration-300 ">
                      <div className="relative">
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                          alt="PDF"
                          width={40}
                          height={40}
                          className="w-14 h-14 transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                          PDF
                        </span>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-white font-semibold text-lg truncate">
                          {msg.content || "Untitled PDF"}
                        </h2>
                        <a
                          href={msg.url}
                          download
                          className="inline-flex items-center mt-1 text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-4-4m4 4l4-4M4 4h16" />
                          </svg>
                          Download PDF
                        </a>
                      </div>
                    </div>
                  )}



                  {msg.type === "voice" && (
                    <audio
                      controls
                      className="w-[250px] rounded-lg mb-1 border border-gray-700"
                    >
                      <source src={msg.content} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}

                  {/* Time */}
                  <div className="text-[10px] text-gray-500 mt-1 ml-1">{msg.time}</div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <div>
          {showUploadTypeSelector && (
            <div className="flex items-center gap-4 p-2 bg-zinc-900 rounded-xl border h-24 w-48 mb-2 border-zinc-800">
              {uploadTypes.map(({ type, label, icon: Icon, accept }) => (
                <div key={type} className="flex flex-col items-center">
                  <button
                    onClick={() => inputRefs.current[type]?.click()}
                    className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-zinc-800 text-white"
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{label}</span>
                  </button>
                  <input
                    type="file"
                    accept={accept}
                    ref={(el) => (inputRefs.current[type] = el)}
                    onChange={(e) => handleMediaChange(e)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {previewUrl && (
            <div className="px-4 pt-2 pb-1">
              <div className="relative inline-block rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 max-w-xs">
                <button
                  onClick={() => {
                    setMedia(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black z-10"
                >
                  ✖
                </button>

                {media?.type.startsWith("image") ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={250}
                    height={250}
                    className="w-full h-auto object-contain max-h-[300px]"
                  />
                ) : media?.type.startsWith("video") ? (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-auto object-contain max-h-[300px] bg-black"
                  />
                ) : (
                  <div className="text-white p-4">File selected</div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Input bar */}
        <div className="flex items-center px-4  py-3 border-t border-gray-800 gap-3 bg-[#1e1e1e]">
          <div className="relative">
            <button onClick={() => setShowEmoji(!showEmoji)}>
              <Smile size={20} className="text-white" />
            </button>

            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker setContent={setMessage} />
              </div>
            )}
          </div>
          <button onClick={() => {
            setShowUploadTypeSelector(!showUploadTypeSelector)
          }}>
            <Paperclip size={20} className="text-white" />
          </button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputSend();
                setMessage("");
                setMedia(null);
                setPreviewUrl(null);
              }
            }}
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 bg-zinc-900 border border-gray-700 text-white rounded-full outline-none text-sm"
          />
          <button>
            <Mic size={20} className="text-white" />
          </button>
          <button onClick={() => {
            handleInputSend();
            setMessage("");
            setMedia(null);
            setPreviewUrl(null);
          }} >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    }
    </SwipeToGoBack >
  );
};

export default Page;
