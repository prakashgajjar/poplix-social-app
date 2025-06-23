import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Posts",
    description:
        "Upgrade to Poplix Premium and supercharge your experience — enjoy reply boosts, exclusive features, priority support, and more. Elevate your social voice today.",
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
