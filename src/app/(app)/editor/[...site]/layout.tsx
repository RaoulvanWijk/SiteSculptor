import React from "react";
import { SideNavContextProvider } from "@/components/context/SideNavContext";

export default function layout({ children }: { children: React.ReactNode }) {
    return <SideNavContextProvider>{children}</SideNavContextProvider>;
}
