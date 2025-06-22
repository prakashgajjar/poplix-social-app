import "../globals.css";
import type { Metadata } from "next";
    
export const metadata: Metadata = {
  title: `Poplix - Explore`,
description:
    "Dive into Poplix Explore — discover trending posts, creative people, and what's buzzing in your local community. Stay connected, stay inspired.",
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-black h-screen overflow-hidden text-white antialiased ">
        {children}
      </body>
    </html>
  );
}

