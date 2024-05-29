import React from "react";
import Link from "next/link";
import "../../_resources/styling/navbar.scss";

type NavbarProps = {
    siteId: string;
};

const getNavbar = async (siteId: string) => {
    const res = await fetch(
        `http://localhost:3000/api/editor/site_navbar/styling/${siteId}`,
        {
            method: "GET",
        }
    );
    const data = await res.json();
    return data;
};

const getNavbarItems = async (siteId: string) => {
    const res = await fetch(
        `http://localhost:3000/api/editor/page/site_id/${siteId}`,
        {
            method: "GET",
        }
    );
    const data = await res.json();
    return data;
};

const setLinks = (navbarItems: any) => {
    for (let i = 0; i < navbarItems.length; i++) {
        if (navbarItems[i].slug === "home") {
            navbarItems.splice(i, 1);
        }
    }
    return navbarItems.map((page: any) => (
        <li key={page.id}>
            <Link href={`/${page.slug}`}>{page.slug}</Link>
        </li>
    ));
};

export default async function Navbar({ siteId }: NavbarProps) {
    const navbar = await getNavbar(siteId);
    const navbarItems = await getNavbarItems(siteId);
    const { styles } = navbar[0];
    return (
        <nav className={`navbar`} style={styles}>
            <div className={"hamburger-top"}>
                <Link href={"/"}>LOGO</Link>
                <div className="hamburgerIcon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <menu className={`navbar-items`}>{setLinks(navbarItems)}</menu>
        </nav>
    );
}
