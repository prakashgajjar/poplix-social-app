import "../globals.css";
import type { Metadata } from "next";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";


const cookieStore = cookies();
    const token = cookieStore.get("login")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    
export const metadata: Metadata = {
  title: `${payload.email}`,
  description:
    "Poplix is your next-gen social media platform, designed to help you connect with friends, share moments, and discover local buzz.",
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
