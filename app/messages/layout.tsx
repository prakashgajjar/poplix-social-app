import "../globals.css";
import type { Metadata } from "next";
    
export const metadata: Metadata = {
  title: `poplix-messages`,
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased ">
        {children}
      </body>
    </html>
  );
}
