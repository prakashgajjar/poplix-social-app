"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaSearch,
  FaBell,
  FaBookmark,
  FaStar,
  FaBuilding,
  FaEllipsisH,
  FaBriefcase
} from "react-icons/fa";

export default function GlassSidebar() {
  const [open, setOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Home"); // ✅ track current active label
  const router = useRouter();

  useEffect(() => {
    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;

      if (deltaX > -100) setOpen(true); // left swipe
      if (deltaX < 100) setOpen(false); // right swipe
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleNavClick = (label: string, path?: string) => {
    setActiveLabel(label); // ✅ set active on click
    setOpen(false); // ❣️ close sidebar after click
    if (path) router.replace(path);
  };

  return (
    <div className="relative text-white overflow-hidden">
      <div
        className={`fixed top-0 right-0 h-full w-[75%] sm:w-[300px] z-40 bg-white/10 backdrop-blur-lg shadow-2xl border-l border-white/20 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-5">
          <h2 className="text-xl font-bold text-white/80">Menu</h2>

          {/* 💫 Menu Options */}
          <SidebarOption
            Icon={FaHome}
            label="Home"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Home", "/home")}
          />
          <SidebarOption
            Icon={FaUser}
            label="Profile"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Profile")}
          />
          <SidebarOption
            Icon={FaBell}
            label="Notifications"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Notifications")}
          />
          <SidebarOption
            Icon={FaSearch}
            label="Explore"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Explore")}
          />
          <SidebarOption
            Icon={FaBookmark}
            label="Bookmarks"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Bookmarks")}
          />
          <SidebarOption
            Icon={FaStar}
            label="Premium"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Premium")}
          />
          <SidebarOption
            Icon={FaBuilding}
            label="Verified Orgs"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Verified Orgs")}
          />
          <SidebarOption
            Icon={FaBriefcase}
            label="Jobs"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("Jobs")}
          />
          <SidebarOption
            Icon={FaEllipsisH}
            label="More"
            activeLabel={activeLabel}
            onClick={() => handleNavClick("More")}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarOption({
  Icon,
  label,
  activeLabel,
  onClick
}: {
  Icon: any;
  label: string;
  activeLabel?: string;
  onClick: () => void;
}) {
  const isActive = activeLabel === label;

  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 p-3 rounded-xl 
        ${
          isActive
            ? "bg-white/20 text-white shadow-md scale-[1.03]"
            : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-[1.02]"
        }`}
    >
      <Icon className="text-lg" />
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}
