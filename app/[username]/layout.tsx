import "../globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Poplix Profile",
  description:
    "Show the world who you are on Poplix — your posts, moments, and connections, all in one beautiful profile.",
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
      <body className="bg-black text-white antialiased ">
        {children}
      </body>
    </html>
  );
}
