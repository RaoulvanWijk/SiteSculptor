import React from "react";
import "@/resources/styling/components/SideNav/navbarselected.scss";
import useSideNav from "@/components/hooks/useSideNav";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBarSelected({ className, stijl, sideNav }: any) {
    const { page } = useSideNav();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (sideNav) {
        return (
            <nav className={`navbarselected ${className}`} style={stijl}>
                <div>LOGO</div>
                <menu className="navbarselected-items">
                    <li>
                        <a href="#">Home</a>
                    </li>
                </menu>
            </nav>
        );
    } else {
        return (
            <nav className={`navbarselected ${className}`} style={stijl}>
                <div className={"hamburger-top"}>
                    <Link href={"/"}>LOGO</Link>
                    {/* Hamburger Icon */}
                    <div className="hamburgerIcon" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <menu
                    className={`navbarselected-items ${
                        isMenuOpen ? "open" : ""
                    }`}
                >
                    {page.map((page) => (
                        <li key={page.id}>
                            <a href={page.id}>{page.title}</a>
                        </li>
                    ))}
                </menu>
            </nav>
        );
    }
}
