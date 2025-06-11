import { useState, useRef, useEffect } from "react";

export default function ProfileInfo({ profile }) {
  const [editingField, setEditingField] = useState(null);
  const [updatedName, setUpdatedName] = useState(profile?.profileName || "");
  const [updatedBio, setUpdatedBio] = useState(profile?.bio || "");
  const editRef = useRef();

  const handleSave = async () => {
    console.log("Saving profile:", { updatedName, updatedBio });
    setEditingField(null);
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setEditingField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-2 text-white" ref={editRef}>
      {/* Name */}
      {editingField === "name" ? (
        <div className="flex items-center gap-2">
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="text-white bg-gray-700 p-1 rounded"
          />
          <button
            onClick={handleSave}
            className="text-sm bg-white text-black px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <h1
          className="text-xl font-bold cursor-pointer"
          onDoubleClick={() => setEditingField("name")}
        >
          {profile?.profileName || "Suthar Prakash"}
        </h1>
      )}

      {/* Username */}
      <p className="text-sm text-gray-400">@{profile?.username}</p>

      {/* Bio */}
      {editingField === "bio" ? (
        <div className="flex items-center text-sm gap-2 mt-1">
          <textarea
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            className=" p-1  w-full text-white bg-gray-700  rounded"
          />
          <button
            onClick={handleSave}
            className="text-sm bg-white text-black px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p
          className="text-sm mt-1 cursor-pointer"
          onDoubleClick={() => setEditingField("bio")}
        >
          {profile?.bio || "Hey there! I'm new here. Excited to connect and explore!"}
        </p>
      )}

      {/* Static info */}
      <div className="flex gap-4 mt-2 text-sm text-gray-400">
        <span>Born February 5, 1985</span>
        <span>Joined June 2010</span>
      </div>

      {/* Followers/Following */}
      <div className="flex gap-4 mt-1 text-sm">
        <span className="font-bold text-white">{profile.following?.length || 0}</span> Following
        <span className="font-bold text-white">{profile.followers?.length || 0}</span> Followers
      </div>
    </div>
  );
}
