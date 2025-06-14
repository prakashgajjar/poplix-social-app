'use client';

import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { getallnotifications } from "@/actions/notification/getallnotification";
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function run() {
      try {
        const data = await getallnotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    }
    run();
  }, []);

  return (
    <div className="max-w-3xl w-full mx-auto h-screen overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-4 bg-background z-10 py-2 ml-4">Notifications</h1>
      <div className="space-y-2">
        {notifications.length > 0 &&
          notifications.map((notif, idx) => (
            <NotificationItem
              key={notif._id || idx}
              type={notif?.type}
              avatar={notif?.meta?.avatar || "/fallback-avatar.png"}
              username={notif?.meta?.username || "Unknown"}
              message={notif?.message}
              time={formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
              isPrivateProfile={notif.type === "follow" && false /* TODO: add logic */}
              isFollowingBack={false}
              onFollowBack={() => console.log("Followed back", notif.sender)}
              onAccept={() => console.log("Accepted request", notif.sender)}
              onReject={() => console.log("Rejected request", notif.sender)}
            />
          ))}
      </div>
    </div>
  );
}
