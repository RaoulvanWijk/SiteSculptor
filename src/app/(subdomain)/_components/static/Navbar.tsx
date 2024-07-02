import React from "react";
import Link from "next/link";
import "../../_resources/styling/navbar.scss";
import { absoluteUrl } from "@/lib/utils";
import NavContent from "./NavContent";
type NavbarProps = {
    siteId: string;
};

const getNavbar = async (siteId: string) => {
    const res = await fetch(
        absoluteUrl(`/api/editor/site_navbar/styling/${siteId}`),
        {
            method: "GET",
            cache: "no-cache",
        }
    );
    const data = await res.json();
    return data;
};

const getNavbarItems = async (siteId: string) => {
    const res = await fetch(absoluteUrl(`/api/editor/page/site_id/${siteId}`), {
        method: "GET",
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export default async function Navbar({ siteId }: NavbarProps) {
    const navbar = await getNavbar(siteId);
    const navbarItems = await getNavbarItems(siteId);
    // const { styles } = navbar[0];
    console.log("====================================");
    console.log("navbar", navbar);
    console.log("====================================");

    return (
        <nav className={`navbar`}>
            <NavContent navbarItems={navbarItems} />
        </nav>
    );
}
