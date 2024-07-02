"use client";
import React from "react";
import Link from "next/link";

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

export default function NavContent(navbarItems: any) {
    const [navOpen, setNavOpen] = React.useState(false);
    function changeNavbar() {
        setNavOpen(!navOpen);
    }
    return (
        <>
            <div className={"hamburger-top"}>
                <Link href={"/"}>LOGO</Link>

                <button className="hamburgerIcon" onClick={changeNavbar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>
            <menu className={`navbar-items ${navOpen ? "open" : ""}`}>
                {setLinks(navbarItems.navbarItems)}
            </menu>
        </>
    );
}
