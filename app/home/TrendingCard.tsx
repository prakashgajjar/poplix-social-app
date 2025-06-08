import React from "react";

const trends = [
  { title: "#KashmirOnTrack", subtitle: "20.8K posts" },
  { title: "#ArrestKohli", subtitle: "34.4K posts" },
  { title: "#Bakrid2025", subtitle: "Trending" },
];

const TrendingCard = () => {
  return (
    <div className="bg-gradient-to-br from-[#1f2937] via-[#111827] to-black p-5 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
        What’s happening 🔥
      </h2>
      <ul className="space-y-3">
        {trends.map((item, index) => (
          <li
            key={index}
            className="bg-gray-800/60 hover:bg-gray-700 transition-all duration-200 p-3 rounded-lg cursor-pointer flex flex-col"
          >
            <span className="text-sm font-semibold text-blue-400 hover:underline">
              {item.title}
            </span>
            <span className="text-xs text-gray-400">{item.subtitle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCard;
