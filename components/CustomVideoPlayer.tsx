"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export default function CustomVideoPlayer({ src, onLoadedData }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.volume = 0.8;
    video.muted = true;
    video.play().catch(() => setPlaying(false));
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden">
      {!isLoaded && (
        <div className="w-full aspect-video bg-gray-300 animate-pulse rounded-xl" />
      )}

      <video
        ref={videoRef}
        src={src}
        className={`w-full aspect-video object-cover ${!isLoaded ? "hidden" : ""}`}
        muted={muted}
        autoPlay
        playsInline
        loop
        preload="metadata"
        onLoadedData={() => {
          setIsLoaded(true);
          onLoadedData?.();
        }}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onClick={togglePlay}
      />

      {/* Control overlay (optional) */}
      <div className="absolute bottom-2 left-2 flex gap-3">
        <button onClick={togglePlay} className="bg-black/60 p-1 rounded-full text-white">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={toggleMute} className="bg-black/60 p-1 rounded-full text-white">
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}
