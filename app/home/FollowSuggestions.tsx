"use client"
import React from "react";
import Image from "next/image";

const users = [
    { name: "Nitish Kumar", username: "@nitishkmr", image: "/images/2.jpg" },
    { name: "Jasprit Bumrah", username: "@boom_boom", image: "/images/2.jpg" },
];

const FollowSuggestions = () => {
    return (
        <div className="bg-gradient-to-br from-[#1f2937] via-[#111827] to-black p-5 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
                Who to follow 👥
            </h2>
            <div className="space-y-4">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between hover:bg-gray-800/60 p-3 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src={user.image }
                                alt={user.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-semibold text-white">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.username}</p>
                            </div>
                        </div>
                        <button className="bg-white text-black px-4 py-1.5 rounded-full font-semibold text-xs hover:bg-blue-100 transition">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowSuggestions;
