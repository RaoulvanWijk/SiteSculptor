"use client";

import Link from "next/link";
import "@/resources/styling/components/dashboard/sidebar.scss";
import DefaultButton from "../interactives/DefaultButton";
import { Button } from "../ui/button";

const SidebarItems = () => {
    return (
        <div className="sidebaritems">
            <Button type="primary" asChild>
                <Link href="/app/account">jup</Link>
            </Button>
        </div>
    );
};
export default SidebarItems;
