import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import NextAuthProvider from "@/lib/auth/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SiteSculptor",
  description: "Empower your web design journey with our intuitive drag-and-drop interface, modular components, seamless e-commerce integration, and robust tools for responsive design, SEO optimization, user management, social media integration, security, and personalized branding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
