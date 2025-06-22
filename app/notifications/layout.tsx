import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Poplix - Notifications`,
  description:
    "Stay in the loop with Poplix — check your latest likes, comments, followers, and updates all in one place. Never miss a moment!",
  icons: {
    icon: "/logos/poplix1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased ">
        {children}
      </body>
    </html>
  );
}
