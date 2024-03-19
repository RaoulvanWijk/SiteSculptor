import React from 'react'
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TrpcProvider cookies={cookies().toString()}><div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
                <Navbar />
                {children}
            </main>
        </div></TrpcProvider>
    )
}
