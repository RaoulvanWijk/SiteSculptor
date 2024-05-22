import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/resources/styling/base.scss";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextAuth from "next-auth";
import NextAuthProvider from "@/lib/auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Avklo",
    description: "An application to build websites",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
