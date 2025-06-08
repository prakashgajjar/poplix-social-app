"use client";

import {
  FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaUser, FaPlus,
  FaRocket, FaUsers, FaBriefcase, FaListUl, FaEllipsisH, FaBolt
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaSearch />, label: "Explore" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaEnvelope />, label: "Messages" },
  { icon: <FaListUl />, label: "Lists" },
  { icon: <FaBookmark />, label: "Bookmarks" },
  { icon: <FaBriefcase />, label: "Jobs" },
  { icon: <FaUsers />, label: "Communities" },
  { icon: <FaRocket />, label: "Premium" },
  { icon: <FaBolt />, label: "Verified Orgs" },
  { icon: <FaUser />, label: "Profile" },
  { icon: <FaEllipsisH />, label: "More" },
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
  <div className="hidden md:flex flex-col justify-between w-80 px-4 py-6 border-r border-gray-800 ">
      <div>
        <div className="mb-10">
          <Image
            src="/logos/poplix-black.png"
            alt="Poplix Logo"
            width={200}
            height={60}
          />
        </div>

        <nav className="space-y-4">
          {navItems.map(({ icon, label }, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex items-center gap-4 p-2 text-lg rounded-lg cursor-pointer hover:bg-gray-800 ${
                selectedIndex === i ? "bg-gray-700" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </nav>

        <button className="mt-6 bg-white text-black font-semibold rounded-full py-2 w-full hover:bg-gray-300 flex items-center justify-center">
          <FaPlus className="mr-2" /> Post
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6 p-2 hover:bg-gray-800 rounded cursor-pointer">
        <img src="/images/2.jpg" className="w-10 h-10 rounded-full" alt="Profile" />
        <div>
          <p className="font-semibold">Prakash Gajjar</p>
          <p className="text-sm text-gray-400">@prakash801805</p>
        </div>
      </div>
    </div>
  );
}
