"use client";

import { useContext } from "react";
import { SideNavContext } from "../context/SideNavContext";

export default function useSideNav() {
    const context = useContext(SideNavContext);

    if (!context) {
        throw new Error(
            "useSideNav must be used within an SideNavContextProvider"
        );
    }

    return context;
}
