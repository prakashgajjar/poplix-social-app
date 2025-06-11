"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Sidebar from "./Navbar";
import SubscribePremium from "./home/SubscribePremium";
import TrendingCard from "./home/TrendingCard";
import FollowSuggestions from "./home/FollowSuggestions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased bg-black text-white`}
      >
        <div className="flex h-screen overflow-hidden max-w-[1400px] mx-auto">
          {/* Left Sidebar */}
          {showSidebar && <Sidebar />}

          {/* Main Content */}
          <main className="flex-1 px-1 py-4 md:px-1 lg:px-1">
            {children}
          </main>

         {
          showSidebar &&  <aside className="hidden lg:block w-[300px] px-1 mt-2 py-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full bg-gray-900 text-white outline-none mb-6"
            />

            <div className="flex flex-col mt-2 gap-5">
              <SubscribePremium />
              <TrendingCard />
              <FollowSuggestions />
            </div>
          </aside>
         }
        </div>
      </body>
    </html>
  );
}
