"use client";

import Link from "next/link";
import "@/resources/styling/components/dashboard/sidebar.scss";
import { Button } from "../ui/button";

const SidebarItems = () => {
    return (
        <div className="sidebaritems">
            <Link href="/app/account">jup</Link>
        </div>
    );
};
export default SidebarItems;
