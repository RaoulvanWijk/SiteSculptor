import React from "react";
import { SideNavContextProvider } from "@/components/context/SideNavContext";
import EditorContextProvider from "@/components/context/EditorContext";

export default function layout({ children }: { children: React.ReactNode }) {
    return <SideNavContextProvider><EditorContextProvider>{children}</EditorContextProvider></SideNavContextProvider>;
}
