import React from "react";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import "@/resources/styling/components/layouts/dashboardlayout.scss";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TrpcProvider cookies={cookies().toString()}>
            <div>
                <Navbar />
                <main className="main">
                    <Sidebar />
                    <div className="content">{children}</div>
                </main>
            </div>
        </TrpcProvider>
    );
}
