"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { sendtexttoai } from "@/actions/ai/sendtexttoai";
import Image from "next/image";

export default function PopAIAssistantOverlay({ visible = true }: { visible?: boolean }) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // 🔊 Speak function with voice selection & speaking state
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // stop any previous voice

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1.2;
    utterance.rate = 1;
    utterance.volume = 1;

    const voices = synth.getVoices();
    const selectedVoice = voices.find(voice =>
      voice.name.toLowerCase().includes("female")
    );
    utterance.voice = selectedVoice || voices[7];

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synth.speak(utterance);
  };

  // 🧠 Setup speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          setText(transcript);

          try {
            const timeout = new Promise((_, reject) =>
              setTimeout(() => reject("AI timeout"), 8000)
            );

            const aiResponse = await Promise.race([
              sendtexttoai(transcript),
              timeout
            ]);

            if (aiResponse && !listening) {
              speak(aiResponse);
            }
          } catch (err) {
            console.error("AI Error:", err);
            speak("Oops! Something went wrong. Please try again 😅");
          } finally {
            setListening(false);
          }
        };

        recognitionRef.current.onend = () => {
          setListening(false);
        };
      }
    }
  }, []);

  // 🎙️ Toggle mic listening
  const handleListenToggle = () => {
    if (speaking) {
      window.speechSynthesis.cancel(); // stop speaking immediately
      return;
    }

    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setListening(!listening);
  };

  if (!visible) return null;

  return (
    <div className="h-screen">
      <div className="fixed bottom-6 inset-x-0 z-50 flex items-center justify-center">
        <div className="relative w-[320px] h-[320px] flex items-center justify-center bg-black/80 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
          {/* SVG Wave Animation */}
          {listening && (
            <div className="w-full max-w-7xl mx-auto absolute top-[-40px] left-1/2 -translate-x-1/2 z-0">
              <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-40">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="50%" stopColor="#8e2eff" />
                    <stop offset="100%" stopColor="#ff4fcf" />
                  </linearGradient>
                </defs>

                {Array.from({ length: 500 }).map((_, i) => {
                  const y1 = 50 + Math.random() * 50;
                  const y2 = 50 + Math.random() * 50;
                  const y3 = 50 + Math.random() * 50;
                  const opacity = 0.03 + Math.random() * 0.05;
                  const duration = (3 + Math.random() * 3).toFixed(1);
                  const delay = (Math.random() * 2).toFixed(1);
                  const ampShift = 10 + Math.random() * 300;

                  return (
                    <path
                      key={i}
                      fill="none"
                      stroke="url(#waveGradient)"
                      strokeWidth="1"
                      opacity={opacity}
                      d={`M0,100 C360,${y1} 1080,${y2} 1440,100`}
                    >
                      <animate
                        attributeName="d"
                        dur={`${duration}s`}
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                        values={`
                          M0,100 C360,${y1 + ampShift} 1080,${y2 - ampShift} 1440,100;
                          M0,100 C360,${y2 - ampShift} 1080,${y3 + ampShift} 1440,100;
                          M0,100 C360,${y3 - ampShift} 1080,${y1 + ampShift} 1440,100;
                          M0,100 C360,${y1 + ampShift} 1080,${y2 - ampShift} 1440,100
                        `}
                      />
                    </path>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Mic Button */}
          <button
            onClick={handleListenToggle}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
              listening
                ? "bg-gradient-to-br from-[#00f0ff] via-[#8e2eff] to-[#ff4fcf] text-white shadow-[0_0_30px_8px_rgba(142,46,255,0.6)]"
                : "bg-white text-black border-black/20 shadow-md"
            }`}
          >
            <Mic size={36} />
          </button>

          {/* Logo (optional) */}
          <div className="absolute bottom-4 flex justify-center">
            <Image
              src="/logos/p-browser1.png"
              alt="Pop AI Logo"
              width={48}
              height={48}
              className="rounded-full shadow-xl"
            />
          </div>
        </div>
      </div>

      {text && (
        <div className="text-center text-white mt-4 text-lg font-medium">
          You said: <span className="italic text-pink-400">{text}</span>
        </div>
      )}
    </div>
  );
}
