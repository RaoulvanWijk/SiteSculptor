import React from "react";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import SettingsNavbar from "@/components/settings/SettingsNavbar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import "@/resources/styling/components/layouts/dashboardlayout.scss";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TrpcProvider cookies={cookies().toString()}>
            <div>
                <SettingsNavbar />
                <div className="dashboard-main barstyling">
                    <SettingsSidebar />
                    <div className="content">{children}</div>
                </div>
            </div>
        </TrpcProvider>
    );
}
