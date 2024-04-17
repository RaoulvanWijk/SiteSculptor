"use client";

import Link from "next/link";
import "@/resources/styling/components/dashboard/sidebar.scss";
import { Button } from "../ui/button";

const SidebarItems = () => {
    return (
        <div className="sidebaritems">
            <Link href="">My Projects</Link>
            <Link href="">Extensions</Link>
        </div>
    );
};
export default SidebarItems;
