import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Poplix - Bookmarks",
    description:
        "All your favorite posts in one place. Revisit saved images, videos, and thoughts anytime with Poplix Bookmarks — stay organized, stay inspired.",
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
        <html lang="en" >
            <body className="bg-black h-screen overflow-hidden text-white antialiased ">
                {children}
            </body>
        </html>
    );
}
