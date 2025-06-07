import "../globals.css";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { jwtVerify } from "jose";


export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = cookies();
    const token = cookieStore.get("login")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);


    return {
        title: `${payload?.email}`,
        description:
            "Poplix is your next-gen social media platform, designed to help you connect with friends, share moments, and discover local buzz.",
        icons: {
            icon: "/logos/poplix1.png",
        },
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
